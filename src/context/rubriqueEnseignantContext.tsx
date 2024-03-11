import React, { createContext, ReactNode, useCallback, useState } from "react"
import { TYPE_STANDARD } from "../constants"
import {
    Qualificatif,
    Question,
    questionsInRubrique,
    Rubrique,
    RubriqueCompose,
} from "../types"

export const rubriqueStandardToRubriqueCompose = (
    rubriques: Rubrique[]
): RubriqueCompose[] => {
    const rubriquesComposees: RubriqueCompose[] = rubriques.map((rubrique) => {
        // Créer un objet RubriqueCompose à partir des données de Rubrique
        const rubriqueComposee: RubriqueCompose = {
            idRubrique: rubrique.id ? rubrique.id : 0, // Si l'ID n'est pas défini, mettre 0
            designation: rubrique.designation,
            ordre: rubrique.ordre,
            questions: [], // Initialiser le tableau des questions à vide
        }
        return rubriqueComposee
    })

    return rubriquesComposees
}

export function extractDesignations(rubriques: RubriqueCompose[]): string[] {
    return rubriques.map((rubrique) => rubrique.designation)
}
export function extractDesignationsFromStandard(
    rubriques: Rubrique[]
): string[] {
    return rubriques.map((rubrique) => rubrique.designation)
}
export function convertirQuestionsInRubriqueEnQuestions(
    questionsInRubriqueArray: questionsInRubrique[]
): Question[] {
    const questionsArray: Question[] = []

    questionsInRubriqueArray.forEach(
        (questionInRubrique: questionsInRubrique) => {
            const { idQuestion, intitule, idQualificatif, minimal, maximal } =
                questionInRubrique

            const idQualificatifObj: Qualificatif = {
                id: idQualificatif,
                minimal,
                maximal,
            }

            const question: Question = {
                id: idQuestion,
                intitule,
                type: TYPE_STANDARD.question_standard, // Vous devez définir le type selon vos besoins
                idQualificatif: idQualificatifObj,
                noEnseignant: null,
            }

            questionsArray.push(question)
        }
    )

    return questionsArray
}
export function convertirQuestionsEnQuestionsInRubrique(
    questions: Question[]
): questionsInRubrique[] {
    const questionsInRubriqueArray: questionsInRubrique[] = []

    questions.forEach((question: Question) => {
        const { id, intitule, idQualificatif } = question
        const { minimal, maximal } = idQualificatif

        const questionInRubrique: questionsInRubrique = {
            idQuestion: id || 0,
            intitule,
            ordre: 0, // Vous devez définir l'ordre selon vos besoins
            idQualificatif: idQualificatif.id || 0,
            minimal,
            maximal,
        }

        questionsInRubriqueArray.push(questionInRubrique)
    })

    return questionsInRubriqueArray
}
export function elementsNonSelectionnees(liste1: any[], liste2: any[]) {
    // Utilisation de la méthode filter pour filtrer les éléments de liste2
    // qui ne sont pas présents dans liste1

    const elementsNonContenus = liste2.filter(
        (element) => !liste1.includes(element)
    )

    return elementsNonContenus
}
// Définition du type des props pour rubriqueContextProvider
interface rubriqueContextProviderProps {
    children: ReactNode // children doit être de type ReactNode
}

// Création du contexte
export const RubriqueEnseignantContext = createContext<any>(null) // Vous pouvez remplacer 'any' par le type spécifique que vous souhaitez utiliser

export function findRubriqueByDesignation(
    rubriques: RubriqueCompose[],
    designations: string[]
): RubriqueCompose[] {
    // Filtrer les rubriques dont la désignation correspond à l'une des désignations fournies
    const rubriquesFiltrees: RubriqueCompose[] = rubriques.filter((rubrique) =>
        designations.includes(rubrique.designation)
    )

    return rubriquesFiltrees
}
// Composant rubriqueContextProvider
export const RubriqueEnseignantContextProvider: React.FC<
    rubriqueContextProviderProps
> = ({ children }) => {
    const [rubriqueAdded, setRubriqueAdded] = useState<RubriqueCompose[]>([])
    const [rubriqueSelectedEns, setRubriqueSelectedEns] =
        useState<RubriqueCompose>()
    const [rubriqueSelected, setRubriqueSelected] = React.useState<Rubrique[]>(
        []
    )
    const updateRubriqueSelectedEns = useCallback((value: RubriqueCompose) => {
        setRubriqueSelectedEns(value)
    }, [])
    const updateRubriqueSelected = useCallback((value: Rubrique[]) => {
        setRubriqueSelected(value)
    }, [])
    const updateRubriqueAdded = useCallback(
        (value: RubriqueCompose) => {
            setRubriqueAdded([...rubriqueAdded, value])
        },
        [rubriqueAdded]
    )
    const updateRubriqueAddedByList = useCallback(
        (value: RubriqueCompose[]) => {
            setRubriqueAdded(value)
        },
        []
    )

    return (
        <RubriqueEnseignantContext.Provider
            value={{
                rubriqueSelectedEns,
                updateRubriqueSelectedEns,
                updateRubriqueAdded,
                rubriqueAdded,
                updateRubriqueAddedByList,
                updateRubriqueSelected,
                rubriqueSelected,
            }}
        >
            {children}
        </RubriqueEnseignantContext.Provider>
    )
}
