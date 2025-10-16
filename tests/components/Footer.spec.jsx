import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Footer from '../../src/components/Footer'

describe('Footer component', () => {
  it('renderiza correctamente el texto del footer', () => {
    render(<Footer />)

    const texto = screen.getByText('Todos los derechos reservados')
    expect(texto).toBeInTheDocument()
  })
})
