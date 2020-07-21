"use strict";

var Devebot = require("devebot");
var lodash = Devebot.require("lodash");

module.exports = [{
  path: "/createTrainingSyllabus",
  method: "POST",
  serviceName: "app-training/trainingSyllabusService",
  methodName: "createSyllabus",
  input: {
    transform: function (req) {
      return {
        name: req.body.name,
        level: req.body.level,
        createdBy: req.body.createdBy
      };
    }
  },
  output: {
    transform: transformOutput
  },
  error: {
    transform: transformError
  }
}];

function transformOutput(result = {}, req) {
  const payload = {
    headers: {
      "X-Return-Code": result.code || 0
    },
    body: result
  };
  return payload;
}

function transformError(err, req) {
  const output = {
    statusCode: err.statusCode || 500,
    headers: {},
    body: {
      name: err.name,
      message: err.message
    }
  };
  if (err.packageRef) {
    output.headers["X-Package-Ref"] = err.packageRef;
  }
  if (err.returnCode) {
    output.headers["X-Return-Code"] = err.returnCode;
  }
  if (lodash.isObject(err.payload)) {
    output.body.payload = err.payload;
  }
  return output;
}