import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useProducts } from "../context/ProductsContext";

function EliminarProducto() {
  const location = useLocation();
  const navigate = useNavigate();
  const { eliminarProducto } = useProducts();

  const producto = location.state?.producto;
  const [cargando, setCargando] = useState(false);

  if (!producto) {
    return (
      <div className="container py-5 text-center">
        <p className="text-muted">Producto no encontrado</p>
      </div>
    );
  }

  const manejarEliminar = async () => {
    const confirmar = window.confirm(
      `¿Seguro que querés eliminar "${producto.nombre}"?\n\nEsta acción no se puede deshacer.`
    );

    if (!confirmar) return;

    try {
      setCargando(true);
      await eliminarProducto(producto.id);
      navigate("/productos");
    } catch {
      // el toast de error ya lo maneja el contexto
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="card shadow-sm mx-auto" style={{ maxWidth: 600 }}>
        <div className="card-body text-center">
          <h2 className="text-danger fw-bold mb-3">
            Eliminar producto
          </h2>

          <p className="text-muted">
            ¿Estás seguro de que deseas eliminar este producto?
          </p>

          <div className="text-start my-4">
            <p><strong>Nombre:</strong> {producto.nombre}</p>
            <p><strong>Precio:</strong> ${producto.precio}</p>
            <p><strong>Categoría:</strong> {producto.categoria}</p>
            <p><strong>Descripción:</strong> {producto.descripcion}</p>

            {producto.avatar && (
              <img
                src={producto.avatar}
                alt={producto.nombre}
                className="img-fluid rounded mt-2"
                style={{ maxHeight: 200 }}
              />
            )}
          </div>

          <div className="alert alert-warning small">
            Esta acción es permanente y no se puede deshacer.
          </div>

          <div className="d-flex gap-3 justify-content-center mt-4">
            <button
              className="btn btn-danger"
              onClick={manejarEliminar}
              disabled={cargando}
            >
              {cargando ? "Eliminando..." : "Sí, eliminar"}
            </button>

            <button
              className="btn btn-outline-secondary"
              onClick={() => navigate("/productos")}
              disabled={cargando}
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EliminarProducto;
