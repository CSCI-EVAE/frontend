import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isAuthenticated, userInfos } from "../../utils/authUtils";
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
} from "@mui/material";
import ButtonComponent from "../common/Button";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import {  useTheme,} from '@mui/material/styles';
const Header: React.FC = () => {
    let navigate = useNavigate();

    
    const [open, setOpen] = useState(false); // État pour contrôler l'ouverture de la boîte de dialogue

    const isAuth = isAuthenticated();
    const [prenom, setPrenom] = useState("");
    const [role, setRole] = useState("");

    useEffect(() => {
        if (isAuth) {
            setPrenom(userInfos().prenom);
            setRole(userInfos().role);
        }
    }, [isAuth]);

    const handleLogout = () => {
        setOpen(true); // Ouvrir la boîte de dialogue pour confirmation
    };

    const handleLogoutConfirmed = () => {
        setOpen(false);
        localStorage.removeItem("jwtToken");
        localStorage.removeItem("user");
        navigate("/login");
    };

    const handleCancelLogout = () => {
        setOpen(false); // Fermer la boîte de dialogue de confirmation
    };

    const handleLogin = () => {
        navigate("/login");
    };
    const myTheme  = useTheme();

    return (
        <>
            <AppBar
                position="static"
                sx={{backgroundColor : myTheme.palette.secondary.main}}
                >
                <Toolbar>
                    <Box mb={2}>
                        <img
                            src="https://upload.wikimedia.org/wikipedia/fr/thumb/5/51/Universit%C3%A9_de_Bretagne_occidentale_%28logo%29.svg/1280px-Universit%C3%A9_de_Bretagne_occidentale_%28logo%29.svg.png"
                            alt="Logo"
                            width="100"
                        />
                    </Box>
                    {isAuth ? (
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{ flexGrow: 1, textAlign: "center" }}
                        >
                            Bienvenue {prenom}
                            <br />
                            <span style={{ fontSize: "small", color: "blue" }}>
                                {role}
                            </span>
                        </Typography>
                    ) : (
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{ flexGrow: 1 }}
                        >
                            Bienvenue
                        </Typography>
                    )}
                    {isAuth ? (
                        <ButtonComponent
                            variant="contained"
                            icon={<LogoutIcon />}
                            text="Déconnexion"
                            onClick={handleLogout}
                        />
                    ) : (
                        <ButtonComponent
                            variant="contained"
                            icon={<LoginIcon />}
                            text="Connexion"
                            onClick={handleLogin}
                        />
                    )}
                </Toolbar>
                {/* <Sidebar /> */}
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
    );
};

export default Header;
