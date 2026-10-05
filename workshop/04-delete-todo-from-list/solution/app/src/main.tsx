import { setDefaultResultOrder } from 'node:dns'
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

  const onAddToDo = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget as HTMLFormElement)
    const text = formData.get('newItem') as string

    setItems([...items, { id: Date.now(), text: text, isDone: false }])
    event.currentTarget.reset()
  }

  const onDeleteToDo = (id: number) => {
    const updatedItems = items.filter(item => item.id !== id)
    setItems(updatedItems)
  }

  const onToggleItem = (id: number) => {
    // ♻️ We can also make this use only the id, we don't have to pass the entire object here
    const updatedItems = items.map(item => {
      return item.id === id ? { ...item, isDone: !item.isDone } : item
    })
    setItems(updatedItems)
  }

  return (
    <div>
      <form onSubmit={onAddToDo}>
        <input
          placeholder="what needs to be done?"
          name="newItem"
        />
        <button type={"submit"}> Add</button>
      </form >
      {
        items.map(item => (
          <div role="listitem" key={item.id}>
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
        ))
      }
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
