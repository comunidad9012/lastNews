document.querySelector('.formNoticia').addEventListener('submit', event => {
    event.preventDefault();
    var titulo = document.getElementById('titulo').value;
    var contenido = tinymce.activeEditor.getContent();
    var data = {
        titulo: titulo,
        noticia: contenido
    };
    
    if (contenido == "") {
        const form = document.querySelector(".formNoticia");
        const error = document.createElement("p");
        // error.textContent = "¡La noticia no puede estar vacía!";
        // error.classList.add('fs-5', 'text', 'text-danger');
        // form.appendChild(error);
        showErrorMessage("¡La noticia no puede estar vacía!");
    } else {
        const error = document.querySelector(".text-danger");
        if (error) {
            error.remove();
        }
        fetch("http://localhost:5000/news/createNews", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(resp => resp.json()).then(resp => {
            if (resp.contenido == "exitoso") {
                document.getElementById('titulo').value = '';
                showSuccessMessage("¡Noticia creada exitosamente!");
                // Limpiar el contenido del editor TinyMCE
                tinymce.activeEditor.setContent('');

            }
        }).catch(err => showErrorMessage("Tenemos problemas para cargar tu noticia :("));
    }
});

//mensajes de éxito
function showSuccessMessage(message) {
    var successDiv = document.getElementById('message-success');
    var successMessage = document.getElementById('success-message');
    successMessage.textContent = message;
    successDiv.style.display = 'block';
    // Ocultar el mensaje después de 5 segundos (5000 milisegundos)
    setTimeout(function() {
        successDiv.style.display = 'none';
    }, 5000);
}

//mensajes de error
function showErrorMessage(message) {
    var errorDiv = document.getElementById('message-error');
    var errorMessage = document.getElementById('error-message');
    errorMessage.textContent = message;
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
// showErrorMessage("Ha ocurrido un error al procesar la solicitud.");// Función para crear una nueva noticia
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
