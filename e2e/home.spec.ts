import { test, expect } from '@playwright/test'

test('home page shows the headline and main navigation', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('h1')).toContainText('Built carefully, for real people')
  const nav = page.getByRole('navigation', { name: 'Main' })
  for (const name of ['Work', 'Skills', 'My journey', 'How I work', 'Contact me']) {
    await expect(nav.getByRole('link', { name })).toBeVisible()
  }
})

test('a case study card opens its page', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('link', { name: 'Read the story →' }).first().click()
  await expect(page).toHaveURL(/\/work\/arcgis$/)
  await expect(page.locator('h1')).toContainText('Seven maps on ArcGIS 4.x')
})

test('skip link is the first focusable element', async ({ page }) => {
  await page.goto('/')
  await page.keyboard.press('Tab')
  await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused()
})
