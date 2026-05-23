import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'

const rootContainer: Element | DocumentFragment | null = document.getElementById('root')

const ToDo = () => {
  const [newItem, setNewItem] = useState<string>('')
  const [todos, setTodos] = useState<string[]>([])

  const addToDo = () => {
    setTodos([...todos, newItem])
  }

  return (
    <div>
      <button onClick={addToDo}>Add</button>
      <input
        placeholder="what needs to be done?"
        value={newItem}
        onChange={e => setNewItem(e.target.value)}
      />
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
