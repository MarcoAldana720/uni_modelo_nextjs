import ButtonEdit from "../../../components/ButtonEdit";
import axios from "axios";
import Link from "next/link";
import { redirect } from "next/navigation";
import EditUser from "../../../components/EditUser";

async function loadUsers(userId) {
    try {
      const { data } = await axios.get("http://localhost:3000/api/admin/" + userId);
      return data;
    } catch (error) {
      console.log(error);
    }
}

async function page({searchParams,params}) {
  const user = await loadUsers(params.id);
  console.log(user);

  const { us_id, us_nombres, us_apellidos, rol_descripcion, es_descripcion} = user;

  // Inicio: Funcion Para Mostrar Las Iniciales De Su Nombre(s) Y Apellido(s) Del Usuario
  const getInitials = (nombres, apellidos) => {
    const firstNameInitial = nombres ? nombres.charAt(0) : '';
    const lastNameInitial = apellidos ? apellidos.charAt(0) : '';
    return firstNameInitial + lastNameInitial;
  }

  const initials = getInitials(us_nombres, us_apellidos);
  // Final: Funcion Para Mostrar Las Iniciales De Su Nombre(s) Y Apellido(s) Del Usuario

  // Inicio: Funcion Que Resetear Contraseña De Un Usuario
  async function eliminar(FormData) {
    "use server"

    const id = FormData.get("id");
    await axios.put("http://localhost:3000/api/admin/" + id + "/reset-password/");
    redirect("/main/usuarios");
  }
  // Final: Funcion Que Resetear Contraseña De Un Usuario
  console.log(searchParams);

  return (
    <div className="capitalize font-bold text-primary">
      <EditUser show={Boolean(searchParams.edit)} />

      <Link href="/main/usuarios">&lt; regresar</Link>
      <div className="text-center border-2 border-gray-200 bg-white w-80 h-2/4 m-auto p-5 rounded-md">
        <div className="flex items-center justify-center rounded-full w-40 h-40 bg-primary m-auto text-white text-4xl font-bold uppercase">
          {initials}
        </div>

        <h1 className="text-xl my-2">{us_nombres + " " + us_apellidos}</h1>
        <p className="text-ms mb-2">{rol_descripcion}</p>
        <p className="text-ms mb-2">{es_descripcion}</p>
        <form action={eliminar}>
          <input type="hidden" value={us_id} name="id" />
          <button className="capitalize border-2 border-orange-500 p-1 rounded-md mb-2 w-48 bg-orange-500 text-white">restaurar contraseña</button>
        </form>
        <ButtonEdit id={us_id} />
      </div>
    </div>
  )
}

export default page