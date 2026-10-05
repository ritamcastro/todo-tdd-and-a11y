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

  const onToggleItem = (update: ToDoItem) => {
    const updatedItems = items.map(item => {
      return item === update ? { ...item, isDone: !item.isDone } : item
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
          <div key={item.id}>
            <input
              id={item.id.toString()}
              type="checkbox"
              onChange={() => onToggleItem(item)}
            />
            <label
              htmlFor={item.id.toString()}
              style={{ textDecoration: item.isDone ? 'line-through' : 'none' }}
            >
              {item.text}
            </label>  </div>
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
