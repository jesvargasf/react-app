const Nosotros = () => {
  return (
    <main className="main">
      <section className="page-header">
        <div className="container">
          <h1>Nosotros</h1>
          <p>Conoce la historia de HuertoHogar y nuestro compromiso con la frescura</p>
        </div>
      </section>

      <section className="mission-values">
        <div className="container">
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">🎯</div>
              <h3>Nuestra Misión</h3>
              <p>
                Entregar productos frescos y de calidad directamente desde el campo hasta la
                puerta de nuestros clientes, garantizando la frescura y el sabor en cada entrega.
                Nos comprometemos a fomentar una conexión más cercana entre los consumidores y los
                agricultores locales.
              </p>
            </div>

            <div className="value-card">
              <div className="value-icon">👁️</div>
              <h3>Nuestra Visión</h3>
              <p>
                Ser la tienda online líder en la distribución de productos frescos y naturales en
                Chile, reconocida por nuestra calidad excepcional y servicio al cliente. Aspiramos
                a expandir nuestra presencia, estableciendo un nuevo estándar en la distribución de
                productos agrícolas.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Nosotros;
