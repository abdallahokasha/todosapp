import React, { Component } from 'react';
import { withTheme } from '@material-ui/core';

var FontAwesome = require('react-fontawesome');

class ViewTodo extends Component {
    constructor(props) {
        super(props);

        this.handleTagTextChange = this.handleTagTextChange.bind(this);
        this.handleDescriptionTextChange = this.handleDescriptionTextChange.bind(this);
        this.markTodoAsDone = this.markTodoAsDone.bind(this);
        this.applyTodoEdits = this.applyTodoEdits.bind(this);
        this.deleteTodo = this.deleteTodo.bind(this);
        this.markTodoAsOngoing = this.markTodoAsOngoing.bind(this);

        this.state = {
            todo: this.props.todo,
            todoIndex: this.props.todoIndex,
            editTodoDescriptionTextValue: this.props.todo.description,
            editTodoTagTextValue: this.props.todo.tag,
        };
    }

    // componentDidUpdate(prevProps) {
    //     // Typical usage (don't forget to compare props):
    //     if (this.props.todo !== prevProps.todo) {
    //       this.fetchData(this.props.todo);
    //     }
    //   }
    handleDescriptionTextChange(event) {
        const editTodoDescriptionTextValue = event.target.value;
        this.setState({ editTodoDescriptionTextValue }, () => { });
        console.log(this.state.editTodoDescriptionTextValue);
    }
    handleTagTextChange(event) {
        const editTodoTagTextValue = event.target.value;
        this.setState({ editTodoTagTextValue }, () => { });
        console.log(this.state.editTodoTagTextValue);
    }

    applyTodoEdits() {
        console.log("applyTodoEdits");
        var editedTodo = {
            description: this.state.editTodoDescriptionTextValue,
            tag: this.state.editTodoTagTextValue,
            color: "#fff"
        }
        this.props.todo = editedTodo;
        console.log(this.props);
        this.props.editTodo(editedTodo, this.state.todoIndex);
    }
    deleteTodo() {
        this.props.deleteTodo(this.state.todoIndex);
    }
    markTodoAsDone() {
        console.log("viewTodo mark as done");
        if (this.state.todo.done === false)
            this.props.markTodoAsDone(this.state.todoIndex);
    }
    markTodoAsOngoing() {
        if (this.state.todo.done === true)
            this.props.markTodoBackAsOngoing(this.state.todoIndex);
    }

    render() {
        const { todo, todoIndex } = this.props;
        return (
            <div>
                <div key={todoIndex} id="viewTodoDiv">

                    {todo.done ? null : <form>
                        {/* <p className="grayColor1 leftPosition"> Description </p> */}
                        <textarea required
                            id="roundedBar"
                            className="scrollBar noBorder"
                            placeholder="Description*..."
                            rows="7" cols="60"
                            value={this.state.editTodoDescriptionTextValue}
                            onChange={this.handleDescriptionTextChange}
                        />
                        {/* <p className="grayColor1 leftPosition"> Tag </p> */}
                        <input className="noBorder" placeholder="Tag" type="text" onChange={this.handleTagTextChange} value={this.state.editTodoTagTextValue} />
                        {!todo.done ? <button className="roundedButton todoButtons" onClick={this.applyTodoEdits} type="submit"> Edit </button> : null}
                        {!todo.done ? <button className="roundedButton todoButtons" onClick={this.markTodoAsDone} type="button"> Mark as done </button> : null}
                    </form>}
                    {todo.done ?
                        <div>
                            <div> {todo.description} </div>
                            <div> {todo.tag} </div>
                           <button className="roundedButton todoButtons" onClick={this.markTodoAsOngoing} type="button"> Mark as on going </button> 
                        </div>: null
                    }
                    <FontAwesome
                        className='far fa-check-square'
                        name='check-square'
                        title="Done"
                    // onClick={() => }
                    />
                </div>
            </div>
        );
    }
}

export default ViewTodo;
