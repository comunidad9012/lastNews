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
            //enlace.href = 'http://127.0.0.1:5500/lastNews/frontNewProyect/public/news/viewNews/' + noticia._id.$oid;
            //este href manda a una ruta invalida y tiene otro puerto, lo dejo comentado por si es error del merge
            enlace.href = 'http://127.0.0.1:5000/news/viewNews/' + noticia._id.$oid;
            //este es el que anda pero sigue funcionando con jinja (arreglar el de arriba o mover los archivos a templates)
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
    //window.location.href = "http://127.0.0.1:5500/lastNews/frontNewProyect/public/newNews.html"
    //lo mismo que el href de arriba, manda a otro lado y otro puerto
    window.location.href = "http://127.0.0.1:5000/newNews.html"//reemplazar si se soluciona el de arriba

});