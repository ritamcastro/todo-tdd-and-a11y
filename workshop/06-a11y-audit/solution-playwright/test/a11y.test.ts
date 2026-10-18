import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

test.describe('To-Do application', () => {
    test('should not have any automatically detectable accessibility issues', async ({ page }, testInfo) => {
        await page.goto('/')

        //  ℹ️ This is the example provided by the playwright documentation
        //
        //     Error reporting is not clear and easy to read
        //
        // const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
        // expect(accessibilityScanResults.violations).toEqual([]);

        const accessibilityScanResults = await new AxeBuilder({ page })
            // ℹ️ Tags: allow you to scan ONLY for a certain level of standards:
            // https://www.deque.com/axe/core-documentation/api-documentation/?utm_campaign=api-documentation#api-notes
            // .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
            // .withTags(['best-practice'])
            .withTags(['best-practice', 'wcag2a', 'wcag2aa', 'wcag21aa'])
            .analyze()

        // ℹ️ This greatly improves the description of the errors
        await testInfo.attach('accessibility-scan-results', {
            body: JSON.stringify(accessibilityScanResults, null, 2),
            contentType: 'application/json'
        })

        expect(accessibilityScanResults.violations).toHaveLength(0)
    })
})
