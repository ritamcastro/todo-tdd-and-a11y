import { expect, test } from '@playwright/test'

test.describe('The To-Do application', () => {
  test('I want to add a new To-Do', async ({ page }) => {
    await page.goto('/')

    await expect(page.getByRole('button', { name: 'Add' })).toBeVisible()

    await page.getByPlaceholder('what needs to be done?').fill('Write our first test')

    await page.getByRole('button', { name: 'Add' }).click()

    await expect(page.getByText('Write our first test')).toBeVisible()
  })
})
