import React from "react"

import { Container, Paper, Typography, Box } from "@mui/material"
import {useNavigate } from "react-router-dom"

import logo from "../images/echoSim.png"
import { COLORS } from "../constants"
const LandingPage: React.FC = () => {

    const navigate = useNavigate()


    const handleSubmit = () => {
        navigate('/login')
    }

 

    const containerStyle: React.CSSProperties = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      //  margin:"auto"


    }

    const paperStyle: React.CSSProperties = {
        padding: "80px",
        textAlign: "center",
        background: "",
        width: "80%",
        borderRadius: "25px",
        marginTop: "100px",
        zIndex: "1",
        opacity:'0.8'

    }


    const imgStyle: React.CSSProperties = {
       height:"100vh",
       width: "100%",
       marginTop:"-96px",
       position: "absolute",
      // borderRadius:"40px"

    }
    const textStyle: React.CSSProperties = {
        fontFamily: "system-ui",
        color: "#000",
        marginTop: "25px",
      
    }
    const btnStyle: React.CSSProperties = {
        backgroundColor: COLORS.color3,
        color: 'white', 
        borderRadius: '25px',
        padding: '10px 20px', 
        border:'none',
        width:"160px",
        height: "50px",
        fontSize: "18px",
        fontWeight: "bold"

    }

    return (
        <>
           
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
                        Bienvenue sur la plateforme de gestion des évaluations de l'UBO
                    </Typography>
                    <button 
                    style={btnStyle}
                    type="submit"
                onClick={handleSubmit}
                                    
                   >Connexion</button>
                   
                </Paper>
            </Container>
        </>
    )
}

export default LandingPage
