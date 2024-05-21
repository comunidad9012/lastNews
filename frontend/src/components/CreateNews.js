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
    })
    .catch(error => {
      console.error('Error:', error);
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
            images_upload_url: 'http://localhost:5000/upload',
            automatic_uploads: true,
            file_picker_types: 'image',
            file_picker_callback: (cb, value, meta) => {
              const input = document.createElement('input');
              input.setAttribute('type', 'file');
              input.setAttribute('accept', 'image/*');

              input.onchange = function() {
                const file = this.files[0];
                const reader = new FileReader();
                reader.onload = () => {
                  const id = 'blobid' + (new Date()).getTime();
                  const blobCache = editorRef.current.editorUpload.blobCache;
                  const base64 = reader.result.split(',')[1];
                  const blobInfo = blobCache.create(id, file, base64);
                  blobCache.add(blobInfo);
                  cb(blobInfo.blobUri(), { title: file.name });
                };
                reader.readAsDataURL(file);
              };

              input.click();
            }
          }}
          onEditorChange={handleEditorChange}
        />
        <div className="conteiner text-center mt-2">
          <button type="submit" className="btn btn-success">Cargar Noticia</button>
        </div>
      </form>
    </div>
  );
}

export default Create;

