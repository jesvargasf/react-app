import { useState, useEffect } from 'react';
import { DEFAULT_PRODUCTS } from '../data/products';

export const useProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('huertohogar_products');
    if (stored) {
      setProducts(JSON.parse(stored));
    } else {
      localStorage.setItem('huertohogar_products', JSON.stringify(DEFAULT_PRODUCTS));
      setProducts(DEFAULT_PRODUCTS);
    }
  }, []);

  const saveProducts = (newProducts) => {
    localStorage.setItem('huertohogar_products', JSON.stringify(newProducts));
    setProducts(newProducts);
  };

  const getAllProducts = () => products;

  const getProductById = (id) => {
    return products.find(product => product.id === parseInt(id));
  };

  const getProductsByCategory = (category) => {
    if (!category) return products;
    return products.filter(product => product.category === category);
  };

  const getFeaturedProducts = () => {
    return products.filter(product => product.featured);
  };

  const searchProducts = (query) => {
    if (!query) return products;
    const searchTerm = query.toLowerCase();
    return products.filter(product =>
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm)
    );
  };

  const decreaseStock = (id, quantity = 1) => {
    const newProducts = products.map(product => {
      if (product.id === parseInt(id) && product.stock >= quantity) {
        return { ...product, stock: product.stock - quantity };
      }
      return product;
    });
    saveProducts(newProducts);
  };

  const getStockStatus = (stock) => {
    if (stock === 0) return 'out-stock';
    if (stock < 5) return 'low-stock';
    return 'in-stock';
  };

  const getStockText = (stock) => {
    if (stock === 0) return 'Sin stock';
    if (stock < 5) return `Últimas ${stock} unidades`;
    return `${stock} disponibles`;
  };

  return {
    products,
    getAllProducts,
    getProductById,
    getProductsByCategory,
    getFeaturedProducts,
    searchProducts,
    decreaseStock,
    getStockStatus,
    getStockText
  };
};
