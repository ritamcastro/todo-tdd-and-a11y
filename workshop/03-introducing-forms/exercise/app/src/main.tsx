import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'

const rootContainer: Element | DocumentFragment | null = document.getElementById('root')

// ℹ️ A type for the To-Do items is defined so that we can uniquely identify each item.
//    For these cases, a first good approach is to use the current date, in milliseconds.
type ToDoItem = {
  id: number
  text: string
  isDone: boolean
}

const ToDo = () => {
  const [newItem, setNewItem] = useState<string>('')
  const [todos, setTodos] = useState<ToDoItem[]>([])

  const onAddToDo = () => {
    setTodos([...todos, { id: Date.now(), text: newItem, isDone: false }])
    setNewItem('')
  }

  const onToggleItem = (update: ToDoItem) => {
    const updatedItems = todos.map(item => {
      return item === update ? { ...item, isDone: !item.isDone } : item
    })
    setTodos(updatedItems)
  }

  return (
    <div>
      <input
        placeholder="what needs to be done?"
        value={newItem}
        onChange={e => setNewItem(e.target.value)}
      />
      <button onClick={onAddToDo}>Add</button>
      {todos.map(item => (
        // ℹ️ The key prop takes care of providing React with an unique identifier for each child
        <div key={item.id}>
          <input
            // ℹ️ The id prop links the checkbox with the label it refeers to
            id={item.id.toString()}
            type="checkbox"
            onChange={() => onToggleItem(item)}
          />
          <label
            // ℹ️ JSX syntax uses htmlFor instead of plain "for" from MDN spec
            htmlFor={item.id.toString()}
            style={{ textDecoration: item.isDone ? 'line-through' : 'none' }}
          >
            {item.text}
          </label>  </div>
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
