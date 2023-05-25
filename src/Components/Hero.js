import React, { useEffect } from 'react';
import ScrollReveal from 'scrollreveal';
import './Hero.css';

export const Hero = () => {
  useEffect(() => {
    const sr = ScrollReveal({
      distance: '65px',
      duration: 2600,
      delay: 450,
      reset: true,
    });
    sr.reveal('.hero-text', { delay: 200, origin: 'top' });
    sr.reveal('.hero-img', { delay: 200, origin: 'top' });
  }, []);

  return (
    <section className="hero">
      <div className="hero-text">
        <h4>Escaneo rápido</h4>
        <h1>QR Scan</h1>
        <p>
          Valida acreditaciones al instante. Escanea códigos QR y obtén resultados rápidos. Simplifica tus procesos con nuestra plataforma confiable y eficiente.
        </p>
        <a href="/CamaraScan">Escanear ahora</a>
      </div>
      <div className="hero-img">
        <img src="/QR.png" alt="QR" />
      </div>
    </section>
  );
};

