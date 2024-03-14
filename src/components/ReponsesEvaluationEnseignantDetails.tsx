import React from "react"
import { Card, CardContent, Typography, Slider, Box, Grid } from "@mui/material"

interface QuestionProps {
    question: string
    average: number
}

interface RubriqueProps {
    questions: { question: string; average: number }[]
    title: string
}

const QuestionCard: React.FC<QuestionProps> = ({ question, average }) => {
    const marks = [
        { value: 1, label: "1" },
        { value: 2 },
        { value: 3 },
        { value: 4 },
        { value: 5, label: "5" },
    ]

    return (
        <Card variant="outlined" sx={{ maxWidth: 500, marginBottom: -8 }}>
            <CardContent sx={{ paddingBottom: 1 }}>
                <Typography variant="body1" gutterBottom>
                    {question}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Moyenne :
                </Typography>
                <Box sx={{ width: "100%", margin: "auto" }}>
                    <Slider
                        marks={marks}
                        value={average}
                        valueLabelDisplay="on"
                        min={1}
                        max={5}
                        disabled
                    />
                </Box>
            </CardContent>
        </Card>
    )
}

const RubriqueCard: React.FC<RubriqueProps> = ({ title, questions }) => {
    return (
        <Card variant="outlined" sx={{ marginBottom: 6, height: 670 }}>
            <CardContent>
            <Typography variant="h5" component="h2" gutterBottom sx={{ textAlign: "center"  }}>
    {title}
</Typography>

                <Grid container spacing={15}>
                    {questions.map((question, index) => (
                        <Grid item key={index} xs={10} sm={6}>
                            <QuestionCard
                                question={question.question}
                                average={question.average}
                            />
                        </Grid>
                    ))}
                </Grid>
            </CardContent>
        </Card>
    )
}

const ReponsesEvaluationDetails: React.FC = () => {
    const exampleQuestions = [
        { question: "Question 1", average: 4.2 },
        { question: "Question 2", average: 3.8 },
        { question: "Question 3", average: 2.5 },
        { question: "Question 4", average: 4.7 },
        { question: "Question 5", average: 3.9 },
    ]

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                maxWidth: "80%",
                margin: "auto",
            }}
        >
            <RubriqueCard title="Titre de la rubrique" questions={exampleQuestions} />
            <RubriqueCard title="Titre de la rubrique" questions={exampleQuestions} />
            <RubriqueCard title="Titre de la rubrique" questions={exampleQuestions} />
            <RubriqueCard title="Titre de la rubrique" questions={exampleQuestions} />
        </div>
    )
}

export default ReponsesEvaluationDetails
