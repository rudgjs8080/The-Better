const container = document.querySelector('.image-container')
const startButton = document.querySelector('.start-button')
const gameText = document.querySelector('.game-text')
const playTime = document.querySelector('.play-time')

const tileCount = 16

let tiles = [];
const dragged = {
	el: null,
	class: null,
	index: null,
}

setGame();
//functions

function setGame() {
	container.innerHTML = ""
	tiles = createImageTiles();
	tiles.forEach(tile => container.appendChild(tile))
	setTimeout(() => {
		container.innerHTML = ""
		shuffle(tiles).forEach(tile => container.appendChild(tile))
	},2000)
}

function createImageTiles() {
	const tempArray = [];
	Array(tileCount).fill().forEach( (gab, index) => {
		const li = document.createElement("li")
		li.setAttribute('data-index', index)
		li.setAttribute('draggable', 'true')
		li.classList.add(`list${index}`)
		
		tempArray.push(li)
		
	}) // 배열을 만듦
	return tempArray
}

function shuffle(array) {
	let index = array.length -1;
	while (index > 0){
		const randomIndex = Math.floor(Math.random() * (index +1))
		[array[index], array[randomIndex]] = [array[randomIndex], array[index]]
		index--;
	}
	return array;
}

// events

container.addEventListener('dragstart', (e) =>{

	dragged.el = e.target
	dragged.class = e.target.className
	dragged.index = [...e.target.parentNode.children].indexOf(e.target)
})

container.addEventListener('dragover', (e) =>{
	e.preventDefault()
	console.log('over')

})
container.addEventListener('drop', (e) =>{
	console.log('dropped')
})