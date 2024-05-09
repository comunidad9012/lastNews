document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:5000/news/showNews', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
    })
    .then(response => response.json())
    .then(data => {
        const noticiasDiv = document.getElementById('noticias');
        data.forEach(noticia => {
            const noticiaElement = document.createElement('div');
            noticiaElement.innerHTML = noticia.noticia;
            noticiaElement.setAttribute('data-id', noticia._id.$oid);
            const enlace = document.createElement('a');
            enlace.textContent = 'Leer';
            enlace.href = '/news/viewNews?id=' + noticia._id.$oid; //aca hay que ver como manejar la ruta y los parametros para mostrar el html bien
            noticiaElement.appendChild(enlace);
            noticiasDiv.appendChild(noticiaElement);
        });
    })
    .catch(error => console.error('Error:', error));
});