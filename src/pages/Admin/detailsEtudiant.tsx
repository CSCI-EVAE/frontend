import React, { useContext, useEffect, useState } from "react";
import { EtudiantDTO } from "../../types";
import { EtudiantListContext } from "../../context/etudiantListContext";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../Layout/sideBar/SidebarPage";
import Header from "../../Layout/Header";
import ButtonComponent from "../../common/Button";
import { KeyboardBackspace } from "@mui/icons-material";
import { Box, Grid, Typography } from "@mui/material";
import { GENDERS, PAYS_OPTIONS, UNIVERSITE_ORIGINE_OPTIONS } from "../../constants";
import { formatDate } from "../../components/detailsPromotionComponent";


const EtudiantDetailsPage: React.FC = () => {

    const { noEtudiant = "" } = useParams<{ noEtudiant?: string }>()

    const [etudiantDetails, setEtudiantDetails] = useState<EtudiantDTO | null>(null);

    const { getEtudiant } = useContext(EtudiantListContext);
    const navigate = useNavigate()

    const getSexeLabel = (sexe: any) => {
        if (sexe === GENDERS.homme.value) {
            return GENDERS.homme.label;
        } else if (sexe === GENDERS.femme.value) {
            return GENDERS.femme.label;
        } else {
            return "Non spécifié";
        }
    };

    const textStyle: React.CSSProperties = {
        fontFamily: "system-ui",
        color: "#e3a12f",
        margin: "auto",
        textAlign: "center",
        fontSize: "1.7rem",
    }

    const getPaysLabel = (pays: any) => {
        const paysOrigine = PAYS_OPTIONS.find(option => option.value === pays);
        return paysOrigine ? paysOrigine.label : "Inconnu";
    };

    const getUniversiteLabel = (universite: any) => {
        const universiteOrigine = UNIVERSITE_ORIGINE_OPTIONS.find(option => option.value === universite);
        return universiteOrigine ? universiteOrigine.label : "Inconnu";
    };


    useEffect(() => {

        const fetchEtudiantDetails = async () => {
            try {

                const etudiantData = await getEtudiant(noEtudiant);
                setEtudiantDetails(etudiantData);
            } catch (error) {
                console.error("Erreur lors de la récupération des détails de l'étudiant:", error);
            }
        };

        fetchEtudiantDetails();
    }, [noEtudiant, getEtudiant]);


    return (
        <>

            <Sidebar />
            <Header />
            <div
                style={{
                    maxWidth: "90%",
                    marginLeft: "150px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                   
                }}
            >
                <ButtonComponent
                    text="Retour"
                    variant="contained"
                    icon={<KeyboardBackspace />}
                    onClick={() => {
                        navigate(`/dashboard/details-promotion/${etudiantDetails?.CodeFormation}/${etudiantDetails?.anneeUniversitaire}`)
                    }}
                />
            </div>
            <div
                style={{
                    maxWidth: "90%",
                    margin: "auto",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Typography variant="h4" gutterBottom style={textStyle}
                >
                    Détails de l'étudiant
                </Typography>
                <Box
                    sx={{
                        maxWidth: "80%",
                        display: "flex",
                        flexDirection: "column",
                        //  gap: "10px",
                        padding: "20px",
                        border: "2px solid #ccc",
                        borderRadius: "8px",
                        marginTop:"80px"
                    }}
                >
                    <Grid
                        container
                        spacing={2}
                    >

                        <Grid
                            item
                            sm={6}
                            sx={{ marginBottom: "10px" }}
                        >
                            <Typography variant="body1">
                                <strong>{etudiantDetails?.CodeFormation} : {etudiantDetails?.anneeUniversitaire}</strong>{" "}

                            </Typography>
                        </Grid>
                        <Grid
                            item
                            sm={6}
                            sx={{ marginBottom: "10px" }}
                        >
                            <Typography variant="body1">
                                <strong>{""}</strong>{" "}

                            </Typography>
                        </Grid>
                        <Grid
                            item
                            sm={6}

                            sx={{ marginBottom: "10px" }}
                        >
                            <Typography variant="body1">
                                <strong>Numéro étudiant :</strong>{" "}
                                {etudiantDetails?.noEtudiant}
                            </Typography>
                        </Grid>
                        <Grid
                            item
                            sm={6}
                            sx={{ marginBottom: "10px" }}
                        >
                            <Typography variant="body1">
                                <strong>Nom Complet :</strong>{" "}
                                {etudiantDetails?.prenom}{" "}
                                {etudiantDetails?.nom}
                            </Typography>
                        </Grid>


                        <Grid
                            item
                            sm={6}
                            // component={Paper}
                            //elevation={4}
                            sx={{ marginBottom: "10px" }}
                        >
                            <Typography variant="body1">
                                <strong>Sexe : </strong>{" "}
                                {getSexeLabel(etudiantDetails?.sexe)}
                            </Typography>
                        </Grid>
                        <Grid
                            item
                            sm={6}
                            // component={Paper}
                            //elevation={4}
                            sx={{ marginBottom: "10px" }}
                        >
                            <Typography variant="body1">
                                <strong>Date de naissance :</strong>{" "}

                                {etudiantDetails?.dateNaissance ? formatDate(etudiantDetails.dateNaissance) : 'Non spécifiée'}



                            </Typography>
                        </Grid>
                        <Grid
                            item
                            sm={6}
                            // component={Paper}
                            //elevation={4}
                            sx={{ marginBottom: "10px" }}
                        >
                            <Typography variant="body1">
                                <strong>Lieu de naissance :</strong>{" "}
                                {etudiantDetails?.lieuNaissance}
                            </Typography>
                        </Grid>
                        <Grid
                            item
                            sm={6}
                            //component={Paper}
                            // elevation={4}
                            sx={{ marginBottom: "10px" }}
                        >
                            <Typography variant="body1">
                                <strong>Nationalité :</strong>{" "}
                                {etudiantDetails?.nationalite}
                            </Typography>
                        </Grid>
                        <Grid
                            item
                            sm={6}
                            // component={Paper}
                            //elevation={4}
                            sx={{ marginBottom: "10px" }}
                        >
                            <Typography variant="body1">
                                <strong>Téléphone :</strong>{" "}
                                {etudiantDetails?.telephone}
                            </Typography>
                        </Grid>
                        <Grid
                            item
                            sm={6}
                            //component={Paper}
                            //elevation={4}
                            sx={{ marginBottom: "10px" }}
                        >
                            <Typography variant="body1">
                                <strong>Mobile :</strong>{" "}
                                {etudiantDetails?.mobile}
                            </Typography>
                        </Grid>
                        <Grid
                            item
                            sm={6}
                            //component={Paper}
                            //elevation={4}
                            sx={{ marginBottom: "10px" }}
                        >
                            <Typography variant="body1">
                                <strong>Email :</strong>{" "}
                                {etudiantDetails?.email}
                            </Typography>
                        </Grid>
                        <Grid
                            item
                            sm={6}
                            //component={Paper}
                            //elevation={4}
                            sx={{ marginBottom: "10px" }}
                        >
                            <Typography variant="body1">
                                <strong>Email UBO :</strong>{" "}
                                {etudiantDetails?.emailUbo}
                            </Typography>
                        </Grid>

                        <Grid
                            item
                            sm={6}
                            //component={Paper}
                            //elevation={4}
                            sx={{ marginBottom: "10px" }}
                        >
                            <Typography variant="body1">
                                <strong>Adresse :</strong>{" "}
                                {etudiantDetails?.adresse}
                            </Typography>
                        </Grid>
                        <Grid
                            item
                            sm={6}
                            //component={Paper}
                            //elevation={4}
                            sx={{ marginBottom: "10px" }}
                        >
                            <Typography variant="body1">
                                <strong>Ville :</strong>{" "}
                                {etudiantDetails?.ville}
                            </Typography>
                        </Grid>
                        <Grid
                            item
                            sm={6}
                            //component={Paper}
                            //elevation={4}
                            sx={{ marginBottom: "10px" }}
                        >
                            <Typography variant="body1">
                                <strong>Pays d'origine :</strong>{" "}
                                {getPaysLabel(etudiantDetails?.paysOrigine)}
                            </Typography>
                        </Grid>
                        <Grid
                            item
                            sm={6}
                            //component={Paper}
                            //elevation={4}
                            sx={{ marginBottom: "10px" }}
                        >
                            <Typography variant="body1">
                                <strong>Université d'origine :</strong>{" "}
                                {getUniversiteLabel(etudiantDetails?.universiteOrigine)}
                            </Typography>
                        </Grid>
                        <Grid
                            item
                            sm={6}
                            //component={Paper}
                            //elevation={4}
                            sx={{ marginBottom: "10px" }}
                        >
                            <Typography variant="body1">
                                <strong>Groupe TP :</strong>{" "}
                                {etudiantDetails?.groupeTp}
                            </Typography>
                        </Grid>
                        <Grid
                            item
                            sm={6}
                            //component={Paper}
                            //elevation={4}
                            sx={{ marginBottom: "10px" }}
                        >
                            <Typography variant="body1">
                                <strong>Groupe d'anglais :</strong>{" "}
                                {etudiantDetails?.groupeAnglais}
                            </Typography>
                        </Grid>

                    </Grid>
                </Box>
            </div>
        </>
    );
};



export default EtudiantDetailsPage;
