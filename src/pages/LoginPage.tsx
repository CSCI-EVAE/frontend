import React, { useEffect } from "react";
import LoginForm from "../components/LoginForm";
import { Container, Paper, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../utils/authUtils";
import Header from "../components/Layout/Header";
import logo from "../images/echoSim.png";

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
       
    };

    const paperStyle: React.CSSProperties = {
        padding: "20px",
        textAlign: "center",
        background: "",
    };

  const textStyle: React.CSSProperties = {
        fontFamily: "cursive",
        color: "#e3a12f",
        marginTop:"20px",
  }

    return (
        <>
        <Header />
        
        <Container maxWidth="md" style={containerStyle}>
            <Paper elevation={3} style={paperStyle}>
                <Box mb={2}>
                    <img
                        src={logo}
                        alt="Logo"
                        width="150"
                        style={{"margin":"-20px"}}
                    />
                </Box>
                <Typography variant="h5" gutterBottom style={textStyle} >
                    Connexion
                </Typography>
                <LoginForm onLoginSuccess={handleLoginSuccess} />
            </Paper>
        </Container>
        </>
       
    );
};

export default LoginPage;
