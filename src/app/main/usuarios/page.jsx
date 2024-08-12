import axios from "axios";
import Link from "next/link";
import Fila from "../../components/Fila";
import Search from "../../components/Search";
import NewUser from "../../components/NewUser";
import SearchIcon from "../../assets/searchIcon";
import AddUserIcon from "../../assets/AddUserIcon";

async function loadUsers() {
  const { data } = await axios.get("http://localhost:3000/api/admin");
  return data;
}

async function page({ searchParams }) {
  const show = Boolean(searchParams.new) ?? false;
  const search = searchParams.search ?? false;
  const pageBefore = Number(searchParams.page ?? 1);
  const pageCurrent = pageBefore > 0 ? pageBefore - 1 : pageBefore;

  let usuarios = [];

  if (search) {
    const data = await axios.get(
      "http://localhost:3000/api/admin/search/" + search
    );
    usuarios = data.data;
  } else {
    usuarios = await loadUsers();
  }

  const pages = Math.ceil(usuarios.length / 10);
  const usersPag = usuarios.slice(pageCurrent * 10, (pageCurrent + 1) * 10);

  function getPagination() {
    const pagination = [];
    const paginationRange = 3;

    let startPage = Math.max(pageCurrent - paginationRange, 1);
    let endPage = Math.min(pageCurrent + paginationRange, pages);

    if (startPage > 2) {
      pagination.push(1);
      if (startPage > 3) {
        pagination.push("...");
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pagination.push(i);
    }

    if (endPage < pages - 1) {
      if (endPage < pages - 2) {
        pagination.push("...");
      }
      pagination.push(pages);
    }

    return pagination;
  }

  const pagination = getPagination();
  const hasPreviousPage = pageCurrent > 0;
  const hasNextPage = pageCurrent < pages - 1;

  let noUserMessage = "";

  if (usuarios.length === 0) {
    noUserMessage = search
      ? "No hay usuarios que coincidan con tu filtro actual"
      : "No hay usuarios registrados";
  }

  return (
    <div className="container_clients">
      <h1 className="font-bold text-primary text-lg">usuarios</h1>
      <span className="text-xs text-primary">La sección de usuarios ofrece una visión completa de todos los miembros registrados en la plataforma.</span><br /><br />
      {/* CONTENIDO PARA BUSCAR DATOS */}
      <div className="container_add">
        <div className="container_search">
          <Search />
          <SearchIcon className="search_icon" />
        </div>
        
        <Link href="/main/usuarios?new=1">
          <div className="container_btn">
            <AddUserIcon width={18} />
            <span>agregar</span>
          </div>
        </Link>
      </div>
      <br />
      {/* CONTENIDO PARA MOSTRAR DATOS DE LA BASE DE DATOS */}
      <div className="container_table">
        {usersPag.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>nombre(s)</th>
                <th>apellido(s)</th>
                <th>género</th>
                <th>cargo</th>
                <th>estado</th>
              </tr>
            </thead>
            <tbody>
              {usersPag.map((usuarios) => (
                <Fila usuarios={usuarios} key={usuarios.id} />
              ))}
            </tbody>
          </table>
        ) : (
          <p className="search_not_exit">{noUserMessage}</p>
        )}
      </div><br />
      {/* CONTENIDO PARA PODER MOSTRAR LA PAGINACION */}
      {pages > 1 && (
        <div className="container_page">
          <nav className="nav_page" aria-label="Pagination">
            {/* Flecha "Anterior" */}
            {hasPreviousPage && (
              <Link  href={`/main/usuarios?page=${pageCurrent}`} className="previous">
                <span className="sr-only">Previous</span>
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                </svg>
              </Link>
            )}

            {/* Páginas */}
            {pagination.map((pag, index) => {
              const isActive = pageCurrent + 1 === pag;
              const activeClass = isActive ? "z-10 bg-blue-950 text-white focus-visible:outline-indigo-600" : "text-blue-950 ring-1 ring-inset ring-gray-300 hover:bg-gray-50";

              return typeof pag === "number" ? (
                <Link key={index} href={`/main/usuarios?page=${pag}`} aria-current={isActive ? "page" : undefined} className={`page ${activeClass}`}> {pag} </Link>
              ) : (
                <span key={index} className="page_span"> {pag} </span>
              );
            })}

            {/* Flecha "Siguiente" */}
            {hasNextPage && (
              <Link href={`/main/usuarios?page=${pageCurrent + 2}`} className="next">
                <span className="sr-only">Next</span>
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                </svg>
              </Link>
            )}
          </nav>
        </div>
      )}
      
      <NewUser show={show} />
    </div>
  );
}

export default page;
