import React from "react";
import { Link } from "react-router-dom";
import { Box, Typography, Grid, Card, Button } from "@mui/material";
import { LocalShipping, Payment, HeadsetMic } from "@mui/icons-material";

export default function Servicios() {
  const servicios = [
    {
      icon: <LocalShipping fontSize="large" color="primary" />,
      title: "Envíos a todo el país",
      description: "Recibí tus productos donde quieras, sin importar la ubicación.",
    },
    {
      icon: <Payment fontSize="large" color="primary" />,
      title: "Todos los medios de pago",
      description: "Aceptamos tarjetas, transferencias y otros medios de pago digitales.",
    },
    {
      icon: <HeadsetMic fontSize="large" color="primary" />,
      title: "Ayuda en línea 24/7",
      description: "Nuestro equipo de soporte está disponible todo el día para ayudarte.",
    },
  ];

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, textAlign: "center", maxWidth: 1200, mx: "auto" }}>
      <Typography variant="h3" gutterBottom>
        Nuestros Servicios
      </Typography>

      <Typography variant="body1" sx={{ mb: 4 }}>
        Desde hace más de 10 años estamos en el mercado ofreciendo productos de calidad
        en ropa, electrónica y más. Nuestro emprendimiento se encuentra en Buenos Aires
        y trabajamos para brindar la mejor experiencia de compra online.
      </Typography>

      <Grid container spacing={4}>
        {servicios.map((serv, index) => (
          <Grid
            key={index}
            sx={{
              flex: { xs: "100%", sm: "50%", md: "33.33%" },
              display: "flex",
              gap: 2,
            }}
          >
            <Card
              sx={{
                p: 3,
                textAlign: "center",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                boxShadow: 3,
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": { transform: "translateY(-6px)", boxShadow: 6 },
                width: "100%",
              }}
            >
              <Box sx={{ mb: 2 }}>{serv.icon}</Box>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                {serv.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {serv.description}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mt: 4 }}>
        <Button variant="contained" component={Link} to="/">
          Volver al Inicio
        </Button>
      </Box>
    </Box>
  );
}
