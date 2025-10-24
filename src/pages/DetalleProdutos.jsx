import React, { useEffect, useState } from "react";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import {
  Container,
  Box,
  Card,
  CardMedia,
  Typography,
  Button,
  Rating,
  CircularProgress,
} from "@mui/material";
import { useAppContext } from "../context/AppContext";

const ProductoDetalle = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { agregarAlCarrito } = useAppContext();

  const productoDesdeState = location.state?.producto ?? null;
  const [producto, setProducto] = useState(productoDesdeState);
  const [cargando, setCargando] = useState(!productoDesdeState);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (productoDesdeState) return;

    setCargando(true);
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Error al obtener el producto");
        return res.json();
      })
      .then((data) => {
        setProducto(data);
        setCargando(false);
      })
      .catch(() => {
        setError("No se pudo cargar el producto");
        setCargando(false);
      });
  }, [id, productoDesdeState]);

  if (cargando)
    return (
      <Container sx={{ mt: 6, textAlign: "center" }}>
        <CircularProgress />
      </Container>
    );

  if (error)
    return (
      <Container sx={{ mt: 6, textAlign: "center" }}>
        <Typography color="error">{error}</Typography>
        <Button sx={{ mt: 2 }} variant="outlined" onClick={() => navigate("/productos")}>
          Volver a Productos
        </Button>
      </Container>
    );

  if (!producto)
    return (
      <Container sx={{ mt: 6, textAlign: "center" }}>
        <Typography>No se encontró el producto.</Typography>
        <Button component={Link} to="/productos" variant="outlined" sx={{ mt: 2 }}>
          Volver
        </Button>
      </Container>
    );

  const { title, description, price, image, category, rating } = producto;

  return (
    <Container sx={{ mt: 6 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 4,
        }}
      >
        <Card
          elevation={4}
          sx={{
            flex: { xs: "100%", md: "50%" },
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            p: 2,
            borderRadius: 3,
            backgroundColor: "#fafafa",
          }}
        >
          <CardMedia
            component="img"
            image={image}
            alt={title}
            sx={{
              width: "100%",
              height: "auto",
              objectFit: "contain",
            }}
          />
        </Card>

        <Box
          sx={{
            flex: { xs: "100%", md: "50%" },
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Typography variant="h5" fontWeight={700}>
            {title}
          </Typography>

          <Typography variant="subtitle1" color="text.secondary">
            Categoría: {category ?? "Sin categoría"}
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Rating value={rating?.rate ?? 0} precision={0.1} readOnly />
            <Typography variant="body2" color="text.secondary">
              ({rating?.count ?? 0} reseñas)
            </Typography>
          </Box>

          <Typography variant="h6" color="primary" sx={{ fontWeight: 700 }}>
            ${price}
          </Typography>

          <Typography variant="body1" color="text.primary" sx={{ mt: 1 }}>
            {description}
          </Typography>

          <Box sx={{ display: "flex", gap: 2, mt: 3, flexWrap: "wrap" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => agregarAlCarrito(producto)}
            >
              Agregar al carrito
            </Button>

            <Button variant="outlined" component={Link} to="/productos">
              Volver al catálogo
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default ProductoDetalle;
