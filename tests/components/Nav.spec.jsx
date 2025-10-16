

import { render, screen } from '@testing-library/react'
import { vi, describe, it, expect } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import Nav from '../../src/components/Nav'

// Mock de la imagen importada
vi.mock('../../src/assets/react.svg', () => ({
  default: 'mocked-logo.svg'
}))

describe('Nav component', () => {
  it('renderiza correctamente los enlaces de navegación', () => {
    render(
      <MemoryRouter>
        <Nav />
      </MemoryRouter>
    )

    // Verifica que la imagen del logo esté presente
    const logo = screen.getByRole('img')
    expect(logo).toHaveAttribute('src', 'mocked-logo.svg')

    // Verifica los enlaces
    expect(screen.getByText('Home')).toHaveAttribute('href', '/home')
    expect(screen.getByText('Productos')).toHaveAttribute('href', '/productos')
    expect(screen.getByText('Quienes Somos')).toBeInTheDocument()
    expect(screen.getByText('Contacto')).toBeInTheDocument()
  })
})