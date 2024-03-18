import React, {
    createContext,
    ReactNode,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react";

import { Evaluation } from "../types/EvaluationType";
import { NotificationContext } from "./notificationContext";
import { ApiResponse } from "../types";
import { getRequest } from "../api/axios";


interface EvaluationContextProviderProps {
    children: ReactNode;
}

export const EvaluationEtudiantContext = createContext<any>(null);
     
export function AdjustColumns(evaluationList: Evaluation[]): any[] {
    if (evaluationList) {
        return evaluationList.map((evaluation: Evaluation) => {
            const {
                id,
                etat,
                noEvaluation,
                periode,
                designation,
                evaRepondu,
                ...rest
            } = evaluation;

            let readStatus = false;
            let answerStatus = false;

            if (etat === 'CLO') {
                readStatus = true;
            }
            if (etat === 'DIS') {
                answerStatus = true;
            }
           
            return {
                ...rest,
                noEvaluation,
                etat,
                designation,
                periode,
                readStatus,
                evaRepondu,
                answerStatus
            };
        });
    } else {
        return [];
    }
}


export const EvaluationEtudiantContextProvider: React.FC<EvaluationContextProviderProps> = ({ children }) => {
    const [evaluationList, setEvaluationList] = useState<Evaluation[] | undefined>();
    const { showNotification } = useContext(NotificationContext);

    const updateEvaluationList = useCallback((value: Evaluation[]) => { 
        setEvaluationList(value);
    }, []);


    useEffect(() => {
        const getList = async () => {
            try {
                const response: ApiResponse = await getRequest("evaluation/getEvaluationsByUser");
                if (!response.success) {
                    showNotification("Erreur", response.message, "error");
                    return;
                }
                let list = response.data.body.data;
                updateEvaluationList(AdjustColumns(list));
                
            } catch (error) {
                console.error("Une erreur s'est produite lors de la récupération de la liste des évaluations :", error);
                showNotification("Erreur", "Une erreur s'est produite lors de la récupération de la liste des évaluations.", "error");
            }
        };

        getList();
    }, [updateEvaluationList, showNotification]);


    return (
        <EvaluationEtudiantContext.Provider
            value={{
                updateEvaluationList,
                evaluationList,
            }}
        >
            {children}
        </EvaluationEtudiantContext.Provider>
    );
};