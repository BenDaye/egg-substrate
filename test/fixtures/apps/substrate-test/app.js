'use strict';

class AppBootHook {
  constructor(app) {
    this.app = app;
  }

  async willReady() {
    await this.app.substrate.isReady;
  }
}

module.exports = AppBootHook;
