'use strict';

const mock = require('egg-mock');
const assert = require('assert');
const fs = require('fs');
const path = require('path');

describe('test/substrate.test.js', () => {
  let app;
  before(() => {
    app = mock.app({
      baseDir: 'apps/substrate-test',
      plugin: 'substrate',
    });
    return app.ready();
  });

  after(() => app.close());
  afterEach(mock.restore);

  describe('should GET /', () => {
    it('should status 200 and get the body', () => {
      return app.httpRequest()
        .get('/')
        .expect(200);
    });

    it('should send multi requests', async () => {
      // 使用 generator function 方式写测试用例，可以在一个用例中串行发起多次请求
      await app.httpRequest()
        .get('/')
        .expect(200); // 期望返回 status 200

      // 再请求一次
      const result = await app.httpRequest()
        .get('/')
        .expect(200);

      // 也可以这样验证
      assert(result.status === 200 && result.body);
    });
  });

  describe('config.substrate.agent = true', () => {
    let app;
    before(() => {
      app = mock.cluster({
        baseDir: 'apps/substrate-test',
        plugin: 'substrate',
      });
      return app.ready();
    });
    after(() => app.close());

    it('should agent.substrate work', () => {
      const result = fs.readFileSync(path.join(__dirname,
        './fixtures/apps/substrate-test/run/agent_result.json'), 'utf8');
      assert(result);
    });
  });


  describe('config.substrate.app = false', () => {
    let app;
    before(() => {
      app = mock.app({
        baseDir: 'apps/substrate-disable',
        plugin: 'substrate',
      });
      return app.ready();
    });
    after(() => app.close());

    it('should disable app work', () => {
      assert(!app.substrate);
    });
  });


  describe('config.substrate.clients is set', () => {
    let app;
    before(() => {
      app = mock.cluster({
        baseDir: 'apps/substrate-multi-client',
        plugin: 'substrate',
      });
      return app.ready();
    });
    after(() => app.close());

    it('should multi client work', async () => {
      const result = fs.readFileSync(path.join(__dirname,
        './fixtures/apps/substrate-multi-client/run/agent_result.json'), 'utf8');
      assert(result);
    });
  });

  describe('config.substrate[client/clients] is not set', () => {
    let app;
    before(() => {
      app = mock.cluster({
        baseDir: 'apps/substrate-dynamic',
        plugin: 'substrate',
      });
      return app.ready();
    });
    after(() => app.close());

    it('should new config agent.substrate work', () => {
      const result = fs.readFileSync(path.join(__dirname,
        './fixtures/apps/substrate-dynamic/run/agent_result.json'), 'utf8');
      assert(result);
    });
  });
});
