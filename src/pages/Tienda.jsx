import { useState, useEffect } from 'react';
import { useProducts } from '../hooks/useProducts';
import ProductCard from '../components/ProductCard';

const Tienda = () => {
  const { products, getFeaturedProducts, getProductsByCategory, searchProducts } = useProducts();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Actualizar productos cuando cambie el hook
  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  // Filtrar productos
  useEffect(() => {
    let result = products;

    // Filtrar por categoría
    if (selectedCategory !== 'all') {
      result = getProductsByCategory(selectedCategory);
    }

    // Filtrar por búsqueda
    if (searchQuery.trim()) {
      result = searchProducts(searchQuery);
    }

    setFilteredProducts(result);
  }, [searchQuery, selectedCategory, products, getProductsByCategory, searchProducts]);

  // Obtener categorías únicas
  const categories = ['all', ...new Set(products.map(p => p.category))];

  return (
    <main className="main">
      <section className="page-header">
        <div className="container">
          <h1>Nuestra Tienda</h1>
          <p>Descubre todos nuestros productos frescos y orgánicos</p>
        </div>
      </section>

      <section className="shop-controls">
        <div className="container">
          <div className="shop-filters">
            <h2>Filtrar Productos</h2>

            <div className="filter-group">
              <label htmlFor="category-filter">Categoría:</label>
              <select
                id="category-filter"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="all">Todas las categorías</option>
                {categories.filter(cat => cat !== 'all').map(category => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div className="search-bar">
              <input
                type="search"
                placeholder="Buscar productos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Buscar productos"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="products-section">
        <div className="container">
          <div className="products-grid">
            {filteredProducts.length > 0 ? (
              filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <div className="no-products">
                <p>No se encontraron productos que coincidan con tu búsqueda.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Tienda;
