const menu = document.querySelector('.menu')
const closeButton = document.querySelector('aside .buttonDiv button')

const aside = document.querySelector('aside')

const goods = document.querySelector('.dashboardMain .cards')

menu.addEventListener('click', () => {
    aside.classList.add('openAside')
    aside.classList.remove('aside')
})

closeButton.addEventListener('click', () => {
    aside.classList.remove('openAside')
    aside.classList.add('aside')
});

(async () => {
    fetch('https://ecom-production-c7d8.up.railway.app/trade/get', {
        method: 'get', // Use uppercase 'POST'
        headers: {
            "Content-Type": "application/json", // Correct header
        }
    })
        .then(response => response.json()) // Assuming the response is JSON
        .then(response => {
            // console.log(response)
            response?.goods?.forEach(item => {
                goods.innerHTML += `<div class="card">
                <div class="imageHolder">
                    <img src="${item?.image}" />
                </div>
                <p class="itemName">${item?.name}</p>
                <p class="itemDescription">${item?.description}</p>
                <button>Add to Cart</button>
            </div>`
            });
        })
        .catch(err => {
            console.error(err); // Handle any errors
        });
})()