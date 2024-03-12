// evaluationContext.tsx
import React, { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react";
import { ApiResponse, Evaluation} from "../types";
import { getRequest, postRequest } from "../api/axios";
import { NotificationContext } from "./notificationContext";

// Define the type for props of EvaluationContextProvider
interface EvaluationContextProviderProps {
    children: ReactNode; // children must be of type ReactNode
}

// Create the context
export const EvaluationContext = createContext<any>(null); // You can replace 'any' with the specific type you want to use

// EvaluationContextProvider component
export const EvaluationContextProvider: React.FC<EvaluationContextProviderProps> = ({ children }) => {
    const [evaluations, setEvaluations] = useState<Evaluation[]>([]);
    const { showNotification } = useContext(NotificationContext);

    const updateEvaluations = useCallback((value: Evaluation[]) => {
        setEvaluations(value);
    }, []);

    
  
    const addNewEvaluation = useCallback(
        async (evaluationBody: Evaluation) => {
            const response: ApiResponse = await postRequest("/evaluation/create", evaluationBody);
            if (!response.success) {
                showNotification("Erreur", response.message, "error")
                return
            }
            showNotification("Génial !", response.message, "success")

            return
        },
        [showNotification]
    )

    return (
        <EvaluationContext.Provider value={{ evaluations, addNewEvaluation }}>
            {children}
        </EvaluationContext.Provider>
    );

    
};
