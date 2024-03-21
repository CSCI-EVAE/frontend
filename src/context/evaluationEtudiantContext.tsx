import React, {
    createContext,
    ReactNode,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react"

import { Evaluation } from "../types/EvaluationType"
import {
    Evaluation as EvaluationDetails,
    QuestionEvaluation,
    RubriqueEvaluation,
} from "../types/EvaluationTypes"
import { NotificationContext } from "./notificationContext"
import {
    ApiResponse,
    DefaultValue,
    ReponseEvaluation,
    reponseQuestions,
} from "../types"
import { getRequest, postRequest } from "../api/axios"
import { formatDate } from "../components/detailsEvaluationComponent"
export const transformQuestionToReponseQuestion = (
    question: QuestionEvaluation
): reponseQuestions => {
    return {
        id: question.id,
        idQuestionEvaluation: {
            id: question.id,
            intitule: question.intitule || "",
            idQualificatif: question.idQuestion.idQualificatif,
        },
        positionnement: Number(question.positionnement),
    }
}
export const transformQuestionsToReponseQuestions = (
    questions: QuestionEvaluation[]
): reponseQuestions[] => {
    return questions.map(transformQuestionToReponseQuestion)
}

export const convertToReponseQuestions = (
    questions: QuestionEvaluation[]
): reponseQuestions[] => {
    return questions.map((question) => ({
        idQuestionEvaluation: {
            id: question.id,
        },
        positionnement: question.positionnement ?? 0,
    }))
}
export const convertToReponseEvaluation = (
    rubriques: RubriqueEvaluation[],
    idEvaluation: number
): ReponseEvaluation => {
    console.log("🚀 ~ rubriques:", rubriques)
    // Initialiser un tableau pour stocker les réponses aux questions
    let reponseQuestionsArray: reponseQuestions[] = []

    // Parcourir chaque rubrique et extraire les questions d'évaluation
    rubriques.forEach((rubrique) => {
        if (rubrique.questionEvaluations) {
            reponseQuestionsArray = reponseQuestionsArray.concat(
                convertToReponseQuestions(rubrique.questionEvaluations)
            )
        }
    })

    // Créer l'objet ReponseEvaluation
    const reponseEvaluation: ReponseEvaluation = {
        idEvaluationId: idEvaluation, // Mettez la valeur appropriée ici
        commentaire: "",
        nom: "",
        prenom: "",
        reponseQuestions: reponseQuestionsArray,
    }
    console.log("🚀 ~ reponseEvaluation:", reponseEvaluation)

    return reponseEvaluation
}

export const createDefaultValue = (
    reponses: reponseQuestions[]
): DefaultValue => {
    return reponses.reduce(
        (defaultValue: DefaultValue, reponse: reponseQuestions) => {
            const questionEvaluationId = reponse.idQuestionEvaluation.id
            const positionnement = reponse.positionnement
            defaultValue[questionEvaluationId] = positionnement
            return defaultValue
        },
        {}
    )
}
export const hasDefaultValueZero = (
    defaultValue: DefaultValue,
    questions: QuestionEvaluation[]
): boolean => {
    for (const question of questions) {
        const defaultValueForKey = defaultValue[question.id] || 0
        if (defaultValueForKey === 0) {
            return true // S'il existe une clé correspondante avec une valeur de 0, retourne true
        }
    }
    return false // Si aucune clé correspondante avec une valeur de 0 n'est trouvée, retourne false
}
interface EvaluationContextProviderProps {
    children: ReactNode
}

export const EvaluationEtudiantContext = createContext<any>(null)

export function AdjustColumns(evaluationList: Evaluation[]): any[] {
    if (evaluationList) {
        return evaluationList.map((evaluation: Evaluation) => {
            const {
                //id,
                etat,
                noEvaluation,
                periode,
                designation,
                evaRepondu,
                nomEnseignant,
                prenomEnseignant,
                debutReponse,
                finReponse,

                ...rest
            } = evaluation

            let readStatus = false
            let answerStatus = false
            let newEtat = ""

            if (etat === "CLO") {
                newEtat = "Cloturé"
                readStatus = true
            }
            if (etat === "DIS") {
                newEtat = "Mise en disposition"
                answerStatus = true
            }

            return {
                ...rest,
                noEvaluation,
                etat,
                designation,
                periode,
                readStatus,
                evaRepondu,
                answerStatus,
                nomEnseignant,
                prenomEnseignant,
                nomPrenomEns: prenomEnseignant + " " + nomEnseignant,
                newEtat,
                debutReponse: formatDate(debutReponse),
                finReponse: formatDate(finReponse),
            }
        })
    } else {
        return []
    }
}

export const EvaluationEtudiantContextProvider: React.FC<
    EvaluationContextProviderProps
> = ({ children }) => {
    const [evaluationDetails, setEvaluationDetails] =
        useState<EvaluationDetails>()
    const [evaluationList, setEvaluationList] = useState<
        Evaluation[] | undefined
    >()
    const [consulterReponse, setConsulterReponse] = useState<
        RubriqueEvaluation[]
    >([])
    const { showNotification } = useContext(NotificationContext)

    const updateEvaluationList = useCallback((value: Evaluation[]) => {
        setEvaluationList(value)
    }, [])

    const [reponseEvae, setReponseEvae] = useState<ReponseEvaluation>({
        commentaire: "",
        idEvaluationId: 0,
        nom: "",
        prenom: "",
        reponseQuestions: [],
    })
    const [defaultValue, setDefaultValue] = useState<DefaultValue>({})
    const updateDefaultValue = useCallback((value: DefaultValue) => {
        setDefaultValue(value)
    }, [])

    const updateReponseEvaluation = useCallback(
        (idQuestion: number, positionnement: number) => {
            setReponseEvae((prevState) => {
                // Vérifier si une réponse avec idQuestion existe déjà
                const existingIndex = prevState.reponseQuestions.findIndex(
                    (reponse) => reponse.idQuestionEvaluation.id === idQuestion
                )

                if (existingIndex !== -1) {
                    // Si une réponse existe, mettre à jour son positionnement
                    const newReponse = {
                        ...prevState,
                        reponseQuestions: prevState.reponseQuestions.map(
                            (reponse, index) => {
                                if (index === existingIndex) {
                                    return {
                                        ...reponse,
                                        positionnement: positionnement,
                                    }
                                }

                                return reponse
                            }
                        ),
                    }
                    const defaultV: DefaultValue = createDefaultValue(
                        newReponse.reponseQuestions
                    )
                    updateDefaultValue(defaultV)
                    return newReponse
                } else {
                    // Si aucune réponse n'existe, ajouter une nouvelle réponse
                    const newReponse = {
                        ...prevState,
                        reponseQuestions: [
                            ...prevState.reponseQuestions,
                            {
                                idQuestionEvaluation: { id: idQuestion },
                                positionnement: positionnement,
                            },
                        ],
                    }
                    const defaultV: DefaultValue = createDefaultValue(
                        newReponse.reponseQuestions
                    )
                    updateDefaultValue(defaultV)
                    return newReponse
                }
                // localStorage.setItem(
                //     "reponseEvaluation",
                //     JSON.stringify(newReponse)
                // )
            })
        },
        [updateDefaultValue]
    )

    const updateReponseEvaluationByReponse = useCallback(
        (reponse: ReponseEvaluation) => {
            setReponseEvae(reponse)

            const defaultV: DefaultValue = createDefaultValue(
                reponse.reponseQuestions
            )
            updateDefaultValue(defaultV)
        },

        [updateDefaultValue]
    )
    const updateReponseEvaeModifier = useCallback(
        (reponse: ReponseEvaluation) => {
            console.log("🚀 ~ reponse:", reponse)

            setReponseEvae(reponse)

            const defaultV: DefaultValue = createDefaultValue(
                reponse.reponseQuestions
            )
            console.log("🚀 ~ defaultV:", defaultV)
            updateDefaultValue(defaultV)
        },

        [updateDefaultValue]
    )

    useEffect(() => {
        const getList = async () => {
            try {
                const response: ApiResponse = await getRequest(
                    "evaluation/getEvaluationsByUser"
                )
                if (!response.success) {
                    showNotification("Erreur", response.message, "error")
                    return
                }
                let list = response.data.body.data
                updateEvaluationList(AdjustColumns(list))
            } catch (error) {
                console.error(
                    "Une erreur s'est produite lors de la récupération de la liste des évaluations :",
                    error
                )
                showNotification(
                    "Erreur",
                    "Une erreur s'est produite lors de la récupération de la liste des évaluations.",
                    "error"
                )
            }
        }

        getList()
    }, [updateEvaluationList, showNotification])

    const getEvaluationDetails = useCallback(
        async (id: string) => {
            const response: ApiResponse = await getRequest(
                `/evaluation/details/${id}`
            )
            if (!response.success) {
                showNotification("Erreur", response.message, "error")
                return
            }
            let list: EvaluationDetails = response.data.data

            setEvaluationDetails(list)
        },
        [showNotification]
    )

    const soumettreReponseEtudiant = useCallback(
        async (reponse: ReponseEvaluation) => {
            const response: ApiResponse = await postRequest(
                `etudiant/reponduEvaluation`,
                reponse
            )
            if (!response.success) {
                showNotification("Erreur", response.message, "error")
                return
            }
            showNotification("Génial !", response.message, "success")
        },
        [showNotification]
    )

    const getEvaluationReponse = useCallback(
        async (id: number) => {
            const response: ApiResponse = await getRequest(
                `/etudiant/getReponses/${id}`
            )
            if (!response.success) {
                showNotification("Erreur", response.message, "error")
                return
            }
            let list: EvaluationDetails = response.data.data

            setConsulterReponse(list.rubriqueEvaluations)
        },
        [showNotification]
    )
    return (
        <EvaluationEtudiantContext.Provider
            value={{
                reponseEvae,

                updateReponseEvaluation,
                updateEvaluationList,
                evaluationList,
                getEvaluationDetails,
                evaluationDetails,
                soumettreReponseEtudiant,
                getEvaluationReponse,
                consulterReponse,
                updateReponseEvaluationByReponse,
                defaultValue,
                updateDefaultValue,
                updateReponseEvaeModifier,
            }}
        >
            {children}
        </EvaluationEtudiantContext.Provider>
    )
}
