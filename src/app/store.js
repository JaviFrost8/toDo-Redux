import { configureStore } from '@reduxjs/toolkit'
import todosReducer from '../features/todo/todoSlice'

export const store = configureStore({
  reducer: {
    todo: todosReducer
  }
})