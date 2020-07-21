'use strict';
const mongoose = require('app-datastore').require('mongoose');
const Schema = mongoose.Schema;

module.exports = {
  name: 'TrainingQuizModel',
  descriptor: {
    name: { type: String },
    lesson: { type: Schema.Types.ObjectId, ref: 'TrainingLessonModel' },
    percentPass: { type: Number },
    reward: { type: Number },
    questionList: [
      {
        question: { type: String },
        videos: [String],
        images: [String],
        point: { type: Number },
        isMix: { type: Boolean, default: true },
        answerList: [
          {
            id: { type: String },
            answer: { type: String },
          },
        ],
        correctList: [String],
      },
    ],
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
    collection: 'training_quizzes',
  },
};
