import React, {
    createContext,
    ReactNode,
    useCallback,
    useContext,
    useState,
} from "react"
import { Evaluation } from "../types/EvaluationTypes"
import { NotificationContext } from "./notificationContext"
import { ApiResponse } from "../types"
import { getRequest } from "../api/axios"

interface DetailsEvaluationContextProps {
    children: ReactNode
}

interface DetailsEvaluationContextData {
    evaluationDetails: Evaluation | null
    fetchEvaluationDetails: (evaluationId: number) => void
}

export const DetailsEvaluationContext =
    createContext<DetailsEvaluationContextData | null>(null)

export const DetailsEvaluationContextProvider: React.FC<
    DetailsEvaluationContextProps
> = ({ children }) => {
    const [evaluationDetails, setEvaluationDetails] =
        useState<Evaluation | null>(null)

    const { showNotification } = useContext(NotificationContext)

    const fetchEvaluationDetails = useCallback(
        async (evaluationId: number) => {
            try {
                const response: ApiResponse = await getRequest(
                    `/evaluation/details/${evaluationId}`
                )
                if (!response.success) {
                    showNotification("Erreur", response.message, "error")
                    return
                }
                const data = response.data

                setEvaluationDetails(data.data)
            } catch (error) {
                console.error(error)
            }
        },
        [showNotification]
    )

    const contextValue: DetailsEvaluationContextData = {
        evaluationDetails,
        fetchEvaluationDetails,
    }

    return (
        <DetailsEvaluationContext.Provider value={contextValue}>
            {children}
        </DetailsEvaluationContext.Provider>
    )
}
