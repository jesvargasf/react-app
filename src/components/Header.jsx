import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Header = () => {
  const { currentUser, logout, hasAdminAccess } = useAuth();
  const { getTotalItems } = useCart();

  const handleLogout = () => {
    if (window.confirm('¿Estás seguro de que quieres cerrar sesión?')) {
      logout();
    }
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo">
            <h1>🌱 HuertoHogar</h1>
            <span>Productos Frescos del Campo</span>
          </Link>

          <nav className="nav" role="navigation" aria-label="Navegación principal">
            <ul>
              <li><Link to="/">Inicio</Link></li>
              <li><Link to="/tienda">Tienda</Link></li>
              <li><Link to="/nosotros">Nosotros</Link></li>
              <li><Link to="/noticias">Noticias</Link></li>
              <li><Link to="/contacto">Contacto</Link></li>

              {currentUser ? (
                <>
                  {hasAdminAccess() && (
                    <li><Link to="/admin" className="admin-link">🔧 Panel Admin</Link></li>
                  )}
                  <li>
                    <button
                      onClick={handleLogout}
                      className="btn-link"
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'inherit',
                        cursor: 'pointer',
                        padding: '0.5rem 1rem'
                      }}
                    >
                      👤 {currentUser.nombre} (Salir)
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li><Link to="/login">Iniciar Sesión</Link></li>
                  <li><Link to="/registro">Registro</Link></li>
                </>
              )}
            </ul>
          </nav>

          <div className="cart-widget">
            <Link to="/carrito">
              <button id="cart-toggle" aria-label="Ver carrito de compras">
                🛒 <span id="cart-count">{getTotalItems()}</span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
