'use strict';

const fs = require('fs');
const path = require('path');

class AppBootHook {
  constructor(agent) {
    this.agent = agent;
  }

  async didLoad() {
    this.agent.substrateDynamic = this.agent.substrate.createInstance(this.agent.config.substrateDynamic);
    await this.agent.substrateDynamic.isReady;
  }

  async didReady() {
    const p = path.join(__dirname, 'run/agent_result.json');
    fs.existsSync(p) && fs.unlinkSync(p);

    const properties = await this.agent.substrateDynamic.rpc.system.properties();
    fs.writeFileSync(p, JSON.stringify(properties.toHuman()));
  }

  async serverDidReady() {
    this.agent.messenger.sendToApp('substrate_dynamic-ready', this.agent.substrateDynamic);
  }
}

module.exports = AppBootHook;
