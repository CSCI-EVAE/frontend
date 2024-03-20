import React, { FC, useContext, useEffect, useState } from "react"
import Rating from "@mui/material/Rating"
import Typography from "@mui/material/Typography"
import { Divider, Paper } from "@mui/material"
import { StepContext } from "../context/stepperContext"
import ButtonComponent from "../common/Button"
import {
    QuestionEvaluation,
    RubriqueEvaluation,
} from "../types/EvaluationTypes"
import { DefaultValue, ReponseEvaluation, reponseQuestions } from "../types"
import { COLORS } from "../constants"
import { EvaluationEtudiantContext } from "../context/evaluationEtudiantContext"

const createDefaultValue = (
    reponseQuestions: reponseQuestions[],
    questionEvaluations: QuestionEvaluation[]
): DefaultValue => {
    const defaultValue: DefaultValue = {}
    // Parcourt chaque réponse
    reponseQuestions.forEach((reponse) => {
        // Trouve la question correspondante dans les évaluations de questions
        const question = questionEvaluations.find((q) => {
            return q.id === reponse.idQuestionEvaluation.id
        })

        // Si la question est trouvée, ajoute l'id de la question avec son positionnement à defaultValue
        if (question) {
            defaultValue[question.id] = reponse.positionnement
        }
    })

    // Parcourt chaque questionEvaluation pour vérifier si elle est présente dans defaultValue
    questionEvaluations.forEach((question) => {
        if (!(question.id in defaultValue)) {
            // Si la question n'est pas présente, ajoute l'id de la question avec positionnement 0 à defaultValue
            defaultValue[question.id] = 0
        }
    })

    return defaultValue
}
interface QuestionRatingProps {
    rubrique: RubriqueEvaluation
    handleSubmit: () => void
}
const ModifierQuestionRating: FC<QuestionRatingProps> = ({
    rubrique,
    handleSubmit,
}) => {
    const { activeStep, handleBack } = React.useContext(StepContext)
    const { updateReponseEvaluationModifier } = useContext(
        EvaluationEtudiantContext
    )
    const arrayLength = rubrique.questionEvaluations?.length ?? 1

    const [ratings, setRatings] = useState(new Array(arrayLength).fill(0))

    const handleRatingChange = (
        index: number,
        value: number,
        idQuestion: number
    ) => {
        updateReponseEvaluationModifier(idQuestion, value)
        const newRatings = [...ratings]

        newRatings[index] = value
        setRatings(newRatings)
    }

    const handleValidate = () => {
        // Soumettre les évaluations

        handleSubmit()
        setRatings(new Array(arrayLength).fill(0))
        //handleComplete();
    }
    const rep = localStorage.getItem("modifierEvaluation")

    const evae: ReponseEvaluation = JSON.parse(rep ?? "{}")

    const defaultV = createDefaultValue(
        evae.reponseQuestions ?? [],
        rubrique.questionEvaluations || []
    )
    const [defaultValue, setDefaultValue] = useState<DefaultValue>(defaultV)
    useEffect(() => {
        const rep = localStorage.getItem("modifierEvaluation")

        if (rep && rubrique.questionEvaluations) {
            console.log(
                "🚀 ~ useEffect ~ rubrique:",
                rubrique.questionEvaluations
            )
            console.log("🚀 ~ useEffect ~ rep:", rep)
            const evae: ReponseEvaluation = JSON.parse(rep)
            console.log("🚀 ~ useEffect ~ evae:", evae.reponseQuestions)

            const defaultV = createDefaultValue(
                evae.reponseQuestions,
                rubrique.questionEvaluations
            )
            console.log("🚀 ~ defaultValue:", defaultV)

            setDefaultValue(defaultV)
            setRatings(new Array(arrayLength).fill(1))
        }
    }, [rep, rubrique.questionEvaluations, arrayLength])
    if (!rubrique) {
        return <>Loading</>
    }
    console.log("🚀 ~ defaultValue:OUIH", defaultValue)
    console.log("🚀 ~ defaulkjlkjlkjntValue:OUIH", defaultValue[54])
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
                    disabled={ratings.some(
                        (rating) => rating === 0 || rating === null
                    )}
                />
            </div>
        </div>
    )
}

export default ModifierQuestionRating
