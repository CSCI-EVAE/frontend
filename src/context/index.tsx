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
import { NotificationContextProvider } from "./notificationContext"
import { AuthContextProvider } from "./authContext"

// Création du contexte global
export const GlobalContext = createContext<any>(null)

// Création du fournisseur de contexte global
export const GlobalContextProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    return (
        <NotificationContextProvider>
            <AuthContextProvider>
                <StepContextProvider>
                    <SoumettreEvaluationContextProvider>
                        <RubriqueEnseignantContextProvider>
                            <RubriqueContextProvider>
                                <RubriqueComposeContextProvider>
                                    <QuestionContextProvider>
                                        <QualificatifContextProvider>
                                            <ListContextProvider>
                                                <GlobalContext.Provider
                                                    value={{}}
                                                >
                                                    {children}
                                                </GlobalContext.Provider>
                                            </ListContextProvider>
                                        </QualificatifContextProvider>
                                    </QuestionContextProvider>
                                </RubriqueComposeContextProvider>
                            </RubriqueContextProvider>
                        </RubriqueEnseignantContextProvider>
                    </SoumettreEvaluationContextProvider>
                </StepContextProvider>
            </AuthContextProvider>
        </NotificationContextProvider>
    )
}
