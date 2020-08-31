//started at 11:20am 8-31-2020

let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
      addToyClick()
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  getToys()
});

//get toys
//find toy location
//make name elements
//assign name elements
//👋
//make image elements
//assign image src
//👋


const getToys = () =>{
  fetch('http://localhost:3000/toys')
  .then(res => res.json())
  .then((toys) => {
    toys.forEach((toy) =>{
      //console.log(toy)
      addingToy(toy)
    })
  })
}

const addingToy = (toy) =>{
  toyCollection = document.querySelector('#toy-collection')
  toyCard = document.createElement('div')
  toyCard.classList.add('card')
  toyName = document.createElement('h2')
  toyImg = document.createElement('img')
  toyImg.classList.add('toy-avatar')
  toyName.innerHTML = toy.name
  toyImg.src = toy.image
  toyImg.height = 200
  toyCollection.appendChild(toyCard)
  toyCard.appendChild(toyName)
  toyCard.appendChild(toyImg)
  toyLikes(toy, toyCard)
}
//create and append toy likes
//create and append likeButton
const toyLikes = (toy, toyCard) => {
  likes = document.createElement('p')
  likes.innerHTML = `${toy.likes} likes`
  toyCard.appendChild(likes)
  likeButton(toy, likes)
}

const likeButton = (toy, likes) => {
  let likeBtn = document.createElement('button')
  likeBtn.classList.add('like-btn')
  likeBtn.innerText = 'Like <3' 
  let br = document.createElement('br')
  likes.appendChild(br)
  likes.appendChild(likeBtn)
  likeClick(toy, likeBtn, likes)
}

//Add New Toy

//make button listen
//listen for click
//post request
//add new toy
const addToyClick = () => {
  document.querySelector('.submit').addEventListener('click', () => {
    const toyNameInText = document.querySelectorAll('.input-text')[0].value
    const toyNameInUrl = document.querySelectorAll('.input-text')[1].value
    addNewToy(toyNameInText, toyNameInUrl)
  })
}

//test image https://images.pexels.com/photos/3150553/pexels-photo-3150553.jpeg

const addNewToy = (toyNameInText, toyNameInUrl) =>{
  fetch('http://localhost:3000/toys',{
    method: 'POST',
    headers: 
    {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      "name": toyNameInText,
      "image": toyNameInUrl,
      "likes": 0
    }) 
  })
  .then(res => res.json())
  .then(getToys())
}

//Increase Toy Likes
//Listen for click
//Increase likes on page
//Increse likes patch

const likeClick = (toy, likeBtn,likes) => {
  likeBtn.addEventListener('click', (a) =>{
    a.preventDefault()
    increaseLikes(toy, likes)
    // increaseLikesDb(toy)
    likeButton(toy, likes)
  })
}

// const increaseLikes = (toy, likes) => {
//   toy.likes += 1
//   likes.innerHTML = `${toy.likes} likes`
// }

const increaseLikes = (toy, likes) => {
  toy.likes += 1
  fetch(`http://localhost:3000/toys/${toy.id}`,{
    method: 'PATCH',
    headers: 
    {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      "likes": toy.likes
    }) 
  })
  .then(res => res.json())
  .then(likes.innerHTML = `${toy.likes} likes`)
}
