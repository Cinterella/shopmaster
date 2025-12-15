import { Link, useNavigate } from "react-router-dom";
import CarritoCompras from "./Carrito";
import { useCartContext } from "../context/CartContext";
import { useAuthContext } from "../context/AuthContext";
import { useProducts } from "../context/ProductsContext";
import { useEffect, useState } from "react";

export default function Productos() {
  const { productos, cargando, error } = useProducts();
  const { agregarAlCarrito } = useCartContext();
  const { esAdmin } = useAuthContext();
  const navigate = useNavigate();

  const [busqueda, setBusqueda] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);

    useEffect(() => {
    document.title = "Tienda | Shopmaster";
   
    // Función para actualizar meta tags
    const updateMetaTag = (name, content, attribute = 'name') => {
      let meta = document.querySelector(`meta[${attribute}="${name}"]`);

      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attribute, name);
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    // Meta tags básicos
    updateMetaTag(
      'description',
      'Descubrí nuestro catálogo online con productos de múltiples categorías: indumentaria, tecnología, hogar, deportes y más. Comprá fácil y seguro.'
    );

    updateMetaTag(
      'keywords',
      'tienda online, ecommerce, indumentaria, tecnología, hogar, deportes, accesorios, ofertas'
    );

    updateMetaTag('author', '@webmaster');
    updateMetaTag('robots', 'index, follow');

    // Open Graph
    updateMetaTag(
      'og:title',
      'Tienda Online | Productos para todos los estilos',
      'property'
    );

    updateMetaTag(
      'og:description',
      'Explorá una tienda online con una amplia variedad de productos en múltiples categorías. Envíos a todo el país.',
      'property'
    );

    updateMetaTag('og:type', 'website', 'property');

    updateMetaTag(
      'og:image',
      'https://tudominio.com/og-image.jpg',
      'property'
    );

    updateMetaTag(
      'og:url',
      window.location.href,
      'property'
    );
  }, []);

  const productosPorPagina = 6;


  const manejarEliminar = (producto) => {
    // Navegar a la página de confirmación de eliminación
    navigate('/eliminar-producto', { state: { producto } });
  };

  const manejarEditar = (producto) => {
    // Navegar al formulario de edición
    navigate('/formulario-producto', { state: { producto } });
  };

    const productosFiltrados = productos.filter(
    (producto) =>
      producto.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      (producto.categoria &&
        producto.categoria.toLowerCase().includes(busqueda.toLowerCase()))
  );

  const indiceUltimoProducto = paginaActual * productosPorPagina;
  const indicePrimerProducto = indiceUltimoProducto - productosPorPagina;
  const productosActuales = productosFiltrados.slice(indicePrimerProducto, indiceUltimoProducto);
 
  // Cambiar de página
  const totalPaginas = Math.ceil(productosFiltrados.length / productosPorPagina);
  const cambiarPagina = (numeroPagina) => setPaginaActual(numeroPagina);


  // Resetear a página 1 con búsquedas
  const manejarBusqueda = (e) => {
    setBusqueda(e.target.value);
    setPaginaActual(1);
  };



  if (cargando) return <p>Cargando productos...</p>;
  if (error) return <p>{error}</p>;

return (
  <>
    <div className="container mt-4 product-list">

      {/* BUSCADOR */}
      <div className="row mb-4 justify-content-center text-center">
        <div className="col-12 col-md-6 product-search">

          <label className="form-label product-search-label">
            Buscar productos
          </label>

          <input
            type="text"
            placeholder="Buscar por nombre o categoría..."
            className="form-control product-search-input"
            value={busqueda}
            onChange={manejarBusqueda}
          />

          {busqueda && (
            <small className="product-search-info">
              Mostrando {productosFiltrados.length} de {productos.length} productos
            </small>
          )}
        </div>
      </div>

      {/* GRID DE PRODUCTOS */}
      <div className="row">
        {productosActuales.map((producto) => (
          <div
            key={producto.id}
            className="col-12 col-md-6 col-lg-4 mb-4 m-0 p-0 d-flex"
          >
            <div className="card product-card w-100 h-100">

              <img
                src={producto.avatar}
                alt={producto.nombre}
                className="card-img-top product-card-img"
              />

              <div className="card-body d-flex flex-column">

                <h5 className="product-card-title">
                  {producto.nombre}
                </h5>

                <p className="product-card-description">
                  {producto.descripcion}
                </p>

                <p className="product-card-price">
                  ${producto.precio}
                </p>

                <div className="mt-auto">

                  <div className="d-grid gap-2">
                    <Link
                      to={`/productos/${producto.id}`}
                      state={{ producto }}
                      className="btn btn-outline-primary-global btn-sm"
                    >
                      Ver detalles
                    </Link>

                    <button
                      onClick={() => agregarAlCarrito(producto)}
                      className="btn btn-primary-global btn-sm"
                    >
                      Agregar al carrito
                    </button>
                  </div>

                  {/* ACCIONES ADMIN */}
                  {esAdmin && (
                    <div className="mt-3 pt-3 border-top">
                      <div className="d-flex gap-2">
                        <button
                          onClick={() => manejarEditar(producto)}
                          className="btn btn-warning btn-sm flex-fill"
                        >
                          Editar
                        </button>

                        <button
                          onClick={() => manejarEliminar(producto)}
                          className="btn btn-danger btn-sm flex-fill"
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                  )}

                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* PAGINADOR */}
      {productosFiltrados.length > productosPorPagina && (
        <div className="d-flex justify-content-center my-4 flex-wrap gap-2">
          {Array.from({ length: totalPaginas }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => cambiarPagina(index + 1)}
              className={`btn btn-sm ${
                paginaActual === index + 1
                  ? "btn-primary-global"
                  : "btn-outline-primary-global"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}

      {/* INFO DE PÁGINA */}
      {productosFiltrados.length > 0 && (
        <div className="text-center product-page-info">
          <small>
            Mostrando {productosActuales.length} productos
            (página {paginaActual} de {totalPaginas})
          </small>
        </div>
      )}
    </div>
  </>
);


}

