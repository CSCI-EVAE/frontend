import React, { useContext, useEffect, useState } from "react"
import { Box, Typography } from "@mui/material"
import ButtonComponent from "../common/Button"
import { QuestionContext } from "../context/questionContext"

import { ListContext } from "../context/listContext"

import { RubriqueComposeContext } from "../context/rubriqueComposeContext"
import {
    RubriqueEnseignantContext,
    findRubriqueByDesignation,
    elementsNonSelectionnees,
    convertirQuestionsEnQuestionsInRubrique,
    convertirQuestionsInRubriqueEnQuestions,
} from "../context/rubriqueEnseignantContext"
import { Question, RubriqueCompose, questionsInRubrique } from "../types"
import CheckboxComponent from "../common/Checkbox"
import { RubriqueContext } from "../context/rubriqueContext"
interface rubriqueComposeFormProps {
    add: boolean
}

const EnseignantRubrique: React.FC<rubriqueComposeFormProps> = ({ add }) => {
    const { questionListe } = useContext(QuestionContext)
    const { rubriqueComposeList } = useContext(RubriqueComposeContext)
    const { rubriqueList } = useContext(RubriqueContext)

    const { rubriqueAdded, updateRubriqueAddedByList, rubriqueSelectedEns } =
        useContext(RubriqueEnseignantContext)

    const [selectedRubriqueCompose, setSelectedRubriqueCompose] =
        React.useState<string[]>([])
    const [
        selectedQuestionInRubriqueCompose,
        setSelectedQuestionInRubriqueCompose,
    ] = React.useState<string[]>([])

    const [rubriqueListOptions, setRubriqueListOptions] = useState<
        { label: string; value: string }[]
    >([])
    const [questionsListOptions, setQuestionsListOptions] = useState<
        { label: string; value: string }[]
    >([])

    const getRubriqueListOptions = (
        liste1: RubriqueCompose[],
        liste2: RubriqueCompose[]
    ) => {
        return elementsNonSelectionnees(liste1, liste2).map(
            (rubriqueList: RubriqueCompose) => ({
                label: `${rubriqueList.designation}`,
                value: `${rubriqueList.designation}`,
            })
        )
    }
    const getQuestionsListOptions = (liste1: Question[]) => {
        return liste1.map((question: Question) => ({
            label: `${question.intitule}`,
            value: `${question.intitule}`,
        }))
    }
    useEffect(() => {
        setRubriqueListOptions(
            getRubriqueListOptions(rubriqueAdded, rubriqueComposeList)
        )
    }, [
        rubriqueAdded,
        selectedRubriqueCompose,
        rubriqueComposeList,
        rubriqueList,
    ])

    useEffect(() => {
        if (rubriqueSelectedEns) {
            const l1 = convertirQuestionsInRubriqueEnQuestions(
                rubriqueSelectedEns.questions
            )
            const l2 = questionListe.filter(
                (element: Question) =>
                    !l1.some(
                        (item: Question) =>
                            item.id === element.id &&
                            item.intitule === element.intitule
                    )
            )

            setQuestionsListOptions(getQuestionsListOptions(l2))
        }
    }, [
        selectedQuestionInRubriqueCompose,
        selectedRubriqueCompose,
        questionListe,
        rubriqueComposeList,
        rubriqueSelectedEns,
    ])

    const { updateModalOpen } = useContext(ListContext)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (add === true) {
            const rubriquesCompose = findRubriqueByDesignation(
                rubriqueComposeList,
                selectedRubriqueCompose
            )
            updateRubriqueAddedByList([...rubriqueAdded, ...rubriquesCompose])
        } else {
            let newQuestions: Question[] = questionListe.filter(
                (element: Question) =>
                    selectedQuestionInRubriqueCompose.some(
                        (elementSelect: string) =>
                            element.intitule === elementSelect
                    )
            )

            let newQuestionsInRubrique: questionsInRubrique[] =
                convertirQuestionsEnQuestionsInRubrique(newQuestions)
            let newRubrique: RubriqueCompose = {
                ...rubriqueSelectedEns,
                questions: rubriqueSelectedEns.questions.concat(
                    newQuestionsInRubrique
                ),
            }
            let NewList: RubriqueCompose[] = rubriqueAdded.filter(
                (element: RubriqueCompose) =>
                    element.designation !== newRubrique.designation
            )

            NewList.push(newRubrique)
            updateRubriqueAddedByList(NewList)
        }

        updateModalOpen(false)
    }
    const handleReset = () => {
        updateModalOpen(false)
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
                <Box sx={{ display: "flex", gap: "1rem" }}>
                    <CheckboxComponent
                        label="Choisissez la Rubrique"
                        options={rubriqueListOptions}
                        value={selectedRubriqueCompose}
                        onChange={(value) =>
                            setSelectedRubriqueCompose(value as string[])
                        }
                        sx={{ width: "50%" }} // Ajustez la largeur comme vous le souhaitez
                    />
                </Box>
            ) : (
                <Box sx={{ display: "flex", gap: "1rem" }}>
                    <CheckboxComponent
                        label="Choiissiez les questions"
                        options={questionsListOptions}
                        value={selectedQuestionInRubriqueCompose}
                        onChange={(value) =>
                            setSelectedQuestionInRubriqueCompose(
                                value as string[]
                            )
                        }
                        //required
                        // multiple={true}
                        sx={{ width: "50%" }} // Ajustez la largeur comme vous le souhaitez
                    />
                </Box>
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

export default EnseignantRubrique
