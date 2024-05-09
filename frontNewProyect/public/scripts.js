
document.querySelector('.formNoticia').addEventListener('submit', event=>{
    event.preventDefault();

    var contenido = tinymce.activeEditor.getContent();
    var data = {
        noticia: contenido
    };

    if (contenido==""){
         const form = document.querySelector(".formNoticia")
         const error = document.createElement("p")
        error.textContent = "La noticia no puede estar vacia"
        error.classList.add('fs-5', 'text', 'text-danger')
        form.appendChild(error)
    }else{
        const error = document.querySelector(".text-danger")
        document.removeChild(error)
    fetch("http://localhost:5000/news/createNews", {
        method: 'POST', headers: {
            'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    }).then(resp=>resp.json()).then(resp=> {
        if (resp.contenido== "exitoso"){
            alert("Noticia cargada con exito")
        }

    }).catch(err=> alert("Tenemos problemas para cargar tu noticia :("))
    }
});

