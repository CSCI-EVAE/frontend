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
export const createDefaultValue = (
    reponseQuestions: reponseQuestions[],
    questionEvaluations: QuestionEvaluation[]
): DefaultValue => {
    const defaultValue: DefaultValue = {}
    // Parcourt chaque réponse
    reponseQuestions.forEach((reponse) => {
        // Trouve la question correspondante dans les évaluations de questions
        const question = questionEvaluations.find(
            (q) => q.id === reponse.idQuestionEvaluation.id
        )

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

    const def: reponseQuestions[] = consulterReponse
        .map((reponse) => {
            if (reponse.questionEvaluations) {
                // Transformez les questionEvaluations en reponseQuestions
                return transformQuestionsToReponseQuestions(
                    reponse.questionEvaluations
                )
            } else {
                // Si questionEvaluations est null ou undefined, retournez un tableau vide
                return []
            }
        })
        .flat()

    const [modifierReponse, setModifierReponse] = useState<ReponseEvaluation>({
        commentaire: "",
        idEvaluation: evaluationDetails?.id ?? 67,
        nom: "",
        prenom: "",
        reponseQuestions: def,
    })
    const updateReponseEvaluationModifier = useCallback(
        (idQuestion: number, positionnement: number) => {
            setModifierReponse((prevState) => {
                const newReponse: ReponseEvaluation = {
                    ...prevState,
                    reponseQuestions: [
                        ...prevState.reponseQuestions,
                        {
                            idQuestionEvaluation: { id: idQuestion },
                            positionnement: positionnement,
                        },
                    ],
                }
                localStorage.setItem(
                    "modifierEvaluation",
                    JSON.stringify(newReponse)
                )
                return newReponse
            })
        },
        []
    )
    const updateNomPrenomCommentaireModifier = useCallback(
        (nom: string, prenom: string, commentaire: string) => {
            setModifierReponse((prevState) => {
                const newReponse: ReponseEvaluation = {
                    ...prevState,
                    commentaire: commentaire,
                    nom: nom,
                    prenom: prenom,
                }
                localStorage.setItem(
                    "modifierEvaluation",
                    JSON.stringify(newReponse)
                )
                return newReponse
            })
        },
        []
    )

    useEffect(() => {
        localStorage.setItem(
            "modifierEvaluation",
            JSON.stringify({
                commentaire: modifierReponse.commentaire,
                idEvaluation: {
                    id: Number(0),
                },
                nom: modifierReponse.nom,
                prenom: modifierReponse.prenom,
                reponseQuestions: def,
            })
        )
    }, [
        def,
        modifierReponse.nom,
        modifierReponse.prenom,
        modifierReponse.commentaire,
    ])

    const rep = localStorage.getItem("reponseEvaluation")

    const evae: ReponseEvaluation = JSON.parse(
        rep ||
            '{"commentaire":"","idEvaluationId":67,"nom":"","prenom":"","reponseQuestions":[]}'
    )
    const [reponseEvae, setReponseEvae] = useState<ReponseEvaluation>(evae)
    const updateReponseEvaluation = useCallback(
        (idQuestion: number, positionnement: number) => {
            setReponseEvae((prevState) => {
                const newReponse: ReponseEvaluation = {
                    ...prevState,
                    reponseQuestions: [
                        ...prevState.reponseQuestions,
                        {
                            idQuestionEvaluation: { id: idQuestion },
                            positionnement: positionnement,
                        },
                    ],
                }
                localStorage.setItem(
                    "reponseEvaluation",
                    JSON.stringify(newReponse)
                )
                return newReponse
            })
        },
        []
    )
    const updateNomPrenomCommentaire = useCallback(
        (nom: string, prenom: string, commentaire: string) => {
            setReponseEvae((prevState) => {
                const newReponse: ReponseEvaluation = {
                    ...prevState,
                    commentaire: commentaire,
                    nom: nom,
                    prenom: prenom,
                }
                localStorage.setItem(
                    "reponseEvaluation",
                    JSON.stringify(newReponse)
                )
                return newReponse
            })
        },
        []
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
                modifierReponse,
                updateNomPrenomCommentaireModifier,
                updateReponseEvaluationModifier,
                updateNomPrenomCommentaire,
                updateReponseEvaluation,
                updateEvaluationList,
                evaluationList,
                getEvaluationDetails,
                evaluationDetails,
                soumettreReponseEtudiant,
                getEvaluationReponse,
                consulterReponse,
            }}
        >
            {children}
        </EvaluationEtudiantContext.Provider>
    )
}
