import React from "react"
import { Card, CardContent, Typography, Slider, Box, Grid } from "@mui/material"
import { CreateEvaluation } from "../types/EvaluationTypes"

interface QuestionProps {
    question: string
    average: number
    min: string
    max : string
}

interface RubriqueProps {
    questions: { question: string; average: number; min: string, max : string }[] 
    title: string
}


interface EvaluationProps {
    evaluation: CreateEvaluation
}

const QuestionCard: React.FC<QuestionProps> = ({ question, average, min , max }) => {
    const marks = [
        { value: 1, label: max},
        
        { value: 5, label: min },
    ]

    return (
<Card variant="outlined" sx={{ maxWidth: 600, marginBottom: -7, margin: "auto" }}>
                <CardContent sx={{ paddingBottom: 1 }}>
                <Typography variant="body1" gutterBottom>
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
                    />
                </Box>
            </CardContent>
        </Card>
    )
}

const RubriqueCard: React.FC<RubriqueProps> = ({ title, questions }) => {
  
    return (
        <div>
        <Card variant="outlined" sx={{ marginBottom: 6, height: 660, overflowY: 'auto'}}>
            <CardContent>
                
            <Typography variant="h5" component="h2" gutterBottom sx={{ textAlign: "center"  }}>
    {title} <br /> <br />
</Typography>

                <Grid container spacing={8}>
                    {questions.map((question, index) => (
                        <Grid item key={index} xs={10} sm={6}>
                            <QuestionCard
                                question={question.question}
                                average={question.average}
                                min= {question.min}
                                max = {question.max}
                            />
                        </Grid>
                    ))}
                </Grid>
            </CardContent>
        </Card>
        </div>
    )
}
const ReponsesEvaluationDetails: React.FC<EvaluationProps> = ({ evaluation }) => {
console.log("evae",evaluation)
//    const exampleQuestions = [
//         { question: "Question 1", average: 4.2 },
//         { question: "Question 2", average: 3.8 },
//         { question: "Question 3", average: 2.5 },
//         { question: "Question 4", average: 4.7 },
//         { question: "Question 5", average: 3.9 },
//     ]

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
            

            <RubriqueCard
    title={evaluation.rubriqueEvaluations && evaluation.rubriqueEvaluations.map(rubrique => rubrique.idRubrique.designation).join(', ')}
    questions={evaluation.rubriqueEvaluations && evaluation.rubriqueEvaluations.flatMap(rubrique => 
        (rubrique.questionEvaluations || []).map(question => ({
            question: question.idQuestion.intitule || '', 
            average: typeof question.moyen === 'number' ? question.moyen : 0 ,
            max : question.idQuestion.idQualificatif.maximal || '',
            min:question.idQuestion.idQualificatif.minimal || ''
            
        }))
    )}  
/>


        </div>
    );
}

export default ReponsesEvaluationDetails;


