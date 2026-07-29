// =====================================
// ELEMENTOS
// =====================================

const logo = document.querySelector(".logo-nav");
const navContent = document.querySelector(".nav-content");


// =====================================
// ABRIR / FECHAR MENU MOBILE
// =====================================

logo.addEventListener("click", (event) => {

    if (window.innerWidth <= 768) {

        event.preventDefault();

        navContent.classList.toggle("open");

    }

});


// =====================================
// FECHA O MENU AO CLICAR EM UM LINK
// =====================================

document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {

        if (window.innerWidth <= 768) {

            navContent.classList.remove("open");

        }

    });

});


// =====================================
// FECHA O MENU AO CLICAR FORA DELE
// =====================================

document.addEventListener("click", (event) => {

    if (window.innerWidth > 768) return;

    const clicouNoMenu = navContent.contains(event.target);
    const clicouNaLogo = logo.contains(event.target);

    if (!clicouNoMenu && !clicouNaLogo) {

        navContent.classList.remove("open");

    }

});


// =====================================
// AO VOLTAR PARA DESKTOP
// =====================================

window.addEventListener("resize", () => {

    if (window.innerWidth > 768) {

        navContent.classList.remove("open");

    }

});


// =====================================
// SCROLL SUAVE PARA AS SEÇÕES
// =====================================

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", function (event) {

        const destino = document.querySelector(this.getAttribute("href"));

        if (!destino) return;

        event.preventDefault();

        destino.scrollIntoView({

            behavior: "smooth"

        });

    });

});