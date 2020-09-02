let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
      const toyClassForm = document.querySelector("body > div.container > form")
      toyClassForm.addEventListener("submit", (e) =>{
        e.preventDefault();
        addNewToy(e);
      })
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  
  fetchToys();
});

const fetchToys = () =>{
  fetch('http://localhost:3000/toys')
  .then(resp => resp.json())
  .then(toys => renderToys(toys))
}

const toyCollectionDiv = document.querySelector('#toy-collection')

const renderToys = (toys) => {
  toys.forEach(toy =>{
    makeToyCard(toy);
  })
}

const makeToyCard = (toy) =>{
  const toyCard = document.createElement('div')
  toyCard.classList.add("card")
  
  const toyName = document.createElement('h2')
  toyName.innerHTML = toy.name 
  
  const toyImg = document.createElement('img')
  toyImg.setAttribute('src', toy.image)
  toyImg.setAttribute('class', 'toy-avatar')
  
  const toyLikes = document.createElement('p')
  toyLikes.innerText = toy.likes
  
  const toyLikeButton = document.createElement('button')
  toyLikeButton.classList.add("like-btn")
  toyLikeButton.innerHTML = "Like"
  
  toyCard.append(toyName, toyImg, toyLikes, toyLikeButton)
  toyCollectionDiv.append(toyCard)

  toyLikeButton.addEventListener("click", (e) => {
    toy.likes += 1
    fetch(`http://localhost:3000/toys/${toy.id}`, {
      method : 'PATCH',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
    
      body: JSON.stringify({
        "likes" : toy.likes
      })
    })
    .then(resp => resp.json())
    .then(() => {toyLikes.innerText = toy.likes})
  })
}

const addNewToy = (e) => {
  const toyName = e.target.name.value
  const toyImage = e.target.image.value

  fetch('http://localhost:3000/toys',{
    method : 'POST',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },

    body: JSON.stringify({
      "name" : `${toyName}`,
      "image" : `${toyImage}`,
      "likes" : 0
    })
  })
  .then(resp => resp.json())
  .then(fetchToys())
}