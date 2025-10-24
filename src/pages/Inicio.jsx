import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
  IconButton,
} from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

export default function Inicio() {
  const [productos, setProductos] = useState([]);
  const [index, setIndex] = useState(0);
  const autoplayRef = useRef(null);
  const dragStartX = useRef(null);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProductos(data || []);
        if (data && data.length > 0) setIndex(Math.floor(Math.random() * data.length));
      })
      .catch((err) => console.error("Error cargando productos para slider:", err));
  }, []);

  useEffect(() => {
    stopAutoplay();
    startAutoplay();
    return () => stopAutoplay();
  }, [productos, index]);

  const startAutoplay = () => {
    stopAutoplay();
    autoplayRef.current = setInterval(() => {
      setIndex((prev) => (productos.length ? (prev + 1) % productos.length : prev));
    }, 5000);
  };

  const stopAutoplay = () => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
  };

  const prev = () => setIndex((i) => (productos.length ? (i - 1 + productos.length) % productos.length : 0));
  const next = () => setIndex((i) => (productos.length ? (i + 1) % productos.length : 0));

  // EVENTO DRAG para el sliderr
  const handleMouseDown = (e) => {
    dragStartX.current = e.clientX;
    stopAutoplay();
  };

  const handleMouseMove = (e) => {
    if (dragStartX.current !== null) {
      const diff = e.clientX - dragStartX.current;
      if (diff > 50) {
        prev();
        dragStartX.current = null;
      } else if (diff < -50) {
        next();
        dragStartX.current = null;
      }
    }
  };

  const handleMouseUp = () => {
    dragStartX.current = null;
    startAutoplay();
  };

  const currentProduct = productos.length ? productos[index] : null;

  return (
    <Box sx={{ padding: 3, userSelect: "none" }}>
      <Box sx={{ textAlign: "center", maxWidth: 1080, margin: "0 auto" }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Bienvenido a <strong>ShopMaster</strong>
        </Typography>
        <Typography variant="h6" paragraph>
          Descubrí las últimas tendencias en <strong>ropa</strong> y <strong>productos electrónicos</strong>. 
        </Typography>
        <Typography variant="body1" paragraph>
          Aprovechá nuestras promociones exclusivas y elegí productos de calidad a los mejores precios.
        </Typography>

        <Box
          sx={{
            mt: 4,
            mb: 2,
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <Box
            sx={{ width: "75%", cursor: "grab" }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            {currentProduct ? (
              <Card
                elevation={4}
                sx={{ transition: "transform 0.3s, box-shadow 0.3s", "&:hover": { transform: "translateY(-6px)", boxShadow: 8 } }}
              >
                <CardMedia
                  component="img"
                  height="240"
                  image={currentProduct.image}
                  alt={currentProduct.title}
                  sx={{ objectFit: "contain", bgcolor: "#fafafa", p: 2 }}
                />
                <CardContent>
                  <Typography variant="h6" noWrap sx={{ fontWeight: 600 }}>
                    {currentProduct.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      mt: 1,
                      height: 56,
                      overflow: "hidden",
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {currentProduct.description}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mt: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                      ${currentProduct.price}
                    </Typography>
                    <Button
                      component={Link}
                      to={`/productos/${currentProduct.category || "sin-categoria"}/${currentProduct.id}`}
                      state={{ producto: currentProduct }}
                      variant="contained"
                      size="small"
                    >
                      Ver producto
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            ) : (
              <Box sx={{ height: 300, display: "flex", alignItems: "center", justifyContent: "center", bgcolor: "#fafafa", borderRadius: 1 }}>
                <Typography>Buscando producto destacado...</Typography>
              </Box>
            )}
          </Box>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 2 }}>
          <IconButton aria-label="Anterior" onClick={prev} sx={{ border: 1, borderColor: "divider" }}>
            <ArrowBackIos />
          </IconButton>
          <IconButton aria-label="Siguiente" onClick={next} sx={{ border: 1, borderColor: "divider" }}>
            <ArrowForwardIos />
          </IconButton>
        </Box>

        <Box sx={{ textAlign: "center", mt: 3 }}>
          <Typography variant="body2" color="text.secondary" sx={{ m: 3 }}>
            Explora nuestro catálogo completo y encuentra la combinación perfecta entre estilo y tecnología.
          </Typography>
          <Button
            component={Link}
            to="/productos"
            variant="contained"
            color="primary"
            size="large"
            sx={{
              fontWeight: 700,
              px: 4,
              py: 1.5,
              boxShadow: 3,
              "&:hover": { transform: "scale(1.05)", boxShadow: 6 },
              transition: "transform 0.3s, box-shadow 0.3s",
            }}
          >
            Ver todos los productos
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
