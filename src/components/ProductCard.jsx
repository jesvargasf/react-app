import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useProducts } from '../hooks/useProducts';
import { formatPrice } from '../utils/validation';

const ProductCard = ({ product }) => {
  const { addItem } = useCart();
  const { getStockStatus, getStockText } = useProducts();
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    const result = addItem(product.id, quantity);
    if (result.success) {
      alert(result.message);
      setQuantity(1); // Resetear cantidad después de agregar
    } else {
      alert(result.message);
    }
  };

  const handleIncreaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const stockStatus = getStockStatus(product.stock);
  const stockText = getStockText(product.stock);

  return (
    <article className="product-card" data-product-id={product.id}>
      <img
        src={product.image}
        alt={product.name}
        className="product-image"
        loading="lazy"
      />
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-category">{product.category}</p>
        <p className="product-description">{product.description}</p>
        <div className="product-price">
          {formatPrice(product.price)} / {product.unit}
        </div>
        <div className={`product-stock ${stockStatus}`}>{stockText}</div>
        <div className="product-actions">
          {product.stock > 0 && (
            <>
              <div className="quantity-selector">
                <button
                  className="quantity-btn"
                  onClick={handleDecreaseQuantity}
                  disabled={quantity <= 1}
                  aria-label="Disminuir cantidad"
                >
                  -
                </button>
                <span className="quantity-display">{quantity}</span>
                <button
                  className="quantity-btn"
                  onClick={handleIncreaseQuantity}
                  disabled={quantity >= product.stock}
                  aria-label="Aumentar cantidad"
                >
                  +
                </button>
              </div>
              <button className="btn-primary" onClick={handleAddToCart}>
                Agregar al Carrito
              </button>
            </>
          )}
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
