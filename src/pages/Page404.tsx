import React, { useEffect, useState } from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { Link, Navigate } from 'react-router-dom';

const Error = () => {
  const [redirect, setRedirect] = useState(false);

  // Utilisation de useEffect pour déclencher la navigation après 10 secondes
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      // Mettez à jour l'état pour déclencher la redirection
      setRedirect(true);
    }, 20000); // 10000 millisecondes = 10 secondes

    // Assurez-vous de nettoyer le timeout lors du démontage du composant
    return () => clearTimeout(timeoutId);
  }, []);

  // Si l'état de redirection est vrai, rediriger vers la page d'accueil
  if (redirect) {
    return <Navigate to="/" />;
  }

  // Sinon, afficher la page 404 avec le délai d'attente
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        minHeight: '100vh'
      }}
    >
      <Container maxWidth="md">
        <Grid container spacing={2}>
          <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Typography variant="h1" sx={{ fontSize: '4rem', marginBottom: '1rem' }}>
              404
            </Typography>
            <Typography variant="h3" sx={{ fontSize: '3rem', marginBottom: '2rem' }}>
              Cette page n'éxiste pas.
            </Typography>
            <Link to="/">
              <Button variant="contained">Retour à l'accueil</Button>
            </Link>
          </Grid>
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {/* <img
              src="./404.jpg"
              alt=""
              style={{ width: '100%', maxHeight: '70vh', objectFit: 'contain' }}
            /> */}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Error;
