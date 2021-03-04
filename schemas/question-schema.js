const mongoose = require('mongoose')

const Task = new mongoose.Schema({
    text: {type: String, required: true}
})

const Page = new mongoose.Schema({
    list_name : {type: String, unique: true},
    task: [Task]
});


module.exports = mongoose.model('Task', Task)
module.exports = mongoose.model('Page', Page)
