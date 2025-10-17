import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Tienda from './pages/Tienda';
import Login from './pages/Login';
import Nosotros from './pages/Nosotros';
import Noticias from './pages/Noticias';
import './App.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <div className="app">
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/tienda" element={<Tienda />} />
              <Route path="/login" element={<Login />} />
              <Route path="/nosotros" element={<Nosotros />} />
              <Route path="/noticias" element={<Noticias />} />
            </Routes>
            <Footer />
          </div>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
