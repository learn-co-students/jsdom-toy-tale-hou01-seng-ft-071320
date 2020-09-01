let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  getToys();
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});


const getToys = () => {
  const toyCollectionElement = document.getElementById('toy-collection');
  while(toyCollectionElement.firstChild){
    toyCollectionElement.removeChild(toyCollectionElement.lastChild)
  }
  fetch('http://localhost:3000/toys')
  .then(res => res.json())
  .then(json => json.forEach(toy => {
    showToy(toy);
    })
  )
}

const showToy = (toy) => {
  const toyCollectionElement = document.getElementById('toy-collection');
  const toyCard = document.createElement('div');
  const toyName = document.createElement('h2');
  const toyImg = document.createElement('img');
  const toyLikes = document.createElement('p');
  const toyLikeBtn = document.createElement('button');

  toyCard.className = "card"
  toyName.innerText = toy.name
  toyImg.src = toy.image
  toyImg.className = 'toy-avatar'
  toyLikes.innerText = `${toy.likes} Likes`
  toyLikeBtn.className = "like-btn"
  toyLikeBtn.innerText = 'Like'
  toyLikeBtn.addEventListener('click',(e)=> {
    increaseLikes(toy)
  })

  toyCard.append(toyName,toyImg,toyLikes,toyLikeBtn);
  toyCollectionElement.append(toyCard);
}

document.querySelector("body > div.container > form > input.submit").addEventListener('click', (e)=>{
  e.preventDefault
  const name = document.querySelector("body > div.container > form > input:nth-child(2)").value
  const image = document.querySelector("body > div.container > form > input:nth-child(4)").value
  addNewToy(name,image);
})

const addNewToy = (name,image) => {
  fetch('http://localhost:3000/toys',{
    method: 'POST',
    headers:{
      "Content-Type": "application/json",
      Accept: "application/json"
      },
    body: JSON.stringify({"name": name,"image": image,"likes": 0})
  })
  .then(getToys())
}

const increaseLikes = (toy) => {
  const newLikes = toy.likes + 1;
  fetch(`http://localhost:3000/toys/${toy.id}`,{
    method: 'PATCH',
    body: JSON.stringify({'likes': newLikes}),
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
    }
  })
  .then(getToys())
}