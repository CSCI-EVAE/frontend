import React from 'react';
import { Container, Grid, Paper, Typography, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@mui/material';
import { ADMIN_DASHBOARD } from '../../constants';

function BigMenu() {
    const navigate = useNavigate();


    return (
        <Container maxWidth="lg" >
            <Typography variant="h4" align="center" gutterBottom>
                Menu
            </Typography>
            <Grid container spacing={3} justifyContent="center">
    {ADMIN_DASHBOARD.slice(1).map((menuItem, index) => ( // Utilisation de slice(1) pour commencer à l'élément 1
        <Grid key={index} item xs={6}>
            <Paper
                onClick={() => navigate(menuItem.link)}
                elevation={3}
                sx={{ p: 2, textAlign: 'center', cursor: 'pointer', height: '100%' , backgroundColor: "#d1dcde"}}
            >
                <Icon>{menuItem.icon}</Icon>
                <Divider sx={{ my: 2 }} />
                <Typography variant="h6">{menuItem.title}</Typography>
                <Divider sx={{ my: 2 }} />
            </Paper>
        </Grid>
    ))}
</Grid>

        </Container>
    );
}

export default BigMenu;
