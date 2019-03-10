const { mongoose } = require('../db');

const Task = mongoose.Schema({
    name: String,
    done: Boolean,
});

const TaskModel = mongoose.model('Task', Task);

module.exports = TaskModel;