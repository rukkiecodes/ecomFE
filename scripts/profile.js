const userNameCar = document.querySelector('.avatar span')
const userName = document.querySelector('h1')
const nameInput = document.querySelector('.nameInput')
const phoneInput = document.querySelector('.phoneInput')
const button = document.querySelector('button');

const fetchProfile = async () => {
    const email = await JSON.parse(localStorage.ecomUser).user.email

    fetch('https://ecom-production-c7d8.up.railway.app/auth/profile', {
        method: 'POST', // Use uppercase 'POST'
        headers: {
            "Content-Type": "application/json", // Correct header
        },
        body: JSON.stringify({
            email: email
        })
    })
        .then(response => response.json()) // Assuming the response is JSON
        .then(data => {
            let user = data.user

            userNameCar.innerText = user.name.charAt(0)
            userName.innerText = user.name
            nameInput.value = user.name
            phoneInput.value = user.phone
        })
        .catch(err => {
            console.error(err); // Handle any errors
        });
}

(() => {
    fetchProfile()
})()

button.addEventListener('click', async () => {
    const email = await JSON.parse(localStorage.ecomUser).user.email

    button.innerText = 'Loading...'

    fetch('https://ecom-production-c7d8.up.railway.app/auth/updateProfile', {
        method: 'POST', // Use uppercase 'POST'
        headers: {
            "Content-Type": "application/json", // Correct header
        },
        body: JSON.stringify({
            email: email,
            name: nameInput.value,
            phone: phoneInput.value
        })
    })
        .then(response => response.json()) // Assuming the response is JSON
        .then(() => {
            fetchProfile()

            button.innerText = 'Update profile'
        })
        .catch(err => {
            console.error(err); // Handle any errors
            button.innerText = 'Update profile'
        });
})