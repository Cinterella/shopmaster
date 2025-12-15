import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { useCartContext } from "../context/CartContext";
import { FaShoppingCart } from "react-icons/fa";

function Navbar() {
  const { usuario, isAuthenticated, cerrarSesion } = useAuthContext();
  const { vaciarCarrito, carrito } = useCartContext();
  const navigate = useNavigate();

  const totalItemsCarrito = carrito.reduce(
    (total, item) => total + item.cantidad,
    0
  );

  const manejarCerrarSesion = () => {
    navigate("/productos");
    setTimeout(() => {
      vaciarCarrito();
      cerrarSesion();
    }, 100);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-global fixed-top">
        <div className="container-fluid">

          {/* LOGO */}
          <Link to="/" className="navbar-brand navbar-logo">
            Shopmaster
          </Link>

          {/* TOGGLER */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarContent"
            aria-controls="navbarContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* COLLAPSE */}
          <div className="collapse navbar-collapse" id="navbarContent">

            {/* MENÚ IZQUIERDA */}
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/" className="nav-link nav-link-global">Inicio</Link>
              </li>
              <li className="nav-item">
                <Link to="/servicios" className="nav-link nav-link-global">Servicios</Link>
              </li>
              <li className="nav-item">
                <Link to="/productos" className="nav-link nav-link-global">Productos</Link>
              </li>

              {usuario?.nombre === "admin" && (
                <li className="nav-item">
                  <Link
                    to="/formulario-producto"
                    className="nav-link nav-link-global success"
                  >
                    + Agregar Producto
                  </Link>
                </li>
              )}
            </ul>

            {/* ACCIONES DERECHA */}
            <div className="navbar-actions ms-auto">
              <Link to="/pagar" className="cart-link me-3">
                <FaShoppingCart />
                {totalItemsCarrito > 0 && (
                  <span className="cart-badge">{totalItemsCarrito}</span>
                )}
              </Link>

              {isAuthenticated ? (
                <>
                  <span className="welcome-text me-3">
                    Hola, {usuario.nombre}
                  </span>

                  {usuario.nombre === "admin" && (
                    <Link
                      to="/dashboard"
                      className="nav-link nav-link-global d-inline-block me-3"
                    >
                      Dashboard
                    </Link>
                  )}

                  <button
                    onClick={manejarCerrarSesion}
                    className="btn btn-outline-light btn-sm primary p-2"
                  >
                    Cerrar sesión
                  </button>
                </>
              ) : (
                <Link
                  to="/iniciar-sesion"
                  className="nav-link nav-link-global"
                >
                  Iniciar sesión
                </Link>
              )}
            </div>

          </div>
        </div>
      </nav>

      <div className="navbar-spacer" />

    </>
  );
}

export default Navbar;
