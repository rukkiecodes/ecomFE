const userNameCar = document.querySelector('.avatar')
const userName = document.querySelector('.card h1')
const nameInput = document.querySelector('.nameInput')
const phoneInput = document.querySelector('.phoneInput')
const imageInput = document.querySelector('.imageInput')
const button = document.querySelector('button');

const navAvatar = document.querySelector('.navAvatar')
const username = document.querySelector('.username')

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

            // update content on profile page
            if (userNameCar) userNameCar.innerHTML = user.avatar ? `<img class="avatarImage" src="${user.avatar}" />` : `<span>${user.name.charAt(0)}</span>`
            if (userName) userName.innerText = user.name
            if (nameInput) nameInput.value = user.name
            if (phoneInput) phoneInput.value = user.phone
            
            // update content on dashboard
            if (username.innerText) username.innerText = user.name
            if (navAvatar) navAvatar.innerHTML = user.avatar ? `<img class="avatarImage" src="${user.avatar}" />` : `<span>${user.name.charAt(0)}</span>`

        })
        .catch(err => {
            console.error(err); // Handle any errors
        });
}


(() => {
    fetchProfile()
})()


button?.addEventListener('click', async () => {
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

imageInput?.addEventListener('change', async (e) => {
    const email = await JSON.parse(localStorage.ecomUser).user.email

    const file = e.target.files[0];

    if (!file) {
        console.log('No file selected');
        return;
    }

    let formData = new FormData()
    let myHeaders = new Headers()

    myHeaders.append("Accept", "multipart/form-data")

    // Create a FormData object to send the file
    formData.append('avatar', file);
    formData.append('email', email);

    let requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formData,
    }

    fetch('https://ecom-production-c7d8.up.railway.app/auth/avatar', requestOptions)
        .then(response => response.json()) // Assuming the response is JSON
        .then((response) => {
            if (response.message == 'Avatar updated') {
                fetchProfile()
            }
        })
        .catch(err => {
            console.error(err)
        });
})