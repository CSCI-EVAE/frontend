import { Chip, Divider, Paper, Typography } from "@mui/material"
import { RubriqueCompose } from "../types"
import { FC, useContext } from "react"
import ButtonComponent from "../common/Button"
import { StepContext } from "../context/stepperContext"

interface ReponseProps {
    rubriques: RubriqueCompose[]
}
const RecapitulatifReponses: FC<ReponseProps> = ({ rubriques }) => {
    const { handleReset } = useContext(StepContext)
    const handleModifier = () => {
        handleReset()
    }
    return (
        <div>
            <Typography
                style={{ margin: "32px", textAlign: "center" }}
                variant="h5"
                gutterBottom
            >
                Recapitulatif des réponses
            </Typography>

            <Paper elevation={0}>
                {rubriques.map((rubrique, index) => (
                    <>
                        <Paper elevation={3} key={index}>
                            <Typography
                                style={{ margin: "32px", textAlign: "center" }}
                                variant="h5"
                                gutterBottom
                            >
                                {rubrique.designation}
                            </Typography>

                            {rubrique.questions.map((questionItem, index) => (
                                <div
                                    key={index}
                                    style={{ marginBottom: "20px" }}
                                >
                                    <Typography variant="body1" gutterBottom>
                                        <Divider
                                            style={{
                                                backgroundColor: "transparent",
                                            }}
                                        >
                                            {" "}
                                            {questionItem.intitule}{" "}
                                        </Divider>
                                    </Typography>

                                    <div
                                        style={{
                                            width: "100%", // spécifie une largeur pour la div
                                            display: "flex",
                                            flexDirection: "row",
                                            alignItems: "center",
                                            justifyContent: "center", // pour centrer horizontalement
                                            marginBottom: "20px",
                                        }}
                                    >
                                        <Typography
                                            style={{
                                                width: "100px",
                                                textAlign: "right",
                                                marginRight: "16px",
                                                fontSize: "14px",
                                            }}
                                            variant="body1"
                                        >
                                            {questionItem.minimal}
                                        </Typography>

                                        <Chip
                                            style={{ fontSize: "24px" }}
                                            label={"5"}
                                            color="primary"
                                            size="medium"
                                        />

                                        <Typography
                                            style={{
                                                width: "100px",
                                                textAlign: "left",
                                                marginLeft: "16px",
                                                fontSize: "14px",
                                            }}
                                            variant="body1"
                                        >
                                            {questionItem.maximal}
                                        </Typography>
                                    </div>
                                </div>
                            ))}
                        </Paper>
                    </>
                ))}
                <div
                    style={{
                        margin: "auto",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <ButtonComponent
                        text="Réinitialiser"
                        onClick={handleModifier}
                    />
                    <ButtonComponent text="Soumettre" />
                </div>
            </Paper>
        </div>
    )
}
export default RecapitulatifReponses
