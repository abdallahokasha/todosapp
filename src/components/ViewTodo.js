import React, { Component } from 'react';
import { CompactPicker } from "react-color";
import SimpleDialog from './SimpleDialog'
//var FontAwesome = require('react-fontawesome');

class ViewTodo extends Component {
    constructor(props) {
        super(props);
        this.deleteTodo = this.deleteTodo.bind(this);
        this.markTodoAsDone = this.markTodoAsDone.bind(this);
        this.applyTodoEdits = this.applyTodoEdits.bind(this);
        this.handleColorChange = this.handleColorChange.bind(this);
        this.markTodoAsOngoing = this.markTodoAsOngoing.bind(this);
        this.handleDueDateChange = this.handleDueDateChange.bind(this);
        this.handleTagTextChange = this.handleTagTextChange.bind(this);
        this.handleColorPickerModal = this.handleColorPickerModal.bind(this);
        this.handleDescriptionTextChange = this.handleDescriptionTextChange.bind(this);

        this.state = {
            todo: this.props.todo,
            todoIndex: this.props.todoIndex,
            editTodoDescriptionTextValue: this.props.todo.description,
            editTodoTagTextValue: this.props.todo.tag,
            openColorPickerModal: false,
            editTodoColor: this.props.todo.color,
            editTodoDueDate: this.props.todo.dueDate,
        };
    }

    componentDidUpdate(prevProps) {
        if (this.props !== prevProps) {
            this.setState({
                todo: this.props.todo,
                todoIndex: this.props.todoIndex,
                editTodoDescriptionTextValue: this.props.todo.description,
                editTodoTagTextValue: this.props.todo.tag,
                editTodoColor: this.props.todo.color,
                editTodoDueDate: this.props.todo.dueDate,
            });
        }
    }

    handleDescriptionTextChange(event) {
        const editTodoDescriptionTextValue = event.target.value;
        this.setState({ editTodoDescriptionTextValue }, () => { });
    }
    handleTagTextChange(event) {
        const editTodoTagTextValue = event.target.value;
        this.setState({ editTodoTagTextValue }, () => { });
    }

    applyTodoEdits() {
        var editedTodo = {
            description: this.state.editTodoDescriptionTextValue,
            tag: this.state.editTodoTagTextValue,
            color: this.state.editTodoColor,
            done: false,
            show: true,
            dueDate: this.state.editTodoDueDate,
        }
        this.setState({ todo: editedTodo });
        this.props.editTodo(editedTodo, this.state.todoIndex);
    }

    deleteTodo() {
        this.props.deleteTodo(this.state.todoIndex);
    }
    markTodoAsDone() {
        if (this.state.todo.done === false)
            this.props.markTodoAsDone(this.state.todoIndex);
    }
    markTodoAsOngoing() {
        if (this.state.todo.done === true)
            this.props.markTodoBackAsOngoing(this.state.todoIndex);
    }
    handleColorChange = (color) => {
        this.setState({ editTodoColor: color.hex });
    }
    handleColorPickerModal(openFlag) {
        this.setState({ openColorPickerModal: openFlag })
    }
    handleDueDateChange(event) {
        console.log(event.target.value);
        this.setState({ editTodoDueDate: event.target.value })
    }
    render() {
        const { todo, todoIndex } = this.props;
        console.log(this.props, this.state.todo);
        return (
            <div>
                <div key={todoIndex} id="viewTodoDiv" style={{ backgroundColor: `${todo.color}` }}>
                    {todo.done ?
                        <div>

                            <div><label className="grayColor1 leftPosition"> Description </label> {todo.description} </div>
                            <div>  <label className="grayColor1 leftPosition"> Tag </label>
                                {todo.tag} </div>
                            <div>  <label className="grayColor1 leftPosition"> Done on </label>
                                {todo.doneDate}
                            </div>
                            <button className="roundedButton todoButtons" onClick={this.markTodoAsOngoing} type="button"> Mark as on going </button>
                        </div>
                        :
                        <form>
                            <p className="grayColor1 leftPosition"> Description </p>
                            <textarea required
                                id="roundedBar"
                                className="scrollBar noBorder"
                                placeholder="Description*..."
                                rows="6" cols="60"
                                value={this.state.editTodoDescriptionTextValue}
                                onChange={this.handleDescriptionTextChange}
                            />
                            <p className="grayColor1 leftPosition"> Tag </p>
                            <input className="noBorder" placeholder="Tag" type="text" onChange={this.handleTagTextChange} value={this.state.editTodoTagTextValue} />
                            <p className="grayColor1 leftPosition"> Due Date </p>
                            <input className="datetime-input" type="datetime-local" name="dueDate" value={this.state.editTodoDueDate} onChange={this.handleDueDateChange} min={Date.now()} />

                            <button className="roundedButton todoButtons" onClick={() => { this.handleColorPickerModal(true) }} type="button"> Pick a color </button>
                            {this.state.openColorPickerModal ? <SimpleDialog openDialog={this.state.openColorPickerModal} handleDialogClose={this.handleColorPickerModal} dialogContent={<CompactPicker color={this.state.editTodoColor} onChangeComplete={this.handleColorChange} />} dialogTitle={"Choose a color"} /> : null}
                            <button className="roundedButton todoButtons" onClick={this.applyTodoEdits} type="button"> Edit </button>
                            <button className="roundedButton todoButtons" onClick={this.markTodoAsDone} type="button"> Mark as done </button>
                            <button id="deleteBtn" className="roundedButton todoButtons" onClick={this.deleteTodo} type="button"> delete </button>
                        </form>}
                </div>
            </div>
        );
    }
}

export default ViewTodo;
