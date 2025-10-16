

import { render, screen } from '@testing-library/react'
import { vi, describe, it, expect } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import Productos from '../../src/pages/Productos'

// Mock de los componentes hijos
vi.mock('../../src/components/Nav', () => ({
  default: () => <nav>Nav</nav>
}))
vi.mock('../../src/components/Footer', () => ({
  default: () => <footer>Footer</footer>
}))
vi.mock('../../src/components/Main', () => ({
  default: ({ titulo }) => <main><h1>{titulo}</h1></main>
}))

describe('Productos component', () => {
  it('renderiza correctamente el listado de productos', () => {
    render(
      <MemoryRouter>
        <Productos />
      </MemoryRouter>
    )

    // Verifica estructura base
    expect(screen.getByText('Nav')).toBeInTheDocument()
    expect(screen.getByText('Footer')).toBeInTheDocument()
    expect(screen.getByText('Este es el sitio de productos')).toBeInTheDocument()
    expect(screen.getByText('Listado de productos')).toBeInTheDocument()

    // Verifica los enlaces
    expect(screen.getByText('Coca cola')).toHaveAttribute('href', '/producto/1?nombre=cocacola')
    expect(screen.getByText('Pepsi')).toHaveAttribute('href', '/producto/2?nombre=pepsi')
    expect(screen.getByText('Fanta')).toHaveAttribute('href', '/producto/23?nombre=fanta')
  })
})