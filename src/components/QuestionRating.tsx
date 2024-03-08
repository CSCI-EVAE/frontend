import React, { FC, useState } from "react"
import Rating from "@mui/material/Rating"
import Typography from "@mui/material/Typography"
import { Card, CardContent, Divider, Paper } from "@mui/material"
import { StepContext } from "../context/stepperContext"
import ButtonComponent from "../common/Button"
import { RubriqueCompose } from "../types"
interface QuestionRatingProps {
    rubrique: RubriqueCompose
    handleSubmit: (rubrique: RubriqueCompose, ratings: any[]) => void
}
const QuestionRating: FC<QuestionRatingProps> = ({
    rubrique,
    handleSubmit,
}) => {
    const { activeStep, handleBack } = React.useContext(StepContext)

    const [ratings, setRatings] = useState(
        new Array(rubrique.questions.length).fill(0)
    )

    const handleRatingChange = (index: any, value: any) => {
        const newRatings = [...ratings]

        newRatings[index] = value
        setRatings(newRatings)
    }

    const handleValidate = () => {
        // Vérification pour s'assurer que toutes les questions ont été évaluées
        // for (let i = 0; i < ratings.length; i++) {
        //     if (ratings[i] === 0) {
        //         showNotification(
        //             "Action Impossible",
        //             "Veuillez répondre à toutes les questions",
        //             "error"
        //         )
        //         return
        //     }
        // }
        // Soumettre les évaluations
        console.log("Évaluations soumises :", ratings)
        handleSubmit(rubrique, ratings)
        setRatings(new Array(rubrique.questions.length).fill(0))
        // handleComplete();
    }

    return (
        <div
            style={{
                maxWidth: "70%",
                margin: "auto",
                display: "flex",
                flexDirection: "column",
                //   alignItems: "center",
            }}
        >
            <Paper elevation={0}>
                <Typography
                    style={{ margin: "32px", textAlign: "center" }}
                    variant="h5"
                    gutterBottom
                >
                    {rubrique.designation}
                </Typography>

                {rubrique.questions.map((questionItem, index) => (
                    <div key={index} style={{ marginBottom: "20px" }}>
                        <Card variant="elevation">
                            <CardContent style={{ textAlign: "center" }}>
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
                            </CardContent>
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
                                <Rating
                                    name={`rating-${index}`}
                                    value={ratings[index]}
                                    onChange={(event, value) =>
                                        handleRatingChange(index, value)
                                    }
                                    precision={1}
                                    style={{ fontSize: "24px" }}
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
                        </Card>
                    </div>
                ))}
            </Paper>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "20px",
                }}
            >
                <ButtonComponent
                    text="Retour"
                    variant="contained"
                    onClick={handleBack}
                    disabled={activeStep === 0}
                />
                <ButtonComponent
                    text="Suivant"
                    variant="contained"
                    onClick={handleValidate}
                    disabled={ratings.some(
                        (rating) => rating === 0 || rating === null
                    )}
                />
            </div>
        </div>
    )
}

export default QuestionRating
