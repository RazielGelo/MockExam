const deleteButton = document.getElementById(`delete`);
const id = deleteButton.getAttribute('data-id');
deleteButton.onclick = async (e) => {
	e.preventDefault(); 	// do not trigger default functionality		
	console.log(id);
	if (confirm('Are you sure you want to delete this list?')) {
		await fetch(`/delete/${id}`, {
			method: 'DELETE'
		});
		window.location.href = '/lists';
	} else {
		window.location.href = `/lists`;
	}

};
