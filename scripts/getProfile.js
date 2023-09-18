const nameInput = document.querySelector('.nameInput');
const phoneInput = document.querySelector('.phoneInput');
const button = document.querySelector('button');

button.addEventListener('click', async () => {
    const email = await JSON.parse(localStorage.ecomUser).user.email
    
    fetch('https://ecom-production-55db.up.railway.app/auth/profile', {
        method: 'POST', // Use uppercase 'POST'
        headers: {
            "Content-Type": "application/json", // Correct header
        },
        body: JSON.stringify({
            email
        })
    })
        .then(response => response.json()) // Assuming the response is JSON
        .then(data => {
            console.log(data); // Handle the response data here
            // localStorage.ecomUser = JSON.stringify(data)
            // location.replace('/dashboard.html')
        })
        .catch(err => {
            console.error(err); // Handle any errors
        });
});
