import React, { Component } from 'react';
import Header from './pages/Header';
import Todos from './components/Todos';
import AddTodo from './components/AddTodo';
import axios from 'axios';
import qs from 'qs';
import './App.css';

const LOCAL_STORAGE_KEY = 'App.todos';

export class App extends Component {
  state = {
    todos: []
  }

  // GET Todos from REST API and Restore todos from localStorage on component startup
  componentDidMount = () => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedTodos) {
      this.setState({
        todos: storedTodos
    })}

    axios.get('/api/todos')
      .then((res) => this.setState({ todos: res.data }))
      .catch((err) => console.log(err));
  }

  // Save todos to localStorage everytime component updates
  componentDidUpdate = () => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(this.state.todos), this.state.todos)
  }

  // Toggle Complete
  toggleComplete = (_id, title, completed) => {
    completed = !completed
        
    axios.post(`/api/todos/${_id}`, qs.stringify({
      title,
      completed
    }))
      .then(res => {
        this.setState({
          todos: this.state.todos.map((todo) => {
            if (todo._id === _id) {
              todo.completed = !todo.completed
            }
            return todo;
          })
        });
      })
      .catch(err => {
        console.log(err)
      });
  }

  // Delete Todo
  delTodo = (_id) => {
    axios.delete(`/api/todos/${_id}`)
      .then(res => this.setState({
        todos: [...this.state.todos.filter((todo) => todo._id !== _id)]
      }))
      .catch(err => console.log(err));
  }

  // Add Todo
  addTodo = (title) => {
    axios.post('/api/todos', qs.stringify({
      title,
      completed: false
    }))
      .then(res => this.setState({
        todos: [...this.state.todos, res.data]
      }))
      .catch(err => {
        console.log(err);
      })
  }

  render() {
    return (
      <div className="App">
        <Header />
        <AddTodo addTodo={this.addTodo}/>
        <Todos todos={this.state.todos} toggleComplete={this.toggleComplete} delTodo={this.delTodo}/>
      </div>
    )
  }
}

export default App
