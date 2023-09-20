const name = document.querySelector('.name');
const email = document.querySelector('.email');
const password = document.querySelector('.password');
const button = document.querySelector('button');


button.addEventListener('click', () => {
    if (!name.value || !email.value || !password.value) {
        alert('Please complete the form and try again');
    } else {
        fetch('https://ecom-production-c7d8.up.railway.app/auth/signup', {
            method: 'POST', // Use uppercase 'POST'
            headers: {
                "Content-Type": "application/json", // Correct header
            },
            body: JSON.stringify({
                name: name.value,
                email: email.value,
                password: password.value
            })
        })
            .then(response => response.json()) // Assuming the response is JSON
            .then(data => {
                localStorage.ecomUser = JSON.stringify(data)
                location.replace('/index.html')
            })
            .catch(err => {
                console.error(err); // Handle any errors
            });
    }
});
