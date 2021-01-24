const IMG_NUMBER = 3;
const body = document.querySelector("body");

function handleImgLoad() {
    body.prepend
}

function paintImage(imgNumber) {
    const image = new Image();
    image.src = `/img/${imgNumber +1}.jpg`;
    body.prepend(image);
    image.classList.add("bgImage");
    image.addEventListener("loadend",handleImgLoad)
}

function getRandom() {
    return Math.round(Math.random()*IMG_NUMBER)
}

function init() {
    const randomNumber = getRandom();
    paintImage(randomNumber);
}

init();