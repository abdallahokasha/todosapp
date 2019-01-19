import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import { CompactPicker } from "react-color";
import ViewTodo from './ViewTodo';
import SimpleDialog from './SimpleDialog'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  addTodo, editTodo, deleteTodo, markTodoAsDone,
  markTodoAsOnGoing
} from '../actions/todoActions';

class Todos extends Component {
  constructor(props) {
    super();

    this.addTodo = this.addTodo.bind(this);
    this.editTodo = this.editTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.handleTabsView = this.handleTabsView.bind(this);
    this.markTodoAsDone = this.markTodoAsDone.bind(this);
    this.handleDueDateChange = this.handleDueDateChange.bind(this);
    this.handleInputTagChange = this.handleInputTagChange.bind(this);
    this.handleTextFieldChange = this.handleTextFieldChange.bind(this);
    this.markTodoBackAsOngoing = this.markTodoBackAsOngoing.bind(this);
    this.handleColorPickerModal = this.handleColorPickerModal.bind(this);
    this.handleInputFilterTagChange = this.handleInputFilterTagChange.bind(this);

    this.state = {
      viewAllTodosTab: true,
      viewDoneTodosTab: false,
      addTodoTagValue: '',
      addTodoColor: "#fff",
      addTodoDueDate: new Date(),
      addTodoDescriptionValue: '',
      filterTodoTagTextValue: '',
      openColorPickerModal: false,
      allTodos: [],
    }
  }

  handleTextFieldChange(event) {
    const addTodoDescriptionValue = event.target.value;
    this.setState({ addTodoDescriptionValue }, () => { });
  }

  handleInputTagChange(event) {
    const addTodoTagValue = event.target.value;
    this.setState({ addTodoTagValue }, () => { });
  }

  handleInputFilterTagChange(event) {
    const filterTodoTagTextValue = event.target.value;
    this.setState({ filterTodoTagTextValue }, () => { this.filterTodosFun(filterTodoTagTextValue) });
  }

  filterTodosFun(filterTodoTagTextValue) {
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
      }
    }
  }

  addTodo() {
    const addTodoDescriptionValue = this.state.addTodoDescriptionValue;
    if (addTodoDescriptionValue.length) {
      var newTodo = {
        description: this.state.addTodoDescriptionValue,
        tag: this.state.addTodoTagValue,
        dueDate: this.state.addTodoDueDate,
        doneDate: "",
        show: true,
        done: false,
        color: this.state.addTodoColor,
      }
      this.props.dispatch({ type: 'ADD_TODO', newTodo: newTodo });
      localStorage.setItem('allTodos', JSON.stringify(this.context.store.getState().todos.allTodos))
      console.log(this.context.store.getState().todos.allTodos);
      this.setState({
        allTodos: this.context.store.getState().todos.allTodos,
        addTodoDescriptionValue: '', addTodoTagValue: '', addTodoDueDate: ''
      },
        () => { localStorage.setItem('allTodos', JSON.stringify(this.state.allTodos)) });
    }
    else {
      alert("Todo description is required");
    }
  }
  editTodo(editedTodo, todoIndex) {
    var allTodos = this.context.store.getState().todos.allTodos;
    if (typeof allTodos[todoIndex] !== 'undefined') {
      allTodos[todoIndex] = editedTodo;
      this.props.dispatch({ type: 'EDIT_TODO', todoIndex: todoIndex, editedTodo: editedTodo });
      console.log(this.context.store.getState().todos.allTodos);
      this.setState({ allTodos: this.context.store.getState().todos.allTodos },
        () => { localStorage.setItem('allTodos', JSON.stringify(this.state.allTodos)) });
    }
  }

  deleteTodo(todoIndex) {
    var allTodos = this.context.store.getState().todos.allTodos;
    console.log(this.context.store.getState().todos.allTodos);
    if (typeof allTodos[todoIndex] !== 'undefined') {
      this.props.dispatch({ type: 'DELETE_TODO', todoIndex: todoIndex });
      console.log(this.context.store.getState().todos.allTodos);
      this.setState({ allTodos: this.context.store.getState().todos.allTodos },
        () => { localStorage.setItem('allTodos', JSON.stringify(this.state.allTodos)) });
    }
  }

  markTodoAsDone(todoIndex) {
    var allTodos = this.context.store.getState().todos.allTodos;
    if (typeof allTodos[todoIndex] !== 'undefined') {
      allTodos[todoIndex].done = true;
      allTodos[todoIndex].doneDate = Date.now();
      this.context.store.dispatch({ type: 'MARK_TODO_AS_DONE', todoIndex: todoIndex });
      console.log(this.context.store.getState().todos.allTodos);
      this.setState({ allTodos: this.context.store.getState().todos.allTodos },
        () => { localStorage.setItem('allTodos', JSON.stringify(this.state.allTodos)) });
    }
  }

  markTodoBackAsOngoing(todoIndex) {
    var allTodos = this.context.store.getState().todos.allTodos;
    console.log(allTodos);
    if (typeof allTodos[todoIndex] !== 'undefined') {
      allTodos[todoIndex].done = false;
      allTodos[todoIndex].doneDate = '';
      this.context.store.dispatch({ type: 'MARK_TODO_AS_ONGOING', todoIndex: todoIndex });

      localStorage.setItem('allTodos', JSON.stringify(this.context.store.getState().todos.allTodos))
      console.log(this.context.store.getState().todos.allTodos);
      this.setState({ allTodos: this.context.store.getState().todos.allTodos },
        () => { localStorage.setItem('allTodos', JSON.stringify(this.state.allTodos)) });
    }
  }

  handleTabsView(tabName) {
    if (tabName === 'all')
      this.setState({ viewAllTodosTab: true, viewDoneTodosTab: false });
    else
      this.setState({ viewAllTodosTab: false, viewDoneTodosTab: true });
  }
  handleColorPickerModal(openFlag) {
    this.setState({ openColorPickerModal: openFlag })
  }
  handleColorChange = (color) => {
    this.setState({ addTodoColor: color.hex });
    console.log(color.hex);
  }
  handleDueDateChange(event) {
    console.log(event.target.value);
    this.setState({ addTodoDueDate: event.target.value })
  }
  render() {
    // console.log(this.props, this.context)
    const allTodos = this.context.store.getState().todos.allTodos;
    //console.log(allTodos);
    return (
      <div>
        <Link to="/"><p className="rightPosition" id="logoutTextLink"> Logout</p></Link>
        <Grid direction="column" spacing={8} container>
          <Grid item xs={12}>
            <Grid spacing={0} container direction="row" justify="flex-start" alignItems="flex-start">
              <Grid item xs={4}>
                <div className="navBtn-group">
                  {this.state.viewAllTodosTab ? <div>
                    <button id="navButtonFocus" className="navButton" onClick={(param) => this.handleTabsView('all')} >All Todos</button>
                    <button onClick={(param) => this.handleTabsView('done')} className="navButton"> Done Todos</button>
                  </div> :
                    <div>
                      <button className="navButton" onClick={(param) => this.handleTabsView('all')}>All Todos</button>
                      <button id="navButtonFocus" className="navButton" onClick={(param) => this.handleTabsView('done')}> Done Todos</button>
                    </div>}
                </div>
              </Grid>
              <Grid item xs={8}><div>
                <input id="filterByTagInputField" onChange={this.handleInputFilterTagChange} value={this.state.filterTodoTagTextValue} type="text" placeholder="Filter todos by tag.." />
              </div></Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>

            {this.state.viewAllTodosTab ?
              <div>
                <Grid container spacing={8} direction="row">
                  <Grid item xs={4}>
                    <Grid container spacing={8} direction="row">
                      <div id="addNewTodoDiv">
                        <Grid item xs={12}>
                          <textarea required
                            id="roundedBar"
                            className="scrollBar noBorder"
                            placeholder="Description*..."
                            rows="6" cols="60"
                            value={this.state.addTodoDescriptionValue}
                            onChange={this.handleTextFieldChange}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <input className="noBorder" placeholder="Tag" type="text" onChange={this.handleInputTagChange} value={this.state.addTodoTagValue} />
                        </Grid>
                        <Grid item xs={12}>
                          <label className="grayColor1 leftPosition"> Due Date </label>
                          <input className="datetime-input" type="datetime-local" name="dueDate" value={this.state.addTodoDueDate} onChange={this.handleDueDateChange} min={Date.now()} />
                        </Grid>
                        <button className="roundedButton todoButtons" onClick={() => { this.handleColorPickerModal(true) }} type="button"> Pick a color </button>
                        <button className="roundedButton todoButtons" onClick={this.addTodo} type="button"> Add </button>
                        {this.state.openColorPickerModal ? <SimpleDialog openDialog={this.state.openColorPickerModal} handleDialogClose={this.handleColorPickerModal} dialogContent={<CompactPicker color={this.state.addTodoColor} onChangeComplete={this.handleColorChange} />} dialogTitle={"Choose a color"} /> : null}
                      </div>
                    </Grid>
                  </Grid>
                  <Grid item xs={4}>
                    <p> On going Todos </p>
                    {allTodos.map((todo, i) => {
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
                    {allTodos.map((todo, i) => {
                      return (
                        <div key={i}>
                          {!todo.done || !todo.show ? null : <ViewTodo todo={todo} todoIndex={i}
                            markTodoBackAsOngoing={this.markTodoBackAsOngoing} />}
                        </div>
                      );
                    })}
                  </Grid>
                </Grid></div> : <div>
                <Grid container spacing={8} direction="row">
                  <Grid item xs={4}> </Grid>
                  <Grid item xs={4}>
                    <p> Done Todos </p>
                    {allTodos.map((todo, i) => {
                      return (
                        <div key={i}>
                          {!todo.done || !todo.show ? null : <ViewTodo todo={todo} todoIndex={i}
                            markTodoBackAsOngoing={this.markTodoBackAsOngoing} />}
                        </div>
                      );
                    })}
                  </Grid>
                </Grid>
              </div>}
          </Grid>
        </Grid>
      </div>
    );
  }
}


export default connect()(Todos);
Todos.contextTypes = { store: PropTypes.object };

