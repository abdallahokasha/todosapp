import initialState from './initialState';
import {
    ADD_TODO, EDIT_TODO, DELETE_TODO,
    MARK_AS_DONE, MARK_AS_ONGOING
} from '../actions/actionTypes';

export default function todo(state = initialState.allTodos, action) {
    let newState;
    switch (action.type) {
        case ADD_TODO:
            console.log('ADD_TODO Action')
            return action;
        case EDIT_TODO:
            newState = action.todo;
            console.log('EDIT_TODO Action')
            return newState;
        case DELETE_TODO:
            newState = action.todo;
            console.log('DELETE_TODO Action')
            return newState;
        case MARK_AS_DONE:
            newState = action.todo;
            console.log('MARK_AS_DONE Action')
            return newState;
        case MARK_AS_ONGOING:
            newState = action.todo;
            console.log('MARK_AS_ONGOING Action')
            return newState;
        default:
            return state;
    }
}