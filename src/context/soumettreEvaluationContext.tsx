import React, { createContext, ReactNode, useCallback, useContext } from "react";
import { soumettreEvaluation } from "../services/evaluationService";
import { EvaluationResponse } from "../types/EvaluationTypes";

interface SoumettreEvaluationContextProps {
  children: ReactNode;
}

interface SoumettreEvaluationContextData {
  soumettreEvaluation: (evaluationId: number) => Promise<boolean | EvaluationResponse>;
}

export const SoumettreEvaluationContext = createContext<SoumettreEvaluationContextData | null>(null);

export const SoumettreEvaluationContextProvider: React.FC<SoumettreEvaluationContextProps> = ({ children }) => {
  const handleSoumettreEvaluation = useCallback(async (evaluationId: number) => {
    try {
      const response = await soumettreEvaluation(evaluationId);
      return response;
    } catch (error) {
      console.error("Soumettre evaluation failed:", error);
      return false;
    }
  }, []);

  const contextValue: SoumettreEvaluationContextData = {
    soumettreEvaluation: handleSoumettreEvaluation,
  };

  return (
    <SoumettreEvaluationContext.Provider value={contextValue}>
      {children}
    </SoumettreEvaluationContext.Provider>
  );
};

export const useSoumettreEvaluationContext = () => {
  const context = useContext(SoumettreEvaluationContext);
  if (!context) {
    throw new Error("useSoumettreEvaluationContext must be used within a SoumettreEvaluationContextProvider");
  }
  return context;
};
