const { mongoose } = require('../db');

const List = mongoose.Schema({
    name: String,
    tasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task',
    }],
});

const ListModel = mongoose.model('List', List);

module.exports = ListModel;