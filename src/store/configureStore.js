import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers/rootReducer';
import initialState from '../reducers/initialState';


// const enhancers = compose(
//   window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
// );

// const store = createStore(rootReducer, initialState, enhancers);
const store = createStore(rootReducer, initialState, applyMiddleware());


export default store;