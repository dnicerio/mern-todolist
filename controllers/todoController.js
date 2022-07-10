const Todo = require('../models/todo');

// getAllTodos, createTodo, getTodo, deleteTodo, updateTodo

const getAllTodos = (req, res) => {
  Todo.find().sort({ createdAt: 1 })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
}

const createTodo = (req, res) => {
  const todo = new Todo(req.body);

  todo.save()
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
}

const getTodo = (req, res) => {
  const id = req.params.id;

  Todo.findById(id)
    .then((result) => {
      if(result === null) {
        return res.status(404).json({ message: 'Cannot find todo' });
      } else {
        res.json(result);
      }
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
}

const deleteTodo = (req, res) => {
  const id = req.params.id;

  Todo.findByIdAndDelete(id)
    .then((result) => {
      if(result === null) {
        return res.status(404).json({ message: 'Cannot find todo' });
      } else {
      res.status(200).json({ message: 'Deleted Todo' });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
}

const updateTodo = (req, res) => {
  const id = req.params.id;
  const updatedTodo = req.body;
  
  if(updatedTodo != null) {
    Todo.findByIdAndUpdate(id, updatedTodo)
      .then(() => {
        res.status(200).json({ message: 'Todo Updated' });
      })
      .catch((err) => {
        res.status(500).json({ message: err.message });
      });
  }
  
}

module.exports = {
  getAllTodos,
  createTodo,
  getTodo,
  deleteTodo,
  updateTodo
}
