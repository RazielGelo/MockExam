const listCardTemplate = document.querySelector('[data-list-template]');
const listCardContainer = document.querySelector('[data-list-cards-container]');

let lists = [];

fetch('/all')
	.then(res => res.json())
	.then(data => {
		lists = data.map(list => {
			const card = listCardTemplate.content.cloneNode(true).children[0];// Clones data-list-templates child element <starts with index 0>
			const image = card.querySelector('[data-image]');			
			const header = card.querySelector('[data-header]');
			const body = card.querySelector('[data-body]');		
			const link = card.querySelector('[data-link]');	
			image.innerHTML = `<img src="${list.image}", alt="", width= "213px", height= "126px">`		
			header.textContent = list.listName;	
			// body.textContent = list.listOwner;	
			link.innerHTML = `<a href=/lists/${list.id}>View</a>`;
			listCardContainer.append(card);
			return { listName: list.listName, image: list.image, element: card };
		});
	});