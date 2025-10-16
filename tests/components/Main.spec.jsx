import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import Main from '../../src/components/Main'

describe('Main component', () => {
  beforeEach(() => {
    localStorage.setItem('usuario', 'Jesús')
  })

  it('muestra el título y el contador correctamente', () => {
    render(<Main titulo="Página principal" contador={3} aumentar={() => {}} />)

    expect(screen.getByText('Página principal 3')).toBeInTheDocument()
  })

  it('muestra el usuario almacenado en localStorage', () => {
    render(<Main titulo="Inicio" contador={0} aumentar={() => {}} />)

    expect(screen.getByText('Bienvenido Jesús')).toBeInTheDocument()
  })

  it('ejecuta la función aumentar al hacer clic en el botón', () => {
    const aumentarMock = vi.fn()

    render(<Main titulo="Inicio" contador={5} aumentar={aumentarMock} />)

    const boton = screen.getByText('Aumentar 5')
    fireEvent.click(boton)

    expect(aumentarMock).toHaveBeenCalledTimes(1)
  })
})
