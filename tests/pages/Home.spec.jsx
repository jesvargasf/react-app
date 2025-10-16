import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import Home from '../../src/pages/Home.jsx'

// 🧱 Mocks de los componentes hijos para aislar el test
vi.mock('../../src/components/Footer', () => ({
  default: () => <footer>Footer</footer>
}))

vi.mock('../../src/components/Main', () => ({
  default: ({ titulo, contador, aumentar }) => (
    <main>
      <h1>{titulo}</h1>
      <p>Contador: {contador}</p>
      <button onClick={aumentar}>Aumentar desde Main</button>
    </main>
  )
}))
vi.mock('../../src/components/Nav', () => ({
  default: () => <nav>Nav</nav>
}))

describe('🧩 Componente Home', () => {
  let consoleSpy

  beforeEach(() => {
    consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
  })

  afterEach(() => {
    consoleSpy.mockRestore()
  })

  it('renderiza los componentes básicos', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    )

    expect(screen.getByText('Nav')).toBeInTheDocument()
    expect(screen.getByText('Footer')).toBeInTheDocument()
    expect(screen.getByText('Este es el sitio home')).toBeInTheDocument()
  })

  it('muestra el contador inicial en 0', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    )

    expect(screen.getByText(/Aumentar 0/)).toBeInTheDocument()
  })

  it('incrementa el contador al hacer clic en el botón principal', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    )

    const button = screen.getByText(/Aumentar 0/)
    fireEvent.click(button)
    expect(screen.getByText(/Aumentar 1/)).toBeInTheDocument()
  })

  it('incrementa el contador desde el componente Main', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    )

    const buttonMain = screen.getByText('Aumentar desde Main')
    fireEvent.click(buttonMain)
    expect(screen.getByText(/Contador: 1/)).toBeInTheDocument()
  })

  it('ejecuta el useEffect (console.log) cada vez que cambia el contador', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    )

    const button = screen.getByText(/Aumentar 0/)
    fireEvent.click(button)
    fireEvent.click(button)

    // El efecto debería ejecutarse 2 veces
    expect(consoleSpy).toHaveBeenCalledTimes(3)
    expect(consoleSpy).toHaveBeenCalledWith('iniciado')
  })
})