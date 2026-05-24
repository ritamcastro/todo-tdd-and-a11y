import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'

const rootContainer: Element | DocumentFragment | null = document.getElementById('root')

type ToDoItem = {
  text: string
  isDone: boolean
}

const ToDo = () => {
  const [items, setItems] = useState<ToDoItem[]>([])

  const onAddToDo = (formData: FormData) => {
    const newItem = { text: formData.get('newItem') as string, isDone: false }

    setItems([...items, newItem])
  }

  const onToggleItem = (update: ToDoItem) => {
    const updatedItems = items.map(item => {
      return item === update ? { ...item, isDone: !item.isDone } : item
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
        <div>
          <input
            type="checkbox"
            onChange={() => onToggleItem(item)}
          />
          <div style={{ textDecoration: item.isDone ? 'line-through' : 'none' }}>{item.text}</div>
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
