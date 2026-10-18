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
    // ♿️ a11y audit: WCAG 1.3.1 Info and Relationships (Level A) 
    //
    //     The page has no headings. h1...h6 provide document structure,
    //     outline and navigation functionalities.
    //     What needs to be done: div -> main (proper semantic role)
    <main className="homepage">

      {/* // ♿️ a11y audit: */}
      <div className="header">
        <img
          alt="A clipboard, the logo of our application"
          height={44}
          src="../assets/clipboard.svg"
        />

        {/* ♿️ a11y audit: WCAG 1.3.1 Info and Relationships (Level A) 
        
               The page has no headings. h1...h6 provide document structure, 
               outline and navigation functionalities.
               
               What needs to be done: div -> h1 
        */}
        <h1>My To-Do List</h1>
      </div>

      <div className="working-area">


        {/* ♿️ a11y audit: Missing form control |
              WCAG 1.1.1 Non-text Content (Level A)
              WCAG 1.3.1 Info and Relationships (Level A)
              WCAG 2.4.6 Headings and Labels (Level AA)
              WCAG 3.3.2 Labels or Instructions (Level A)

              What needs to be done: ⌥ 1: Add a <label/>
         <form className="new-todo" action={onAddToDo}>

          <label className='new-todo-label'>
            Add a new To-Do
            <input
              className="new-task-input"
              placeholder="what needs to be done?"
              name="newItem"
            />
          </label>
          <button className="new-todo-btn"
            type={"submit"}> Add</button>
        </form> */}

        {/* What needs to be done: ⌥ 2: Hide the <label />
        <form className="new-todo" action={onAddToDo}>

          <label className='sr-only' htmlFor='newItem'>
            Add a new To-Do
          </label>

          <input
            id="newItem"
            className="new-task-input"
            placeholder="what needs to be done?"
            name="newItem"
          />

          <button className="new-todo-btn"
            type={"submit"}> Add</button>
        </form> */}

        {/* What needs to be done: ⌥ 3: Use <aria-label /> */}
        <form className="new-todo" action={onAddToDo}>
          <input
            className="new-task-input"
            id="newItem"
            aria-label='Add a new item'
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
                  // ♿️ a11y audit: The button’s purpose isn’t described in text — only an emoji. 
                  // Many assistive technologies won’t announce “Delete” clearly, so users may not 
                  // understand what the control does. | WCAG 3.3.2 Labels or Instructions
                  aria-label={`Delete ${item.text}`}
                  onClick={() => onDeleteToDo(item.id)}>🗑️</button>
              </li>
            ))}
          </div>
        )}
      </div>
      <div className="footer">Made with 🤍, at the workshop</div>
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
