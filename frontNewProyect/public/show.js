crear=document.querySelector('#crearNoticia');
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
            noticiaElement.classList.add('mi-clase-css');
            titulo.classList.add('titulo');
            noticiaElement.appendChild(titulo);

            const enlace = document.createElement('a');
            enlace.textContent = 'Leer';
            enlace.href = 'http://127.0.0.1:5500/lastNews/frontNewProyect/public/news/viewNews/' + noticia._id.$oid;
            enlace.classList.add('titulo');
            noticiaElement.appendChild(enlace);
            row.appendChild(noticiaElement);
            
            const fecha=document.createElement('p')
            fecha.textContent = noticia.fecha
            fecha.classList.add('bottom');
            noticiaElement.appendChild(fecha);
        });
    })
    .catch(error => console.error('Error:', error));
});



crear.addEventListener('click', (e) =>{
    //e.preventDefault();
    window.location.href = "http://127.0.0.1:5500/lastNews/frontNewProyect/public/newNews.html"

});