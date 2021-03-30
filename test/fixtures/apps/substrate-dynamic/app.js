'use strict';

class AppBootHook {
  constructor(app) {
    this.app = app;
  }

  async serverDidReady() {
    this.app.messenger.on('substrate_dynamic-ready', substrate => {
      this.app.substrateDynamic = substrate;
    });
  }
}

module.exports = AppBootHook;
