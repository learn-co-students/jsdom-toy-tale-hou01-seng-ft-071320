let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", (e) => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  getToys()
  enableCreateToy()
});


const toyCollection = document.querySelector("#toy-collection")

const getToys = () => {
  fetch('http://localhost:3000/toys')
  .then(res => res.json())
  .then((toys) => {
    while(toyCollection.firstChild) toyCollection.removeChild(toyCollection.firstChild)
    toys.forEach((toy) => {
      addToysToCollection(toy)
    })
  })
}


const addToysToCollection = (singleToy) => {

  const toyDiv = document.createElement('div')
  toyDiv.className = 'card'
  // toyDiv.dataset.toyId = singleToy.id

  const toyName = document.createElement('h2')
  toyName.innerText = singleToy.name

  const toyImg = document.createElement('img')
  toyImg.src = singleToy.image
  toyImg.width = '200'
  toyImg.height = '250'

  const toyLikes = document.createElement('p')
  toyLikes.innerText = `${singleToy.likes} Likes`

  const likeButton = document.createElement('button')
  likeButton.className = 'like-btn'
  likeButton.innerText = "Like <3"

  toyDiv.append(toyName, toyImg, toyLikes, likeButton)
  toyCollection.append(toyDiv)

}

const enableCreateToy = () => {
  const toyForm = document.querySelector("body > div.container > form")
  toyForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const newToyNameField = document.querySelector("body > div.container > form > input:nth-child(2)")
    const newToyImgField = document.querySelector("body > div.container > form > input:nth-child(4)")
    const newToyName = newToyNameField.value
    const newToyImgUrl = newToyImgField.value
    createToy(newToyName, newToyImgUrl)
    e.target.reset()
  })
}

const createToy = (name, url) => {

  let newToy = {
    "name": name,
    "image": url,
    "likes": 0
  }

  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"},
    body: JSON.stringify(newToy)
  })
  .then(res => res.json())
  .then((toy) => {
    addToysToCollection(toy)
  })
}

// Not going to finish this lab.