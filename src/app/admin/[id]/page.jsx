import ButtonEdit from "@/app/components/ButtonEdit";
import axios from "axios";
import { redirect } from "next/navigation";


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
  console.log(user);

  const { id, nombres, apellidos, rol_description, status_description} = user;

  // Inicio: Funcion Que Eliminar Un Usuario
  async function eliminar(FormData) {
    "use server"
    // console.log("borrando..." + FormData.get("id"));

    const id = FormData.get("id");
    await axios.delete("http://localhost:3000/api/admin/" + id);
    redirect("/admin");
  }
  // Final: Funcion Que Eliminar Un Usuario
  
  return (
    <div>
      <h1>{nombres}</h1>
      <p>{apellidos}</p>
      <p>{rol_description}</p>
      <p>{status_description}</p>
      <form action={eliminar}>
        <input type="hidden" value={id} name="id" />
        <button>eliminar</button>
      </form>
      <ButtonEdit id={id} />
    </div>
  )
}

export default page