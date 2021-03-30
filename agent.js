'use strict';


const Substrate = require('./lib/substrate');

class AppBootHook {
  constructor(agent) {
    this.agent = agent;
  }

  configWillLoad() {
    if (this.agent.config.substrate.agent) Substrate(this.agent);
  }

  async willReady() {
    if (!this.agent.config.substrate.agent) return;
    if (this.agent.config.substrate.client) await this.agent.substrate.isReady;
    if (this.agent.config.substrate.clients) {
      if (Array.isArray(this.agent.config.substrate.clients)) {
        await Promise.all(this.agent.config.substrate.clients.map(client => this.agent.substrate.get(client.clientId).isReady));
      } else {
        const clientIds = Object.keys(this.agent.config.substrate.clients);
        await Promise.all(clientIds.map(clientId => this.agent.substrate.get(clientId).isReady));
      }
    }
  }
}

module.exports = AppBootHook;
