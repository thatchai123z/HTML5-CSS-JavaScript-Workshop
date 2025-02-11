const switchToggle = document.querySelector('input[type="checkbox"]');
const toggleIcon = document.getElementById('toggle-icon');
const nav = document.getElementById('nav');
const image1 = document.getElementById('image1');
const image2 = document.getElementById('image2');
const image3 = document.getElementById('image3');


function darkMode() {
    toggleIcon.children[0].textContent = 'โหมดกลางคืน';
    toggleIcon.children[1].classList.replace('fa-sun', 'fa-moon');
    nav.style.backgroundColor = 'rgb(0 0 0 / 50%)';

}

function lightMode() {
    toggleIcon.children[0].textContent = 'โหมดกลางวัน';
    toggleIcon.children[1].classList.replace('fa-moon', 'fa-sun');
    nav.style.backgroundColor = 'rgb(255 255 255 / 50%)';
}

function switchMode(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        darkMode();
        changeImageMode('dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        lightMode();
        changeImageMode('light');
    }
}

function changeImageMode(mode) {
    image1.src = `img/undraw_project-completed_${mode}.svg`;
    image2.src = `img/undraw_gaming-controller_${mode}.svg`;
    image3.src = `img/undraw_freelancer_${mode}.svg`;
}

switchToggle.addEventListener('change', switchMode);