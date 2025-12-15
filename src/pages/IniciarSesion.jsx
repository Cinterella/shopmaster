import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

export default function IniciarSesion() {
  const { iniciarSesion } = useAuthContext();
  const navigate = useNavigate();
  const ubicacion = useLocation();

  const [formulario, setFormulario] = useState({
    nombre: "",
    email: "",
  });

  const manejarEnvio = (e) => {
    e.preventDefault();

    if (formulario.nombre === "admin" && formulario.email === "1234@admin") {
      localStorage.setItem("authEmail", formulario.email);
      iniciarSesion("admin", formulario.email);
      navigate("/dashboard");
    } else if (formulario.nombre && formulario.email) {
      localStorage.setItem("authEmail", formulario.email);
      iniciarSesion(formulario.nombre, formulario.email);

      if (ubicacion.state?.carrito) {
        navigate("/pagar", { state: { carrito: ubicacion.state.carrito } });
      } else {
        navigate("/productos");
      }
    } else {
      alert("Credenciales incorrectas.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Iniciar sesión</h1>

        <form className="login-form" onSubmit={manejarEnvio}>
          
          <div className="login-field">
            <label htmlFor="nombre" className="login-label">
              Nombre completo
            </label>
            <input
              id="nombre"
              className="login-input"
              type="text"
              value={formulario.nombre}
              onChange={(e) =>
                setFormulario({ ...formulario, nombre: e.target.value })
              }
              required
            />
          </div>

          <div className="login-field">
            <label htmlFor="email" className="login-label">
              Email
            </label>
            <input
              id="email"
              className="login-input"
              type="email"
              value={formulario.email}
              onChange={(e) =>
                setFormulario({ ...formulario, email: e.target.value })
              }
              required
            />
          </div>

          <div className="login-actions">
            <button type="submit" className="login-btn primary">
              Iniciar sesión
            </button>

            <button
              type="button"
              className="login-btn secondary"
              onClick={() => navigate("/productos")}
            >
              Cancelar
            </button>
          </div>
        </form>

        <p className="login-hint">
          <strong>Admin:</strong> admin / 1234@admin
        </p>
      </div>
    </div>
  );
}
