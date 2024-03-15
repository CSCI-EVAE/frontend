import React, { FC, useState } from "react"
import Rating from "@mui/material/Rating"
import Typography from "@mui/material/Typography"
import { Card, CardContent, Divider, Paper } from "@mui/material"
import { StepContext } from "../context/stepperContext"
import ButtonComponent from "../common/Button"
import { RubriqueEvaluation } from "../types/EvaluationTypes"
interface QuestionRatingProps {
    rubrique: RubriqueEvaluation
    handleSubmit: () => void
    handleAddChoice: (idQuestion: number, positionnement: number) => void
}
const QuestionRating: FC<QuestionRatingProps> = ({
    rubrique,
    handleSubmit,
    handleAddChoice,
}) => {
    const { activeStep, handleBack } = React.useContext(StepContext)
    const arrayLength = rubrique.questionEvaluations?.length ?? 1

    const [ratings, setRatings] = useState(new Array(arrayLength).fill(0))

    if (!rubrique) {
        return <>Loading</>
    }
    const handleRatingChange = (
        index: number,
        value: number,
        idQuestion: number
    ) => {
        handleAddChoice(idQuestion, value)
        const newRatings = [...ratings]

        newRatings[index] = value
        setRatings(newRatings)
    }

    const handleValidate = () => {
        // Soumettre les évaluations
        console.log("Évaluations soumises :", ratings)
        handleSubmit()
        setRatings(new Array(arrayLength).fill(0))
        //handleComplete();
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
                <div>
                    <Typography
                        style={{ margin: "32px", textAlign: "center" }}
                        variant="h5"
                        gutterBottom
                    >
                        {rubrique.idRubrique.designation}
                    </Typography>

                    {rubrique.questionEvaluations &&
                        rubrique.questionEvaluations?.map(
                            (questionItem, qIndex) => (
                                <div
                                    key={qIndex}
                                    style={{ marginBottom: "20px" }}
                                >
                                    <Card variant="elevation">
                                        <CardContent
                                            style={{ textAlign: "center" }}
                                        >
                                            <Typography
                                                variant="body1"
                                                gutterBottom
                                            >
                                                <Divider
                                                    style={{
                                                        backgroundColor:
                                                            "transparent",
                                                    }}
                                                >
                                                    {questionItem.intitule}
                                                </Divider>
                                            </Typography>
                                        </CardContent>
                                        <div
                                            style={{
                                                width: "100%",
                                                display: "flex",
                                                flexDirection: "row",
                                                alignItems: "center",
                                                justifyContent: "center",
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
                                                {
                                                    questionItem.idQuestion
                                                        .idQualificatif.minimal
                                                }
                                            </Typography>
                                            <Rating
                                                name={`rating-${qIndex}`}
                                                //value={ratings[qIndex]}

                                                onChange={(event, value) =>
                                                    handleRatingChange(
                                                        qIndex,
                                                        value ?? 0,
                                                        questionItem.id
                                                    )
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
                                                {
                                                    questionItem.idQuestion
                                                        .idQualificatif.maximal
                                                }
                                            </Typography>
                                        </div>
                                    </Card>
                                </div>
                            )
                        )}
                </div>
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
