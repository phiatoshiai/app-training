'use strict';

const TrainingSyllabusModel = require('./models/training-syllabus-model');
const TrainingModuleModel = require('./models/training-module-model');
const TrainingLessonModel = require('./models/training-lesson-model');
const TrainingQuizModel = require('./models/training-quiz-model');

module.exports = [TrainingSyllabusModel, TrainingModuleModel, TrainingLessonModel, TrainingQuizModel];