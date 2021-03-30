'use strict';

const fs = require('fs');
const path = require('path');

class AppBootHook {
  constructor(agent) {
    this.agent = agent;
  }

  // async willReady() {
  //   await this.agent.substrate.isReady;
  // }

  async didReady() {
    const p = path.join(__dirname, 'run/agent_result.json');
    fs.existsSync(p) && fs.unlinkSync(p);

    const properties = await this.agent.substrate.rpc.system.properties();
    fs.writeFileSync(p, JSON.stringify(properties.toHuman()));
  }
}

module.exports = AppBootHook;
