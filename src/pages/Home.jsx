import { Link } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const { getFeaturedProducts } = useProducts();
  const featuredProducts = getFeaturedProducts().slice(0, 6);

  return (
    <main className="main">
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h2>Productos Frescos Directo del Campo</h2>
            <p>
              Descubre la mejor selección de frutas, verduras y productos orgánicos de Chile.
              Frescura garantizada desde el productor hasta tu hogar.
            </p>
            <Link to="/tienda" className="cta-button">
              Ver Productos
            </Link>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <h2>¿Por qué elegir HuertoHogar?</h2>
          <div className="features-grid">
            <article className="feature-card">
              <div className="feature-icon">🥕</div>
              <h3>Productos Frescos</h3>
              <p>Cosechados el mismo día para garantizar máxima frescura y calidad.</p>
            </article>
            <article className="feature-card">
              <div className="feature-icon">🌱</div>
              <h3>100% Orgánico</h3>
              <p>Sin pesticidas ni químicos, respetando el medio ambiente.</p>
            </article>
            <article className="feature-card">
              <div className="feature-icon">🚚</div>
              <h3>Envío Rápido</h3>
              <p>Entrega en 24 horas en Santiago y regiones metropolitanas.</p>
            </article>
            <article className="feature-card">
              <div className="feature-icon">👨‍🌾</div>
              <h3>Directo del Productor</h3>
              <p>Sin intermediarios, apoyando directamente a agricultores locales.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="featured-products">
        <div className="container">
          <h2>Productos Destacados</h2>
          <div className="products-grid">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
