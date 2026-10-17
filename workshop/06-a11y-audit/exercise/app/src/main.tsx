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
    const updatedItems = items.map(item => {
      return item.id === id ? { ...item, isDone: !item.isDone } : item
    })
    setItems(updatedItems)
  }

  return (
    <div className="homepage">

      <div className="header">
        <img
          alt="A clipboard, the logo of our application"
          height={44}
          src="../assets/clipboard.svg"
        />
        <div>My To-Do List</div>
      </div>

      <div className="working-area">

        <form className="new-todo"
          onSubmit={onAddToDo}>
          <input
            className="new-task-input"

            placeholder="what needs to be done?"
            name="newItem"
          />
          <button className="new-todo-btn"
            type={"submit"}> Add</button>
        </form>

        {items.length > 0 && (
          <div className="todo-list">
            {items.map(item => (
              // ℹ️ https://biomejs.dev/linter/rules/use-semantic-elements/html/
              //    Enforces using semantic DOM elements over the ARIA role property.
              //    It is known that it is a list, there is an element for that.
              <li key={item.id} className="todo-item">
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
                  // ℹ️ https://biomejs.dev/linter/rules/use-button-type/html/ 
                  //    A button without a type defaults to submit, which can submit 
                  //    a surrounding form unexpectedly. Use button, submit, or reset to 
                  //     state the intended behavior.
                  type="button"
                  className="delete-todo-btn"
                  onClick={() => onDeleteToDo(item.id)}>🗑️</button>
              </li>
            ))}
          </div>
        )}
      </div>
      <div className="footer">Made with 🤍, at the workshop</div>
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
