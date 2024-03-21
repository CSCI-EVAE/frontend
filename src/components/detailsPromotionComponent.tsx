import { KeyboardBackspace } from "@mui/icons-material"
import ButtonComponent from "../common/Button"
import { useNavigate } from "react-router-dom"
import { FC } from "react"
import { Box, Grid, Typography } from "@mui/material"
import { Promotion } from "../types"

interface DetailsProps {
    promotion: Promotion
    urlRetour: string
    effectifReel: number
}
export const formatDate = (dateString: string | null): string => {
    if (dateString) {
        const [year, month, day] = dateString.split('-'); // Suppose que la chaîne est au format "YYYY-MM-DD"
        return `${day}-${month}-${year}`;
    } else {
        return "";
    }
};
const DetailsPromotionComponent: FC<DetailsProps> = ({
    promotion,
    effectifReel,
    urlRetour,
}) => {
    const textStyle: React.CSSProperties = {
        fontFamily: "system-ui",
        color: "#e3a12f",
        marginTop: "20px",
        marginBottom: "50px",
        fontSize: "1.7rem",
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
                    Détails de la Promotion
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
                                <strong> {promotion.codeFormation} :</strong>{" "}
                                <strong>{promotion.anneeUniversitaire}</strong>{" "}
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
                                <strong>Enseignant Responsable :</strong>{" "}
                                {promotion.prenomResponsable}{" "}
                                {promotion.nomResponsable}
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
                                <strong>Sigle de Promotion :</strong>{" "}
                                {promotion.siglePromotion}
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
                                <strong>Nombre d'Étudiants :</strong>{" "}
                                {effectifReel} / {promotion.nbMaxEtudiant}
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
                                <strong>Date de Réponse (LP) :</strong>{" "}
                                {formatDate(promotion.dateReponseLp)}
                                <strong> {"||"}</strong>
                                <strong> (LALP) : </strong>{" "}
                                {formatDate(promotion.dateReponseLalp)}
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
                                <strong>Date de Rentrée :</strong>{" "}
                                {formatDate(promotion.dateRentree)}
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
                                <strong>Lieu de Rentrée :</strong>{" "}
                                {promotion.lieuRentree}
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
                                <strong>Processus de Stage :</strong>{" "}
                                {promotion.processusStage}
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
                                <strong>Commentaire :</strong>{" "}
                                {promotion.commentaire}
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
            </div>
        </>
    )
}
export default DetailsPromotionComponent
