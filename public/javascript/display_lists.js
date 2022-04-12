const listCardTemplate = document.querySelector('[data-list-template]');
const listCardContainer = document.querySelector('[data-list-cards-container]');
const searchInput = document.querySelector('[data-search]');

let lists = [];

// searchInput.addEventListener('input', e => {
// 	const value = e.target.value.toLowerCase();
// 	lists.forEach(list => {
// 		const isVisible =
// 			list.name.toLowerCase().includes(value) ||
// 			list.plantOwner.toLowerCase().includes(value);
// 		list.element.classList.toggle('hide', !isVisible);
// 	});
// });


fetch('/all')
	.then(res => res.json())
	.then(data => {
		lists = data.map(list => {
			const card = listCardTemplate.content.cloneNode(true).children[0];// Clones data-plant-templates child element <starts with index 0>
			const image = card.querySelector('[data-image]');
			const header = card.querySelector('[data-header]');
			const body = card.querySelector('[data-body]');
			const link = card.querySelector('[data-link]');
			image.innerHTML = `<img src="${list.image}", alt="", width= "350px", height= "450px">`
			header.textContent = list.name;
			body.textContent = list.plantOwner;
			link.innerHTML = `<a href=/plants/modify/${list.id}>Edit Plant</a>`;
			plantCardContainer.append(card);
			return { name: list.name, listOwner: list.listOwner, element: card };
		});
	});