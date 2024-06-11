import { useState, useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

function Create() {
  const [titulo, setTitulo] = useState('');
  const [noticia, setContent] = useState('');
  const editorRef = useRef(null);

  const handleEditorChange = (content, editor) => {
    setContent(content);
  };

  const handleTituloChange = (event) => {
    setTitulo(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const fechaAct = new Date().toLocaleDateString();

    const data = {
      titulo,
      noticia,
      fecha: fechaAct
    };

    fetch('http://localhost:5000/news/createNews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      alert('Noticia cargada con éxito');
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Error al cargar la noticia: ' + error.message);
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="container text-center col-md-8 mt-4 mb-4 ">
          <label htmlFor="titulo"><h5>Titulo</h5></label>
          <input type="text" className="form-control" id="titulo" value={titulo} onChange={handleTituloChange} required />
          <h5 className='mt-2'>Cuerpo</h5>
        </div>
        <Editor
          apiKey='1hyldt9u4byda8tjkhrxwy3zqocdzt2fujo24fy4spgi9wmc'
          onInit={(evt, editor) => editorRef.current = editor}
          init={{
            height: 500,
            menubar: true,
            language: 'es',
            plugins: [
              'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
              'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
              'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
            ],
            toolbar: 'undo redo | formatselect | bold italic forecolor | ' +
              'alignleft aligncenter alignright alignjustify | ' +
              'bullist numlist outdent indent | removeformat | image | help',
            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
            images_upload_url: 'http://localhost:5000/imgs/upload',
            automatic_uploads: true,
            file_picker_types: 'image',
            file_picker_callback: (cb, value, meta) => {
              const input = document.createElement('input');
              input.setAttribute('type', 'file');
              input.setAttribute('accept', 'image/*');

              input.onchange = function() {
                const file = this.files[0];

                const formData = new FormData();
                formData.append('file', file);

                fetch('http://localhost:5000/imgs/upload', {
                  method: 'POST',
                  body: formData
                }) //ver de ir eliminando imagenes si se eliminan en el tiny, si no se puede spamear imagenes al servidor sin subir noticias
                .then(response => response.json())
                .then(data => {
                  if (data.location) {
                    cb(data.location, { title: file.name });
                  } else {
                    console.error('Error: la respuesta no contiene la URL de la imagen.');
                    alert('Error: la respuesta no contiene la URL de la imagen.');
                  }
                })
                .catch(error => {
                  console.error('Error:', error);
                  alert('Error al subir la imagen: ' + error.message);
                });
              };

              input.click();
            }
          }}
          onEditorChange={handleEditorChange}
        />
        <div className="container text-center mt-2">
          <button type="submit" className="btn btn-success">Cargar Noticia</button>
        </div>
      </form>
    </div>
  );
}

export default Create;


