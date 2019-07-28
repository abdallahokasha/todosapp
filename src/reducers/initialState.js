export default {
  todos: {
    allTodos: JSON.parse(localStorage.getItem('allTodos')) || [],
    // allTodos: [],
  }
};