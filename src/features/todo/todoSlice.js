import { createSlice } from '@reduxjs/toolkit';

const savedTodos = localStorage.getItem('todos')
const todosFromStorage = savedTodos ? JSON.parse(savedTodos) : []

const initialState = {
  todos: todosFromStorage,
  filter: 'all'
}

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const { text } = action.payload;
      state.todos.push({id: Date.now(), text, completed: false});
    },
    addCompleted: (state, action) => {
      const todo = state.todos.find((t) => t.id === action.payload)
      if(todo){
        todo.completed = !todo.completed
      }
    },
    deleteTodo: (state, action) => {
      const confirm = window.confirm('¿Seguro que desea eliminar la nota?')
      if(confirm){
        state.todos = state.todos.filter((t) => t.id !== action.payload)
      }
    },
    setFilter: (state, action) => {
      state.filter = action.payload
    }
  }
})

export const { addTodo, addCompleted, deleteTodo, setFilter } = todoSlice.actions;
export default todoSlice.reducer;