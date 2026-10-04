import { expect, test } from '@playwright/test'

test.describe('The To-Do application', () => {
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
})
