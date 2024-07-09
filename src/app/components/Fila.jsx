"use client"

import { useRouter } from "next/navigation";

export default function Fila({user}) {
    const router = useRouter();

    function redireccion(id) {
        router.push("/admin/" + id);
    }

  return (
    <tr key={user.id} onClick={() => redireccion(user.id)}>
        <td>{user.nombres}</td>
        <td>{user.apellidos}</td>
        <td>{user.rol_description}</td>
        <td>{user.status_description}</td>
    </tr>
  )
}
