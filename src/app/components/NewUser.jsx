'use client'

import { useRouter } from 'next/navigation';
import Modal from './Modal';
import { toast } from 'sonner';
import { registerUserAction } from '../actions/registerAction';

export default function NewUser({show}) {
  const router = useRouter();

  async function data(formData) {
    const dataObject = Object.fromEntries(formData.entries());
    const [id, ...data] = Object.values(dataObject);
    console.log(data);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const form = new FormData(e.target);
    const dataObject = Object.fromEntries(form);

    try {
      const res = await registerUserAction(dataObject);
      if (res.status === 404) {
        throw new Error(res.message);
      }
      toast.success(res.message);
      router.push("/main/usuarios");
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <Modal show={show} pathRedirect="/main/usuarios">
      <div className="form">
        <form onSubmit={handleSubmit}>
          <label htmlFor="us_nombres">nombre(s):</label>
          <br />
          <input type="text" name="us_nombres" required/>
          <br />

          <label htmlFor="us_apellidos">apellido(s):</label>
          <br />
          <input type="text" name="us_apellidos" required/>
          <br />

          <label htmlFor="us_genero_id">género:</label>
          <br />
          <select name="us_genero_id" required>
            <option value="">selecciona una opcion</option>
            <option value="1">masculino</option>
            <option value="2">femenina</option>
          </select>
          <br />

          <label htmlFor="us_usuario">usuario:</label>
          <br />
          <input type="text" name="us_usuario" required/>
          <br />

          <label htmlFor="us_correo">correo:</label>
          <br />
          <input type="email" name="us_correo" required/>
          <br />

          <label htmlFor="us_rol_id">cargo:</label>
          <br />
          <select name="us_rol_id" required>
            <option value="">selecciona una opcion</option>
            <option value="1">administrador</option>
            <option value="2">visualizador</option>
            <option value="3">usuario</option>
          </select>
          <br />

          <button>registrar</button>
        </form>
      </div>
    </Modal>
  );
}
