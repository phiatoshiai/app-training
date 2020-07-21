"use strict";

var path = require("path");

module.exports = {
  plugins: {
    appTraining: {
      errorCodes: {
        AppReferralGeneralError: {
          message: "General Error",
          returnCode: 20000,
          statusCode: 400,
        },
        ReferralCodeRequire: {
          message: "Owner and Type is required",
          returnCode: 20001,
          statusCode: 400,
        },
        ReferralTypeConfigNotExist: {
          message: "Referral Type doesn't exist in config",
          returnCode: 20002,
          statusCode: 400,
        },
        CannotCreatedReferralCodeInThisTime: {
          message: "Cannot create referral code. Please try again or check app-referral config type.",
          returnCode: 20003,
          statusCode: 400,
        },
        ReferralCodeNotExist: {
          message: "Referral code doesn't exist in database. Please check it then request again.",
          returnCode: 20004,
          statusCode: 400,
        },
        ReferredCodeIsNull: {
          message: "Referred is null.",
          returnCode: 20005,
          statusCode: 400,
        },
        ReferralExisted: {
          message: "Referral has been existed.",
          returnCode: 20006,
          statusCode: 400,
        },
        isDuplicateSyllabus: {
          message: "Training syllabus is duplication",
          returnCode: 30000,
          statusCode: 400,
        },
        isEmptySyllabusName: {
          message: "Training syllabus name is empty",
          returnCode: 30001,
          statusCode: 400,
        },
        isEmptySyllabusLevel: {
          message: "Training syllabus name is empty",
          returnCode: 30002,
          statusCode: 400,
        }

      }
    },
    appDatastore: {
      mappingStore: {
        "training-datastore": path.join(__dirname, "../lib/mappings/datastore")
      }
    }
  },
  bridges: {
    mongoose: {
      appDatastore: {
        manipulator: {
          connection_options: {
            host: "127.0.0.1",
            port: "27017",
            name: "training"
          }
        }
      }
    }
  }
};
