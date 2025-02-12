const contents = document.querySelectorAll('.content')

document.addEventListener('scroll', showText);

function showText() {
    contents.forEach((section) => {
        const imgEL = section.querySelector('img')
        const textEl = section.querySelector('.text')

        const scrollPos = window.pageYOffset;
        const textPos = imgEL.offsetTop + imgEL.offsetHeight / 50
        if (scrollPos > textPos) {
            //แสดงเนื้อหา
            textEl.classList.add('show-reveal')
        }else {
            //ซ่อนเนื้อหา
            textEl.classList.remove('show-reveal')
        }
    })
}