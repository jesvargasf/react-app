import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!email || !password) {
      setError('Por favor, completa todos los campos');
      return;
    }

    const result = login(email, password);

    if (result.success) {
      setSuccess(true);
      setTimeout(() => {
        navigate('/');
      }, 1000);
    } else {
      setError(result.error);
    }
  };

  return (
    <main className="main">
      <section className="page-header">
        <div className="container">
          <h1>Iniciar Sesión</h1>
          <p>Accede a tu cuenta de HuertoHogar</p>
        </div>
      </section>

      <section className="auth-section">
        <div className="container">
          <div className="auth-container login-container">
            <div className="auth-form-wrapper">
              <h2>Bienvenido de vuelta</h2>
              <p className="auth-subtitle">Ingresa tus credenciales para acceder</p>

              <form onSubmit={handleSubmit} className="auth-form">
                <div className="form-group">
                  <label htmlFor="email">Correo Electrónico *</label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Contraseña *</label>
                  <div className="password-input-wrapper">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      required
                      minLength={4}
                      maxLength={10}
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label="Mostrar/ocultar contraseña"
                    >
                      {showPassword ? '🙈' : '👁️'}
                    </button>
                  </div>
                </div>

                {error && (
                  <div className="form-message error">
                    <p>{error}</p>
                  </div>
                )}

                {success && (
                  <div className="form-message success">
                    <p>¡Sesión iniciada correctamente! Redirigiendo...</p>
                  </div>
                )}

                <button type="submit" className="btn-primary btn-full">
                  Iniciar Sesión
                </button>
              </form>

              <div className="auth-links">
                <p>
                  ¿No tienes cuenta? <a href="/registro">Crear Cuenta</a>
                </p>
              </div>
            </div>

            <div className="auth-info">
              <div className="info-card">
                <h3>🌱 Con tu cuenta puedes:</h3>
                <ul>
                  <li>✅ Realizar pedidos más rápido</li>
                  <li>✅ Ver tu historial de compras</li>
                  <li>✅ Recibir ofertas personalizadas</li>
                  <li>✅ Gestionar tus direcciones</li>
                  <li>✅ Seguimiento de envíos</li>
                </ul>
              </div>

              <div className="info-card">
                <h3>📞 ¿Necesitas ayuda?</h3>
                <p>Si tienes problemas para acceder a tu cuenta, contáctanos:</p>
                <p>📧 soporte@huertohogar.cl</p>
                <p>📞 +56 2 2345 6789</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Login;
