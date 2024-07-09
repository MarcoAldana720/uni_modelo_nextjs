import { redirect } from "next/navigation";

function Search() {
  async function search_value(formData){
    "use server"

    // const value = formData.get("search");
    // redirect("/admin?search=" + value);
    
    const value = formData.get("search");
    if (!value) {
      redirect("/admin");
    } else {
      redirect("/admin?search=" + value);
    }
  }  

  return (
    <form action={search_value}>
      <input type="text" placeholder="Buscar..." name="search" />
    </form>
  )
}

export default Search
