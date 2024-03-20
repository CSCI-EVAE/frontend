import React from "react"
import { Card, CardContent, Typography, Slider, Box, Grid } from "@mui/material"
import { CreateEvaluation } from "../types/EvaluationTypes"
interface QuestionProps {
    question: string
    average: number
    min: string
    max: string
}
interface RubriqueProps {
    questions: { question: string; average: number; min: string; max: string }[]
    title: string
}
interface EvaluationProps {
    evaluation: CreateEvaluation
}
const QuestionCard: React.FC<QuestionProps> = ({
    question,
    average,
    min,
    max,
}) => {
    const marks = [
        { value: 1, label: max },
        { value: 5, label: min },
    ]
    const color = average < 2.5 ? "red" : "green"
    return (
        <Card
            variant="outlined"
            sx={{ maxWidth: 600, marginBottom: -7, margin: "auto" }}
        >
            <CardContent sx={{ paddingBottom: 1 }}>
                <Typography variant="body1" gutterBottom sx={{ mb: "16px" }}>
                    {question}
                    <br /> <br />
                </Typography>
                <Box sx={{ width: "80%", margin: "auto" }}>
                    <Slider
                        marks={marks}
                        value={average}
                        valueLabelDisplay="on"
                        min={1}
                        max={5}
                        disabled
                        style={{
                            color: color, // Changer la couleur ici
                            //opacity: 0.5, // Opacity pour indiquer que le slider est désactivé
                            pointerEvents: "none", // Désactiver les événements du curseur
                        }}
                        sx={{
                            "& .MuiSlider-thumb": {
                                height: 16,
                                width: 16,
                                backgroundColor: "#fff",
                                border: "1px solid currentColor",
                                "&:hover": {
                                    boxShadow:
                                        "0 0 0 8px rgba(58, 133, 137, 0.16)",
                                },
                            },
                            "& .MuiSlider-valueLabel": {
                                lineHeight: 1.2,
                                fontSize: 12,
                                background: "unset",
                                padding: 0,
                                width: 32,
                                height: 32,
                                borderRadius: "50% 50% 50% 0",
                                backgroundColor: color,
                                transformOrigin: "bottom left",
                                transform:
                                    "translate(50%, -100%) rotate(-45deg) scale(0)",
                                "&::before": {
                                    display: "none",
                                },
                                "&.MuiSlider-valueLabelOpen": {
                                    transform:
                                        "translate(50%, -100%) rotate(-45deg) scale(1)",
                                },
                                "& > *": {
                                    transform: "rotate(45deg)",
                                },
                            },
                        }}
                    />
                </Box>
            </CardContent>
        </Card>
    )
}
const RubriqueCard: React.FC<RubriqueProps> = ({ title, questions }) => {
    if (!questions) {
        return <div>Chargement...</div>
    }
    return (
        <div>
            <Card
                variant="outlined"
                sx={{
                    marginBottom: "24px",
                    // height: 660px,
                    //    overflowY: "auto"
                }}
            >
                <CardContent>
                    <Typography
                        variant="h5"
                        component="h2"
                        gutterBottom
                        sx={{
                            textAlign: "center",
                            marginBottom: "72px",
                            marginTop: "16px",
                        }}
                    >
                        {title}
                    </Typography>
                    <Grid
                        container
                        spacing={8}
                        sx={{ height: 660, overflowY: "auto" }}
                    >
                        {questions.map((question, index) => (
                            <Grid item key={index} xs={10} sm={6}>
                                <QuestionCard
                                    question={question.question}
                                    average={question.average}
                                    min={question.min}
                                    max={question.max}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </CardContent>
            </Card>
        </div>
    )
}
const ReponsesEvaluationDetails: React.FC<EvaluationProps> = ({
    evaluation,
}) => {
    console.log("evae", evaluation)
    const groupQuestionsByRubrique = () => {
        const rubriquesMap = new Map()
        evaluation.rubriqueEvaluations &&
            evaluation.rubriqueEvaluations.forEach((rubrique) => {
                const questionEvaluations = rubrique.questionEvaluations || [] // Vérification de null
                questionEvaluations.forEach((question) => {
                    const rubriqueName = rubrique.idRubrique.designation
                    if (!rubriquesMap.has(rubriqueName)) {
                        rubriquesMap.set(rubriqueName, [])
                    }
                    rubriquesMap.get(rubriqueName).push({
                        question: question.idQuestion.intitule || "",
                        average:
                            typeof question.moyen === "number"
                                ? question.moyen
                                : 0,
                        max: question.idQuestion.idQualificatif.maximal || "",
                        min: question.idQuestion.idQualificatif.minimal || "",
                    })
                })
            })
        return rubriquesMap
    }
    const groupedQuestions = groupQuestionsByRubrique()

    return (
        <div
            style={{
                // display: "flex",
                flexDirection: "column",
                alignItems: "center",
                maxWidth: "80%",
                margin: "auto",
            }}
        >
            {Array.from(groupedQuestions).map(
                ([rubriqueName, questions], index) => (
                    <RubriqueCard
                        key={index}
                        title={rubriqueName}
                        questions={questions}
                    />
                )
            )}
        </div>
    )
}
export default ReponsesEvaluationDetails
