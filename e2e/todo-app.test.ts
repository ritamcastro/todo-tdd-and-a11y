import { expect, type Page, test } from '@playwright/test'

test.describe('The To-Do application', () => {
  const createTodo = async (page: Page, text: string) => {
    await page.getByPlaceholder('what needs to be done?').fill(text)
    await page.getByRole('button', { name: 'Add' }).click()
  }

  test('I want to add a new To-Do', async ({ page }) => {
    await page.goto('/')

    const addButton = page.getByRole('button', { name: 'Add' })
    await expect(addButton).toBeVisible()

    const input = page.getByPlaceholder('what needs to be done?')
    await expect(input).toHaveValue('')

    await input.fill('Write our first test')
    await expect(input).toHaveValue('Write our first test')

    await page.getByRole('button', { name: 'Add' }).click()

    await expect(page.getByText('Write our first test')).toBeVisible()
    await expect(input).toHaveValue('')
  })

  test('I want to cross off a To-Do from the list', async ({ page }) => {
    await page.goto('/')

    await createTodo(page, 'with something')

    await expect(page.getByText('with something')).toHaveCSS('text-decoration', /none/)

    await page.getByRole('checkbox').click()

    await expect(page.getByText('with something')).toHaveCSS('text-decoration', /line-through/)
  })

  test('I want to cross off multiple To-Dos from the list', async ({ page }) => {
    await page.goto('/')

    await createTodo(page, 'first thing')
    await createTodo(page, 'second thing')

    const firstItem = page.getByLabel('first thing')
    const secondItem = page.getByLabel('second thing')

    await expect(firstItem).toBeVisible()
    await expect(secondItem).toBeVisible()

    await expect(firstItem).not.toBeChecked()
    await expect(secondItem).not.toBeChecked()

    await firstItem.click()

    await expect(firstItem).toBeChecked()
  })

  test('I want to delete to-dos from the list', async ({ page }) => {
    await page.goto('/')

    await createTodo(page, 'one to keep')
    await createTodo(page, 'one to delete')

    const todoItems = page.getByRole('listitem')
    await expect(todoItems).toHaveCount(2)

    const deleteButtons = page.getByRole('button', { name: '🗑️' })
    await deleteButtons.last().click()

    await expect(page.getByText('one to delete')).not.toBeVisible()
  })
})
