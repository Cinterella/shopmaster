import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTwitter, FaShoppingBag } from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer-global mt-5">
      <div className="container py-4">

        <div className="row gy-4">

          {/* BRAND */}
          <div className="col-12 col-md-4">
            <div className="d-flex align-items-center gap-2 mb-2">
              <FaShoppingBag className="text-primary fs-4" />
              <h5 className="mb-0 fw-bold text-dark">
                Shopmaster
              </h5>
            </div>
            <p className="text-muted small mb-0">
              Tu tienda online de confianza. Productos de calidad,
              buena atención y precios competitivos.
            </p>
          </div>

          {/* LINKS */}
          <div className="col-12 col-md-4">
            <h6 className="fw-semibold text-dark mb-2">
              Enlaces útiles
            </h6>
            <ul className="list-unstyled mb-0 footer-links">
              <li><Link to="/">Inicio</Link></li>
              <li><Link to="/productos">Productos</Link></li>
              <li><Link to="/servicios">Servicios</Link></li>
            </ul>
          </div>

          {/* SOCIAL */}
          <div className="col-12 col-md-4 text-md-center">
            <h6 className="fw-semibold text-dark mb-2">
              Seguinos
            </h6>
            <div className="d-flex justify-content-md-center gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="footer-social"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="footer-social"
              >
                <FaInstagram />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="footer-social"
              >
                <FaTwitter />
              </a>
            </div>
          </div>

        </div>

        {/* COPYRIGHT */}
        <div className="text-center border-top pt-3 mt-4">
          <small className="text-muted">
            © {new Date().getFullYear()} Shopmaster — Todos los derechos reservados
          </small>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
