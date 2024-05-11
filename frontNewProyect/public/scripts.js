
document.querySelector('.formNoticia').addEventListener ('submit', event=>{
    event.preventDefault();
    var contenido = tinymce.activeEditor.getContent();
    var data = {
        noticia: contenido
    };
    console.log(contenido)
    fetch("http://localhost:5000/news/createNews", {
        method: 'POST', headers: {
            'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    }).then(resp=>resp.json()).then(resp=> console.log(resp))
 });






