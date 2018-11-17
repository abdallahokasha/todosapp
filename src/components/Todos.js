import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';

import ViewTodo from './ViewTodo';
import DoneTodos from './DoneTodos';

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
      addTodoDescriptionValue: '',
      filterTodoTagTextValue: '',
      allTodos: JSON.parse(localStorage.getItem('allTodos')) || [],
    }
  }

  handleTextFieldChange(event) {
    const addTodoDescriptionValue = event.target.value;
    this.setState({ addTodoDescriptionValue }, () => { });
    console.log(this.state.addTodoDescriptionValue);
  }

  handleInputTagChange(event) {
    const addTodoTagValue = event.target.value;
    this.setState({ addTodoTagValue }, () => { });
    console.log(this.state.addTodoTagValue);
  }

  handleInputFilterTagChange(event) {
    const filterTodoTagTextValue = event.target.value;
    console.log(filterTodoTagTextValue);
    this.setState({ filterTodoTagTextValue }, () => { this.filterTodosFun(filterTodoTagTextValue) });
  }

  filterTodosFun(filterTodoTagTextValue) {
    console.log("FilterTodos Function: ", filterTodoTagTextValue)
    var allTodos = this.state.allTodos;
    if (filterTodoTagTextValue.length === 0) {
      for (var i = 0; i < allTodos.length; ++i)
        allTodos[i].show = true;
      this.setState({ allTodos });
    }
    else {
      for (var i = 0; i < allTodos.length; ++i) {
        var tagInLowerCase = allTodos[i].tag.toLowerCase();
        var filterTodoTagTextValueLowerCase = filterTodoTagTextValue.toLowerCase();

        if (tagInLowerCase.includes(filterTodoTagTextValueLowerCase) === true)
          allTodos[i].show = true;
        else allTodos[i].show = false;
        this.setState({ allTodos }, () => { });
        console.log(this.state.allTodos);
      }
    }
  }

  addTodo() {
    const addTodoDescriptionValue = this.state.addTodoDescriptionValue;
    if (addTodoDescriptionValue.length) {
      var newTodo = {
        description: this.state.addTodoDescriptionValue,
        tag: this.state.addTodoTagValue,
        done: false,
        color: "#fff",
        show: true,
      }
      console.log(this.state.addTodoDescriptionValue, this.state.addTodoTagValue)
      var allTodos = this.state.allTodos;
      allTodos.push(newTodo);
      this.setState({ allTodos, addTodoDescriptionValue: '', addTodoTagValue: '' }, 
      () => { localStorage.setItem('allTodos', JSON.stringify(this.state.allTodos)) });
    }
    else {
      alert("Todo description is required");
    }
    console.log(this.state.allTodos, this.state.addTodoDescriptionValue, this.state.addTodoTagValue);
  }
  editTodo(editedTodo, todoIndex) {
    var allTodos = this.state.allTodos;
    if (typeof allTodos[todoIndex] !== 'undefined')
      allTodos[todoIndex] = editedTodo;
    this.setState({ allTodos }, () => { localStorage.setItem('allTodos', JSON.stringify(this.state.allTodos)) });
    console.log(this.state.allTodos);
  }

  deleteTodo(todoIndex) {
    console.log(todoIndex);
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
  viewTodo() {

  }
  render() {
    console.log(this.state.allTodos)
    return (
      <div>
        <div>
          <input id="filterByTagInputField" onChange={this.handleInputFilterTagChange} value={this.state.filterTodoTagTextValue} type="text" placeholder="Filter todos by tag.." />
        </div>
        <Grid container spacing={16}>
          <Grid item xs={4}>
            <div id="addNewTodoDiv">
                <textarea required
                  id="roundedBar"
                  className="scrollBar noBorder"
                  placeholder="Description*..."
                  rows="7" cols="60"
                  value={this.state.addTodoDescriptionValue}
                  onChange={this.handleTextFieldChange}
                />
                <input className="noBorder" placeholder="Tag" type="text" onChange={this.handleInputTagChange} value={this.state.addTodoTagValue} />
                <button className="roundedButton todoButtons" onClick={this.addTodo} type="button"> Add </button>
            </div>
          </Grid>

          <Grid item xs={4}>
            <p> On going Todos </p>
            {this.state.allTodos.map((todo, i) => {
              return (
                <div key={i}>
                  {todo.done || !todo.show ? null : <ViewTodo todo={todo} todoIndex={i}
                    editTodo={this.editTodo} deleteTodo={this.deleteTodo}
                    markTodoAsDone={this.markTodoAsDone}
                    markTodoBackAsOngoing={this.markTodoBackAsOngoing} />}
                </div>
              );
            })}
          </Grid>
          <Grid item xs={4}>
            <p> Done Todos </p>
            <DoneTodos allTodos={this.state.allTodos}
              markTodoBackAsOngoing={this.markTodoBackAsOngoing}
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Todos;
