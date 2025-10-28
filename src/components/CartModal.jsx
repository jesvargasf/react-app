import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useProducts } from '../hooks/useProducts';
import { formatPrice } from '../utils/validation';

const CartModal = ({ isOpen, onClose }) => {
  const { items, removeItem, updateQuantity, clearCart, getTotalPrice } = useCart();
  const { getProductById } = useProducts();
  const navigate = useNavigate();

  if (!isOpen) return null;

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
      const order = useCart().checkout();
      alert(`¡Compra realizada con éxito! Número de orden: ${order.orderNumber}`);
      onClose();
      navigate('/');
    }
  };

  const handleIncreaseQuantity = (productId) => {
    const item = items.find(i => i.productId === productId);
    if (item) {
      updateQuantity(productId, item.quantity + 1);
    }
  };

  const handleDecreaseQuantity = (productId) => {
    const item = items.find(i => i.productId === productId);
    if (item) {
      updateQuantity(productId, item.quantity - 1);
    }
  };

  return (
    <div className="modal show" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Carrito de Compras</h2>
          <button className="close-button" onClick={onClose} aria-label="Cerrar carrito">
            &times;
          </button>
        </div>
        <div className="modal-body">
          <div id="cart-items">
            {items.length === 0 ? (
              <div className="cart-empty">
                <p>Tu carrito está vacío</p>
                <p>¡Explora nuestra tienda y encuentra productos frescos!</p>
              </div>
            ) : (
              items.map(item => {
                const product = getProductById(item.productId);
                if (!product) return null;

                const itemTotal = product.price * item.quantity;

                return (
                  <div key={product.id} className="cart-item" data-product-id={product.id}>
                    <img src={product.image} alt={product.name} loading="lazy" />
                    <div className="cart-item-info">
                      <div className="cart-item-name">{product.name}</div>
                      <div className="cart-item-price">
                        {formatPrice(product.price)} / {product.unit}
                      </div>
                      <div className="cart-item-total">Subtotal: {formatPrice(itemTotal)}</div>
                    </div>
                    <div className="cart-item-controls">
                      <button
                        className="quantity-btn"
                        onClick={() => handleDecreaseQuantity(product.id)}
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span className="cart-quantity">{item.quantity}</span>
                      <button
                        className="quantity-btn"
                        onClick={() => handleIncreaseQuantity(product.id)}
                        disabled={item.quantity >= product.stock}
                      >
                        +
                      </button>
                      <button
                        className="remove-item"
                        onClick={() => removeItem(product.id)}
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
          <div className="cart-total">
            <strong>Total: {formatPrice(getTotalPrice())}</strong>
          </div>
        </div>
        <div className="modal-footer">
          <button onClick={handleClearCart} className="btn-secondary">
            Vaciar Carrito
          </button>
          <button onClick={handleCheckout} className="btn-primary">
            Finalizar Compra
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartModal;
