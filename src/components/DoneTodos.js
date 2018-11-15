import React, { Component } from 'react';
import ViewTodo from './ViewTodo';

class DoneTodos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allTodos: this.props.allTodos,
    };
  }

  render() {
    console.log(this.props);
    return (
      <div>
      {this.state.allTodos.map((todo, i) => {
        return (
          <div key={i}>
            {todo.done ? <ViewTodo todo={todo} todoIndex={i}
              editTodo={this.props.editTodo} deleteTodo={this.props.deleteTodo}
              markTodoAsDone={this.props.markTodoAsDone}
              markTodoBackAsOngoing={this.props.markTodoBackAsOngoing} /> : null}
          </div>
        );
      })}
    </div>
    );
  }
}

export default DoneTodos;
