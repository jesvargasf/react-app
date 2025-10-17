import { useCart } from '../context/CartContext';
import { useProducts } from '../hooks/useProducts';
import { formatPrice } from '../utils/validation';

const ProductCard = ({ product }) => {
  const { addItem } = useCart();
  const { getStockStatus, getStockText } = useProducts();

  const handleAddToCart = () => {
    const result = addItem(product.id);
    if (result.success) {
      alert(result.message);
    } else {
      alert(result.message);
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
            <button className="btn-primary" onClick={handleAddToCart}>
              Agregar al Carrito
            </button>
          )}
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
