//add new todo
export function addTodo(description, tag, dueDate, doneDate, show, done, color) {
    return {
        type: 'ADD_TODO',
        description,
        tag,
        dueDate,
        doneDate,
        show,
        done,
        color
    }
}

// edit todo
export function editTodo(todoIndex, description, tag, dueDate, doneDate, show, done, color) {
    return {
        type: 'EDIT_TODO',
        todoIndex,
        description,
        tag,
        dueDate,
        doneDate,
        show,
        done,
        color
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
        todoIndex
    }
}

// mark todo as on going 
export function markTodoAsOnGoing(todoIndex) {
    return {
        type: 'MARK_TODO_AS_ONGOING',
        todoIndex
    }
}




