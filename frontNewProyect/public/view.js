
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    fetch(`http://localhost:5000/news/viewNews`, { //Esta es la url que deberia funcionar pero no anda por que hay que añadir el .html para ver el doc
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        const noticiasDiv = document.getElementById('noticia');
        const noticiaElement = document.createElement('div');
        noticiaElement.innerHTML = data.noticia; 
        noticiasDiv.appendChild(noticiaElement);
    })
    .catch(error => console.error('Error:', error));
});