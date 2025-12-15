import { Link, useParams, useLocation } from "react-router-dom";


const ProductoDetalle = () => {
 
    const { id } = useParams();
    const location = useLocation();
    const producto = location.state?.producto;
  
    return (
    <div className="container-md py-4 mt-5 mb-5 product-detail">
        <h2 className="product-detail-title mb-4">
            Detalles del producto
        </h2>

        {/* FILA SUPERIOR */}
        <div className="row align-items-start mb-4">

            {/* IMAGEN */}
            <div className="col-12 col-md-6 mb-3 mb-md-0">
            <div className="product-image-wrapper text-center">
                <img
                src={producto.avatar}
                alt={producto.nombre}
                className="img-fluid product-image"
                />
            </div>
            </div>

            {/* INFO */}
            <div className="col-12 col-md-6">
            <div className="product-info">

                <h4 className="product-name">
                {producto.nombre}
                </h4>

                <div className="product-section">
                <span className="product-label">Descripción</span>
                <p className="product-description">
                    {producto.descripcion}
                </p>
                </div>

                <div className="product-section">
                <span className="product-label">Categoría</span>
                <span className="product-category">
                    {producto.categoria}
                </span>
                </div>

                <div className="product-section product-price-wrapper">
                <span className="product-label">Precio</span>
                <span className="product-price">
                    ${producto.precio}
                </span>
                </div>

            </div>
            </div>
        </div>

        {/* VOLVER */}
        <div className="row">
            <div className="col-12 text-center">
            <Link
                to="/productos"
                className="btn product-back-btn"
            >
                Volver a productos
            </Link>
            </div>
        </div>
    </div>

    );
}; export default ProductoDetalle;
