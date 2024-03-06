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
<<<<<<< HEAD
import { EvaluationContext, EvaluationContextProvider } from "./evaluationEtudiantContext"
=======
import { ROLE } from "../constants"
import { userInfos } from "../utils/authUtils"
>>>>>>> 5cdcfee275345f408177040fd10144de041f54cb



// Création du contexte global
export const GlobalContext = createContext<any>(null);

// Création du fournisseur de contexte global
export const GlobalContextProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
<<<<<<< HEAD

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
=======
    const role = userInfos().role
    if (role && role === ROLE.enseigannt) {
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
                                                <GlobalContext.Provider value={{}}>
                                                    {children}
                                                </GlobalContext.Provider>
                                            </StepContextProvider>
                                        </UEContextProvider>
                                    </SoumettreEvaluationContextProvider>
                                </RubriqueEnseignantContextProvider>
                            </ListContextProvider>
                        </RubriqueComposeContextProvider>
                    </RubriqueContextProvider>
>>>>>>> 5cdcfee275345f408177040fd10144de041f54cb
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
                                            <GlobalContext.Provider value={{}}>
                                                {children}
                                            </GlobalContext.Provider>
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
            <QualificatifContextProvider>
                <QuestionContextProvider>
                    <RubriqueContextProvider>
                        <RubriqueComposeContextProvider>
                            <ListContextProvider>
                                <RubriqueEnseignantContextProvider>
                                    <SoumettreEvaluationContextProvider>
                                        <StepContextProvider>
                                            <GlobalContext.Provider value={{}}>
                                                {children}
                                            </GlobalContext.Provider>
                                        </StepContextProvider>
                                    </SoumettreEvaluationContextProvider>
                                </RubriqueEnseignantContextProvider>
                            </ListContextProvider>
                        </RubriqueComposeContextProvider>
                    </RubriqueContextProvider>
                </QuestionContextProvider>
            </QualificatifContextProvider>
        );
    } else {
        // Cas où aucun rôle n'est défini ou le rôle est inconnu
        return null;
    }
};
