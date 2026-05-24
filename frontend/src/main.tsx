import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'

const rootContainer: Element | DocumentFragment | null = document.getElementById('root')

const ToDo = () => {
  const [newItem, setNewItem] = useState<string>('')
  const [todos, setTodos] = useState<string[]>([])
  const [isDone, setIsDone] = useState<boolean>(false)

  const addToDo = () => {
    setTodos([...todos, newItem])
    setNewItem('')
  }

  return (
    <div>
      <input
        placeholder="what needs to be done?"
        value={newItem}
        onChange={e => setNewItem(e.target.value)}
      />
      <button onClick={addToDo}>Add</button>
      {todos.map(item => (
        <div>
          <input
            type="checkbox"
            onChange={() => setIsDone(!isDone)}
          />
          <div style={{ textDecoration: isDone ? 'line-through' : 'none' }}>{item}</div>
        </div>
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
