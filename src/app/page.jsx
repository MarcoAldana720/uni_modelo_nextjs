import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div className="container_login">
        <div className="container_center">
          <div className="container_img">
            <img src="/img/logo_original.png" alt="Universidad Modelo" />
          </div>
          <form method="" action="">
            <label htmlFor="usuario">usuario</label>
            <br />
            <input type="text" id="usuario" name="usuario" />
            <br /><br/>
            <label htmlFor="contrasena">contraseña</label>
            <br />
            <input type="password" id="contrasena" name="contrasena" />
            <br /><br/>
            <button type="submit">iniciar sesion</button>
            <br />
          </form>
          <Link href="#" className="recover_passw">¿olvidaste tu contraseña?</Link>
        </div>
      </div>
    </main>
  );
}
