'use strict';

const Service = require('egg').Service;

class RpcService extends Service {
  async systemProperties() {
    await this.app.plugins.substrate.isReady;
    return await this.app.plugins.substrate.rpc.system.properties();
  }
}

module.exports = RpcService;
