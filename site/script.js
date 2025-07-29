// JavaScript simples para futuras interações, como carrossel de slides ou botões

document.addEventListener("DOMContentLoaded", () => {
  console.log("Site Rainha dos Cílios carregado.");
  // Exemplo: futuras animações ou eventos aqui
});

// scroll-suave.js

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
});
