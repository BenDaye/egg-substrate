'use strict';


const Substrate = require('./lib/substrate');

class AppBootHook {
  constructor(app) {
    this.app = app;
  }

  configWillLoad() {
    if (this.app.config.substrate.app) Substrate(this.app);
  }

  async willReady() {
    if (!this.app.config.substrate.app) return;
    if (this.app.config.substrate.client) await this.app.substrate.isReady;
    if (this.app.config.substrate.clients) {
      if (Array.isArray(this.app.config.substrate.clients)) {
        await Promise.all(this.app.config.substrate.clients.map(client => this.app.substrate.get(client.clientId).isReady));
      } else {
        const clientIds = Object.keys(this.app.config.substrate.clients);
        await Promise.all(clientIds.map(clientId => this.app.substrate.get(clientId).isReady));
      }
    }

  }
}

module.exports = AppBootHook;
