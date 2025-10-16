import { render, screen } from '@testing-library/react'
import { vi, describe, it, expect } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import Producto from '../../src/pages/Producto'

// Mock de react-router-dom para simular parámetros y query
vi.mock('react-router-dom', () => ({
  useParams: () => ({ id: '45' }),
  useLocation: () => ({ search: '?nombre=papasfritas' }),
  MemoryRouter: ({ children }) => <div>{children}</div>
}))

// Mock de los componentes hijos
vi.mock('../../src/components/Nav', () => ({
  default: () => <nav>Nav</nav>
}))

vi.mock('../../src/components/Footer', () => ({
  default: () => <footer>Footer</footer>
}))

describe('Producto component', () => {
  it('renderiza correctamente el detalle del producto con parámetros simulados', () => {
    render(
      <MemoryRouter>
        <Producto />
      </MemoryRouter>
    )

    // Verifica contenido principal
    expect(screen.getByText('Nav')).toBeInTheDocument()
    expect(screen.getByText('Footer')).toBeInTheDocument()
    expect(screen.getByText('Este es el detalle del producto')).toBeInTheDocument()

    // Verifica los parámetros simulados
    expect(screen.getByText('Detalle del producto con id: 45')).toBeInTheDocument()
    expect(screen.getByText('Detalle del producto con nombre: papasfritas')).toBeInTheDocument()
  })
})