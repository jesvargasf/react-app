import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ProductCard from '../../components/ProductCard';
import { DEFAULT_PRODUCTS } from '../../data/products';

// Mock del contexto de Cart
const mockAddItem = vi.fn();

vi.mock('../../context/CartContext', async () => {
  const actual = await vi.importActual('../../context/CartContext');
  return {
    ...actual,
    useCart: () => ({
      addItem: mockAddItem,
      items: [],
      removeItem: vi.fn(),
      updateQuantity: vi.fn(),
      clearCart: vi.fn(),
      getTotalItems: () => 0,
      getTotalPrice: () => 0,
      checkout: vi.fn(),
    }),
  };
});

vi.mock('../../hooks/useProducts', () => ({
  useProducts: () => ({
    products: DEFAULT_PRODUCTS,
    getStockStatus: (stock) => {
      if (stock === 0) return 'out-stock';
      if (stock < 5) return 'low-stock';
      return 'in-stock';
    },
    getStockText: (stock) => {
      if (stock === 0) return 'Sin stock';
      if (stock < 5) return `Últimas ${stock} unidades`;
      return `${stock} disponibles`;
    },
    getProductById: vi.fn(),
    getProductsByCategory: vi.fn(),
    getFeaturedProducts: vi.fn(),
    searchProducts: vi.fn(),
    decreaseStock: vi.fn(),
  }),
}));

const mockProduct = {
  id: 1,
  name: 'Tomates Cherry Orgánicos',
  category: 'verduras',
  price: 2500,
  image: 'https://example.com/tomate.jpg',
  description: 'Tomates cherry orgánicos, dulces y jugosos',
  stock: 25,
  unit: 'kg',
  featured: true,
};

beforeEach(() => {
  vi.clearAllMocks();
  localStorage.clear();
});

/**
 * 
 * Verifica que el componente muestre correctamente la información del producto (manipulación DOM)
 */
describe('ProductCard - Renderizado', () => {
  it('debería renderizar correctamente el nombre del producto', () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByText('Tomates Cherry Orgánicos')).toBeInTheDocument();
  });

  it('debería renderizar el precio formateado correctamente', () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByText('$2.500 / kg')).toBeInTheDocument();
  });
});

/**
 * Control de cantidad (incremento/decremento)
 * Verifica que los botones de cantidad funcionen correctamente
 */
describe('ProductCard - Control de cantidad', () => {
  it('debería incrementar la cantidad al hacer click en el botón +', () => {
    render(<ProductCard product={mockProduct} />);
    const incrementBtn = screen.getByLabelText('Aumentar cantidad');

    fireEvent.click(incrementBtn);
    expect(screen.getByText('2')).toBeInTheDocument();

    fireEvent.click(incrementBtn);
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('debería decrementar la cantidad al hacer click en el botón -', () => {
    render(<ProductCard product={mockProduct} />);
    const incrementBtn = screen.getByLabelText('Aumentar cantidad');
    const decrementBtn = screen.getByLabelText('Disminuir cantidad');

    // Incrementar a 3
    fireEvent.click(incrementBtn);
    fireEvent.click(incrementBtn);
    expect(screen.getByText('3')).toBeInTheDocument();

    // Decrementar a 2
    fireEvent.click(decrementBtn);
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('no debería decrementar por debajo de 1', () => {
    render(<ProductCard product={mockProduct} />);
    const decrementBtn = screen.getByLabelText('Disminuir cantidad');

    // El botón debe estar deshabilitado
    expect(decrementBtn).toBeDisabled();
  });
});

/**
 * Botón "Agregar al Carrito"
 * Verifica que el botón agregue correctamente el producto con la cantidad seleccionada
 */
describe('ProductCard - Agregar al Carrito', () => {
  it('debería llamar a addItem con la cantidad correcta al hacer click', () => {
    mockAddItem.mockReturnValue({ success: true, message: 'Producto agregado' });

    render(<ProductCard product={mockProduct} />);
    const addButton = screen.getByText('Agregar al Carrito');

    fireEvent.click(addButton);

    expect(mockAddItem).toHaveBeenCalledWith(mockProduct.id, 1);
  });

  it('debería resetear la cantidad a 1 después de agregar al carrito exitosamente', () => {
    mockAddItem.mockReturnValue({ success: true, message: 'Producto agregado' });

    render(<ProductCard product={mockProduct} />);
    const incrementBtn = screen.getByLabelText('Aumentar cantidad');
    const addButton = screen.getByText('Agregar al Carrito');

    // Incrementar a 3
    fireEvent.click(incrementBtn);
    fireEvent.click(incrementBtn);
    expect(screen.getByText('3')).toBeInTheDocument();

    // Agregar al carrito
    fireEvent.click(addButton);

    // La cantidad debería volver a 1
    expect(screen.getByText('1')).toBeInTheDocument();
  });
});
