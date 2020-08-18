import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './AddTodo.css';

export class AddTodo extends Component {
  state = {
    title: ''
  }
  
  // Change title state to input text value
  handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  // Handle submit and pass input text value to AddTodo function
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.addTodo(this.state.title);
    this.setState({
      title : ''
    })
  }

  render() {
    return (
      <div className="addTodoContainer">
        <form className="addTodoForm" onSubmit={this.handleSubmit.bind(this)}> 
          
          <input 
            className="inputText" 
            type="text" 
            name="title" 
            placeholder="Add Todo..." 
            value={this.state.title} 
            onChange={this.handleInput.bind(this)}>
          </input>

          <button 
            className="submitBtn" 
            type="submit"
            >Submit
          </button>
          
        </form>
      </div>
    )
  }
}

// PropTypes
AddTodo.propTypes = {
  addTodo: PropTypes.func.isRequired
}

export default AddTodo
