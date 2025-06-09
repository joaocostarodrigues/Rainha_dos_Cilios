let currentIndex = 0;

function moveSlide(direction) {
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;

    // Se não houver slides, não faz nada
    if (totalSlides === 0) return;

    // Atualiza o índice com base na direção
    currentIndex += direction;

    // Garante que o índice esteja dentro do intervalo válido
    if (currentIndex >= totalSlides) {
        currentIndex = 0; // Volta para o início
    } else if (currentIndex < 0) {
        currentIndex = totalSlides - 1; // Vai para o último slide
    }

    // Obtém o álbum
    const album = document.querySelector('.album');
    if (album) {
        const slideWidth = slides[0].clientWidth + 10; // Ajuste de 20px para a margem
        album.style.transition = 'transform 0.7s ease'; // Transição suave
        album.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    }
}

// Funções de navegação (clicando nas setas)
document.querySelector('.next').addEventListener('click', () => moveSlide(1));  // Avançar
document.querySelector('.prev').addEventListener('click', () => moveSlide(-1)); // Voltar
