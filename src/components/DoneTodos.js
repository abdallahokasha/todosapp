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
    return (
      <div>
      {this.state.allTodos.map((todo, i) => {
        return (
          <div key={i}>
            {todo.done && todo.show ? <ViewTodo todo={todo} todoIndex={i}
              markTodoBackAsOngoing={this.props.markTodoBackAsOngoing} /> : null}
          </div>
        );
      })}
    </div>
    );
  }
}

export default DoneTodos;
