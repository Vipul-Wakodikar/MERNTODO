const mongoose = require('mongoose')
const ToDoSchema = new mongoose.Schema({name: String})
module.exports = mongoose.model('Todo', ToDoSchema)
