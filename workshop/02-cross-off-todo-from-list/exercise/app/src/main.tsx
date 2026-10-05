import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'

const rootContainer: Element | DocumentFragment | null = document.getElementById('root')

const ToDo = () => {
  const [newItem, setNewItem] = useState<string>('')
  const [todos, setTodos] = useState<string[]>([])

  const addToDo = () => {
    setTodos([...todos, newItem])
    // ℹ️ This cleans up the input when we add a new todo
    setNewItem('')
  }

  return (
    <div>
      <input
        placeholder="what needs to be done?"
        value={newItem}
        onChange={e => setNewItem(e.target.value)}
      />
      {/* ℹ️ This bring the button closer to the input; it is purely a visual change */}
      <button onClick={addToDo}>Add</button>
      {todos.map(item => (
        <div>{item}</div>
      ))}
    </div>
  )
}

if (rootContainer) {
  const root = createRoot(rootContainer)
  root.render(
    <StrictMode>
      <ToDo />
    </StrictMode>
  )
}
