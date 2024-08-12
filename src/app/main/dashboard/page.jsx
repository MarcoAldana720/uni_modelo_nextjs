import Link from "next/link";
import UserIcon from "../../assets/UserIcon"
import axios from "axios";
import ReportsIcon from "../../assets/ReportsIcon";

async function loadUsers() {
  const { data } = await axios.get("http://localhost:3000/api/admin");
  return data;
}

async function page({params}) {
  let users = await loadUsers();

  const sizeData = users.length

  return (
    <div>
      <h1 className="capitalize font-bold text-primary text-lg">panel de control</h1><br />
      <div className="flex items-center">
        {/* CONTENEDOR DE USUARIOS */}
        <Link href="/main/usuarios">
          <div className="bg-primary text-white w-52 h-28 rounded-lg px-3 py-5 mr-3 flex items-center">
            <div className="w-36 h-14">
              <p className="text-3xl">{sizeData}</p>
              <p className="text-xs capitalize">usuarios</p>
            </div>
            <div className="w-11 h-14">
              <UserIcon className="w-10 fill-white size-full" />
            </div>
          </div>
        </Link>

        {/* CONTENEDOR DE DOCUMENTOS */}
        <Link href="/main/usuarios">
          <div className="bg-primary text-white w-52 h-28 rounded-lg px-3 py-5 flex items-center">
            <div className="w-36 h-14">
              <p className="text-3xl">100</p>
              <p className="text-xs capitalize">reportes</p>
            </div>
            <div className="w-11 h-14">
              <ReportsIcon className="w-10 fill-white size-full" />
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default page
