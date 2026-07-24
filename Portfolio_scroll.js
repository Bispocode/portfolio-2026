const portfolio = document.querySelector(".portfolio");
const track = document.querySelector(".portfolio-track");

function atualizarPortfolio() {

    // Distância máxima que o track pode percorrer
    const distanciaMaxima = track.scrollWidth - window.innerWidth;

    // A altura da seção passa a ser calculada automaticamente
    portfolio.style.height = `${distanciaMaxima + window.innerHeight}px`;

}

function moverPortfolio() {

    const distanciaMaxima = track.scrollWidth - window.innerWidth;

    const portfolioTop = portfolio.offsetTop;
    const portfolioHeight = portfolio.offsetHeight;

    const scrollDentroPortfolio = window.scrollY - portfolioTop;

    const progresso = scrollDentroPortfolio / (portfolioHeight - window.innerHeight);

    const progressoLimitado = Math.min(
        1,
        Math.max(0, progresso)
    );

    const mover = progressoLimitado * distanciaMaxima;

    track.style.transform = `translateX(-${mover}px)`;

}

// Calcula a altura quando a página abre
atualizarPortfolio();

// Recalcula quando a tela muda de tamanho
window.addEventListener("resize", atualizarPortfolio);

// Move durante o scroll
window.addEventListener("scroll", moverPortfolio);