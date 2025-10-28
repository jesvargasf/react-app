import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useProducts } from '../../hooks/useProducts';
import { DEFAULT_PRODUCTS } from '../../data/products';

// Mock de localStorage
beforeEach(() => {
  localStorage.clear();
  vi.clearAllMocks();
});

/**
 * 
 * Verifica que los productos se filtren correctamente por categoría
 */
describe('useProducts - getProductsByCategory', () => {
  it('debería filtrar productos por categoría "verduras"', () => {
    localStorage.setItem('huertohogar_products', JSON.stringify(DEFAULT_PRODUCTS));

    const { result } = renderHook(() => useProducts());

    act(() => {
      const verduras = result.current.getProductsByCategory('verduras');
      expect(verduras.length).toBeGreaterThan(0);
      verduras.forEach(product => {
        expect(product.category).toBe('verduras');
      });
    });
  });
});

/**
 *Búsqueda de productos
 * Verifica que la búsqueda funcione correctamente por nombre
 */
describe('useProducts - searchProducts', () => {
  it('debería encontrar productos por nombre', () => {
    localStorage.setItem('huertohogar_products', JSON.stringify(DEFAULT_PRODUCTS));

    const { result } = renderHook(() => useProducts());

    act(() => {
      const resultados = result.current.searchProducts('tomate');
      expect(resultados.length).toBeGreaterThan(0);
      expect(resultados[0].name.toLowerCase()).toContain('tomate');
    });
  });
});
