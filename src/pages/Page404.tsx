/**
 * Page404 Component
 *
 * @component
 * @description Ce fichier exporte le composant Page404, qui est utilisé pour afficher un message
 * indiquant qu'une page n'a pas été trouvée (erreur 404).
 *
 * @exports {Page404} Composant React pour la gestion des pages non trouvées.


 * @returns {ReactElement} Composant Page404.
 */
import React from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';

export default function Error() {
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
              The page you’re looking for doesn’t exist.
            </Typography>
            <Link to="/">
              <Button variant="contained">Back Home</Button>
            </Link>
          </Grid>
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img
              src="./404.jpg"
              alt=""
              style={{ width: '100%', maxHeight: '70vh', objectFit: 'contain' }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

