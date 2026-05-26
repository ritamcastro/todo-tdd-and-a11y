import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

test.describe('To-Do application', () => {
  test('should not have any automatically detectable accessibility issues', async ({ page }, testInfo) => {
    await page.goto('/')

    const accessibilityScanResults = await new AxeBuilder({ page })
      // Tags: allow you to scan ONLY for a certain level of standards:
      // https://www.deque.com/axe/core-documentation/api-documentation/?utm_campaign=api-documentation#api-notes
      .withTags(['best-practice', 'wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze()

    await testInfo.attach('accessibility-scan-results', {
      body: JSON.stringify(accessibilityScanResults, null, 2),
      contentType: 'application/json'
    })

    expect(accessibilityScanResults.violations).toHaveLength(0)
  })
})
