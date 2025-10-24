import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { Container, Box, TextField, Button, Typography } from '@mui/material';

export default function IniciarSesion() {
  const navigate = useNavigate();
  const ubicacion = useLocation();
  const { setIsAuthenticated, setUsuario } = useAppContext();

  const [formulario, setFormulario] = useState({ nombre: '', email: '' });

  const manejarEnvio = (e) => {
    e.preventDefault();
    if (formulario.nombre && formulario.email) {
      setIsAuthenticated(true);
      setUsuario(formulario);

      if (ubicacion.state?.carrito) {
        navigate('/pagar', { state: { carrito: ubicacion.state.carrito } });
      } else {
        navigate('/productos');
      }
    } else {
      alert('Completa todos los datos');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          mt: 8,
          p: 4,
          boxShadow: 3,
          borderRadius: 2,
          bgcolor: 'background.paper',
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Inicia sesión
        </Typography>

        <form onSubmit={manejarEnvio}>
          <TextField
            label="Nombre completo"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formulario.nombre}
            onChange={(e) => setFormulario({ ...formulario, nombre: e.target.value })}
            required
          />

          <TextField
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={formulario.email}
            onChange={(e) => setFormulario({ ...formulario, email: e.target.value })}
            required
          />

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
            <Button type="submit" variant="contained" color="primary">
              Iniciar Sesión
            </Button>
            <Button type="button" variant="outlined" color="secondary" onClick={() => navigate('/productos')}>
              Cancelar
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
}
