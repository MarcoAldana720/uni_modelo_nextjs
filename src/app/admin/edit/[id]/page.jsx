import axios from "axios";
import { redirect } from "next/navigation/";

async function loadUsers(userId) {
  try {
    const { data } = await axios.get("http://localhost:3000/api/admin/" + userId);
    return data;
  } catch (error) {
    console.log(error);
  }
}

async function page({params}) {
  const user = await loadUsers(params.id);

  const { data } = await axios.get("http://localhost:3000/api/admin/rol");
  console.log(data);

  const dataStatus = await axios.get("http://localhost:3000/api/admin/status");

  console.log(data);

  const { id, nombres, apellidos, usuario, correo, contrasena, rol_id, status_id, rol_description, status_description} = user;

  async function editAction(formData) {
    "use server"

    const info = Object.fromEntries(formData);
    console.log(info);
    
    const dataUpdate = {nombres:info.nombres, apellidos:info.apellidos, usuario:info.usuario, correo:info.correo, contrasena:info.contrasena, rol_id:+info.rol_id, estado_id:+info.estado_id};

    console.log(dataUpdate);

    try {
      await axios.put("http://localhost:3000/api/admin/" + id, dataUpdate);
      
    } catch (error) {
      console.log(error);
    }
    redirect("/admin");
  }

  return (
    <div>
      <form action={editAction}>
        <label htmlFor="nombres">Nombre(s):</label><br/>
        <input type="text" name="nombres" defaultValue={nombres} /><br/>

        <label htmlFor="apellidos">Apellido(s):</label><br/>
        <input type="text" name="apellidos" defaultValue={apellidos} /><br/>

        <label htmlFor="usuario">Usuario:</label><br/>
        <input type="text" name="usuario" defaultValue={usuario} /><br/>

        <label htmlFor="correo">Correo:</label><br/>
        <input type="email" name="correo" defaultValue={correo} /><br/>

        <label htmlFor="contrasena">Contraseña:</label><br/>
        <input type="password"  name="contrasena" defaultValue={contrasena} /><br/>

        <label htmlFor="tipo">Tipo:</label><br/>
        <select name="rol_id" defaultValue={rol_id}>
          {data.map(rol => <option value={rol.id}>{rol.rol_description}</option>)}
        </select><br />

        <label htmlFor="estado">Estado:</label><br/>
        <select name="estado_id" defaultValue={status_id}>
          {dataStatus.data.map(status => <option value={status.id}>{status.status_description}</option>)}
        </select><br />

        <button>Editar Datos</button>
      </form>
    </div>
  )
}

export default page
