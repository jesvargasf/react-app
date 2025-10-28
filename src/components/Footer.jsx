import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>HuertoHogar</h3>
            <p>Conectando el campo con tu hogar</p>
          </div>
          <div className="footer-section">
            <h4>Enlaces</h4>
            <ul>
              <li><Link to="/tienda">Tienda</Link></li>
              <li><Link to="/nosotros">Nosotros</Link></li>
              <li><Link to="/noticias">Noticias</Link></li>
              <li><Link to="/contacto">Contacto</Link></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Contacto</h4>
            <p>📧 info@huertohogar.cl</p>
            <p>📞 +56 9 1234 5678</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 HuertoHogar. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
