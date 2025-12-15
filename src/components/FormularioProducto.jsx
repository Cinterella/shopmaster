import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useProducts } from "../context/ProductsContext";

function FormularioProducto() {
  const navigate = useNavigate();
  const location = useLocation();
  const { agregarProducto, editarProducto, validar } = useProducts();

  const productoRecibido = location.state?.producto;
  const modo = productoRecibido ? "editar" : "agregar";

  const [producto, setProducto] = useState({
    id: "",
    nombre: "",
    precio: "",
    descripcion: "",
    categoria: "",
    avatar: "",
  });

  const [errores, setErrores] = useState({});
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    if (modo === "editar" && productoRecibido) {
      setProducto({ ...productoRecibido });
    }
  }, [modo, productoRecibido]);

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    if (name === "descripcion" && value.length > 200) return;

    setProducto((prev) => ({ ...prev, [name]: value }));
    if (errores[name]) setErrores((prev) => ({ ...prev, [name]: "" }));
  };

  const manejarEnvio = async (e) => {
    e.preventDefault();

    const resultado = validar(producto);
    setErrores(resultado.errores);
    if (!resultado.esValido) return;

    setCargando(true);
    try {
      const data = {
        ...producto,
        precio: producto.precio.toString().replace(",", "."),
      };

      modo === "agregar"
        ? await agregarProducto(data)
        : await editarProducto(data);

      navigate("/productos");
    } catch {
      alert("Hubo un error al guardar el producto");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="form-container">
      <div className="form-card">
        <h2 className="form-title">
          {modo === "editar" ? "Editar producto" : "Agregar producto"}
        </h2>

        {modo === "editar" && (
          <p className="form-subtitle">
            Editando: {producto.nombre}
          </p>
        )}

        <form onSubmit={manejarEnvio}>
          <div className="form-field">
            <label className="form-label">Nombre *</label>
            <input
              className="form-input"
              name="nombre"
              value={producto.nombre}
              onChange={manejarCambio}
            />
            {errores.nombre && (
              <span className="form-error">{errores.nombre}</span>
            )}
          </div>

          <div className="form-field">
            <label className="form-label">Precio *</label>
            <input
              className="form-input"
              name="precio"
              value={producto.precio}
              onChange={manejarCambio}
            />
            <span className="form-hint">Ej: 40.000</span>
            {errores.precio && (
              <span className="form-error">{errores.precio}</span>
            )}
          </div>

          <div className="form-field">
            <label className="form-label">Categoría</label>
            <input
              className="form-input"
              name="categoria"
              value={producto.categoria}
              onChange={manejarCambio}
            />
          </div>

          <div className="form-field">
            <label className="form-label">Imagen (URL)</label>
            <input
              className="form-input"
              name="avatar"
              value={producto.avatar}
              onChange={manejarCambio}
            />
          </div>

          <div className="form-field">
            <label className="form-label">Descripción *</label>
            <textarea
              className="form-textarea"
              rows="4"
              name="descripcion"
              value={producto.descripcion}
              onChange={manejarCambio}
            />
            <span className="form-hint">
              {producto.descripcion.length}/200 caracteres
            </span>
            {errores.descripcion && (
              <span className="form-error">{errores.descripcion}</span>
            )}
          </div>

          <div className="form-actions">
            <button className="btn btn-primary" disabled={cargando}>
              {modo === "editar" ? "Guardar cambios" : "Agregar producto"}
            </button>

            {modo === "editar" && (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate("/productos")}
              >
                Cancelar
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default FormularioProducto;