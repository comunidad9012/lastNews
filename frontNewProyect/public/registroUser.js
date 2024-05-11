//http://127.0.0.1:5000/user/createUser

registro=document.querySelector('#registro');
formulario=document.querySelector('#formRegistro');

registro.addEventListener('click',async (e)=>{
    e.preventDefault() // Prevenir el comportamiento por defecto del formulario
    const nombre=document.querySelector('#name').value;
    const user=document.querySelector('#user').value;
    const passw=document.querySelector('#password').value;
    const email=document.querySelector('#email').value;

    datos={ //crear un objeto para pasar los datos en formato json
        name: nombre,
        user: user,
        password: passw,
        email: email
    };
    console.log("datos:", datos);
    await fetch("http://127.0.0.1:5000/user/createUser",{
       method: 'POST', 
       headers: {
           'content-type': 'application/json'
        },
       body: JSON.stringify(datos)

   }).then(resp=>resp.json()).then(resp=> console.log(resp))
    .catch(err=>console.log(err))
    formulario.reset()
    //window.location.href='index.html'
});