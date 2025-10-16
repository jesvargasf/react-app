import { describe, it, expect, vi, beforeEach } from 'vitest'

// Creamos un mock del método createRoot de ReactDOM
vi.mock('react-dom/client', () => ({
  createRoot: vi.fn(() => ({
    render: vi.fn(),
  })),
}))

// Este test verifica que main.jsx se ejecute sin errores
describe('main.jsx', () => {
  beforeEach(() => {
    // Simulamos el div root que React espera
    const root = document.createElement('div')
    root.id = 'root'
    document.body.appendChild(root)
  })

  it('se renderiza sin lanzar errores', async () => {
    // Importamos el archivo directamente
    await import('../src/main.jsx')

    // Verificamos que createRoot haya sido llamado
    const { createRoot } = await import('react-dom/client')
    expect(createRoot).toHaveBeenCalledTimes(1)
  })
})