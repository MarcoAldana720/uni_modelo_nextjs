import { redirect } from "next/navigation";
import axios from "axios";
import Modal from './Modal'

export default function NewUser({show}) {
  async function data(formData) {
    'use server'
    const dataObject = Object.fromEntries(formData.entries());
    const [id, ...data] = Object.values(dataObject);
    console.log(data);

    // Caracteristicas Para Validar El Correo Electronico
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Valida Todos Los Datos Que Se Envian Al Formulario
    if (Object.values(data).includes("")) {
      console.log("Complete Los Campos");
      return;
    }

    // Valida Especificamente Los Datos Que Se Envia Al Correo Electronico
    if (!emailRegex.test(dataObject.correo)) {
      console.log("Correo Electronico Invalido");
      return;
    }

    // Permite Guardar Los Datos Introducidos A La Base De Datos
    try {
      const res = await axios.post("http://localhost:3000/api/admin", {
        nombres: dataObject.nombres,
        apellidos: dataObject.apellidos,
        usuario: dataObject.usuario,
        correo: dataObject.correo,
        contrasena: dataObject.contrasena,
        rol_id: dataObject.rol_id,
        estado_id: dataObject.estado_id,
      });
    } catch (error) {
      console.log(error);
    }

    // Y Redirecciona A La Siguiente Ruta
    redirect("/admin");
  }

  return (
    <Modal show={show} pathRedirect="/admin/">
      <div className="form">
        <div className="container_form_img">
          <img src="/img/logo_original.png" alt="Universidad Modelo" />
          <span>universidad modelo</span>
        </div>
        <form action={data}>
          <label htmlFor="nombres">nombre(s):</label>
          <br />
          <input type="text" name="nombres" />
          <br />

          <label htmlFor="apellidos">apellido(s):</label>
          <br />
          <input type="text" name="apellidos" />
          <br />

          <label htmlFor="usuario">usuario:</label>
          <br />
          <input type="text" name="usuario" />
          <br />

          <label htmlFor="correo">correo:</label>
          <br />
          <input type="email" name="correo" />
          <br />

          <label htmlFor="contrasena">contraseña:</label>
          <br />
          <input type="password" name="contrasena" />
          <br />

          <label htmlFor="tipo">tipo:</label>
          <br />
          {/* <input type="number" name="rol_id" /> */}
          <select name="rol_id">
            <option value="" selected>selecciona una opcion</option>
            <option value="1">administrador</option>
            <option value="2">cliente</option>
          </select>
          <br />

          <label htmlFor="estado">estado:</label>
          <br />
          {/* <input type="number" name="estado_id" /> */}
          <select name="estado_id">
            <option value="" selected>selecciona una opcion</option>
            <option value="1">activado</option>
            <option value="2">desactivado</option>
          </select>
          <br />

          <button>registrar</button>
        </form>
      </div>
    </Modal>
  );
}
