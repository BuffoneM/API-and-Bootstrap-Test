// Fetch Data Button Press
async function fetchData() {
    document.getElementById("loadingSpinner").style.display = 'block'
    const response = await fetch('https://api.nasa.gov/planetary/apod?api_key=DEMO')
    if (response.ok) {
        const data = await response.json()
        createCard(data)
    }
    else {
        displayErrorToast(response.status)
    }
    document.getElementById("loadingSpinner").style.display = 'none'
}

// Create the card from JSON data
function createCard(data) {

    console.log(data)
    document.getElementById("cardDataContainer").style.display = 'block'
    document.getElementById('rootCard').innerHTML = ""
    const rootCard = document.getElementById('rootCard')

    // Card object
    const mainContainer = document.createElement('div')
    mainContainer.setAttribute('class', 'card mx-auto')
    rootCard.appendChild(mainContainer)

    // Card image content
    const cardImage = document.createElement('img')
    cardImage.setAttribute('class', 'card-img-top')
    cardImage.src = data.url

    mainContainer.appendChild(cardImage)

    // Card text content
    const newCardBody = document.createElement('div')
    newCardBody.setAttribute('class', 'card-body')

    const cardHeader = document.createElement('h5')
    cardHeader.textContent = data.title + " - " + data.date

    const cardParagraph = document.createElement('p')
    cardParagraph.setAttribute('class', 'card-text')
    cardParagraph.textContent = data.explanation

    const cardCopyright = document.createElement('p')
    cardCopyright.setAttribute('class', 'card-text')
    cardCopyright.textContent = "Copright: " + data.copyright

    mainContainer.appendChild(newCardBody)
    newCardBody.appendChild(cardHeader)
    newCardBody.appendChild(cardCopyright)
    newCardBody.appendChild(cardParagraph)
}

// Show Error Toast
function displayErrorToast(response) {
    console.log(response)
    const errMsg = ('An error occurred fetching data: ' + response.statusText)

    var errorToast = document.getElementById('errorToast')
    document.getElementById('errorToastCode').innerHTML = ('Error: ' + response)
    document.getElementById('errorToastText').innerHTML = errMsg

    var toast = new bootstrap.Toast(errorToast)
    toast.show()
}