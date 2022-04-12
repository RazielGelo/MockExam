const listCardTemplate = document.querySelector('[data-list-template]');
const listCardContainer = document.querySelector('[data-list-cards-container]');
const searchInput = document.querySelector('[data-search]');

let lists = [];

searchInput.addEventListener('input', e => {
	const value = e.target.value.toLowerCase();
	lists.forEach(list => {
		const isVisible =
			list.listName.toLowerCase().includes(value) ||
			list.listOwner.toLowerCase().includes(value);
		list.element.classList.toggle('hide', !isVisible);
	});
});


fetch('/all')
	.then(res => res.json())
	.then(data => {
		lists = data.map(list => {
			const card = listCardTemplate.content.cloneNode(true).children[0];// Clones data-plant-templates child element <starts with index 0>			
			const header = card.querySelector('[data-header]');
			const image = card.querySelector('[data-image]');
			const link = card.querySelector('[data-link]');			
			header.textContent = list.listName;
			image.innerHTML = `<img src="${list.image}", alt="", width= "150px", height= "150px">`
			link.innerHTML = `<a href=/lists/${list.id}>View</a>`;
			listCardContainer.append(card);
			return { listName: list.listName, image: list.image, element: card };
		});
	});