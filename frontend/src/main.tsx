import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'

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
    <div>
      <form action={onAddToDo}>
        <input
          placeholder="what needs to be done?"
          name="newItem"
        />
        <button type={'submit'}>Add</button>
      </form>

      {items.map(item => (
        <div role="listitem">
          <input
            id={item.id.toString()}
            type="checkbox"
            onChange={() => onToggleItem(item.id)}
          />
          <label
            htmlFor={item.id.toString()}
            style={{ textDecoration: item.isDone ? 'line-through' : 'none' }}
          >
            {item.text}
          </label>
          <button onClick={() => onDeleteToDo(item.id)}>🗑️</button>
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
