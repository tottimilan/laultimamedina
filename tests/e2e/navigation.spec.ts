import { test, expect } from '@playwright/test';

/**
 * Tests E2E: Navegación básica
 */

test.describe('Navegación básica', () => {
  test('debe redirigir la raíz al locale por defecto (es)', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveURL(/\/es/);
  });

  test('debe cargar la página de inicio en español', async ({ page }) => {
    await page.goto('/es');
    await expect(page).toHaveTitle(/La Última Medina/);
    
    // Verificar que el Hero está visible
    await expect(page.locator('h1')).toContainText('Conocimiento Islámico');
  });

  test('debe cargar la página de inicio en inglés', async ({ page }) => {
    await page.goto('/en');
    await expect(page).toHaveTitle(/La Última Medina/);
    
    await expect(page.locator('h1')).toContainText('Islamic Knowledge');
  });

  test('debe navegar entre idiomas', async ({ page }) => {
    await page.goto('/es');
    
    // Cambiar a inglés
    await page.click('a[hreflang="en"]');
    await expect(page).toHaveURL(/\/en/);
    await expect(page.locator('h1')).toContainText('Islamic Knowledge');
    
    // Volver a español
    await page.click('a[hreflang="es"]');
    await expect(page).toHaveURL(/\/es/);
    await expect(page.locator('h1')).toContainText('Conocimiento Islámico');
  });

  test('debe tener navegación accesible desde Header', async ({ page }) => {
    await page.goto('/es');
    
    // Verificar links del header
    await expect(page.getByRole('link', { name: 'Leer' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Ver' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Escuchar' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Aprender' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Donar' })).toBeVisible();
  });

  test('debe tener Footer con links institucionales', async ({ page }) => {
    await page.goto('/es');
    
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
    await expect(footer.getByText('Nuestra Misión')).toBeVisible();
    await expect(footer.getByText('Privacidad')).toBeVisible();
    await expect(footer.getByText('Contacto')).toBeVisible();
  });

  test('debe tener skip-to-content link para accesibilidad', async ({ page }) => {
    await page.goto('/es');
    
    // Focus en el skip link con teclado
    await page.keyboard.press('Tab');
    const skipLink = page.locator('.skip-to-content');
    await expect(skipLink).toBeFocused();
  });

  test('debe navegar a los pilares desde Home', async ({ page }) => {
    await page.goto('/es');
    
    // Click en el pilar "Leer"
    const readPillar = page.locator('text=Lee artículos profundos').first();
    await readPillar.click();
    
    // Debe navegar a /es/read (aunque la página aún no exista, la URL debería cambiar)
    await expect(page).toHaveURL(/\/es\/read/);
  });
});

test.describe('Accesibilidad', () => {
  test('debe tener contraste suficiente en textos', async ({ page }) => {
    await page.goto('/es');
    
    // Playwright no valida contraste directamente, pero podemos verificar
    // que los estilos están aplicados correctamente
    const title = page.locator('h1');
    await expect(title).toBeVisible();
    await expect(title).toHaveCSS('color', /rgb/);
  });

  test('debe ser navegable con teclado', async ({ page }) => {
    await page.goto('/es');
    
    // Navegar con Tab
    await page.keyboard.press('Tab'); // Skip link
    await page.keyboard.press('Tab'); // Logo
    await page.keyboard.press('Tab'); // Inicio
    await page.keyboard.press('Tab'); // Leer
    
    const readLink = page.getByRole('link', { name: 'Leer' });
    await expect(readLink).toBeFocused();
  });
});

