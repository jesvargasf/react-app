import { useState } from 'react';
import { useProducts } from '../hooks/useProducts';
import ProductCard from '../components/ProductCard';

const Tienda = () => {
  const { products } = useProducts();
  const [filteredProducts, setFilteredProducts] = useState(products);

  return (
    <main className="main">
      <section className="page-header">
        <div className="container">
          <h1>Nuestra Tienda</h1>
          <p>Descubre todos nuestros productos frescos y orgánicos</p>
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
                <p>No se encontraron productos.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Tienda;
