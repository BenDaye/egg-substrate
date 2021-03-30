'use strict';

exports.substrate = {
  clients: {
    polkadot: {
      url: 'wss://rpc.polkadot.io',
    },
    kusama: {
      url: 'wss://kusama-rpc.polkadot.io',
    },
    sycamore: {
      url: 'wss://substrate.bendaye.vip',
    },
  },
  agent: true,
};

exports.keys = 'substrate';
