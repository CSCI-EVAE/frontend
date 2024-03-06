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
// import { ApiResponse } from "../types";
// import { getRequest } from "../api/axios";
import EvaluationList from "../common/SousList";

interface EvaluationContextProviderProps {
    children: ReactNode;
}

export const EvaluationContext = createContext<any>(null);
     
export function AdjustColumns(evaluationList: Evaluation[]): any[] {
    if (evaluationList) {
        return evaluationList.map((evaluation: Evaluation) => {
            const {
                id,
                etat,
                nomEnseignant,
                noEvaluation,
                periode,
                designation,
                codeFormation,
                anneeUniversitaire,
                ...rest
            } = evaluation;

            return {
                ...rest,
                anneeUniversitaire,
                codeFormation,
                noEvaluation,
                etat,
                designation,
                nomEnseignant,
                periode,
            };
        });
    } else {
        return [];
    }
}

export const EvaluationContextProvider: React.FC<EvaluationContextProviderProps> = ({ children }) => {
    const [evaluationList, setEvaluationList] = useState<Evaluation[] | undefined>();
    const { showNotification } = useContext(NotificationContext);

    const updateEvaluationList = useCallback((value: Evaluation[]) => {
        setEvaluationList(value);
    }, []);

    const getList = useCallback(async () => {
        try {
            const testData = [
                {
                    "id": 1,
                    "codeFormation": "INFO",
                    "anneeUniversitaire": "2023-2024",
                    "nomEnseignant": "ENS porf",
                    "noEvaluation": 1,
                    "designation": "Evaluation 1",
                    "etat": "En cours",
                    "periode": "Période 1",
                    "noEtudiant": "ETU456",
                    "debutReponse": "2024-02-15",
                    "finReponse": "2024-02-28"
                },
                {
                    "id": 2,
                    "codeFormation": "INFO",
                    "anneeUniversitaire": "2023-2024",
                    "nomEnseignant": "ENS porf",
                    "noEvaluation": 2,
                    "designation": "Evaluation 2",
                    "etat": "Terminé",
                    "periode": "Période 2",
                    "noEtudiant": "ETU789",
                    "debutReponse": "2024-03-01",
                    "finReponse": "2024-03-15"
                }
            ];
            updateEvaluationList(testData);
        } catch (error) {
            console.error("Une erreur s'est produite lors de la récupération de la liste des évaluations :", error);
            showNotification("Erreur", "Une erreur s'est produite lors de la récupération de la liste des évaluations.", "error");
        }
    }, [updateEvaluationList, showNotification]);
    
    useEffect(() => {
        getList();
    }, [getList]);

    return (
        <EvaluationContext.Provider
            value={{
                updateEvaluationList,
                evaluationList,
            }}
        >
            {children}
        </EvaluationContext.Provider>
    );
};
