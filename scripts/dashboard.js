const menu = document.querySelector('.menu')
const closeButton = document.querySelector('aside .buttonDiv button')

const aside = document.querySelector('aside')

menu.addEventListener('click', () => {
    aside.classList.add('openAside')
    aside.classList.remove('aside')
})

closeButton.addEventListener('click', () => {
    aside.classList.remove('openAside')
    aside.classList.add('aside')
})