import React, { Component } from 'react';
import TodoItem from './TodoItem';
import PropTypes from 'prop-types';

export class Todos extends Component {
  render() {
    // Map todos in TodoItem component
    return this.props.todos.map((todo) => (
      <TodoItem key={todo._id} todo={todo} toggleComplete={this.props.toggleComplete} delTodo={this.props.delTodo}/>
    ))
  }
}

// PropTypes
Todos.propTypes = {
  todos: PropTypes.array.isRequired,
  toggleComplete: PropTypes.func.isRequired,
  delTodo: PropTypes.func.isRequired
}

export default Todos
