import { useEffect, useState } from 'react'
import './App.css'
import { useDispatch, useSelector } from 'react-redux'
import { addCompleted, addTodo, deleteTodo, setFilter } from './features/todo/todoSlice'
import { motion, AnimatePresence, spring } from 'framer-motion';

function App() {
  const [text, setText] = useState('');
  const todos = useSelector(state => state.todo.todos);
  const filterValue = useSelector(state => state.todo.filter);
  const dispatch = useDispatch();

  const todosFiltered = todos.filter(todo => {
    if (filterValue === 'all') return true
    if (filterValue === 'pending') return todo.completed === false
    if (filterValue === 'completed') return todo.completed === true
  })

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos))

  }, [todos])

  return (
    <div className='container'>

      <div className='btns-container'>
        <button  onClick={() => dispatch(setFilter('all'))}>Todas</button>
        <button onClick={() => dispatch(setFilter('pending'))}>Pendientes</button>
        <button onClick={() => dispatch(setFilter('completed'))}>Completadas</button>
      </div>

      <input
        type='text'
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder='Escribe aquí...'
      />
      <motion.button 
        className='add'
        whileHover={{scale: 1.05}}
        whileTap={{scale: 0.95}}
        transition={{type: 'spring', stiffness: 800}}
        onClick={() => {
        if (text.trim() !== '') {
          dispatch(addTodo({ text }))
          setText('')
        }
      }}>Añadir</motion.button>

      {
        filterValue === 'pending' ? (
          <h2>Lista de tareas pendientes</h2>
        ) : filterValue === 'completed' ? (
          <h2>Lista de tareas completadas</h2>
        ) : <h2>Todas las tareas</h2>
      }

      <div className='todos-container'>
        {
          todos.length === 0 ? (
            <p className='empty'>Aún no hay tareas</p>
          ) : (
            <>
            <AnimatePresence>
              {
                todosFiltered.map((item, index) => (
                  <motion.div style={{ backgroundColor: item.completed ? 'gray' : '' }} 
                    key={index}
                    initial={{opacity: 0, y: -20}}
                    animate={{opacity: 1, y: 0}}
                    exit={{opacity: 0, y: 20}}
                    transition={{transition: 0.3}}
                    className='todo'
                  >
                    <div className='top-todo' style={{ backgroundColor: item.completed ? 'lightgray' : '' }}>
                      <button onClick={() => dispatch(addCompleted(item.id))}>✅</button>
                      <button onClick={() => dispatch(deleteTodo(item.id))}>❌</button>
                    </div>
                    <div style={{ textDecoration: item.completed ? 'line-through' : '' }} className='text'>{item.text}</div>
                  </motion.div>
                ))
              }
            </AnimatePresence>
            </>
          )
        }
      </div>
    </div>
  )
}

export default App
