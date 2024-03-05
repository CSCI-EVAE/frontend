import React, {
    createContext,
    ReactNode,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react"

import { ApiResponse, Qualificatif, Question, QuestionBody } from "../types"
import {
    deleteRequest,
    getRequest,
    postRequest,
    putRequest,
} from "../api/axios"
import { NotificationContext } from "./notificationContext"

// Définition du type des props pour questionContextProvider
interface questionContextProviderProps {
    children: ReactNode // children doit être de type ReactNode
}

// Création du contexte
export const QuestionContext = createContext<any>(null) // Vous pouvez remplacer 'any' par le type spécifique que vous souhaitez utiliser

export function trouverIdQuestion(
    question: Question,
    questionListe: Question[]
): number | null {
    //console.log("this si a question"+question.intitule);
    if (question && questionListe) {
        const questionTrouve = questionListe.find(
            (item) => item.intitule === question.intitule
        )

        if (questionTrouve && questionTrouve.id !== undefined) {
            return questionTrouve.id
        } else {
            return null // Retourne null si le question n'est pas trouvé ou s'il n'a pas d'ID
        }
    } else {
        return null // Retourne null si les données d'entrée sont invalides ou manquantes
    }
}

export function chargementCoupleQualificatif(
    qualificatifList: Qualificatif[],
    questionList: Question[]
) {
    if (qualificatifList && questionList) {
    }
}

export function supprimerColonnesId(questionListe: Question[]): any[] {
    // Vérifier si questionList et questionList.questionList sont définis
    if (questionListe) {
        // Mappez chaque élément en retirant la colonne id
        return questionListe.map((question: Question) => {
            const { id, type, noEnseignant, idQualificatif, ...rest } = question

            return {
                ...rest,
                minimal: idQualificatif.minimal,
                maximal: idQualificatif.maximal,
            }
        })
    } else {
        return [] // Retourne un tableau vide si les données d'entrée sont invalides ou manquantes
    }
}

// Composant questionContextProvider
export const QuestionContextProvider: React.FC<
    questionContextProviderProps
> = ({ children }) => {
    const [questionintitule, setQuestionintitule] = useState("")
    const [questionListe, setQuestionListe] = useState<Question[]>()

    const [coupleQualificatif, setCoupleQualificatif] = useState<Qualificatif>()
    const { showNotification } = useContext(NotificationContext)

    const updateQuestionList = useCallback((value: Question[]) => {
        setQuestionListe(value)
    }, [])

    const updateCoupleQualificatif = useCallback((value: any) => {
        setCoupleQualificatif(value)
    }, [])

    const updateQuestionintitule = useCallback((value: string) => {
        setQuestionintitule(value)
    }, [])

    const getList = useCallback(async () => {
        const response: ApiResponse = await getRequest("/questions")
        if (!response.success) {
            showNotification("Erreur", response.message, "error")
            return
        }

        let list = response.data
        updateQuestionList(list.data)
    }, [updateQuestionList, showNotification])
    useEffect(() => {

    const getList = async () => {
        const response: ApiResponse = await getRequest("/questions")
        if (!response.success) {
            showNotification("Erreur", response.message, "error")
            return
        }

        let list = response.data
        updateQuestionList(list.data)
    }
        
        getList()
    }, [updateQuestionList, showNotification])

    const addNewQuestion = useCallback(
        async (questionbody: QuestionBody) => {
            const response: ApiResponse = await postRequest(
                "/questions",
                questionbody
            )
            if (!response.success) {
                showNotification("Erreur", response.message, "error")
                return
            }
            showNotification("Génial !", response.message, "success")

            getList()
            return
        },
        [getList, showNotification]
    )

    const modifyQuestion = useCallback(
        async (id_question: number, questionbody: QuestionBody) => {
            const response: ApiResponse = await putRequest(
                `/questions/${id_question}`,
                questionbody
            )
            if (!response.success) {
                showNotification("Erreur", response.message, "error")
                return
            }

            showNotification("Génial !", response.message, "success")

            getList()
            return
        },
        [getList, showNotification]
    )

    const removeQuestion = useCallback(
        async (question_id: number) => {
            const response: ApiResponse = await deleteRequest(
                `/questions/${question_id}`
            )
            if (!response.success) {
                showNotification("Erreur", response.message, "error")
                console.log(response)
                return
            }
            showNotification("Génial !", response.message, "success")

            getList()
            return
        },
        [getList, showNotification]
    )

    return (
        <QuestionContext.Provider
            value={{
                updateQuestionList,
                questionListe,
                addNewQuestion,
                questionintitule,
                updateQuestionintitule,

                removeQuestion,

                modifyQuestion,
                updateCoupleQualificatif,
                coupleQualificatif,
            }}
        >
            {children}
        </QuestionContext.Provider>
    )
}
