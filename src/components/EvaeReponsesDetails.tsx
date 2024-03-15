import { KeyboardBackspace } from "@mui/icons-material"
import ButtonComponent from "../common/Button"
import { useNavigate } from "react-router-dom"
import { FC } from "react"
import { Box, Grid, Typography } from "@mui/material"
import { Evaluation } from "../types"

interface DetailsProps {
    evaluation : Evaluation
    urlRetour: string
}
const DetailsEvaluationComponent: FC<DetailsProps> = ({
    //   promotion,
    urlRetour,
    evaluation
}) => {
    // const evaluationExample: Evaluation = {
    //     id: 1,
    //     codeFormation: "INF123",
    //     periode: "2024",
    //     designation: "Évaluation Finale",
    //     codeEC: "EC123",
    //     codeUE: "UE456",
    //     debutReponse: "2024-03-01",
    //     finReponse: "2024-03-15",
    //     RubriqueQuestion: [],
    // }
    const textStyle: React.CSSProperties = {
        fontFamily: "cursive",
        color: "#e3a12f",
        marginTop: "20px",
        marginBottom: "50px",
    }
    const navigate = useNavigate()

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
                    margin: "auto",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Typography variant="h4" gutterBottom style={textStyle}>
                    Réponses de l'évaluation
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
                            //component={Paper}
                            //elevation={4}
                            item
                            sm={6}
                            sx={{
                                marginBottom: "10px",
                                //    marginLeft: "10px"
                            }}
                        >
                            <Typography variant="body1">
                                <strong>
                                    {" "}
                                    {evaluation.codeFormation} :
                                </strong>{" "}
                                <strong>{evaluation.codeUE}</strong>{" "}
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
                                <strong>Désignation :</strong>{" "}
                                {evaluation.designation}
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
                                <strong>Période :</strong>{" "}
                                {evaluation.periode}
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
                                <strong>Date de Début :</strong>{" "}
                                {evaluation.debutReponse}
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
                                <strong>Date de fin :</strong>{" "}
                                {evaluation.finReponse}
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
            </div>
        </>
    )
}
export default DetailsEvaluationComponent
