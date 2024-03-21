import React, { FC, useContext } from "react"
import Rating from "@mui/material/Rating"
import Typography from "@mui/material/Typography"
import { Divider, Paper } from "@mui/material"
import { StepContext } from "../context/stepperContext"
import ButtonComponent from "../common/Button"
import { RubriqueEvaluation } from "../types/EvaluationTypes"
import { COLORS } from "../constants"
import {
    EvaluationEtudiantContext,
    hasDefaultValueZero,
} from "../context/evaluationEtudiantContext"

interface QuestionRatingProps {
    rubrique: RubriqueEvaluation
    handleSubmit: () => void
}
const ModifierQuestionRating: FC<QuestionRatingProps> = ({
    rubrique,
    handleSubmit,
}) => {
    const { activeStep, handleBack } = React.useContext(StepContext)
    const { updateReponseEvaluation, defaultValue } = useContext(
        EvaluationEtudiantContext
    )
    console.log("🚀 ~ defaultValue:", defaultValue)

    const handleRatingChange = (
        index: number,
        value: number,
        idQuestion: number
    ) => {
        updateReponseEvaluation(idQuestion, value)
    }

    const handleValidate = () => {
        // Soumettre les évaluations

        handleSubmit()

        //handleComplete();
    }

    if (!rubrique) {
        return <>Loading</>
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
            <Paper
                elevation={4}
                sx={{
                    marginBottom: "24px",
                    background: COLORS.color7,
                }}
            >
                <div>
                    <Typography
                        style={{
                            margin: "24px",
                            textAlign: "center",
                        }}
                        variant="h5"
                        gutterBottom
                    >
                        Rubrique :{" "}
                        <span
                            style={{
                                color: COLORS.color4,
                                fontWeight: "bold",
                            }}
                        >
                            {rubrique.idRubrique.designation}
                        </span>
                    </Typography>

                    {rubrique.questionEvaluations &&
                        rubrique.questionEvaluations?.map(
                            (questionItem, qIndex) => (
                                <div
                                    key={qIndex}
                                    style={{
                                        backgroundColor:
                                            qIndex % 2 === 0
                                                ? "#fff"
                                                : "#f9f9f9",
                                    }}
                                >
                                    <Divider />
                                    <div
                                        style={{
                                            display: "flex",
                                            flexDirection: "row",
                                            justifyContent: "space-between",
                                            width: "80%",
                                            margin: "auto",
                                        }}
                                    >
                                        {/* Premier contenu aligné à gauche */}
                                        <div
                                            style={{
                                                margin: "16px",
                                            }}
                                        >
                                            <Typography>
                                                {
                                                    questionItem.idQuestion
                                                        .intitule
                                                }
                                            </Typography>
                                        </div>

                                        {/* Deuxième contenu aligné à droite */}
                                        <div
                                            style={{
                                                display: "flex",
                                                flexDirection: "row",
                                                margin: "16px",
                                            }}
                                        >
                                            {/* Typographie pour la valeur minimale */}
                                            <div
                                                style={{
                                                    width: "100px",
                                                }}
                                            >
                                                <Typography variant="body1">
                                                    {
                                                        questionItem.idQuestion
                                                            .idQualificatif
                                                            .minimal
                                                    }
                                                </Typography>
                                            </div>

                                            {/* Chip avec une largeur fixe */}
                                            <div
                                                style={{
                                                    width: "100px",
                                                }}
                                            >
                                                <Rating
                                                    sx={{
                                                        width: "100px",
                                                        fontSize: "24px",
                                                    }}
                                                    name={`rating-${qIndex}`}
                                                    //value={ratings[qIndex]}
                                                    defaultValue={
                                                        defaultValue[
                                                            questionItem.id
                                                        ]
                                                    }
                                                    onChange={(event, value) =>
                                                        handleRatingChange(
                                                            qIndex,
                                                            value ?? 0,
                                                            questionItem.id
                                                        )
                                                    }
                                                    precision={1}
                                                />
                                            </div>

                                            {/* Typographie pour la valeur maximale */}
                                            <div
                                                style={{
                                                    width: "100px",

                                                    marginLeft: "32px",
                                                }}
                                            >
                                                <Typography variant="body1">
                                                    {
                                                        questionItem.idQuestion
                                                            .idQualificatif
                                                            .maximal
                                                    }
                                                </Typography>
                                            </div>
                                        </div>
                                    </div>
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
                    disabled={hasDefaultValueZero(
                        defaultValue,
                        rubrique.questionEvaluations ?? []
                    )}
                />
            </div>
        </div>
    )
}

export default ModifierQuestionRating
