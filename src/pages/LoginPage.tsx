import React, { useEffect } from "react"
import LoginForm from "../components/LoginForm"
import { Container, Paper, Typography, Box } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { isAuthenticated } from "../utils/authUtils"
import Header from "../Layout/Header"
import logo from "../images/echoSim.png"
import Notification from "../common/Notification"

const LoginPage: React.FC = () => {
    const navigate = useNavigate()

    useEffect(() => {
        if (isAuthenticated()) {
            navigate("/dashboard") // Redirige vers le tableau de bord si déjà connecté
        }
    }, [navigate])

    const handleLoginSuccess = () => {
        console.log("Connexion réussie")
    }

    const containerStyle: React.CSSProperties = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%"


    }

    const paperStyle: React.CSSProperties = {
        padding: "80px",
        textAlign: "center",
        background: "",
        width: "50%",
        borderRadius: "25px",
        marginTop: "100px",
        zIndex: "1"

    }

    const textStyle: React.CSSProperties = {
        fontFamily: "cursive",
        color: "#e3a12f",
        marginTop: "20px",
      
    }

    const imgStyle: React.CSSProperties = {
       height:"500px",
       width: "100%",
       marginTop:"-150px",
       position: "absolute",
       borderRadius:"40px"

    }

    return (
        <>
            <Header />
            <Notification  />
            <div >
                <img src="../ubo.jpg" alt="" style={imgStyle} />
            </div>

            <Container maxWidth="md" style={containerStyle}>
                <Paper elevation={3} style={paperStyle}>
                    <Box mb={2}>
                        <img
                            src={logo}
                            alt="Logo"
                            width="200"
                            style={{ margin: "-20px" }}
                        />
                    </Box>
                    <Typography variant="h5" gutterBottom style={textStyle}>
                        Connexion
                    </Typography>
                    <LoginForm onLoginSuccess={handleLoginSuccess} />
                </Paper>
            </Container>
        </>
    )
}

export default LoginPage
