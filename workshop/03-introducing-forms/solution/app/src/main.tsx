import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'

const rootContainer: Element | DocumentFragment | null = document.getElementById('root')

type ToDoItem = {
  id: number
  text: string
  isDone: boolean
}

const ToDo = () => {
  // 🚚 This could be renamed to items, it will make it prettier ;)
  const [todos, setTodos] = useState<ToDoItem[]>([])

  const onAddToDo = (event: React.SubmitEvent<HTMLFormElement>) => {
    // ℹ️ Prevents the page from being refreshed
    event.preventDefault()

    const formData = new FormData(event.currentTarget as HTMLFormElement)
    const text = formData.get('newItem') as string

    setTodos([...todos, { id: Date.now(), text: text, isDone: false }])
    // ℹ️ Replaces the manual cleanup of setNewItem(')')
    event.currentTarget.reset()
  }

  const onToggleItem = (update: ToDoItem) => {
    const updatedItems = todos.map(item => {
      return item === update ? { ...item, isDone: !item.isDone } : item
    })
    setTodos(updatedItems)
  }

  return (
    <div>
      <form onSubmit={onAddToDo}>
        <input
          placeholder="what needs to be done?"
          // ℹ️ With the form approach, now we can collect the formData from the elements that are identified in the form
          name="newItem"
        />
        <button type={"submit"}> Add</button>
      </form >
      {
        todos.map(item => (
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
