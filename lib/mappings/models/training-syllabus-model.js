'use strict';
const mongoose = require('app-datastore').require('mongoose');
const Schema = mongoose.Schema;

module.exports = {
  name: 'TrainingSyllabusModel',
  descriptor: {
    name: { type: String },
    level: { type: Number },
    branchs: [{ type: Schema.Types.ObjectId, ref: 'BranchModel' }],
    // Filtering
    slug: { type: String },
    tags: [String],
    activated: { type: Boolean, default: true },
    deleted: { type: Boolean, default: false },
    //Schema Version
    schemaVersion: { type: String },
    // Auditing
    createdBy: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedBy: { type: String },
    updatedAt: { type: Date },
  },
  options: {
    collection: 'training_syllabuses',
  },
};
