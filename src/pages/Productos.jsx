import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CarritoCompras from "./Carrito";
import { useAppContext } from "../context/AppContext";
import { Card, CardContent, CardMedia, Typography, Button, Box } from "@mui/material";

export default function Productos() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const { agregarAlCarrito } = useAppContext();

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((datos) => {
        setProductos(datos);
        setCargando(false);
      })
      .catch((err) => {
        console.error("Error!", err);
        setError("Hubo un problema al cargar los productos.");
        setCargando(false);
      });
  }, []);

  if (cargando) return <p>Cargando productos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 3,
          p: 2,
        }}
      >
        {productos.map((producto) => (
          <Card
            key={producto.id}
            sx={{
              width: { xs: "100%", sm: 240, md: 240 },
              display: "flex",
              flexDirection: "column",
              transition: "transform 0.3s, box-shadow 0.3s",
              "&:hover": {
                transform: "translateY(-6px)",
                boxShadow: 6,
              },
            }}
          >
            <CardMedia
              component="img"
              height="180"
              image={producto.image}
              alt={producto.title}
              sx={{
                objectFit: "contain",
                p: 2,
                backgroundColor: "#fafafa",
              }}
            />
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography
                gutterBottom
                variant="subtitle1"
                component="div"
                noWrap
                sx={{ fontWeight: 600 }}
              >
                {producto.title}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  height: 60,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical",
                }}
              >
                {producto.description}
              </Typography>
              <Typography
                variant="h6"
                color="primary"
                sx={{ mt: 1, fontWeight: "bold" }}
              >
                ${producto.price}
              </Typography>
            </CardContent>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                p: 1,
              }}
            >
              <Link
                to={`/productos/${producto.id}`}
                state={{ producto }}
                style={{ textDecoration: "none" }}
              >
                <Button variant="outlined" size="small" color="primary">
                  Más detalles
                </Button>
              </Link>
              <Button
                variant="contained"
                size="small"
                color="secondary"
                onClick={() => agregarAlCarrito(producto)}
              >
                Comprar
              </Button>
            </Box>
          </Card>
        ))}
      </Box>

      <CarritoCompras />
    </>
  );
}
