const plantCardTemplate = document.querySelector('[data-plant-template]');
const plantCardContainer = document.querySelector('[data-plant-cards-container]');
const searchInput = document.querySelector('[data-search]');

let plants = [];

searchInput.addEventListener('input', e => {
	const value = e.target.value.toLowerCase();
	plants.forEach(plant => {
		const isVisible =
			plant.name.toLowerCase().includes(value) ||
			plant.plantOwner.toLowerCase().includes(value);
		plant.element.classList.toggle('hide', !isVisible);
	});
});


fetch('/plants/ownerplants')
	.then(res => res.json())
	.then(data => {
		plants = data.map(plant => {
			const card = plantCardTemplate.content.cloneNode(true).children[0];// Clones data-plant-templates child element <starts with index 0>
            const image = card.querySelector('[data-image]');
			const header = card.querySelector('[data-header]');
			const body = card.querySelector('[data-body]');
			const link = card.querySelector('[data-link]');
            image.innerHTML = `<img src="${plant.image}", alt="", width= "350px", height= "450px">`
			header.textContent = plant.name;
			body.textContent = plant.plantOwner;
			link.innerHTML = `<a href=/plants/modify/${plant.id}>Edit Plant</a>`;
			plantCardContainer.append(card);
			return { name: plant.name, plantOwner: plant.plantOwner, element: card };
		});
	});