"use client"

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function LoginForm() {
  const [credentials, setCredentials] = useState({
    us_usuario: "",
    us_contrasena: "",
  });

  const router = useRouter();

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(credentials);
    try {
      const response = await axios.post("/api/auth/login", credentials);
      // console.log(response.data);
      
      if (response.status === 200) {
        const { role } = response.data;
        if (role.id === 1) {
          router.push("/main/dashboard");
        } else if (role.id === 2) { 
          router.push("/visualizador");
        } else if (role.id === 3) {
          router.push("/usuario");
        }

        // toast.success("Su sesión ha iniciado correctamente");
      }
    } catch (error) {
      console.log(error);
      toast.error("Usuario y/o contraseña incorrectos");
    }
  };

  return (
    <div className="container_login">
      <div className="container_center">
        <div className="container_img">
          <img src="/img/logo_original.png" alt="Universidad Modelo" />
        </div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="us_usuario">Usuario:</label>
          <br />
          <input type="text" id="us_usuario" name="us_usuario" required onChange={handleChange}/>
          <br /><br />
          <label htmlFor="us_contrasena">Contraseña:</label>
          <br />
          <input type="password" id="us_contrasena" name="us_contrasena" required onChange={handleChange}/>
          <br /><br />
          <button type="submit">Iniciar Sesión</button>
          <br />
        </form>
      </div>
    </div>
  );
}
