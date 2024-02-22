import React, { useEffect } from "react";
import LoginForm from "../components/LoginForm";
import { Container, Paper, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../utils/authUtils";

const LoginPage: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated()) {
            navigate("/dashboard"); // Redirige vers le tableau de bord si déjà connecté
        }
    }, [navigate]);

    const handleLoginSuccess = () => {
        console.log("Connexion réussie");
    };

    const containerStyle: React.CSSProperties = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
        background: "rgba(255, 255, 255, 0.4)", // Fond transparent à 40%
    };

    const paperStyle: React.CSSProperties = {
        padding: "20px",
        textAlign: "center",
        background: "rgba(209, 222, 240, 0.4)",
    };

    return (
        <Container maxWidth="md" style={containerStyle}>
            <Paper elevation={3} style={paperStyle}>
                <Box mb={2}>
                    <img
                        src="https://upload.wikimedia.org/wikipedia/fr/thumb/5/51/Universit%C3%A9_de_Bretagne_occidentale_%28logo%29.svg/1280px-Universit%C3%A9_de_Bretagne_occidentale_%28logo%29.svg.png"
                        alt="Logo"
                        width="100"
                    />
                </Box>
                <Typography variant="h4" gutterBottom>
                    Connexion
                </Typography>
                <LoginForm onLoginSuccess={handleLoginSuccess} />
            </Paper>
        </Container>
    );
};

export default LoginPage;
