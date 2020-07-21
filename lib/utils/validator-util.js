"use strict";

module.exports = {
  validate: function (errorCode, payload, hasErrorCondition, { language, errorBuilder }) {
    if (hasErrorCondition) {
      throw errorBuilder.newError(errorCode, {
        payload,
        language
      });
    }
  }
};