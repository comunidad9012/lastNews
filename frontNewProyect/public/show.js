document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:5000/news/showNews', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(response => response.json())
    .then(data => {
        const noticiasDiv = document.getElementById('noticias');
        let row;
        data.forEach((noticia, index) => {
            if (index % 3 === 0) {
                row = document.createElement('div');
                row.classList.add('row', 'mt-4');
                noticiasDiv.appendChild(row);
            }
            const noticiaElement = document.createElement('div');
            noticiaElement.classList.add('col');
            const titulo = document.createElement('h2');
            titulo.textContent = noticia.titulo;
            noticiaElement.appendChild(titulo);
            const enlace = document.createElement('a');
            enlace.textContent = 'Leer';
            enlace.href = '/news/viewNews/' + noticia._id.$oid;
            noticiaElement.appendChild(enlace);
            row.appendChild(noticiaElement);
        });
    })
    .catch(error => console.error('Error:', error));
});
