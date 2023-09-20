const email = document.querySelector('.email');
const password = document.querySelector('.password');
const button = document.querySelector('button');

button.addEventListener('click', () => {
    if (!email.value || !password.value) {
        alert('Please complete the form and try again');
    } else {
        fetch('https://ecom-production-c7d8.up.railway.app/auth/signin', {
            method: 'POST', // Use uppercase 'POST'
            headers: {
                "Content-Type": "application/json", // Correct header
            },
            body: JSON.stringify({
                email: email.value,
                password: password.value
            })
        })
            .then(response => response.json()) // Assuming the response is JSON
            .then(data => {
                console.log(data); // Handle the response data here
                localStorage.ecomUser = JSON.stringify(data)
                location.replace('/dashboard')
            })
            .catch(err => {
                console.error(err); // Handle any errors
            });
    }
});
