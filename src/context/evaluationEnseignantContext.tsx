// evaluationContext.tsx
import React, {
    createContext,
    ReactNode,
    useCallback,
    useContext,
    useState,
} from "react"
import { ApiResponse, Evaluation } from "../types"
import { getRequest, postRequest } from "../api/axios"
import { NotificationContext } from "./notificationContext"
import { UEContext } from "./UeContext"
import { CreateEvaluation } from "../types/EvaluationTypes"

// Define the type for props of EvaluationContextProvider
interface EvaluationContextProviderProps {
    children: ReactNode // children must be of type ReactNode
}

// Create the context
export const EvaluationContext = createContext<any>(null) // You can replace 'any' with the specific type you want to use

// EvaluationContextProvider component
export const EvaluationContextProvider: React.FC<
    EvaluationContextProviderProps
> = ({ children }) => {
    const { showNotification } = useContext(NotificationContext)
    const [statistiqueList, setStatistiqueList] = useState<
        CreateEvaluation[] | undefined
    >()

    const ueContext = useContext(UEContext)

    const updateStatistiqueEvaluation = useCallback(
        (value: CreateEvaluation[]) => {
            setStatistiqueList(value)
        },
        []
    )
    const [defaultValue, setDefaultValue] = useState({
        anneePro: "",
        dateDebut: "",
        dateFin: "",
        designation: "",
    })
    const getDefaultValue = useCallback(() => {
        const anneePro = localStorage.getItem("data")

        const def = localStorage.getItem("formData")
        if (def && anneePro) {
            const annee = JSON.parse(anneePro)
            const defaultV = JSON.parse(def)
            setDefaultValue({
                anneePro: annee.anneePro,
                dateDebut: defaultV.dateDebut,
                dateFin: defaultV.dateFin,
                designation: defaultV.designation,
            })
        }
    }, [])

    const addNewEvaluation = useCallback(
        async (evaluationBody: Evaluation) => {
            const response: ApiResponse = await postRequest(
                "/evaluation/create",
                evaluationBody
            )
            if (!response.success) {
                showNotification("Erreur", response.message, "error")
                return
            }
            ueContext.refreshList()
            showNotification("Génial !", response.message, "success")
            return
        },
        [showNotification, ueContext]
    )

    const getStatistiques = useCallback(
        async (id: number) => {
            try {
                const response: ApiResponse = await getRequest(
                    `/evaluation/statistics/${id}`
                )
                if (!response.success) {
                    showNotification("Erreur", response.message, "error")
                    return
                }
                const { data } = response.data
                console.log("Les statistiques eval  ", data)

                updateStatistiqueEvaluation(data)
            } catch (error) {
                console.error(
                    "Une erreur s'est produite lors de la récupération des statistiques :",
                    error
                )
                showNotification(
                    "Erreur",
                    "Une erreur s'est produite lors de la récupération des statistiques.",
                    "error"
                )
            }
        },
        [showNotification, updateStatistiqueEvaluation]
    )

    return (
        <EvaluationContext.Provider
            value={{
                addNewEvaluation,
                statistiqueList,
                updateStatistiqueEvaluation,
                getStatistiques,
                defaultValue,
                getDefaultValue,
            }}
        >
            {children}
        </EvaluationContext.Provider>
    )
}
