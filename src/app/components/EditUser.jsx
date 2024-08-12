"use client";

import Modal from "./Modal";
import { useEffect, useState } from "react";
import { usePathname, useParams, useRouter } from "next/navigation";
import { updateUserAction } from '../actions/registerAction';
import axios from "axios";
import { toast } from 'sonner'

async function loadUsers(userId) {
  try {
    const { data } = await axios.get(
      "http://localhost:3000/api/admin/" + userId
    );
    return data;
  } catch (error) {
    console.log(error);
  }
}

export default function EditUser({ show }) {
  const pathname = usePathname();
  const { id } = useParams();
  const router = useRouter()

  const [loading, setloading] = useState(true);
  const [info, setinfo] = useState({
    us_id: "",
    us_nombres: "",
    us_apellidos: "",
    us_usuario: "",
    us_correo: "",
    us_contrasena: "",
    gen_id: "",
    gen_descripcion: "",
    rol_id: "",
    rol_descripcion: "",
    es_id: "",
    es_descripcion: "",
  });

  useEffect(() => {
    loadUsers(id)
      .then((data) => {
        setinfo(data);
        setloading(false)
      })
      .catch((error) => {
        console.log(error);
      })
  }, []);

  console.log(loading);

  async function handleSubmit(e) {
    e.preventDefault();
    const form = new FormData(e.target);
    const dataObject = Object.fromEntries(form);


    try {
      const res = await updateUserAction(id,dataObject);
      if (res.status === 404) {
        throw new Error(res.message);
      }
      toast.success(res.message);
      router.refresh("/main/usuarios");
      router.push('/main/usuarios')
    } catch (error) {
      toast.error(error.message);
    }
  }
  return (
    <Modal show={show} pathRedirect={pathname}>
      {!loading ? (
        <div className="form">
          <form onSubmit={handleSubmit}>
            <label htmlFor="us_nombres">nombre(s):</label><br />
            <input type="text" name="us_nombres" defaultValue={info.us_nombres} required/><br />

            <label htmlFor="us_apellidos">apellido(s):</label><br />
            <input type="text" name="us_apellidos" defaultValue={info.us_apellidos} required /><br />

            <label htmlFor="us_genero_id">género:</label><br />
            <select name="us_genero_id" defaultValue={info.gen_id}>
              <option value="">selecciona una opcion</option>
              <option value="1">masculino</option>
              <option value="2">femenina</option>
            </select><br />

            <label htmlFor="us_usuario">usuario:</label><br />
            <input type="text" name="us_usuario" defaultValue={info.us_usuario} required /><br />

            <label htmlFor="us_correo">correo:</label><br />
            <input type="email" name="us_correo" defaultValue={info.us_correo} required /><br />

            <label htmlFor="us_rol_id">cargo:</label><br />
            <select name="us_rol_id" defaultValue={info.rol_id} required>
              <option value="">selecciona una opcion</option>
              <option value="1">administrador</option>
              <option value="2">visualizador</option>
              <option value="3">usuario</option>
            </select><br />

            <label htmlFor="us_estado_id">estado:</label><br />
            <select name="us_estado_id" defaultValue={info.es_id} required>
              <option value="">selecciona una opcion</option>
              <option value="1">activado</option>
              <option value="2">desactivado</option>
            </select><br />

            <button>Editar</button>
          </form>
        </div>
      ) : (
        <p>Cargando...</p>
      )}
    </Modal>
  );
}
