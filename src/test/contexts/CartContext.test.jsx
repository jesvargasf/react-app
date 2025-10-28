import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { CartProvider, useCart } from '../../context/CartContext';
import { DEFAULT_PRODUCTS } from '../../data/products';

// Mock del hook useProducts
vi.mock('../../hooks/useProducts', () => ({
  useProducts: () => ({
    products: DEFAULT_PRODUCTS,
    getProductById: (id) => DEFAULT_PRODUCTS.find(p => p.id === parseInt(id)),
    decreaseStock: vi.fn(),
    getStockStatus: vi.fn(),
    getStockText: vi.fn(),
  }),
}));

beforeEach(() => {
  localStorage.clear();
  vi.clearAllMocks();
});

// Wrapper para los tests del contexto
const wrapper = ({ children }) => <CartProvider>{children}</CartProvider>;

/**
 *  Agregar item al carrito
 * Verifica que se puedan agregar productos al carrito correctamente
 */
describe('CartContext - addItem', () => {
  it('debería agregar un producto al carrito por primera vez', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      const response = result.current.addItem(1, 2);
      expect(response.success).toBe(true);
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0]).toMatchObject({
      productId: 1,
      quantity: 2,
    });
  });

  it('debería incrementar la cantidad si el producto ya existe en el carrito', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addItem(1, 2);
    });

    act(() => {
      result.current.addItem(1, 1);
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].quantity).toBe(3);
  });

  it('debería persistir el carrito en localStorage', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addItem(1, 2);
    });

    const savedCart = JSON.parse(localStorage.getItem('huertohogar_cart'));
    expect(savedCart).toHaveLength(1);
    expect(savedCart[0].productId).toBe(1);
    expect(savedCart[0].quantity).toBe(2);
  });
});

/**
 * CartContext - Validación de stock
 * Verifica que se valide correctamente el stock disponible al agregar productos
 */
describe('CartContext - Validación de stock', () => {
  it('debería rechazar agregar más unidades que el stock disponible', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    const product = DEFAULT_PRODUCTS[0];
    const excesiveQuantity = product.stock + 10;

    let response;
    act(() => {
      response = result.current.addItem(product.id, excesiveQuantity);
    });

    expect(response.success).toBe(false);
    expect(response.message).toContain('disponibles');
  });

  it('debería permitir agregar exactamente la cantidad de stock disponible', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    const product = DEFAULT_PRODUCTS[0];

    let response;
    act(() => {
      response = result.current.addItem(product.id, product.stock);
    });

    expect(response.success).toBe(true);
    expect(result.current.items[0].quantity).toBe(product.stock);
  });

  it('debería retornar error cuando el producto no existe', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    let response;
    act(() => {
      response = result.current.addItem(99999, 1);
    });

    expect(response.success).toBe(false);
    expect(response.message).toContain('no encontrado');
  });
});

/**
 * PRUEBAS ADICIONALES: Funcionalidades extra del CartContext
 */
describe('CartContext - Funcionalidades adicionales', () => {
  it('debería remover un producto del carrito', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addItem(1, 2);
    });

    expect(result.current.items).toHaveLength(1);

    act(() => {
      result.current.removeItem(1);
    });

    expect(result.current.items).toHaveLength(0);
  });

  it('debería limpiar todo el carrito', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addItem(1, 2);
    });

    expect(result.current.items.length).toBeGreaterThan(0);

    act(() => {
      result.current.clearCart();
    });

    expect(result.current.items).toHaveLength(0);
    expect(result.current.getTotalItems()).toBe(0);
  });
});
