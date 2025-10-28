import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useProducts } from '../hooks/useProducts';
import { formatPrice } from '../utils/validation';

const Carrito = () => {
  const { items, removeItem, updateQuantity, clearCart, getTotalPrice, checkout } = useCart();
  const { getProductById } = useProducts();
  const navigate = useNavigate();

  const handleClearCart = () => {
    if (items.length === 0) {
      alert('El carrito ya está vacío');
      return;
    }

    if (window.confirm('¿Estás seguro de que quieres vaciar el carrito?')) {
      clearCart();
    }
  };

  const handleCheckout = () => {
    if (items.length === 0) {
      alert('Tu carrito está vacío');
      return;
    }

    if (window.confirm(`¿Confirmar compra por ${formatPrice(getTotalPrice())}?`)) {
      const order = checkout();
      alert(`¡Compra realizada con éxito! Número de orden: ${order.orderNumber}`);
      navigate('/');
    }
  };

  const handleIncreaseQuantity = (productId) => {
    const item = items.find(i => i.productId === productId);
    if (item) {
      const result = updateQuantity(productId, item.quantity + 1);
      if (result && !result.success) {
        alert(result.message);
      }
    }
  };

  const handleDecreaseQuantity = (productId) => {
    const item = items.find(i => i.productId === productId);
    if (item) {
      updateQuantity(productId, item.quantity - 1);
    }
  };

  return (
    <main className="main">
      <div className="container">
        <div className="cart-page">
          <h1>Carrito de Compras</h1>

          {items.length === 0 ? (
            <div className="cart-empty">
              <h2>Tu carrito está vacío</h2>
              <p>¡Explora nuestra tienda y encuentra productos frescos!</p>
              <Link to="/tienda" className="btn-primary">
                Ir a la Tienda
              </Link>
            </div>
          ) : (
            <>
              <div className="cart-items-container">
                {items.map(item => {
                  const product = getProductById(item.productId);
                  if (!product) return null;

                  const itemTotal = product.price * item.quantity;

                  return (
                    <div key={product.id} className="cart-item-page" data-product-id={product.id}>
                      <img src={product.image} alt={product.name} className="cart-item-image" loading="lazy" />

                      <div className="cart-item-details">
                        <h3 className="cart-item-name">{product.name}</h3>
                        <p className="cart-item-category">{product.category}</p>
                        <p className="cart-item-price">
                          {formatPrice(product.price)} / {product.unit}
                        </p>
                      </div>

                      <div className="cart-item-quantity">
                        <label>Cantidad:</label>
                        <div className="quantity-controls">
                          <button
                            className="quantity-btn"
                            onClick={() => handleDecreaseQuantity(product.id)}
                            disabled={item.quantity <= 1}
                            aria-label="Disminuir cantidad"
                          >
                            -
                          </button>
                          <span className="quantity-value">{item.quantity}</span>
                          <button
                            className="quantity-btn"
                            onClick={() => handleIncreaseQuantity(product.id)}
                            disabled={item.quantity >= product.stock}
                            aria-label="Aumentar cantidad"
                          >
                            +
                          </button>
                        </div>
                        <small className="stock-info">
                          Stock disponible: {product.stock}
                        </small>
                      </div>

                      <div className="cart-item-total">
                        <strong>{formatPrice(itemTotal)}</strong>
                      </div>

                      <button
                        className="remove-item-btn"
                        onClick={() => removeItem(product.id)}
                        aria-label="Eliminar producto"
                      >
                        🗑️ Eliminar
                      </button>
                    </div>
                  );
                })}
              </div>

              <div className="cart-summary">
                <div className="summary-row">
                  <span>Subtotal:</span>
                  <span>{formatPrice(getTotalPrice())}</span>
                </div>
                <div className="summary-row">
                  <span>Envío:</span>
                  <span>Gratis</span>
                </div>
                <div className="summary-row total">
                  <strong>Total:</strong>
                  <strong>{formatPrice(getTotalPrice())}</strong>
                </div>

                <div className="cart-actions">
                  <button onClick={handleClearCart} className="btn-secondary">
                    Vaciar Carrito
                  </button>
                  <Link to="/tienda" className="btn-secondary">
                    Seguir Comprando
                  </Link>
                  <button onClick={handleCheckout} className="btn-primary">
                    Finalizar Compra
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
};

export default Carrito;
