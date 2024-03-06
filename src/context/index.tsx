// globalContext.js

import React, { createContext, ReactNode } from "react"
import { ListContextProvider } from "./listContext"
import { QualificatifContextProvider } from "./qualificatifContext"
import { QuestionContextProvider } from "./questionContext"
import { RubriqueComposeContextProvider } from "./rubriqueComposeContext"
import { RubriqueContextProvider } from "./rubriqueContext"
import { RubriqueEnseignantContextProvider } from "./rubriqueEnseignantContext"
import { SoumettreEvaluationContextProvider } from "./soumettreEvaluationContext"
import { StepContextProvider } from "./stepperContext"

import { UEContextProvider } from "./UeContext"
import { EvaluationContext, EvaluationContextProvider } from "./evaluationEtudiantContext"



// Création du contexte global
export const GlobalContext = createContext<any>(null)

// Création du fournisseur de contexte global
export const GlobalContextProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {

    return (
        
        <QualificatifContextProvider>
            <QuestionContextProvider>
            <RubriqueContextProvider>
            <RubriqueComposeContextProvider>
            <ListContextProvider>
            <RubriqueEnseignantContextProvider>
            <SoumettreEvaluationContextProvider>
            <UEContextProvider>
            <StepContextProvider>
            <EvaluationContextProvider>
                
                                                <GlobalContext.Provider
                                                    value={{}}
                                                >
                                                    {children}
                                                </GlobalContext.Provider>
                 </EvaluationContextProvider>    
                </StepContextProvider>
                </UEContextProvider>
                </SoumettreEvaluationContextProvider>
                </RubriqueEnseignantContextProvider>
                </ListContextProvider>
                </RubriqueComposeContextProvider>
                </RubriqueContextProvider>
                </QuestionContextProvider>
                </QualificatifContextProvider>
        

      
        
    )
}
