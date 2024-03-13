// evaluationContext.tsx
import React, { createContext, ReactNode, useCallback, useContext} from "react";
import { ApiResponse, Evaluation} from "../types";
import { postRequest } from "../api/axios";
import { NotificationContext } from "./notificationContext";

// Define the type for props of EvaluationContextProvider
interface EvaluationContextProviderProps {
    children: ReactNode; // children must be of type ReactNode
}

// Create the context
export const EvaluationContext = createContext<any>(null); // You can replace 'any' with the specific type you want to use

// EvaluationContextProvider component
export const EvaluationContextProvider: React.FC<EvaluationContextProviderProps> = ({ children }) => {
   
    const { showNotification } = useContext(NotificationContext);

   

  
  
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
        <EvaluationContext.Provider value={{ addNewEvaluation }}>
            {children}
        </EvaluationContext.Provider>
    );

    
};
