import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import ColorPicker from './ColorPicker';
import { Route } from 'react-router-dom';

import ViewTodo from './ViewTodo';
import DoneTodos from './DoneTodos';

var FontAwesome = require('react-fontawesome');

class Todos extends Component {
  constructor(props) {
    super();

    this.addTodo = this.addTodo.bind(this);
    this.editTodo = this.editTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.markTodoAsDone = this.markTodoAsDone.bind(this);
    this.handleInputTagChange = this.handleInputTagChange.bind(this);
    this.handleTextFieldChange = this.handleTextFieldChange.bind(this);
    this.markTodoBackAsOngoing = this.markTodoBackAsOngoing.bind(this);
    this.handleInputFilterTagChange = this.handleInputFilterTagChange.bind(this);

    this.state = {
      addTodoTagValue: '',
      addTodoTextFieldValue: '',
      filterTodoTagTextValue: '',
      allTodos: JSON.parse(localStorage.getItem('allTodos')) || [],
      filteredTodos: JSON.parse(localStorage.getItem('allTodos')) || [],
    }
  }

  handleTextFieldChange(event) {
    const addTodoTextFieldValue = event.target.value;
    this.setState({ addTodoTextFieldValue }, () => { });
    console.log(this.state.addTodoTextFieldValue);
  }

  handleInputTagChange(event) {
    const addTodoTagValue = event.target.value;
    this.setState({ addTodoTagValue }, () => { });
    console.log(this.state.addTodoTagValue);
  }

  handleInputFilterTagChange(event) {
    const filterTodoTagTextValue = event.target.value;
    console.log(filterTodoTagTextValue);
    this.setState({ filterTodoTagTextValue }, () => { this.filterTodos(filterTodoTagTextValue) });
    //console.log(this.state.filterTodoTagTextValue);
    // this.filterTodos(filterTodoTagTextValue);
  }

  filterTodos(filterTodoTagTextValue) {
    console.log("FilterTodos Function: ", filterTodoTagTextValue)
    const allTodos = this.state.allTodos;
    if (filterTodoTagTextValue.length === 0)
      this.setState({ filteredTodos: allTodos });
    else {
      var filteredTodos = [];
      for (var i = 0; i < allTodos.length; ++i) {
        if (allTodos[i].tag.includes(filterTodoTagTextValue) === true)
          filteredTodos.push(allTodos[i]);
      }
      this.setState({ filteredTodos }, () => { });
    }
  }

  addTodo() {
    const addTodoTextFieldValue = this.state.addTodoTextFieldValue;
    if (addTodoTextFieldValue.length) {
      var newTodo = {
        description: this.state.addTodoTextFieldValue,
        tag: this.state.addTodoTagValue,
        done: false,
        color: "#fff",
      }
      var allTodos = this.state.allTodos;
      allTodos.unshift(newTodo);
      this.setState(() => {
        return {allTodos, filteredTodos: allTodos, addTodoTextFieldValue: '', addTodoTagValue: ''};
      });
      localStorage.setItem('allTodos', JSON.stringify(this.state.allTodos));
      // this.setState({ allTodos, filteredTodos: allTodos, addTodoTextFieldValue: '', addTodoTagValue: '' }, () => { localStorage.setItem('allTodos', JSON.stringify(this.state.allTodos)) });
      console.log(this.state.filteredTodos);
      // this.forceUpdate();
    }
    console.log(this.state.allTodos);
  }
  editTodo(editedTodo, todoIndex) {
    var allTodos = this.state.allTodos;
    if (typeof allTodos[todoIndex] !== 'undefined')
      allTodos[todoIndex] = editedTodo;
    this.setState({ allTodos }, () => { localStorage.setItem('allTodos', JSON.stringify(this.state.allTodos)) });
    console.log(this.state.allTodos);
  }

  deleteTodo(todoIndex) {
    var allTodos = this.state.allTodos;
    if (typeof allTodos[todoIndex] !== 'undefined')
      allTodos.splice(todoIndex, 1);
    this.setState({ allTodos }, () => { localStorage.setItem('allTodos', JSON.stringify(this.state.allTodos)) });
  }

  markTodoAsDone(todoIndex) {
    console.log("todos: markAsDone");
    var allTodos = this.state.allTodos;
    if (typeof allTodos[todoIndex] !== 'undefined')
      allTodos[todoIndex].done = true;
    this.setState({ allTodos }, () => { localStorage.setItem('allTodos', JSON.stringify(this.state.allTodos)) });
    console.log(this.state.allTodos);
  }

  markTodoBackAsOngoing(todoIndex) {
    var allTodos = this.state.allTodos;
    if (typeof allTodos[todoIndex] !== 'undefined')
      allTodos[todoIndex].done = false;
    this.setState({ allTodos }, () => { localStorage.setItem('allTodos', JSON.stringify(this.state.allTodos)) });
  }
  render() {
    return (
      <div>
        <div>
          <input id="filterByTagInputField" onChange={this.handleInputFilterTagChange} value={this.state.filterTodoTagTextValue} type="text" placeholder="Filter todos by tag.." />
        </div>
        <Grid container spacing={16}>
          <Grid item xs={4}>

            <div id="addNewTodoDiv">
              <form>
                <textarea required
                  id="roundedBar"
                  className="scrollBar noBorder"
                  placeholder="Description*..."
                  rows="7" cols="60"
                  value={this.state.addTodoTextFieldValue}
                  onChange={this.handleTextFieldChange}
                />
                <input className="noBorder" placeholder="Tag" type="text" onChange={this.handleInputTagChange} value={this.state.addTodoTagValue} />
                <button className="roundedButton todoButtons" onClick={this.addTodo} type="submit"> Add </button>
              </form>
            </div>
          </Grid>

          <Grid item xs={4}>
            <p> On going Todos </p>
            <div>
              {this.state.filteredTodos.map((todo, i) => {
                return (
                  <div key={i}>
                    {todo.done ? null : <ViewTodo todo={todo} todoIndex={i}
                      editTodo={this.editTodo} deleteTodo={this.deleteTodo}
                      markTodoAsDone={this.markTodoAsDone}
                      markTodoBackAsOngoing={this.markTodoBackAsOngoing} />}
                  </div>
                );
              })}
            </div>
          </Grid>
          
          <Grid item xs={4}>
            <p> Done Todos </p>
            <DoneTodos allTodos={this.state.filteredTodos}
              editTodo={this.editTodo} deleteTodo={this.deleteTodo}
              markTodoAsDone={this.markTodoAsDone}
              markTodoBackAsOngoing={this.markTodoBackAsOngoing}
            />
            {/* <Route
              path='/donetodos'
              component={() => <DoneTodos allTodos={this.state.allTodos}
                editTodo={this.editTodo} deleteTodo={this.deleteTodo}
                markTodoAsDone={this.markTodoAsDone}
                markTodoBackAsOngoing={this.markTodoBackAsOngoing}
              />}
            /> */}
            <Route path="/done" render={() => <DoneTodos
              allTodos={this.state.allTodos}
              editTodo={this.editTodo} deleteTodo={this.deleteTodo}
              markTodoAsDone={this.markTodoAsDone}
              markTodoBackAsOngoing={this.markTodoBackAsOngoing}
            />} />
          </Grid>
        </Grid>
        {/* <ColorPicker /> */}
      </div>
    );
  }
}

export default Todos;
