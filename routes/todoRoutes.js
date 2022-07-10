const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');

// Todo Routes
router.get('/', todoController.getAllTodos);
router.post('/', todoController.createTodo);
router.get('/:id', todoController.getTodo);
router.delete('/:id', todoController.deleteTodo);
router.put('/:id', todoController.updateTodo);

module.exports = router;
