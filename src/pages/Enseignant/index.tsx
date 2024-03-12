import React from "react"
import { Container, Grid, Paper, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { Icon } from "@mui/material"
import {ENSEIGNANT_DASHBOARD } from "../../constants"
import Header from "../../Layout/Header"
import SideBarEnseignant from "../../Layout/sideBar/SideBarEnseignant"


function BigMenu() {
    const navigate = useNavigate()
    const textStyle: React.CSSProperties = {
        fontFamily: "cursive",
        color: "#e3a12f",
        marginTop: "20px",
        marginBottom: "50px",
    }

    const nomMenu: React.CSSProperties = {
        fontWeight: "bold",
        color: "#2788bf",
    }

    const iconStyle: React.CSSProperties = {
        color: "#2788bf",
    }

    return (
        <>
            <SideBarEnseignant />
            <Header />

            <Container maxWidth="lg">
                <Typography
                    variant="h4"
                    align="center"
                    gutterBottom
                    style={textStyle}
                >
                    Menu Enseignant
                </Typography>
                <Grid container spacing={10} justifyContent="center">
                    {ENSEIGNANT_DASHBOARD.slice(1).map((menuItem, index) => (
                        <Grid key={index} item xs={6}>
                            <Paper
                                onClick={() => navigate(menuItem.link)}
                                elevation={3}
                                sx={{
                                    p: 5,
                                    textAlign: "center",
                                    cursor: "pointer",
                                    height: "100%",
                                    backgroundColor: "white",
                                }}
                            >
                                <Icon style={iconStyle} fontSize="large">
                                    {menuItem.icon}
                                </Icon>
                                <Typography variant="h6" style={nomMenu}>
                                    {menuItem.title}
                                </Typography>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </>
    )
}

export default BigMenu
