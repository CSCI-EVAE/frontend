import React from "react";
import { userInfos } from "../../utils/authUtils";
import { Route, Routes } from "react-router-dom";
import Etudiant from "../../pages/Etudiant";
import Admin from "../../pages/Admin";
import Page404 from "../../pages/Page404";
import Qualificatif from "../../pages/Admin/qualificatif";
import Question from "../../pages/Admin/question";
import { ListContextProvider } from "../../context/listContext";
import { QualificatifContextProvider } from "../../context/qualificatifContext";
import { QuestionContextProvider } from "../../context/questionContext";
import RubriquePage from "../../pages/Admin/rubriques";
import { RubriqueContextProvider } from "../../context/rubriqueContext";
import { RubriqueComposeContextProvider } from "../../context/rubriqueComposeContext";
import RubriqueComposePage from "../../pages/Admin/rubriquesCompose";
import { ROLE } from "../../constants";
import RubriqueCompose from "../RubriqueComposeView";
import { RubriqueEnseignantContextProvider } from "../../context/rubriqueEnseignantContext";

import UePage from "../../pages/Enseignant/ue";
import { UEContextProvider } from "../../context/UeContext";
import { DetailsEvaluationContextProvider } from "../../context/detailsEvaluationContext";
import DetailsEvaluationPage from "../../pages/Enseignant/consulterDetails";

import Evaluation from "../../pages/Etudiant/evaluation";
import { EvaluationContextProvider } from "../../context/evaluationEtudiantContext";
import InfoGeneralesPage from "../../pages/Enseignant/saisirInfoGenarales";
import {SoumettreEvaluationContextProvider } from "../../context/soumettreEvaluationContext";
import AjoutRubriqueEvaluation from "../../pages/Enseignant/AjoutRubriqueEvaluation";
import { StepContextProvider } from "../../context/stepperContext";
import ReponseEvaluation from "../../pages/Etudiant/ReponseEvaluation";
import CreerEvaluation from "../../pages/Enseignant/CreerEvaluation";
import TokenExpirationWrapper from "./TokenEpxpire";



const Dashboard: React.FC = () => {
    // const role = Object.keys(ROLE_COMPONENTS).find(hasRole);
    const role = userInfos().role;
    if (!role) {
        return <Page404 />;
    }

    return (
        <div>
            
            <TokenExpirationWrapper>
            <ListContextProvider>
            <StepContextProvider>
                <QualificatifContextProvider>
                    <QuestionContextProvider>
                    <RubriqueContextProvider>
                        <RubriqueComposeContextProvider>
                            <RubriqueEnseignantContextProvider>
                            <EvaluationContextProvider>
                            <UEContextProvider>
                            <DetailsEvaluationContextProvider>
                            <SoumettreEvaluationContextProvider>
                                
                    
                    <Routes>
                        {/* //METTRE TOUTES LES PAGES ETUDIANTS ICI */}

                        {role === ROLE.etudiant && (
                        <>
                            <Route path="/etudiant" element={<Etudiant />} />
                            <Route
                                    path="/evaluations"
                                    element={<Evaluation />}
                                />
                                 <Route
                                    path="/reponse"
                                    element={<ReponseEvaluation/>}
                                />
                        </>
                        )}
                        {/* //METTRE TOUTES LES PAGES ADMIN ICI */}

                        {role === ROLE.admin && (
                            <>
                                <Route path="/admin" element={<Admin />} />
                                <Route
                                    path="/qualificatif"
                                    element={<Qualificatif />}
                                />

                                 <Route
                                    path="/questions"
                                    element={<Question />}
                                />
                               
                                <Route
                                    path="/rubrique"
                                    element={<RubriquePage />}
                                />
                                 <Route
                                    path="/essai"
                                    element={<RubriqueCompose />}
                                />
                                 <Route
                                    path="/rubriquecompose"
                                    element={<RubriqueComposePage />}
                                />
                                
                            </>
                        )}
                        {/* //METTRE TOUTES LES PAGES ENSEIGNANT ICI */}

                        {role === ROLE.enseigannt && (
                            <>
                            <Route
                                path="/enseignant"
                                element={<UePage />} 
                            />
                             <Route
                                    path="enseignant/rubrique-evaluation"
                                    element={<AjoutRubriqueEvaluation />}
                                />
                                 
                                

                    
                        <Route path="enseignant/evaluation-details/:id_eva" element={<DetailsEvaluationPage />} />
                        <Route path="enseignant/creation-evaluation" element={<InfoGeneralesPage />} />
                        <Route path="enseignant/test" element={<CreerEvaluation />} />
                                
                                 
                            </>
                        )}


                        <Route path="/404" element={<Page404 />} />
                        <Route path="*" element={<Page404 />} />
                    </Routes>

            
                  </SoumettreEvaluationContextProvider>
                    </DetailsEvaluationContextProvider>
                    </UEContextProvider>

                   
                     </EvaluationContextProvider>

                    </RubriqueEnseignantContextProvider>
                    </RubriqueComposeContextProvider>
                   
                    </RubriqueContextProvider>
                    </QuestionContextProvider>
                </QualificatifContextProvider>
                </StepContextProvider>
            </ListContextProvider>
            </TokenExpirationWrapper>
        </div>
    );
};
export default Dashboard;
