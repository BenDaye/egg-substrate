'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    this.ctx.body = 'hi, ' + await this.app.substrate.rpc.system.properties();
  }
}

module.exports = HomeController;
