const currentPage = location.pathname
const menuItems = document.querySelectorAll('header .links a')
const formDelete = document.querySelector('#form-delete')

for (item of menuItems) {
    if (currentPage.includes(item.getAttribute('href'))) {
        item.classList.add('active')
    }
}

formDelete.addEventListener('submit', function (event) {
    const confirmation = confirm('DESEJA MESMO DELETAR?')
    if (!confirmation) {
        event.preventDefault()
    }
})