'use strict';

const Devebot = require('devebot');
const Promise = Devebot.require('bluebird');
const lodash = Devebot.require('lodash');
const slugify = require('@sindresorhus/slugify');

module.exports = {
  pickData: function (data, pick) {},

  getRequestId: function (ctx = {}, opts = {}) {
    const { TR } = ctx;
    return (opts.requestId = opts.requestId || TR.getLogID());
  },

  getRequestTracer: function (ctx = {}, opts) {
    const { TR } = ctx;
    return TR.branch({ key: 'requestId', value: this.getRequestId(ctx, opts) });
  },

  beginTracing: function (ctx = {}, tracer, methodName) {
    const { LX, blockRef } = ctx;
    LX.has('debug') &&
      LX.log(
        'debug',
        tracer.add({ methodName }).toMessage({
          tags: [blockRef, methodName, 'begin'],
          text: ' - [${requestId}] ${methodName}() begin',
        })
      );
  },

  wrap: function (ctx = {}, methodName, args = {}, opts = {}, main) {
    const reqTr = this.getRequestTracer(ctx, opts);
    const { enabled = true, LX, blockRef } = ctx;
    if (enabled === false) {
      LX.has('debug') &&
        LX.log(
          'debug',
          reqTr.add({ methodName, enabled }).toMessage({
            tags: [blockRef, methodName],
            text: ' - [${requestId}] AppReferral is set [enabled:${enabled}]',
          })
        );
      return Promise.resolve();
    }
    this.beginTracing(ctx, reqTr, methodName);
    let flow = Promise.resolve().then(lodash.wrap(main(args)));
    return this.endTracing(ctx, reqTr, methodName, flow);
  },

  endTracing: function (ctx = {}, tracer, methodName, flow) {
    const { LX, blockRef } = ctx;
    return flow
      .then(function (result) {
        LX.has('debug') &&
          LX.log(
            'debug',
            tracer.add({ methodName }).toMessage({
              tags: [blockRef, methodName, 'completed'],
              text: ' - [${requestId}] ${methodName}() has completed',
            })
          );
        return result;
      })
      .catch(function (error) {
        LX.has('error') &&
          LX.log(
            'error',
            tracer.add({ methodName, error }).toMessage({
              tags: [blockRef, methodName, 'failed'],
              text:
                ' - [${requestId}] ${methodName}() has failed. Error: ${error}',
            })
          );
        return Promise.reject(error);
      });
  },

  slugifyString: (inputString) => {
    let slug = null;
    if (!lodash.isEmpty(inputString) && lodash.isString(inputString)) {
      slug = slugify(inputString.toLowerCase());
    }
    return slug;
  },
};
