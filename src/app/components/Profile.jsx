"use client";

import { usePathname } from "next/navigation";
import Modal from "./Modal";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Profile({ show, userData }) {
  const pathname = usePathname();
  const [formData, setFormData] = useState({
    us_nombres: "",
    us_apellidos: "",
    us_usuario: "",
    us_correo: "",
    us_contrasena: "",
  });

  // Cargar los datos del usuario en el formulario cuando se abra el modal
  useEffect(() => {
    if (userData) {
      setFormData({
        us_nombres: userData.us_nombres || "",
        us_apellidos: userData.us_apellidos || "",
        us_usuario: userData.us_usuario || "",
        us_correo: userData.us_correo || "",
        us_contrasena: "", // Deja la contraseña en blanco a menos que se cambie
      });
    }
  }, [userData]);

  // Manejar los cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Manejar el envío del formulario para actualizar los datos
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put('/api/auth/profile', formData, { withCredentials: true });
      // Aquí puedes agregar lógica adicional, como cerrar el modal o actualizar el estado
      alert("Perfil actualizado exitosamente");
    } catch (error) {
      console.error("Error al actualizar el perfil:", error);
      alert("Hubo un error al actualizar el perfil");
    }
  };

  return (
    <Modal show={show} pathRedirect={pathname}>
      <div className="form">
        <form onSubmit={handleSubmit}>
          <label htmlFor="us_nombres">nombre(s):</label><br />
          <input 
            type="text" 
            name="us_nombres" 
            value={formData.us_nombres} 
            onChange={handleChange} 
            required 
          /><br />

          <label htmlFor="us_apellidos">apellido(s):</label><br />
          <input 
            type="text" 
            name="us_apellidos" 
            value={formData.us_apellidos} 
            onChange={handleChange} 
            required 
          /><br />

          <label htmlFor="us_usuario">usuario:</label><br />
          <input 
            type="text" 
            name="us_usuario" 
            value={formData.us_usuario} 
            onChange={handleChange} 
            required
          /><br />

          <label htmlFor="us_correo">correo:</label><br />
          <input 
            type="email" 
            name="us_correo" 
            value={formData.us_correo} 
            onChange={handleChange} 
            required 
          /><br />

          <label htmlFor="us_contrasena">contraseña:</label><br />
          <input 
            type="password" 
            name="us_contrasena" 
            value={formData.us_contrasena} 
            onChange={handleChange} 
            placeholder="Deja en blanco para no cambiar"
          /><br />

          <button type="submit">Guardar</button>
        </form>
      </div>
    </Modal>
  );
}
