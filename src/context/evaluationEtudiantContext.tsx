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
    RubriqueEvaluation,
} from "../types/EvaluationTypes"
import { NotificationContext } from "./notificationContext"
import { ApiResponse, ReponseEvaluation } from "../types"
import { getRequest, postRequest } from "../api/axios"

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
                ...rest
            } = evaluation

            let readStatus = false
            let answerStatus = false

            if (etat === "CLO") {
                readStatus = true
            }
            if (etat === "DIS") {
                answerStatus = true
            }

            return {
                ...rest,
                noEvaluation,
                etat,
                designation,
                periode,
                readStatus,
                answerStatus,
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
            console.log("🚀 ~ list:", list)

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
            // console.log("🚀 ~ list:", list)
        },
        [showNotification]
    )
    return (
        <EvaluationEtudiantContext.Provider
            value={{
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
