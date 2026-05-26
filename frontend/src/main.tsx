import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './main.css'

const rootContainer: Element | DocumentFragment | null = document.getElementById('root')

type ToDoItem = {
  id: number
  text: string
  isDone: boolean
}

const ToDo = () => {
  const [items, setItems] = useState<ToDoItem[]>([])

  const onAddToDo = (formData: FormData) => {
    const newItem = { id: Date.now(), text: formData.get('newItem') as string, isDone: false }

    setItems([...items, newItem])
  }

  const onDeleteToDo = (id: number) => {
    const updatedItems = items.filter(item => item.id !== id)
    setItems(updatedItems)
  }

  const onToggleItem = (id: number) => {
    const updatedItems = items.map(item => {
      return item.id === id ? { ...item, isDone: !item.isDone } : item
    })
    setItems(updatedItems)
  }

  return (
    <main className="homepage">
      <div className="header">
        <img
          alt="A clipboard, the logo of our application"
          height={44}
          src="../assets/clipboard.svg"
        />
        <h1>My To-Do List</h1>
      </div>
      <div className="working-area">
        <form
          className="new-todo"
          action={onAddToDo}
        >
          <input
            className="new-task-input"
            placeholder="what needs to be done?"
            name="newItem"
          />
          <button
            className="new-todo-btn"
            type={'submit'}
          >
            Add
          </button>
        </form>

        {items.length > 0 && (
          <div className="todo-list">
            {items.map(item => (
              <li
                key={item.id}
                className="todo-item"
              >
                <input
                  id={item.id.toString()}
                  type="checkbox"
                  onChange={() => onToggleItem(item.id)}
                />
                <label
                  className="todo-item-label"
                  htmlFor={item.id.toString()}
                  style={{ textDecoration: item.isDone ? 'line-through' : 'none' }}
                >
                  {item.text}
                </label>
                <button
                  type="button"
                  className="delete-todo-btn"
                  aria-label={`Delete ${item.text}`}
                  onClick={() => onDeleteToDo(item.id)}
                >
                  🗑️
                </button>
              </li>
            ))}
          </div>
        )}
      </div>
      <footer className="footer">Made with 🤍, by ritamcastro</footer>
    </main>
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
