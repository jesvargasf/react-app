import { createContext, useState, useContext, useEffect } from 'react';
import { useProducts } from '../hooks/useProducts';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const { getProductById, decreaseStock } = useProducts();

  useEffect(() => {
    const saved = localStorage.getItem('huertohogar_cart');
    if (saved) {
      setItems(JSON.parse(saved));
    }
  }, []);

  const saveCart = (newItems) => {
    localStorage.setItem('huertohogar_cart', JSON.stringify(newItems));
    setItems(newItems);
  };

  const addItem = (productId, quantity = 1) => {
    const product = getProductById(productId);
    if (!product) return { success: false, message: 'Producto no encontrado' };

    const currentItem = items.find(item => item.productId === productId);
    const currentQuantity = currentItem ? currentItem.quantity : 0;
    const totalQuantity = currentQuantity + quantity;

    if (totalQuantity > product.stock) {
      return { success: false, message: `Solo hay ${product.stock} unidades disponibles` };
    }

    if (currentItem) {
      const newItems = items.map(item =>
        item.productId === productId
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
      saveCart(newItems);
    } else {
      const newItems = [...items, { productId, quantity, addedAt: Date.now() }];
      saveCart(newItems);
    }

    return { success: true, message: `${product.name} agregado al carrito` };
  };

  const removeItem = (productId) => {
    const newItems = items.filter(item => item.productId !== productId);
    saveCart(newItems);
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeItem(productId);
      return;
    }

    const product = getProductById(productId);
    if (!product) return;

    if (newQuantity > product.stock) {
      return { success: false, message: `Solo hay ${product.stock} unidades disponibles` };
    }

    const newItems = items.map(item =>
      item.productId === productId ? { ...item, quantity: newQuantity } : item
    );
    saveCart(newItems);
    return { success: true };
  };

  const clearCart = () => {
    saveCart([]);
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => {
      const product = getProductById(item.productId);
      return total + (product ? product.price * item.quantity : 0);
    }, 0);
  };

  const checkout = () => {
    // Actualizar stock de productos
    items.forEach(item => {
      decreaseStock(item.productId, item.quantity);
    });

    const orderNumber = 'HH' + Date.now().toString().slice(-6);
    const order = {
      orderNumber,
      items: items.map(item => {
        const product = getProductById(item.productId);
        return {
          name: product.name,
          quantity: item.quantity,
          price: product.price,
          total: product.price * item.quantity
        };
      }),
      total: getTotalPrice(),
      date: new Date().toLocaleDateString('es-CL'),
      time: new Date().toLocaleTimeString('es-CL')
    };

    clearCart();
    return order;
  };

  const value = {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
    checkout
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
