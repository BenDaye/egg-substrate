'use strict';

const fs = require('fs');
const path = require('path');

class AppBootHook {
  constructor(agent) {
    this.agent = agent;
  }

  async didReady() {
    const p = path.join(__dirname, 'run/agent_result.json');
    fs.existsSync(p) && fs.unlinkSync(p);

    if (Array.isArray(this.agent.config.substrate.clients)) {
      const result = await Promise.all(this.agent.config.substrate.clients.map(client => this.agent.substrate.get(client.clientId).rpc.system.properties()));
      fs.writeFileSync(p, JSON.stringify(result.map(r => r.toHuman())));
    } else {
      const clientIds = Object.keys(this.agent.config.substrate.clients);
      const result = await Promise.all(clientIds.map(clientId => this.agent.substrate.get(clientId).rpc.system.properties()));
      fs.writeFileSync(p, JSON.stringify(result.map(r => r.toHuman())));
    }
  }
}

module.exports = AppBootHook;
