import axios from "axios";
import { redirect } from "next/dist/server/api-utils";
import Link from "next/link";
import Fila from "../components/Fila";
import Search from "../components/Search";
import NewUser from "../components/NewUser";
import SearchIcon from "../assets/searchIcon";

async function loadUsers() {
  const { data } = await axios.get("http://localhost:3000/api/admin");
  return data;
}

async function page({ searchParams }) {
  const show = Boolean(searchParams.new) ?? false;
  const search = searchParams.search ?? false;
  const pageBefore = Number(searchParams.page ?? 0) ;
  const pageCurrent = pageBefore > 0 ? pageBefore - 1 : pageBefore ;

  let users = [];

  if (search) {
    const data = await axios.get(
      "http://localhost:3000/api/admin/search/" + search
    );
    users = data.data;
  } else {
    users = await loadUsers();
  }

  function redireccion(id) {
    redirect("/admin/" + id);
  }

  const pages = Math.ceil(users.length / 10);
  const pagination = Array.from({ length: pages }, (_, i) => i + 1);
  const usersPag = users.slice( pageCurrent * 10, (pageCurrent + 1) * 10  )
  
  return (
    <div className="container_clients">
      {/* CONTENIDO PARA BUSCAR DATOS */}
      <div className="container_add">
        <div className="container_search">
          <Search />
          <SearchIcon  className="w-5 h-5 text-zinc-300" />
        </div>
        <div className="container_btn">
          <Link href="/admin?new=1">agregar</Link>
        </div>
      </div>
      <br />
      {/* CONTENIDO PARA MOSTRAR DATOS DE LA BASE DE DATOS */}
      <div className="container_table">
        {usersPag.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>nombre</th>
                <th>apellido</th>
                <th>tipo</th>
                <th>estado</th>
              </tr>
            </thead>
            <tbody>
              {usersPag.map((user) => (
                <Fila user={user} />
              ))}
            </tbody>
          </table>
        ) : (
          <p className="search_not_exit">no hay usuario que coincidan con tu filtro actual</p>
        )}
      </div><br />
      {pages !== 0 && (
        <div className="flex items-center justify-center gap-2">
          {pagination.map((pag) => {
            const active = (pageCurrent + 1) === pag ? "bg-blue-950 text-neutral-50" : "bg-gray-100";          
            return (
              <Link
                href={`/admin?page=${pag}`}
                className={` size-8 rounded-full grid place-items-center ${active}`}
              >
                {pag}
              </Link>
            );
          })}
        </div>
      )}
      <NewUser show={show} />
    </div>
  );
}

export default page;
