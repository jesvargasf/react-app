const Noticias = () => {
  return (
    <main className="main">
      <section className="page-header">
        <div className="container">
          <h1>Noticias</h1>
          <p>Mantente informado con las últimas novedades de HuertoHogar</p>
        </div>
      </section>

      <section className="news-coming-soon">
        <div className="container">
          <div className="coming-soon-content">
            <div className="coming-soon-icon">📰</div>
            <h2>Próximamente...</h2>
            <p>
              Estamos preparando contenido exclusivo para mantenerte informado sobre las últimas
              noticias, novedades y actualizaciones de HuertoHogar.
            </p>
          </div>

          <div className="news-placeholders">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="news-card placeholder">
                <div className="placeholder-image">
                  <div className="placeholder-content">📄</div>
                </div>
                <div className="placeholder-text">
                  <div className="placeholder-line"></div>
                  <div className="placeholder-line short"></div>
                  <div className="placeholder-line"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Noticias;
