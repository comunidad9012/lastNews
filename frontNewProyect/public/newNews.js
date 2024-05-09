document.querySelector('.formNoticia').addEventListener('submit', event => {
    event.preventDefault();
    
    var contenido = tinymce.activeEditor.getContent();
    var data = {
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
// showErrorMessage("Ha ocurrido un error al procesar la solicitud.");