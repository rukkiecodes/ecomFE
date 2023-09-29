const itemName = document.querySelector('.itemName')
const itemImage = document.querySelector('.itemImage')
const itemPrice = document.querySelector('.itemPrice')
const itemDescription = document.querySelector('.itemDescription')
const itemAvailability = document.querySelector('.itemAvailability')
const itemBrand = document.querySelector('.itemBrand')
const itemCategory = document.querySelector('.itemCategory')
const itemCondition = document.querySelector('.itemCondition')
const itemshippingCost = document.querySelector('.itemshippingCost')

const imageHolder = document.querySelector('.sellMain .left .imageDiv')

const uploadButton = document.querySelector('.sellMain .right button')

let imageFile = null

itemImage?.addEventListener('change', async e => {
    const file = e.target.files[0];

    if (!file) {
        console.log('No file selected');
        return;
    }

    imageFile = file

    imageHolder.innerHTML = `<img src="${URL.createObjectURL(file)}"/>`
})

uploadButton?.addEventListener('click', async () => {
    const email = await JSON.parse(localStorage.ecomUser).user.email

    if (!itemName.value || !itemPrice.value || !itemDescription.value || !imageFile) return

    let formData = new FormData()
    let myHeaders = new Headers()

    myHeaders.append("Accept", "multipart/form-data")

    // Create a FormData object to send the file
    formData.append('image', imageFile);
    formData.append('email', email);
    formData.append('name', itemName.value);
    formData.append('description', itemDescription.value);
    formData.append('availability', itemAvailability.value);
    formData.append('brand', itemBrand.value);
    formData.append('category', itemCategory.value);
    formData.append('condition', itemCondition.value);
    formData.append('shippingCost', itemshippingCost.value);
    formData.append('price', itemPrice.value);

    let requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formData,
    }

    fetch('https://ecom-production-c7d8.up.railway.app/trade/addStock', requestOptions)
        .then(response => response.json()) // Assuming the response is JSON
        .then((response) => {
            if (response.message == 'Item created successfully') {
                alert('Item created successfully')
            }
        })
        .catch(err => {
            console.error(err)
        });
})