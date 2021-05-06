const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  // user: {
  //   type: mongoose.Schema.Types.ObjectId, 
  //   ref: 'todo-user'
  // }
});

const Todo = mongoose.model('Todo', todoSchema, 'todos');

module.exports = Todo;