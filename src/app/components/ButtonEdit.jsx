"use client"

import Link from "next/link"

function ButtonEdit({id}) {
  return (
    <Link href={"/admin/edit/" + id}>Editar</Link>
  )
}

export default ButtonEdit
