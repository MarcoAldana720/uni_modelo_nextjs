import { ToastContainer } from "react-toastify";

export default function layout({children}) {
  return (
    <div>
      <div className="container_header">
        <img src="/img/logo_blanco.png" alt="Universidad Modelo" />
        <span>universidad modelo</span>
      </div>

      {/* INICIO: LLAMA TODOS LOS CONTENIDOS */}
      {children}
      {/* FINAL: LLAMA TODOS LOS CONTENIDOS */}

      <div className="container_footer">
        <p>	&copy; 2024 Universidad Modelo Todos Los Derechos Reservados. </p>
      </div>
      {/* <ToastContainer /> */}
    </div>
  )
}
