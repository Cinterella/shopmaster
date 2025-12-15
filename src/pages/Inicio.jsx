import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";

export default function Inicio() {
  const [productos, setProductos] = useState([]);
  const [index, setIndex] = useState(0);
  const autoplayRef = useRef(null);
  const dragStartX = useRef(null);

  /* ================= CARGAR PRODUCTOS DESDE FIREBASE ================= */

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        const snapshot = await getDocs(collection(db, "productos"));

        const productosFirestore = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setProductos(productosFirestore);

        if (productosFirestore.length) {
          setIndex(
            Math.floor(Math.random() * productosFirestore.length)
          );
        }
      } catch (error) {
        console.error("Error cargando productos:", error);
      }
    };

    cargarProductos();
  }, []);

  /* ================= AUTOPLAY ================= */

  useEffect(() => {
    stopAutoplay();
    startAutoplay();
    return stopAutoplay;
  }, [productos, index]);

  const startAutoplay = () => {
    stopAutoplay();
    autoplayRef.current = setInterval(() => {
      setIndex((prev) =>
        productos.length ? (prev + 1) % productos.length : prev
      );
    }, 5000);
  };

  const stopAutoplay = () => {
    if (autoplayRef.current) clearInterval(autoplayRef.current);
  };

  /* ================= CONTROLES ================= */

  const prev = () =>
    setIndex((i) =>
      productos.length ? (i - 1 + productos.length) % productos.length : 0
    );

  const next = () =>
    setIndex((i) =>
      productos.length ? (i + 1) % productos.length : 0
    );

  const handleMouseDown = (e) => {
    dragStartX.current = e.clientX;
    stopAutoplay();
  };

  const handleMouseMove = (e) => {
    if (dragStartX.current !== null) {
      const diff = e.clientX - dragStartX.current;
      if (diff > 50) prev();
      if (diff < -50) next();
      dragStartX.current = null;
    }
  };

  const handleMouseUp = () => {
    dragStartX.current = null;
    startAutoplay();
  };

  const producto = productos[index];

  return (
    <div className="container py-5 home">

      {/* HEADER */}
      <div className="text-center mb-4">
        <h1 className="home-title fw-bold">
          Bienvenido a <span className="home-title-highlight">ShopMaster</span>
        </h1>
        <p className="home-subtitle mb-1">
          Descubrí las últimas tendencias en ropa y tecnología
        </p>
        <p className="home-subtitle">
          Calidad, diseño y precio en un solo lugar
        </p>
      </div>

      {/* SLIDER */}
      <div className="row justify-content-center">
        <div
          className="col-12 col-md-10 col-lg-8 home-slider"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {producto ? (
            <div className="card home-product-card">
              <img
                src={producto.avatar}
                alt={producto.nombre}
                className="card-img-top home-product-img"
              />

              <div className="card-body">
                <h5 className="card-title fw-semibold text-truncate">
                  {producto.nombre}
                </h5>

                <p className="card-text home-product-description">
                  {producto.descripcion}
                </p>

                <div className="d-flex justify-content-between align-items-center mt-3">
                  <span className="home-product-price">
                    ${producto.precio}
                  </span>

                  <Link
                    to={`/productos/${producto.id}`}
                    state={{ producto }}
                    className="btn btn-primary btn-sm"
                  >
                    Ver producto
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-5 text-muted">
              Cargando producto destacado...
            </div>
          )}
        </div>
      </div>

      {/* CONTROLES */}
      <div className="d-flex justify-content-center gap-3 mt-4">
        <button
          className="btn btn-outline-secondary home-slider-btn"
          onClick={prev}
        >
          <FaChevronLeft />
        </button>

        <button
          className="btn btn-outline-secondary home-slider-btn"
          onClick={next}
        >
          <FaChevronRight />
        </button>
      </div>

      {/* CTA */}
      <div className="text-center mt-5">
        <p className="home-cta-text mb-3">
          Explorá el catálogo completo y encontrá tu próximo favorito
        </p>
        <Link
          to="/productos"
          className="btn btn-primary btn-lg px-4"
        >
          Ver todos los productos
        </Link>
      </div>

    </div>
  );
}
