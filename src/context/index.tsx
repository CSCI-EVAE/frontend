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
import { ROLE } from "../constants"
import { userInfos } from "../utils/authUtils"
import { PromotionContextProvider } from "./promotionContextAdmin"
import { PromotionEnseignantContextProvider } from "./promotionContextEnseignant"
import { EvaluationContextProvider } from "./evaluationEnseignantContext"



// Création du contexte global
export const GlobalContext = createContext<any>(null);

// Création du fournisseur de contexte global
export const GlobalContextProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {

  
    const role = userInfos().role
    if (role && role === ROLE.enseigannt) {
        return (
            <QualificatifContextProvider>
                <QuestionContextProvider>
                    <RubriqueContextProvider>
                        <RubriqueComposeContextProvider>
                            <PromotionEnseignantContextProvider>
                                <EvaluationContextProvider>
                            <ListContextProvider>
                                <RubriqueEnseignantContextProvider>
                                    <SoumettreEvaluationContextProvider>
                                        <UEContextProvider>
                                            <StepContextProvider>
                                                <GlobalContext.Provider value={{}}>
                                                    {children}
                                                </GlobalContext.Provider>
                                            </StepContextProvider>
                                        </UEContextProvider>
                                    </SoumettreEvaluationContextProvider>
                                </RubriqueEnseignantContextProvider>
                            </ListContextProvider>
                            </EvaluationContextProvider>
                            </PromotionEnseignantContextProvider>
                        </RubriqueComposeContextProvider>
                    </RubriqueContextProvider>
                </QuestionContextProvider>
            </QualificatifContextProvider>
        );
    } else if (role && role === ROLE.admin) {
        return (
            <QualificatifContextProvider>
                <QuestionContextProvider>
                    <RubriqueContextProvider>
                        <RubriqueComposeContextProvider>
                            
                            <ListContextProvider>
                                <RubriqueEnseignantContextProvider>
                                    <SoumettreEvaluationContextProvider>
                                        <StepContextProvider>
                                        <PromotionContextProvider>
                                            <GlobalContext.Provider value={{}}>
                                                {children}
                                            </GlobalContext.Provider>
                                           </PromotionContextProvider>
                                        </StepContextProvider>
                                    </SoumettreEvaluationContextProvider>
                                </RubriqueEnseignantContextProvider>
                            </ListContextProvider>
                            
                        </RubriqueComposeContextProvider>
                    </RubriqueContextProvider>
                </QuestionContextProvider>
            </QualificatifContextProvider>
        );
    } else if (role && role === ROLE.etudiant) {
        return (
         
                            <ListContextProvider>
                        
                                        <StepContextProvider>
                                        <EvaluationContextProvider>
                                            <GlobalContext.Provider value={{}}>
                                                {children}
                                            </GlobalContext.Provider>
                                            </EvaluationContextProvider>
                                        </StepContextProvider>
                                   
                            </ListContextProvider>
                       
        );
    } else {
        // Cas où aucun rôle n'est défini ou le rôle est inconnu
        return null;
    }
};
