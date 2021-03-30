'use strict';

const assert = require('assert');
const ApiPromise = require('@polkadot/api').ApiPromise;
const WsProvider = require('@polkadot/api').WsProvider;

module.exports = app => {
  app.addSingleton('substrate', connect);

  // app.beforeClose(() => {
  //   app.coreLogger.info('[egg-substrate] substrate singleton had been destroyed');
  // });
};

function connect(config, app) {
  assert(config.url, '[egg-substrate] \'url is required on config\'');

  app.coreLogger.info('[egg-substrate] client connecting %s', config.url);

  const provider = new WsProvider(config.url);
  const client = new ApiPromise({ ...config.options, provider });

  client.on('connected', () => {
    app.coreLogger.info('[egg-substrate] client connect success [%s]', config.url);
  });

  client.on('error', err => {
    app.coreLogger.error('[egg-substrate] client connect error [%s]', config.url);
    app.coreLogger.error(err);
  });

  client.on('disconnected', () => {
    app.coreLogger.warn('[egg-substrate] client disconnected [%s]', config.url);
  });

  client.on('ready', () => {
    app.coreLogger.info('[egg-substrate] client ready [%s]', config.url);
  });

  return client;
}
