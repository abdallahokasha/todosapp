import initialState from './initialState';
import {
    ADD_TODO, EDIT_TODO, DELETE_TODO,
    MARK_TODO_AS_DONE, MARK_TODO_AS_ONGOING
} from '../actions/actionTypes';

export default function todos(state = initialState.todos.allTodos, action) {
    console.log(state, action);

    let newState, i;
    switch (action.type) {
        case ADD_TODO:
            console.log('ADD_TODO Action')
            return {
                allTodos: [
                    ...state.allTodos,
                    action.newTodo
                ]
            }
        case EDIT_TODO:
            i = action.todoIndex;
            console.log(action.editedTodo)
            console.log('EDIT_TODO Action')
            return {
                allTodos: [
                    ...state.allTodos.slice(0, i),
                    action.editedTodo,
                    ...state.allTodos.slice(i + 1)]
            };

        case DELETE_TODO:
            console.log('DELETE_TODO Action')
            i = action.todoIndex;
            return { allTodos: state.allTodos.filter((todo, index) => index !== i) };

        case MARK_TODO_AS_DONE:
            console.log("mark as done action")
            i = action.todoIndex;
            console.log(state.allTodos);
            return {
                allTodos: [
                    ...state.allTodos.slice(0, i),
                    { ...state.allTodos[i], done: true, doneDate: new Date(Date.now()) },
                    ...state.allTodos.slice(i + 1)]
            };

        case MARK_TODO_AS_ONGOING:
            i = action.todoIndex;
            console.log('MARK_AS_ONGOING Action', i)
            return {
                allTodos: [
                    ...state.allTodos.slice(0, i),
                    { ...state.allTodos[i], done: false, doneDate: '' },
                    ...state.allTodos.slice(i + 1)
                ]
            };

        default:
            return state;
    }
}