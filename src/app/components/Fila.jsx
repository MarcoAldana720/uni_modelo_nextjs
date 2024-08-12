"use client"

import { useRouter } from "next/navigation";

export default function Fila({usuarios}) {
    const router = useRouter();

    function redireccion(id) {
        router.push("/main/usuarios/" + id);
    }

  return (
    <tr key={usuarios.us_id} onClick={() => redireccion(usuarios.us_id)}>
        <td>{usuarios.us_nombres}</td>
        <td>{usuarios.us_apellidos}</td>
        <td>{usuarios.gen_descripcion}</td>
        <td>{usuarios.rol_descripcion}</td>
        <td>{usuarios.es_descripcion}</td>
    </tr>
  )
}
