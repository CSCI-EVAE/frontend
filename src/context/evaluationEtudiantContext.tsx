import React, {
    createContext,
    ReactNode,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react"

import { Evaluation } from "../types/EvaluationType"

import { NotificationContext } from "./notificationContext"
import { ApiResponse } from "../types"
import { getRequest } from "../api/axios"

interface evaluationContextProviderProps {
    children: ReactNode
}

//creation de context
export const EvaluationContext = createContext<any>(null)

export function AjusterColonnes(evaluationList: Evaluation[]): any[] {
    // Vérifier si questionList et questionList.questionList sont définis
    if (evaluationList) {
        // Mappez chaque élément en retirant la colonne id
        return evaluationList.map((question: Evaluation) => {
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
            } = question

            return {
                ...rest,
                anneeUniversitaire: anneeUniversitaire,
                codeFormation: codeFormation,
                noEvaluation: noEvaluation,
                etat: etat,
                designation: designation,
                nomEnseignant: nomEnseignant,
                periode: periode,
            }
        })
    } else {
        return [] // Retourne un tableau vide si les données d'entrée sont invalides ou manquantes
    }
}

export const EvaluationContextProvider: React.FC<
    evaluationContextProviderProps
> = ({ children }) => {
    const [evaluationListe, setEvaluationListe] = useState<Evaluation[]>()
    const { showNotification } = useContext(NotificationContext)

    const updateEvaluationList = useCallback((value: Evaluation[]) => {
        setEvaluationListe(value)
    }, [])

    const getList = useCallback(async () => {
        const response: ApiResponse = await getRequest(
            "/evaluation/getEvaluationsByUser"
        )
        if (!response.success) {
            showNotification("Erreur", response.message, "error")
            return
        }
        let list = response.data
        updateEvaluationList(list.data)
    }, [updateEvaluationList, showNotification])
    useEffect(() => {
        getList()
    }, [getList])

    return (
        <EvaluationContext.Provider
            value={{
                updateEvaluationList,
                evaluationListe,
            }}
        >
            {children}
        </EvaluationContext.Provider>
    )
}
