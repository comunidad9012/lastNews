// Función para crear una nueva noticia
function crearNoticia(noticia) {
    return fetch("http://localhost:5000/news/createNews", {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(noticia)
    })
    .then(resp => resp.json())
    .then(resp => {
        console.log(resp);
        // // Mostrar el mensaje de éxito como una alerta
        // alert('¡Noticia creada exitosamente!');
        showSuccessMessage("¡Noticia creada exitosamente!");
        // Limpiar el contenido del editor TinyMCE
        tinymce.activeEditor.setContent('');
    })
    .catch(error => console.error('Error al crear la noticia:', error));
}

// Event listener para el formulario de la noticia
document.querySelector('.formNoticia').addEventListener('submit', event => {
    event.preventDefault();
    var contenido = tinymce.activeEditor.getContent();
    var data = {
        noticia: contenido
    };
    console.log(contenido);
    // Llamada a la función crearNoticia
    crearNoticia(data);
});

// Función para obtener todas las noticias
function obtenerNoticias() {
    return fetch('http://localhost:5000/news')
        .then(response => response.json())
        .catch(error => console.error('Error al obtener las noticias:', error));
}

// Función para actualizar noticias
function actualizarNoticia(id, nuevaNoticia) {
    return fetch(`http://localhost:5000/news/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(nuevaNoticia)
    })
    .then(response => response.json())
    .catch(error => console.error('Error al actualizar la noticia:', error));
}

// Función para eliminar noticias
function eliminarNoticia(id) {
    return fetch(`http://localhost:5000/news/${id}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .catch(error => console.error('Error al eliminar la noticia:', error));
}

//FUNCIONES PARA MENSAJES DE EXITO/ERROR
//mensaje de éxito
function showSuccessMessage(message) {
    var successDiv = document.getElementById('message-success');
    var successMessage = document.getElementById('success-message');
    successMessage.innerHTML = message;
    successDiv.style.display = 'block';
    // Ocultar el mensaje después de 5 segundos (5000 milisegundos)
    setTimeout(function() {
        successDiv.style.display = 'none';
    }, 5000);
}
//mensaje de error
function showErrorMessage(message) {
    var errorDiv = document.getElementById('message-error');
    var errorMessage = document.getElementById('error-message');
    errorMessage.innerHTML = message;
    errorDiv.style.display = 'block';
    // Ocultar el mensaje después de 5 segundos (5000 milisegundos)
    setTimeout(function() {
        errorDiv.style.display = 'none';
    }, 5000);
}
// Función para cerrar un mensaje manualmente
function closeMessage(messageId) {
    var messageDiv = document.getElementById(messageId);
    messageDiv.style.display = 'none';
}

// Luego, puedes llamar a estas funciones en tu código JavaScript según sea necesario para mostrar mensajes dinámicos.
// Por ejemplo:
// showSuccessMessage("¡Operación exitosa!");
// showErrorMessage("Ha ocurrido un error al procesar la solicitud.");
