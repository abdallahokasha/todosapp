//add new todo
export function addTodo(newTodo) {
    return {
        type: 'ADD_TODO',
        newTodo
    }
}

// edit todo
export function editTodo(todoIndex, editedTodo) {
    return {
        type: 'EDIT_TODO',
        todoIndex,
        editedTodo
    }
}

// delete todo
export function deleteTodo(todoIndex) {
    return {
        type: 'DELETE_TODO',
        todoIndex
    }
}

// mark todo as done
export function markTodoAsDone(todoIndex) {
    return {
        type: 'MARK_TODO_AS_DONE',
        todoIndex,
    }
}

// mark todo as on going 
export function markTodoAsOnGoing(todoIndex) {
    return {
        type: 'MARK_TODO_AS_ONGOING',
        todoIndex,
    }
}




