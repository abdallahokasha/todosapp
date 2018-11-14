import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';

var FontAwesome = require('react-fontawesome');

class Todos extends Component {
  constructor(props) {
    super();

    this.handleInputTagChange = this.handleInputTagChange.bind(this);
    this.handleTextFieldChange = this.handleTextFieldChange.bind(this);
    this.addTodo = this.addTodo.bind(this);

    this.state = {
      allTodos: [],
      addTodoTagValue: '',
      addTodoTextFieldValue: '',
    };
  }


  handleTextFieldChange(event) {
    const addTodoTextFieldValue = event.target.value;
    this.setState({ addTodoTextFieldValue });
    console.log(this.state.addTodoTextFieldValue);
  }


  handleInputTagChange(event) {
    const addTodoTagValue = event.target.value;
    this.setState({ addTodoTagValue });
    console.log(this.state.addTodoTagValue);
  }


  addTodo() {
    const addTodoTextFieldValue = this.state.addTodoTextFieldValue;
    if (addTodoTextFieldValue.length) {
      var newTodo = {
        description: this.state.addTodoTextFieldValue,
        tag: this.state.addTodoTagValue,
        done: false,
      }
      var allTodos = this.state.allTodos;
      allTodos.unshift(newTodo);
      this.setState({ allTodos }, () => { });
    }
    console.log(this.state.allTodos);
  }


  ListAllTodos() {
    console.log('list all');
    const allTodos = this.state.allTodos;
    const todosList = allTodos.map((todo, i) =>
      // Correct! Key should be specified inside the array.
      <div key={i}>
        Description: {todo.description}
        Tag: {todo.tag}
      </div>

    );
    return (
      { todosList }
    );
  }
  render() {
    return (
      <div>
        <h2> Todos List </h2>

        <div>
          {/* <form> */}
          <textarea required 
          id="roundedBar"
          className="scrollBar"
            placeholder="Description..."
            rows="7" cols="60"
            value={this.state.addTodoTextFieldValue}
            // onChange={this.handleTextFieldChange.bind(this)}
            onChange={this.handleTextFieldChange}
            margin="normal"
            helperText="hello"
            variant="outlined"
          />
          {/* <input placeholder="Tag" onChange={this.handleInputTagChange.bind(this)} value={addTodoTagValue} /> */}
          <input placeholder="Tag" type="text" onChange={this.handleInputTagChange} value={this.state.addTodoTagValue} />

          <button onClick={this.addTodo} type="submit"> Add </button>
          {/* </form> */}
        </div>
        <div>
          {this.state.allTodos.map((todo, i) => {
            return (
              <div key={i} id="TodoDiv">
                description: {todo.description}
                tag: {todo.tag}
                <FontAwesome
                  className='far fa-check-square'
                  name='check-square'
                  title="Done"
                // onClick={() => this.deleteTableRow(stockName)}
                />
              </div>
            );
          })}
          {/* <ListAllTodos /> */}
        </div>
      </div>
    );
  }
}

export default Todos;
