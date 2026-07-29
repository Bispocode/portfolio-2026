const logo = document.querySelector(".logo-nav");
const navContent = document.querySelector(".nav-content");

logo.addEventListener("click", (e) => {

    if (window.innerWidth <= 768) {

        e.preventDefault();
        navContent.classList.toggle("open");

    }

});

document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {

        navContent.classList.remove("open");

    });

});

window.addEventListener("resize", () => {

    if (window.innerWidth > 768) {

        navContent.classList.remove("open");

    }

});