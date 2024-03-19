import React, { useContext } from "react"
import { Box, Typography, TextField } from "@mui/material"
import Select from "../common/Select"
import ButtonComponent from "../common/Button"
import { QuestionContext } from "../context/questionContext"

import { ListContext } from "../context/listContext"
import { RubriqueContext } from "../context/rubriqueContext"
import {
    CreateRubriqueCompose,
    Rubrique,
    RubriqueCompose,
    questionsInRubrique,
} from "../types"
import { RubriqueComposeContext } from "../context/rubriqueComposeContext"
import AjoutQuestionRCompose from "./AjoutQuestionInRubriqueComposeAdmin"
import { Question } from "../types"
import CheckboxComponent from "../common/Checkbox"
import { NotificationContext } from "../context/notificationContext"
interface rubriqueComposeFormProps {
    add: boolean
}

const RubriqueComposeAdd: React.FC<rubriqueComposeFormProps> = ({ add }) => {
    const { showNotification } = useContext(NotificationContext)
    const { questionListe } = useContext(QuestionContext)
    const { rubriqueList } = useContext(RubriqueContext)

    const [selectedRubriqueCompose, setSelectedRubriqueCompose] =
        React.useState<string>()
    const [
        selectedQuestionInRubriqueCompose,
        setSelectedQuestionInRubriqueCompose,
    ] = React.useState<string[]>([])

    // setSelectedRubriqueCompose(rubriqueCompose.designation);
    const { updateModalOpen } = useContext(ListContext)
    const {
        addNewRubriqueCompose,
        modifyRubrique,
        updateCurrentRubriqueCompose,
        currentRubriqueCompose,
        modifyRubriqueCompose,
    } = useContext(RubriqueComposeContext)
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (add === true) {
            const rubriqueSelected: Rubrique = rubriqueList.find(
                (rubrique: Rubrique) =>
                    rubrique.designation === selectedRubriqueCompose
            )
            if (!rubriqueSelected) {
                showNotification(
                    "Erreur",
                    "Veuillez choisir la rubrique!",
                    "error"
                )
                return
            }
            const questionsSelected: Question[] = questionListe.filter(
                (question: Question) =>
                    selectedQuestionInRubriqueCompose.includes(
                        question.intitule
                    )
            )

            const rubriqueToAdd: CreateRubriqueCompose = {
                idRubrique: rubriqueSelected.id || 0,
                questionIds: questionsSelected.reduce(
                    (acc: { [questionId: number]: number }, question) => {
                        acc[question.id || 0] = question.ordre || 0
                        return acc
                    },
                    {}
                ),
                ordre: 1,
            }

            addNewRubriqueCompose(rubriqueToAdd)
        } else {
            const rubriqueToAdd: CreateRubriqueCompose = {
                idRubrique: currentRubriqueCompose.idRubrique || 0,
                questionIds: currentRubriqueCompose.questions.reduce(
                    (acc: { [questionId: number]: number }, question: any) => {
                        acc[question.idQuestion || 0] = question.ordre || 0
                        return acc
                    },
                    {}
                ),

                ordre: currentRubriqueCompose.ordre,
            }
            if (!rubriqueToAdd) {
                showNotification(
                    "Erreur",
                    "Veuillez choisir la rubrique!",
                    "error"
                )
                return
            }

            modifyRubriqueCompose(rubriqueToAdd.idRubrique, rubriqueToAdd)
        }
        setSelectedRubriqueCompose("")
        updateModalOpen(false)
    }
    const handleReset = () => {
        updateModalOpen(false)
    }
    const transformedQuestionListe = questionListe.map(
        (question: Question) => ({
            label: `${question.intitule}`,
            value: `${question.intitule}`,
            // idLabel: "ID qualificatif",
            //idValue: qualificatif.id
        })
    )
    const RListe = rubriqueList.map((rubriqueList: Rubrique) => ({
        label: `${rubriqueList.designation}`,
        value: `${rubriqueList.designation}`,
        //idLabel: "ID qualificatif",
        //idValue: qualificatif.id
    }))

    const deleteQuestionHandler = (
        row: questionsInRubrique,
        rubriqueParent: RubriqueCompose
    ) => {
        const newRubrique: RubriqueCompose = {
            ...rubriqueParent,
            questions: rubriqueParent.questions.filter(
                (element) => element.intitule !== row.intitule
            ),
        }
        updateCurrentRubriqueCompose(newRubrique)
    }

    return (
        <form
            onSubmit={handleSubmit}
            style={{
                display: "flex",
                flexDirection: "column",
                gap: "2rem",
            }}
        >
            <Typography
                variant="h5"
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                {" "}
                Entrez les informations
            </Typography>
            {add ? (
                <>
                    <Box sx={{ display: "flex", gap: "1rem" }}>
                        <Select
                            label="Choisissez la Rubrique"
                            options={RListe}
                            value={selectedRubriqueCompose}
                            onChange={(value) =>
                                setSelectedRubriqueCompose(value as string)
                            }
                            required
                            multiple={false}
                            sx={{ width: "50%" }} // Ajustez la largeur comme vous le souhaitez
                        />
                    </Box>

                    <Box
                        sx={{
                            display: "flex",
                            gap: "1rem",
                            maxHeight: "200px",
                            overflow: "auto",
                            marginTop: "32px",
                        }}
                    >
                        {/* <Select
                            label="Choiissiez les questions"
                            options={transformedQuestionListe}
                            value={selectedQuestionInRubriqueCompose}
                            onChange={(value) =>
                                setSelectedQuestionInRubriqueCompose(
                                    value as string[]
                                )
                            }
                            required
                            multiple={true}
                            sx={{ width: "50%" }} // Ajustez la largeur comme vous le souhaitez
                        /> */}
                        <CheckboxComponent
                            label="Choisissez les questions"
                            options={transformedQuestionListe}
                            value={selectedQuestionInRubriqueCompose}
                            onChange={(value) =>
                                setSelectedQuestionInRubriqueCompose(
                                    value as string[]
                                )
                            }
                            // required
                            //  multiple={true}
                            sx={{ width: "50%" }} // Ajustez la largeur comme vous le souhaitez
                        />
                    </Box>
                </>
            ) : (
                <>
                    <Box sx={{ display: "flex", gap: "1rem" }}>
                        <TextField
                            label="Intitulֹé"
                            variant="outlined"
                            value={modifyRubrique}
                            required
                            disabled={true}
                            //sx={{ width: "50%" }} // Ajustez la largeur comme vous le souhaitez
                        />
                    </Box>
                    <Box sx={{ display: "flex", gap: "1rem" }}>
                        <AjoutQuestionRCompose
                            deleteQuestionHandler={deleteQuestionHandler}
                            questions={currentRubriqueCompose.questions}
                            rubriqueParent={currentRubriqueCompose}
                        />
                    </Box>
                </>
            )}
            <Box sx={{ display: "flex", justifyContent: "start", gap: "1rem" }}>
                <ButtonComponent
                    text="Valider"
                    type="submit"
                    variant="contained"
                />

                <ButtonComponent
                    text="Annuler"
                    onClick={handleReset}
                    type="reset"
                    variant="contained"
                />
            </Box>
        </form>
    )
}

export default RubriqueComposeAdd
