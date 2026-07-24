// ==============================
// Seleciona os elementos da página
// ==============================

const mural = document.querySelector(".mural");
const gallery = document.querySelector(".cursor-gallery");
const imagens = [
    "assets/teste.png",
    "assets/teste2.png",
    "assets/teste3.png",
];

let ultimoIndice = -1;
// ==============================
// Configurações
// ==============================
function escolherImagem() {

    let indice;

    do {

        indice = Math.floor(Math.random() * imagens.length);

    } while (indice === ultimoIndice);

    ultimoIndice = indice;

    return imagens[indice];

}

// Tempo mínimo entre um card e outro (ms)
const intervalo = 300;

// Tempo que o card permanece na tela
const tempoDeVida = 1200;

// Momento em que o último card foi criado
let ultimoCard = 0;

// ==============================
// Evento do mouse
// ==============================

mural.addEventListener("mousemove", (event) => {

    const agora = Date.now();

    // Limita a quantidade de cards
    if (agora - ultimoCard < intervalo) return;

    ultimoCard = agora;

    // Calcula a posição do mouse dentro da seção
    const rect = mural.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Cria o card
    const card = document.createElement("div");
    card.classList.add("cursor-card");

    // Cria a imagem
    const image = document.createElement("img");
    image.src = escolherImagem();
    // Caso a imagem não seja encontrada
    image.onerror = () => {
        console.error("Imagem não encontrada:", image.src);
    };

    // Coloca a imagem dentro do card
    card.appendChild(image);

    // Posiciona o card
    card.style.left = `${x}px`;
    card.style.top = `${y}px`;

    // Rotação aleatória
    const rotacao = Math.random() * 12 - 6;
    card.style.rotate = `${rotacao}deg`;

    // Adiciona o card na tela
    gallery.appendChild(card);

    // Remove depois de um tempo
    setTimeout(() => {
        card.remove();
    }, tempoDeVida);

    
});