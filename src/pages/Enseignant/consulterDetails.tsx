import React, { useEffect, useContext } from "react"
import List from "@mui/material/List"
import ListItemText from "@mui/material/ListItemText"
import { useParams } from "react-router-dom"
import { DetailsEvaluationContext } from "../../context/detailsEvaluationContext"
import { Evaluation } from "../../types/EvaluationTypes"
import Header from "../../Layout/Header"
import SideBarEnseignant from "../../Layout/sideBar/SideBarEnseignant"
import DetailsEvaluationComponent from "../../components/detailsEvaluationComponent"
import { ListItem } from "@mui/material"
import { COLORS } from "../../constants"

const DetailsEvaluationPage: React.FC = () => {
    const { id_eva } = useParams()

    const { evaluationDetails, fetchEvaluationDetails } = useContext(
        DetailsEvaluationContext
    ) || {
        evaluationDetails: null,
        evaluationError: "",
        fetchEvaluationDetails: () => {},
    }

    useEffect(() => {
        if (id_eva) {
            fetchEvaluationDetails(parseInt(id_eva, 10))
        }
    }, [id_eva, fetchEvaluationDetails])

    if (!evaluationDetails) {
        return <div>Loading...</div>
    }

    function trierEvaluations(evaluation: Evaluation): Evaluation {
        evaluation.rubriqueEvaluations.sort((a, b) => a.ordre - b.ordre)

        evaluation.rubriqueEvaluations.forEach((rubrique) => {
            if (rubrique.questionEvaluations) {
                rubrique.questionEvaluations.sort((a, b) => a.ordre - b.ordre)
            }
        })

        return evaluation
    }
    const ordonnerRubrique = trierEvaluations(evaluationDetails)

    return (
        <>
            <SideBarEnseignant />
            <Header />

            <DetailsEvaluationComponent
                evaluation={evaluationDetails}
                urlRetour="/dashboard/enseignant/unitésEnseignement"
            />

            <List
                sx={{
                    width: "100%",
                    maxWidth: "70%",
                    bgcolor: "background.paper",
                    margin: "auto",
                    marginTop: "30px",
                    marginBottom: "50px",
                }}
                component="nav"
                aria-labelledby="nested-list-subheader"
            >
                {ordonnerRubrique.rubriqueEvaluations.map((rubrique) => (
                    <div key={rubrique.idRubrique.id}>
                        <ListItem
                            sx={{
                                background: COLORS.color7,
                                borderRadius: "4px",
                                margin: "4px 0",
                                color: "black",
                            }}
                        >
                            <ListItemText
                                style={{ fontWeight: "bold" }}
                                primary={rubrique.idRubrique.designation}
                            />
                        </ListItem>
                        <List sx={{ pl: 4 }}>
                            {rubrique.questionEvaluations &&
                                rubrique.questionEvaluations.map((question) => (
                                    <ListItem
                                        key={question.idQuestion.id}
                                        sx={{
                                            background: "#f9f9f9",
                                            borderRadius: "4px",
                                            margin: "4px 0",
                                        }}
                                    >
                                        <ListItemText
                                            primary={
                                                question.idQuestion.intitule
                                            }
                                            // sx={{ fontStyle: "italic" }}
                                        />
                                        <ListItemText
                                            primary={`${question.idQuestion.idQualificatif.maximal} - ${question.idQuestion.idQualificatif.minimal}`}
                                            sx={{
                                                //  fontStyle: "italic",
                                                textAlign: "right",
                                            }}
                                        />
                                    </ListItem>
                                ))}
                        </List>
                    </div>
                ))}
            </List>
        </>
    )
}

export default DetailsEvaluationPage
