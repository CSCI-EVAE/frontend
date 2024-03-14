import { KeyboardBackspace } from "@mui/icons-material"
import ButtonComponent from "../common/Button"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { FC } from "react"
import { Box, Grid, Typography } from "@mui/material"
import { Promotion } from "../types"
import { Evaluation } from "../types/EvaluationTypes"
import React from "react"

interface DetailsProps {
    evaluation: Evaluation
    urlRetour: string
}
const DetailsEvaluationComponent: FC<DetailsProps> = ({
    evaluation,
    urlRetour,
}) => {
    const textStyle: React.CSSProperties = {
        fontFamily: "cursive",
        color: "#e3a12f",
        marginTop: "20px",
        marginBottom: "50px",
    }

    const { state } = useLocation()
    const infoGenerale = state?.rowDataInfo
    const navigate = useNavigate()
    
    var newEtat = "En cours d'élaboration"
    if (evaluation.etat === "ELA") {
        newEtat = "En cours d'élaboration"
    }
    if (evaluation.etat === "DIS") {
        newEtat = "Mise en disposition"
    }
    if (evaluation.etat === "CLO") {
        newEtat = "Cloturé"
    }

    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear().toString();
        return `${day}-${month}-${year}`;
      };

    return (
        <>
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
                        navigate(urlRetour)
                    }}
                />
                </div>
                <div
                    style={{
                        maxWidth: "90%",
                        marginLeft: "150px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",


                    }}
                >

                </div>
                <div
                    style={{
                        maxWidth: "90%",
                        margin: "auto",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
                        fontSize: "14px",
                    }}
                >
                    <Typography variant="h4" gutterBottom style={textStyle}>
                        Détails de l'évaluation
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
                        }}
                    >
                        <Grid
                            container
                            //gap={2}
                            spacing={2}
                        >
                            <Grid
                                item
                                sm={8}
                                sx={{
                                    marginBottom: "10px",
                                    //    marginLeft: "10px"
                                }}
                            >
                                <Typography variant="body1">
                                    <strong>Formation : </strong>{infoGenerale.nomFormation} - {infoGenerale.codeFormation}

                                </Typography>
                            </Grid>
                            <Grid
                                item
                                sm={4}
                                sx={{
                                    marginBottom: "10px",
                                }}
                            >
                                <Typography variant="body1">

                                    <strong>Année universitaire : </strong>{evaluation.anneUniv}

                                </Typography>
                            </Grid>
                            <Grid
                                item
                                sm={8}
                                //component={Paper}
                                //elevation={4}
                                sx={{ marginBottom: "10px" }}
                            >
                                <Typography variant="body1">
                                    <strong>Unité d'enseignements : </strong>{infoGenerale.designation} - {infoGenerale.codeUE}

                                </Typography>
                            </Grid>
                            <Grid
                                item
                                sm={4}
                                // component={Paper}
                                //elevation={4}
                                sx={{ marginBottom: "10px" }}
                            >
                                {infoGenerale.codeEC && (
                                    <Typography variant="body1">
                                        <strong>Element constitutif : </strong>
                                        {infoGenerale.codeEC}
                                    </Typography>
                                )}
                            </Grid>


                            <Grid
                                item
                                sm={3}
                                sx={{
                                    marginBottom: "10px",
                                }}
                            >
                                <Typography variant="body1">

                                    <strong>Début de réponse : </strong>{formatDate(evaluation.debutReponse)}

                                </Typography>
                            </Grid>
                            <Grid
                                item
                                sm={3}
                                sx={{
                                    marginBottom: "10px",
                                }}
                            >
                                <Typography variant="body1">

                                    <strong>Fin de réponse : </strong>{formatDate(evaluation.finReponse)}
                                    

                                </Typography>
                            </Grid>
                            <Grid
                                item
                                sm={2}
                                sx={{
                                    marginBottom: "10px",
                                    //    marginLeft: "10px"
                                }}
                            >

                            </Grid>
                            <Grid
                                item
                                sm={4}
                                sx={{
                                    marginBottom: "10px",
                                    //    marginLeft: "10px"
                                }}
                            >
                                <Typography variant="body1">
                                    {evaluation.periode ? (
                                        <React.Fragment>
                                            <strong>Periode : </strong>
                                            {evaluation.periode}
                                        </React.Fragment>
                                    ) : (
                                        <React.Fragment>
                                            <strong>Periode : </strong>
                                            Du  {evaluation.debutReponse} au {evaluation.finReponse}
                                        </React.Fragment>
                                    )}
                                </Typography>
                            </Grid>






                        </Grid>
                    </Box>
                </div>
            </>
            )
}
            export default DetailsEvaluationComponent
