import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { isAuthenticated, userInfos } from "../utils/authUtils"
import {
    Button,
    Typography,
    Toolbar,
    AppBar,
    Box,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from "@mui/material"
import LoginIcon from "@mui/icons-material/Login"
import LogoutIcon from "@mui/icons-material/Logout"
import BtnComponent from "../common/Button/btn"
import logo from "../images/echoSim.png"
import PersonIcon from "@mui/icons-material/Person"
import { COLORS } from "../constants"
const Header: React.FC = () => {
    let navigate = useNavigate()

    const [open, setOpen] = useState(false) // État pour contrôler l'ouverture de la boîte de dialogue

    const isAuth = isAuthenticated()


    const [prenom, setPrenom] = useState("")

    useEffect(() => {
        if (isAuth) {
           
            setPrenom(userInfos().prenom)
        }
    }, [isAuth])

    const handleLogout = () => {
        setOpen(true) // Ouvrir la boîte de dialogue pour confirmation
    }

    const handleLogoutConfirmed = () => {
        setOpen(false)
        localStorage.removeItem("jwtToken")
        localStorage.removeItem("user")
        navigate("/login")
    }

    const handleCancelLogout = () => {
        setOpen(false) // Fermer la boîte de dialogue de confirmation
    }

    const handleLogin = () => {
        navigate("/login")
    }

    return (
        <>
            <AppBar
                position="fixed"
                sx={{ backgroundColor: COLORS.color6, zIndex: 9999 }}
            >
                <Toolbar>
                    <Box mb={2}>
                        <img
                            src={logo}
                            alt="Logo"
                            width="80"
                            style={{
                                marginBottom: "-30px",
                                marginTop: "-10px",
                            }}
                        />
                    </Box>
                    {isAuth ? (
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{ flexGrow: 1, textAlign: "right" }}
                        >
                            <BtnComponent
                                variant="text"
                                icon={<PersonIcon />}
                                text={prenom}
                            />
                        </Typography>
                    ) : (
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{ flexGrow: 1 }}
                        ></Typography>
                    )}
                    {isAuth ? (
                        <BtnComponent
                            variant="text"
                            icon={<LogoutIcon />}
                            text=""
                            onClick={handleLogout}
                        />
                    ) : (
                        <BtnComponent
                            variant="text"
                            icon={<LoginIcon />}
                            text=""
                            onClick={handleLogin}
                        />
                    )}
                </Toolbar>
            </AppBar>
            <Dialog open={open} onClose={handleCancelLogout}>
                <DialogTitle>Confirmation de déconnexion</DialogTitle>
                <DialogContent>
                    Êtes-vous sûr de vouloir vous déconnecter ?
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleLogoutConfirmed} color="primary">
                        Oui
                    </Button>
                    <Button
                        onClick={handleCancelLogout}
                        color="primary"
                        autoFocus
                    >
                        Non
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default Header
