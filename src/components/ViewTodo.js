import React, { Component } from 'react';
//var FontAwesome = require('react-fontawesome');

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

    componentDidUpdate(prevProps) {
        if (this.props !== prevProps) {
           this.setState({todo: this.props.todo,
             todoIndex: this.props.todoIndex,
            editTodoDescriptionTextValue: this.props.todo.description,
            editTodoTagTextValue: this.props.todo.tag});
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
            color: "#fff",
            done: false,
            show: true,
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

    render() {
        const { todo, todoIndex } = this.props;
        // console.log(this.props, this.state.todo);
        return (
            <div>
                <div key={todoIndex} id="viewTodoDiv">
                    {todo.done ?
                        <div>
                            
                            <div><label className="grayColor1 leftPosition"> Description </label> {todo.description} </div>
                            <div>  <label className="grayColor1 leftPosition"> Tag </label>
                            {todo.tag} </div>
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
