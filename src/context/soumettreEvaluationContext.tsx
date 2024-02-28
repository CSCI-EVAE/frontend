import React, { createContext, ReactNode, useCallback, useContext } from "react"
import { EvaluationResponse } from "../types/EvaluationTypes"
import { NotificationContext } from "./notificationContext"
import { ApiResponse } from "../types"
import { putRequest } from "../api/axios"

interface SoumettreEvaluationContextProps {
    children: ReactNode
}

interface SoumettreEvaluationContextData {
    soumettreEvaluation: (
        evaluationId: number
    ) => Promise<boolean | EvaluationResponse>
}

export const SoumettreEvaluationContext =
    createContext<SoumettreEvaluationContextData | null>(null)

export const SoumettreEvaluationContextProvider: React.FC<
    SoumettreEvaluationContextProps
> = ({ children }) => {
    const { showNotification } = useContext(NotificationContext)

    const handleSoumettreEvaluation = useCallback(
        async (evaluationId: number) => {
            try {
                const response: ApiResponse = await putRequest(
                    `/evaluation/soumettre/${evaluationId}`,
                    null
                )
                if (!response.success) {
                    showNotification("Erreur", response.message, "error")
                    return
                }
                return response.data
            } catch (error) {
                console.error("Soumettre evaluation failed:", error)
                return false
            }
        },
        [showNotification]
    )

    const contextValue: SoumettreEvaluationContextData = {
        soumettreEvaluation: handleSoumettreEvaluation,
    }

    return (
        <SoumettreEvaluationContext.Provider value={contextValue}>
            {children}
        </SoumettreEvaluationContext.Provider>
    )
}

export const useSoumettreEvaluationContext = () => {
    const context = useContext(SoumettreEvaluationContext)
    if (!context) {
        throw new Error(
            "useSoumettreEvaluationContext must be used within a SoumettreEvaluationContextProvider"
        )
    }
    return context
}
