
const darkBtn = document.querySelector("#darkMode");
darkBtn.onclick = ()=>{
    document.body.classList.toggle("dark");
}

const music = document.querySelector("#music");
const musicBtn = document.querySelector("#musicToggle");
musicBtn.onclick = ()=>{
    if(music.paused){
        music.play();
    }else{
        music.pause();
    }
}

const configBtn = document.querySelector(".config-btn");
const menu = document.querySelector(".settings-menu");
configBtn.addEventListener("click", ()=>{
    menu.classList.toggle("open");
});

const logo = document.querySelector(".logo");

darkBtn.onclick = () => {

    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){

        logo.src = "assets/logo dark.svg";

    }else{

        logo.src = "assets/logo.svg";

    }

}
