const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMON_URL = `${BASE_URL}/pokemons`
const pokeU = 'http://localhost:3000/pokemons'
const mainDiv = document.querySelector('#main-div')
// document.querySelector('#ul-3').children.length

fetch(TRAINERS_URL)
.then(res => res.json())
.then(data => data.forEach(displayCard))
.catch(err => console.log(err))

function displayCard(trainer){
 // console.log(trainer)
	const div = document.createElement('div') //create mainDiv
	div.className = 'card' //give div class name
	div.dataset.id = trainer.id
	div.id = `trainer-${trainer.id}` // give div trainer id
	const p = document.createElement('p') // create p element
	p.innerText = trainer.name // fill p-tag with trainer name
	const	addButton = document.createElement('button')
	addButton.addEventListener('click', addPokemon) //create button element
	addButton.innerText = 'Add Pokemon' //label innerText of button
	addButton.dataset.id = trainer.id // give trainer-id
	// button.addEventListener('click', console.log(e))
	const ul = document.createElement('ul') //create div ul
	ul.id = `ul-${trainer.id}`
	 //create li

trainer.pokemons.forEach(pokemon => {
	// console.log(pokemon)
	const li = document.createElement('li') //create li for pokemon
	li.innerHTML += `${pokemon.nickname} (${pokemon.species})`; //name li
	const rButton = document.createElement('button') //create li release button
	rButton.dataset.id = pokemon.id; //give li release button id
	rButton.className = "release" // give release button classname
	rButton.innerText = "Release" //give release button text
	rButton.addEventListener('click', removePokemon)
	li.append(rButton) // append button to li
	ul.append(li) // append li to ul
})

	div.append(p)
	div.append(addButton)
	div.append(ul)
	mainDiv.append(div)
}



function addPokemon(e){

 let trainerID = e.target.dataset.id
 if(e.target.nextSibling.children.length <= 5) {
 fetch(pokeU,{method:"POST",
 headers:{
	 'Content-Type': 'application/json',
	 'Accept': 'application/json'
 },
 body:JSON.stringify({trainer_id:trainerID})
 })
 .then(res =>res.json())
 .then(pokemon => {
	 const ul = document.createElement('ul')
	 const li = document.createElement('li') //create li for pokemon
 	li.innerHTML += `${pokemon.nickname} (${pokemon.species})`; //name li
 	const rButton = document.createElement('button') //create li release button
 	rButton.dataset.id = pokemon.id; //give li release button id
 	rButton.className = "release" // give release button classname
 	rButton.innerText = "Release" //give release button text
 	rButton.addEventListener('click', removePokemon)
 	li.append(rButton) // append button to li
  document.querySelector(`#trainer-${trainerID} ul`).append(li)
 })
}
else {
	console.log('clicked')
}
}



function removePokemon(e){
pokeID = e.target.dataset.id
e.target.parentElement.remove()
fetch(`${POKEMON_URL}/${pokeID}`,{method: "DELETE"})
}
