import React, { useState } from "react";

function Registro() {
  return (
    <div>
      <h1>registro de usuario</h1>
      <Formulario />
    </div>
  );
}

function Formulario() {
  let data = {};
  const [state, setState] = useState({
    nombre: "",
    passw: "",
  });

  const inputChange = (e) => {
    const { name, value } = e.target;
    const { password, values } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
      [password]: values,
    }));
  };

  const manejo = (e) => {
    e.preventDefault();

    data = {
      nombre: state.email,
      password: state.password,
    };

    console.log(data);
    fetch("http://127.0.0.1:5000/user/createUser", {
      method: "POST",
      headers: {
        "content-type": "aplication/json",
      },
      body: JSON.stringify(data),
    })
      .then((resp) => resp.json())
      .then((resp) => resp.console.log(resp))
      .then((err) => console.log(err));
  };

  return (
    <form onSubmit={manejo}>
      <div class="mb-3 row">
        <label for="staticEmail" class="col-sm-2 col-form-label">
          Email
        </label>
        <div class="col-sm-10">
          <input
            type="text"
            readonly
            class="form-control-plaintext"
            id="name"
            name="email"
            onChange={inputChange}
          />
        </div>
      </div>
      <div class="mb-3 row">
        <label for="inputPassword" class="col-sm-2 col-form-label">
          Password
        </label>
        <div class="col-sm-10">
          <input
            type="password"
            class="form-control"
            id="password"
            name="password"
            onChange={inputChange}
          />
        </div>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}
export default Registro;
