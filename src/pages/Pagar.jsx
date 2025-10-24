import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Divider,
  IconButton,
} from "@mui/material";
import { ShoppingCart, Delete } from "@mui/icons-material";

export default function Pagar() {
  const { usuario, cerrarSesion, carrito, vaciarCarrito } = useAppContext();
  const navigate = useNavigate();

  const total = carrito
  .reduce((suma, producto) => suma + Number(producto.price), 0)
  .toFixed(2);

  const comprar = () => {
    alert("¡Compra realizada con éxito!");
    vaciarCarrito();
    navigate("/productos");
  };

  return (
    <Box sx={{ maxWidth: 900, margin: "0 auto", p: 3 }}>
      <Card sx={{ mb: 3, p: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          {usuario.nombre}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Email: {usuario.email}
        </Typography>
        <Button
          variant="outlined"
          color="secondary"
          sx={{ mt: 1 }}
          onClick={cerrarSesion}
        >
          Cerrar sesión
        </Button>
      </Card>

      <Card sx={{ p: 2 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Tu compra <ShoppingCart sx={{ verticalAlign: "middle", ml: 1 }} />
        </Typography>
        <Divider sx={{ mb: 2 }} />

        {carrito.length > 0 ? (
          <>
            {carrito.map((producto) => (
              <Card
                key={producto.id}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  mb: 2,
                  p: 1,
                }}
                variant="outlined"
              >
                <CardMedia
                  component="img"
                  image={producto.image}
                  alt={producto.title}
                  sx={{ width: 80, height: 80, objectFit: "contain" }}
                />
                <CardContent sx={{ flexGrow: 1, p: 0 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    {producto.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    ${producto.price}
                  </Typography>
                </CardContent>
                <IconButton
                  color="error"
                  onClick={() =>
                    alert("Implementar función de eliminar producto del carrito")
                  }
                >
                  <Delete />
                </IconButton>
              </Card>
            ))}
            <Typography variant="h6" sx={{ mt: 2, fontWeight: 700 }}>
              Total a pagar: ${total}
            </Typography>
          </>
        ) : (
          <Typography>No hay productos en el carrito</Typography>
        )}
      </Card>

      <Box sx={{ display: "flex", gap: 2, mt: 3, flexWrap: "wrap" }}>
        {carrito.length > 0 && (
          <Button variant="contained" color="primary" onClick={comprar}>
            Confirmar y Pagar
          </Button>
        )}
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => navigate("/productos")}
        >
          {carrito.length > 0 ? "Seguir Comprando" : "Volver a Productos"}
        </Button>
      </Box>
    </Box>
  );
}
