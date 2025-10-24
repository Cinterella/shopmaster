import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { ShoppingCart, Menu, X, User, LogOut } from "lucide-react";
import { Badge, IconButton, Box, Typography } from "@mui/material";

function Navbar() {
  const { isAuthenticated, usuario, carrito, cerrarSesion } = useAppContext();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">ShopMaster</Link>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      <ul className={`navbar-links ${menuOpen ? "active" : ""}`}>
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/servicios">Servicios</Link></li>
        <li><Link to="/productos">Productos</Link></li>

        <li className="auth-section">
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <IconButton component={Link} to="/pagar" color="inherit" size="large">
              <Badge badgeContent={carrito.length} color="error">
                <ShoppingCart size={24} />
              </Badge>
            </IconButton>

            {isAuthenticated ? (
              <>
                <Typography variant="body2">{usuario.nombre}</Typography>
                <IconButton onClick={cerrarSesion} color="inherit" title="Cerrar sesión">
                  <LogOut size={24} />
                </IconButton>
              </>
            ) : (
              <Link to="/iniciar-sesion" title="Iniciar sesión">
                <User size={24} />
              </Link>
            )}
          </Box>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
