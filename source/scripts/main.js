const navToggle = document.querySelector('.header_toggler');
const overlay = document.querySelector('.nav');

navToggle.addEventListener('click', function () {
    overlay.classList.toggle("nav_overlay");
})

// Change theme

const btn = document.querySelector('.button-theme');

btn.addEventListener('click', function () {
    document.body.classList.toggle('dark-theme');

    let bodyTheme = document.body.className;
    localStorage.setItem('theme', bodyTheme);
})

document.body.className = localStorage.getItem('theme');

//Accordion
let label = document.querySelectorAll(".accordion_item")

label.forEach((e) => {
    e.addEventListener("click", () => {
        removeClass()
        e.classList.toggle("active")
    })
})

function removeClass() {
    label.forEach((e) => {
        e.classList.remove("active")
    })
}