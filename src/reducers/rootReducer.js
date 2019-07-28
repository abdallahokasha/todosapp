import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'; // we need this for react-router
import todosReducer from './todosReducer';

// Combine all our reducers togeher
const rootReducer = combineReducers({ todos: todosReducer, routing:routerReducer });

export default rootReducer;