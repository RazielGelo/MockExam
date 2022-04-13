// const listCardTemplate = document.querySelector('[data-list-template]');
// const listCardContainer = document.querySelector('[data-list-cards-container]');

// const deleteButton = document.getElementById('delete');
// const id = deleteButton.getAttribute('data-id');

// let lists = [];

// fetch(`/userlist/${id}`)
// 	.then(res => res.json())
// 	.then(data => {
// 		console.log(data)					
// 		let counter = 0;
// 		const card = listCardTemplate.content.cloneNode(true).children[0];// Clones data-list-templates child element <starts with index 0>
// 		const secretSanta = card.querySelector('[data-santa]');			
// 		const image = card.querySelector('[data-image]');	
// 		const recipient = card.querySelector('[data-recipient]');

// 		const listMembers = data.secretSanta
// 		const listRecipients = data.recipients			

// 		// for (let i = 0; i < listMembers.length; i++) {
// 		// 	secretSanta.textContent = listMembers[i]
// 		// 	recipient.textContent = listMembers[i]
// 		// }
// 		secretSanta.textContent = listMembers[counter];
// 		image.innerHTML = `<img src="/images/arrow.png", alt="", width= "413px", height= "75px">`
// 		recipient.textContent = listRecipients[counter];

// 		// secretSanta.textContent = list.listName;
// 		listCardContainer.append(card);
// 		counter++;			
// 		return { listName: list.listName, image: list.image, element: card };
		
// 	});