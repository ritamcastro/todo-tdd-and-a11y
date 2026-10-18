# Execise 03 - Forms (in React)

When looking at [React's documentation about forms](https://react.dev/reference/react-dom/components/form) we are presented with `action` as the way to submit information from the `form`.

You might be presented with an error on the console:

```code
javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')
```

although the form seems to work as intented.

The key point to retain from this exercise is the conceptual shift from

```jsx
<button onClick={onAddToDo}>Add</button>
```

to

```jsx
<form onSubmit={onAddToDo}>
```

A To-Do item input is naturally a form submission. This gives you the expected browser behavior: pressing Enter submits the todo as well as clicking Add.

Another important concept introduced with this exercise is the []`FormData` api](<https://developer.mozilla.org/en-US/docs/Web/API/FormData>). It provides a way to construct a set of key/value pairs representing form fields and their values and thus decoupling form submission from React state holding the To-Do text.

The DOM owns the input value and it is only read when the form is submitted.

Note: If we needed to have our UI to react when the user is typing, then having the To-Do text being controlled by a React state is the way to go.

Forms refresh the page on submit because default HTML form behavior is designed to send data to a server via HTTP GET or POST methods, causing the browser to reload the page to display the server's response. In our case - and several others for sure - we don't need to refresh the page.
So we need to _prevent the default behaviour_ or sending invoking post.

As a conclusion, both approaches are valid:

## using `action`

```jsx
<form action={onAddToDo}>
  <input placeholder="what needs to be done?" name="newItem" />
  <button type={'submit'}> Add </button>
</form>
```

with onAddToDo being

```jsx
const onAddToDo = (formData: FormData) => {
   const newItem = { ... }
   setItems([...items, newItem])
}
```

## using `onSubmit`

```jsx
<form onSubmit={onAddToDo}>
  <input placeholder="what needs to be done?" name="newItem" />
  <button type={"submit"}> Add</button>
</form>
```

with a slight more complex `onAddToDo`:

```jsx
const onAddToDo = (event: React.SubmitEvent<HTMLFormElement>) => {
  event.preventDefault()

  const formData = new FormData(event.currentTarget as HTMLFormElement)
  const text = formData.get('newItem') as string

  setTodos([...todos, { id: Date.now(), text: text, isDone: false }])

  event.currentTarget.reset()
}
```
