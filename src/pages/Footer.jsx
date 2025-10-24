import React from "react";
import { Box, Typography, Link as MuiLink, IconButton } from "@mui/material";
import { Facebook, Instagram, Twitter, ShoppingBag } from "@mui/icons-material";

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#f5f5f5",
        padding: "40px 20px",
        marginTop: "40px",
        borderTop: "1px solid #ddd",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 4,
          maxWidth: 1200,
          mx: "auto",
        }}
      >

        <Box sx={{ flex: { xs: "100%", md: "33%" }, minWidth: 250 }}>
          <Box display="flex" alignItems="center" gap={1} mb={1}>
            <ShoppingBag color="primary" />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              MiTienda
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary">
            Tu tienda online de confianza. Ofrecemos productos de calidad con la mejor atención y precios competitivos.
          </Typography>
        </Box>
        <Box sx={{ flex: { xs: "100%", md: "33%" }, minWidth: 250 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
            Enlaces útiles
          </Typography>
          <Box display="flex" flexDirection="column" gap={0.5}>
            <MuiLink href="/" color="inherit" underline="hover">
              Inicio
            </MuiLink>
            <MuiLink href="/productos" color="inherit" underline="hover">
              Productos
            </MuiLink>
            <MuiLink href="/servicios" color="inherit" underline="hover">
              Servicios
            </MuiLink>
            <MuiLink href="/contacto" color="inherit" underline="hover">
              Contacto
            </MuiLink>
          </Box>
        </Box>

        <Box
          sx={{
            flex: { xs: "100%", md: "33%" },
            minWidth: 250,
            display: "flex",
            flexDirection: "column",
            alignItems: "center", 
            textAlign: "center", 
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
            Seguinos
          </Typography>
          <Box display="flex" gap={1} justifyContent="center">
            <IconButton href="https://facebook.com" target="_blank" color="primary">
              <Facebook />
            </IconButton>
            <IconButton href="https://instagram.com" target="_blank" color="primary">
              <Instagram />
            </IconButton>
            <IconButton href="https://twitter.com" target="_blank" color="primary">
              <Twitter />
            </IconButton>
          </Box>
        </Box>

      </Box>

      <Box textAlign="center" mt={4}>
        <Typography variant="body2" color="text.secondary">
          © {new Date().getFullYear()} MiTienda — Copyright
        </Typography>
      </Box>
    </Box>
  );
}

export default Footer;
