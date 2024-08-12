import { redirect } from "next/navigation";

function Search() {
  async function search_value(formData){
    "use server"

    // const value = formData.get("search");
    // redirect("/admin?search=" + value);
    
    const value = formData.get("search");
    if (!value) {
      redirect("/main/usuarios");
    } else {
      redirect("/main/usuarios?search=" + value);
    }
  }  

  return (
    <form action={search_value}>
      <input type="text" placeholder="buscar..." name="search" />
    </form>
  )
}

export default Search
