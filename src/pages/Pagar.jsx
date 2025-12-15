import { useNavigate } from "react-router-dom";
import { useAuthContext } from '../context/AuthContext';
import { useCartContext } from '../context/CartContext';


export default function Pagar() {
  const { usuario, cerrarSesion } = useAuthContext();
  const { carrito, total, vaciarCarrito } = useCartContext();
  const navigate = useNavigate();


  const tokenActual = localStorage.getItem('authToken');


  // Función para finalizar compra
  const comprar = () => {
    alert("¡Compra realizada con éxito!");
    vaciarCarrito(); // Limpiar carrito después de comprar
    navigate("/productos");
  };

    const manejarCerrarSesion = () => {
    vaciarCarrito(); // ← Primero vaciar el carrito en el estado
    cerrarSesion(); // ← Luego cerrar sesión
    navigate("/productos"); // ← Redirigir
  };


  return (
    <>
      {/* INFO USUARIO */}
      <div className="checkout-user text-center">

        <h2 className="checkout-user-title">
          Hola {usuario.nombre}
        </h2>

        <p className="checkout-user-email">
          Email: {usuario.email}
        </p>

        <div className="checkout-user-token">
          <strong>Token:</strong> {tokenActual}
        </div>

        <button
          onClick={manejarCerrarSesion}
          className="btn btn-outline-primary-global btn-sm"
        >
          Cerrar sesión
        </button>

        <hr />
      </div>

      {/* CARRITO */}
      <div className="container p-4 checkout-cart mb-3">

        <h2 className="mb-4 checkout-cart-title">
          Tu compra
        </h2>

        {carrito.length > 0 ? (
          <>
            {carrito.map((producto) => {
              const cantidad = Number(producto.cantidad || 1);
              const precioUnitario = Number(producto.precio || 0);
              const subtotal = cantidad * precioUnitario;

              return (
                <div
                  key={producto.id}
                  className="checkout-item"
                >
                  <img
                    src={producto.avatar}
                    alt={producto.nombre}
                    className="checkout-item-img"
                  />

                  <div className="checkout-item-info">
                    <div className="checkout-item-name">
                      {producto.nombre}
                    </div>

                    <div className="checkout-item-detail">
                      Precio unidad: ${precioUnitario.toFixed(3)}
                    </div>

                    <div className="checkout-item-qty">
                      Cantidad: {cantidad}
                    </div>

                    <div className="checkout-item-subtotal">
                      Subtotal: ${subtotal.toFixed(3)}
                    </div>
                  </div>
                </div>
              );
            })}

            <hr />

            <h3 className="checkout-total">
              Total a pagar: ${Number(total).toFixed(3)}
            </h3>
          </>
        ) : (
          <p className="checkout-empty">
            No hay productos en el carrito
          </p>
        )}
      </div>

      {/* ACCIONES */}
      <div className="container checkout-actions">

        <button
          className="btn btn-outline-danger btn-sm"
          onClick={vaciarCarrito}
        >
          Vaciar carrito
        </button>

        <div className="mt-3">
          <button
            className="btn btn-outline-primary-global me-2"
            onClick={() => navigate("/productos")}
          >
            {carrito.length > 0
              ? "Seguir comprando"
              : "Volver a productos"}
          </button>

          {carrito.length > 0 && (
            <button
              className="btn btn-primary-global"
              onClick={comprar}
            >
              Confirmar y pagar
            </button>
          )}
        </div>
      </div>
    </>
  );

}


