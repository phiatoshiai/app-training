"use strict";

const Devebot = require("devebot");
const Promise = Devebot.require("bluebird");
const chores = Devebot.require("chores");
const {isEmpty, isNumber} = Devebot.require("lodash");
const serviceUtil = require("../utils/service-util");

function Training(params = {}) {
  const {
    packageName,
    loggingFactory,
    errorManager,
    sandboxConfig,
    dataManipulator,
    language = "en"
  } = params;
  let LX = loggingFactory.getLogger();
  let TR = loggingFactory.getTracer();
  var blockRef = chores.getBlockRef(__filename, packageName || "app-training");
  let { errorCodes, types = {}, enabled = true } = sandboxConfig;
  const errorBuilder = errorManager.register(packageName, {
    errorCodes: errorCodes
  });
  const ctx = {
    LX,
    TR,
    types,
    blockRef,
    enabled,
    language,
    errorBuilder,
    dataManipulator
  };

  this.createSyllabus = async function (args = {}, opts = {}) {
    return serviceUtil.wrap(ctx, "createSyllabus", args, opts, async function (args, opts) {
      const { name, level, holderId } = args;
      try {
        await validateSyllabusRequest(name, level, null, ctx);
        let referralCode = await getReferralCodeInStore(owner, type, {
          dataManipulator
        });
        if (lodash.isEmpty(referralCode)) {
          const typeConfigInfo = lodash.get(types, type);
          referralCode = await createReferralCode(owner, type, holderId, typeConfigInfo, ctx);
        }
        return { referralCode: referralCode };
      } catch (err) {
        return Promise.reject(err);
      }
    });
  };
}

ReferralCode.referenceHash = {
  dataManipulator: "app-datastore/dataManipulator",
  errorManager: "app-errorlist/manager"
};

module.exports = Training;

async function validateSyllabusRequest(name, level, id, ctx) {
  await validateRequireInput(name, level, id, ctx);
}

async function validateRequireInput(name, level, id, ctx) {
  const payload = {
    name: name,
    level: level
  };
  await isEmptyInput(name, level, payload, ctx);
  await isDuplicationSyllabusName(name, id, payload, ctx);
}

async function isEmptyInput(name, level, payload, { language, errorBuilder }) {
  if (isEmpty(name) || (!isEmpty(name) && isEmpty(name.trim()))) {
    throw errorBuilder.newError("isEmptySyllabusName", {
      payload: payload,
      language
    });
  }

  if (isNumber(level)) {
    throw errorBuilder.newError("isEmptySyllabusLevel", {
      payload: payload,
      language
    });
  }
}

async function isDuplicationSyllabusName(name, id, payload, ctx) {
  const { language, errorBuilder, dataManipulator } = ctx;
  const syllabusCounter = await dataManipulator.count({
    type: 'TrainingSyllabusModel',
    filter: {
      deleted: false,
      activated: true,
      slug: serviceUtil.slugifyString(name),
      _id: { $ne: id }
    }
  });
  if (syllabusCounter > 0) {
    throw errorBuilder.newError("isDuplicateSyllabus", {
      payload: payload,
      language
    });
  }
}