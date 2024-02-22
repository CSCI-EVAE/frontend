import React, { createContext, ReactNode, useCallback, useState } from "react";
import { Evaluation } from "../types/EvaluationTypes";
import { getEvaluationDetails } from "../services/evaluationService";

interface DetailsEvaluationContextProps {
  children: ReactNode;
}

interface DetailsEvaluationContextData {
  evaluationDetails: Evaluation| null;
  evaluationError: string;
  fetchEvaluationDetails: (evaluationId: number) => void;
}

export const DetailsEvaluationContext = createContext<DetailsEvaluationContextData | null>(null);

export const DetailsEvaluationContextProvider: React.FC<DetailsEvaluationContextProps> = 
({ children }) => {
  const [evaluationDetails, setEvaluationDetails] = useState<Evaluation | null>(null);
  const [evaluationError, setEvaluationError] = useState("");



  

  const fetchEvaluationDetails = useCallback(async (evaluationId: number) => {
    try {
      const data = await getEvaluationDetails(evaluationId);

      if (data) {
        setEvaluationDetails(data.data);
        setEvaluationError("");
      } else {
        setEvaluationError("Une erreur est survenue");
      }
    } catch (error) {
      console.error(error);
      setEvaluationError("Une erreur de chargement est survenue");
    }
  }, []);

 

  const contextValue: DetailsEvaluationContextData = {
    evaluationDetails,
    evaluationError,
    fetchEvaluationDetails,
  };

  return (
    <DetailsEvaluationContext.Provider value={contextValue}>
      {children}
    </DetailsEvaluationContext.Provider>
  );
};
