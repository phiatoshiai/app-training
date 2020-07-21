'use strict';
const mongoose = require('app-datastore').require('mongoose');
const Schema = mongoose.Schema;

module.exports = {
  name: 'TrainingLessonModel',
  descriptor: {
    name: { type: String },
    module: { type: Schema.Types.ObjectId, ref: 'TrainingModuleModel' },
    title: { type: String },
    descripsion: { type: String },
    content: { type: String },
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
    collection: 'training_lessons',
  },
};
