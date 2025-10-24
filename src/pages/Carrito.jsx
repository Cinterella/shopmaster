import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { Box, Typography, Button, Divider, CardMedia } from "@mui/material";

export default function CarritoCompras() {
  const { carrito, vaciarCarrito } = useAppContext();
  const navigate = useNavigate();

  const irAPagar = () => {
    navigate("/pagar", { state: { carrito } });
  };

  const total = carrito.reduce((sum, item) => sum + Number(item.price), 0);

  return (
    <Box sx={{ mt: 4, p: 2, maxWidth: 800, mx: "auto", border: "1px solid #ddd", borderRadius: 2 }}>
      <Typography variant="h5" gutterBottom>
        Carrito de Compras
      </Typography>
      <Divider sx={{ mb: 2 }} />

      {carrito.length === 0 ? (
        <Typography>El carrito está vacío</Typography>
      ) : (
        <>
          {carrito.map((item) => (
            <Box
              key={item.id}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                mb: 2,
                p: 1,
                borderRadius: 1,
                bgcolor: "#f9f9f9",
              }}
            >
              <CardMedia
                component="img"
                image={item.image}
                alt={item.title}
                sx={{ width: 60, height: 60, objectFit: "contain", borderRadius: 1 }}
              />
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="subtitle1">{item.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  ${Number(item.price).toFixed(2)}
                </Typography>
              </Box>
            </Box>
          ))}

          <Divider sx={{ my: 2 }} />
          <Typography variant="h6">Total: ${Number(total).toFixed(2)}</Typography>

          <Box sx={{ display: "flex", gap: 2, mt: 2, flexWrap: "wrap" }}>
            <Button variant="outlined" color="error" onClick={vaciarCarrito}>
              Vaciar Carrito
            </Button>
            <Button variant="contained" color="primary" onClick={irAPagar}>
              Pagar
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
}
