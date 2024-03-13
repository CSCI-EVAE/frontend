import React from "react"
import { userInfos } from "../utils/authUtils"
import { Route, Routes } from "react-router-dom"
// import Etudiant from "../pages/Etudiant"
import Admin from "../pages/Admin"
import Page404 from "../pages/Page404"
import Qualificatif from "../pages/Admin/qualificatif"
import Question from "../pages/Admin/question"

import RubriquePage from "../pages/Admin/rubriques"

import RubriqueComposePage from "../pages/Admin/rubriquesCompose"
import { ROLE } from "../constants"
import RubriqueCompose from "../components/RubriqueComposeView"
import UePage from "../pages/Enseignant/ue"

import DetailsEvaluationPage from "../pages/Enseignant/consulterDetails"

// import Evaluation from "../pages/Etudiant/evaluation"
import InfoGeneralesPage from "../pages/Enseignant/saisirInfoGenarales"
import AjoutRubriqueEvaluation from "../pages/Enseignant/AjoutRubriqueEvaluation"
import ReponseEvaluation from "../pages/Etudiant/ReponseEvaluation"
import CreerEvaluation from "../pages/Enseignant/CreerEvaluation"
import TokenExpirationWrapper from "./TokenEpxpire"
import Notification from "../common/Notification"
import { GlobalContextProvider } from "../context"
import EvaluationPage from "../pages/Etudiant/evaluation"
import Enseignant from "../pages/Enseignant"
import BigMenu from "../pages/Enseignant"
import EtudiantListPage from "../pages/Admin/etudiantList"
import ListEtudiantPage from "../pages/Enseignant/listEtudiants"
import Promotion from "../pages/Admin/promotion"
import PromotionPageEnseignant from "../pages/Enseignant/promotion"
import CreerEtudiant from "../components/CreerEtudiant"
import ModifierEtudiant from "../components/ModifierEtudiant"

const Dashboard: React.FC = () => {
    // const role = Object.keys(ROLE_COMPONENTS).find(hasRole);
    const role = userInfos().role
    if (!role) {
        return <Page404 />
    }

    return (
        <div>
            <GlobalContextProvider>
                <TokenExpirationWrapper>
                    <Notification />
                    <Routes>
                        {/* //METTRE TOUTES LES PAGES ETUDIANTS ICI */}

                        {role === ROLE.etudiant && (
                            <>
                                <Route
                                    path="/etudiant"
                                    element={<EvaluationPage />}
                                />

                                <Route
                                    path="/reponse"
                                    element={<ReponseEvaluation />}
                                />
                                <Route
                                    path="/evaluations"
                                    element={<EvaluationPage />}
                                />
                            </>
                        )}
                        {/* //METTRE TOUTES LES PAGES ADMIN ICI */}

                        {role === ROLE.admin && (
                            <>
                                <Route
                                    path="/creer-etudiant"
                                    element={<CreerEtudiant />}
                                />
                                <Route
                                    path="/modifier-etudiant"
                                    element={<ModifierEtudiant />}
                                />
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
                                    path="/promotions"
                                    element={<Promotion />}
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
                           <Route
                                    path="/listetudiants"
                                    element={<ListEtudiantPage />}
                                />
                            </>
                        )}
                        {/* //METTRE TOUTES LES PAGES ENSEIGNANT ICI */}

                        {role === ROLE.enseigannt && (
                            <>
                                <Route
                                    path="/enseignant"
                                    element={<Enseignant />}
                                />

                                <Route
                                    path="/enseignant/unitésEnseignement"
                                    element={<UePage />}
                                />
                                <Route
                                    path="enseignant/rubrique-evaluation"
                                    element={<AjoutRubriqueEvaluation />}
                                />
                                <Route
                                    path="enseignant/promotion"
                                    element={<PromotionPageEnseignant />}
                                />

                                <Route
                                    path="enseignant/evaluation-details/:id_eva"
                                    element={<DetailsEvaluationPage />}
                                />
                                <Route
                                    path="enseignant/unitésEnseignement/creation-evaluation"
                                    element={<InfoGeneralesPage />}
                                />
                                <Route
                                    path="enseignant/test"
                                    element={<CreerEvaluation />}
                                />
                                 <Route
                                    path="enseignant/etudiantList"
                                    element={<ListEtudiantPage />}
                                />
                            </>
                        )}

                        <Route path="/404" element={<Page404 />} />
                        <Route path="*" element={<Page404 />} />
                    </Routes>
                </TokenExpirationWrapper>
            </GlobalContextProvider>
        </div>
    )
}
export default Dashboard
