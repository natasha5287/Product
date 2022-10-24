const navToggle = document.querySelector('.header_toggler');
console.log(navToggle);
const overlay = document.querySelector('.nav');
console.log(overlay);

navToggle.addEventListener('click', function() {
    overlay.classList.toggle("nav_overlay");
})

// Выбираем кнопку
const btn = document.querySelector('.button-theme');
// Отслеживаем щелчок по кнопке
btn.addEventListener('click', function() {
  // Затем переключаем (добавляем/удаляем) класс .dark-theme для body
  document.body.classList.toggle('dark-theme'); 
})


//Accordion
let label = document.querySelectorAll(".accordion_item")

label.forEach((e)=>{
    e.addEventListener("click", ()=>{
        removeClass()
        e.classList.toggle("active")
    })
})

function removeClass(){
    label.forEach((e)=>{
        e.classList.remove("active")
    })
}