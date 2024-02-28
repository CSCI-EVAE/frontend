import React, {
    createContext,
    ReactNode,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react"

import { NotificationContext } from "./notificationContext"
import { ApiResponse, Qualificatif } from "../types"
import {
    deleteRequest,
    getRequest,
    postRequest,
    putRequest,
} from "../api/axios"

// Définition du type des props pour qualificatifContextProvider
interface qualificatifContextProviderProps {
    children: ReactNode // children doit être de type ReactNode
}

// Création du contexte
export const QualificatifContext = createContext<any>(null) // Vous pouvez remplacer 'any' par le type spécifique que vous souhaitez utiliser

export function trouverIdQualificatif(
    qualificatif: Qualificatif,
    qualificatifListe: Qualificatif[]
): number | null {
    if (qualificatif && qualificatifListe) {
        console.log("troub")
        // Recherche du qualificatif dans la liste
        const qualificatifTrouve = qualificatifListe.find(
            (item) =>
                item.minimal === qualificatif.minimal &&
                item.maximal === qualificatif.maximal
        )

        // Si le qualificatif est trouvé, retourne son ID
        if (qualificatifTrouve && qualificatifTrouve.id !== undefined) {
            return qualificatifTrouve.id
        } else {
            return null // Retourne null si le qualificatif n'est pas trouvé ou s'il n'a pas d'ID
        }
    } else {
        return null // Retourne null si les données d'entrée sont invalides ou manquantes
    }
}

export function supprimerColonnesId(qualificatifList: Qualificatif[]): any[] {
    // Vérifier si qualificatifList et qualficatifList.qualficatifList sont définis
    if (qualificatifList) {
        // Mappez chaque élément en retirant la colonne id
        return qualificatifList.map((qualificatif: Qualificatif) => {
            const { id, ...rest } = qualificatif
            return rest
        })
    } else {
        return [] // Retourne un tableau vide si les données d'entrée sont invalides ou manquantes
    }
}

// Composant qualificatifContextProvider
export const QualificatifContextProvider: React.FC<
    qualificatifContextProviderProps
> = ({ children }) => {
    const [qualificatifMinimal, setQualificatifMinimal] = useState("")
    const [qualificatifMaximal, setQualificatifMaximal] = useState("")
    const [qualificatifList, setQualificatifList] = useState<Qualificatif[]>()

    const { showNotification } = useContext(NotificationContext)

    const updateQualificatifList = useCallback((value: Qualificatif[]) => {
        setQualificatifList(value)
    }, [])

    const updateQualificatifMaximal = useCallback((value: string) => {
        setQualificatifMaximal(value)
    }, [])

    const updateQualificatifMinimal = useCallback((value: string) => {
        setQualificatifMinimal(value)
    }, [])
    const getList = useCallback(async () => {
        const response: ApiResponse = await getRequest("/qualificatif")
        if (!response.success) {
            showNotification("Erreur", response.message, "error")
            return
        }
        let list = response.data

        updateQualificatifList(list.data)
    }, [updateQualificatifList, showNotification])
    useEffect(() => {
        getList()
    }, [getList])

    const addNewQualificatif = useCallback(
        async (qualificatif: Qualificatif) => {
            const response: ApiResponse = await postRequest(
                "/qualificatif",
                qualificatif
            )
            if (!response.success) {
                showNotification("Erreur", response.message, "error")
                return
            }

            setQualificatifMinimal("")
            setQualificatifMaximal("")
            showNotification("Génial !", response.message, "success")

            getList()
            return
        },
        [getList, showNotification]
    )

    const modifyQualificatif = useCallback(
        async (id_qualificatif: number, qualificatif: Qualificatif) => {
            const response: ApiResponse = await putRequest(
                `/qualificatif/${id_qualificatif}`,
                qualificatif
            )
            if (!response.success) {
                showNotification("Erreur", response.message, "error")
                return
            }

            setQualificatifMinimal("")
            setQualificatifMaximal("")
            showNotification("Génial !", response.message, "success")

            getList()
            return
        },
        [getList, showNotification]
    )

    const removeQualificatif = useCallback(
        async (qualificatif_id: number) => {
            const response: ApiResponse = await deleteRequest(
                `/qualificatif/${qualificatif_id}`
            )
            if (!response.success) {
                showNotification("Erreur", response.message, "error")
                return
            }

            showNotification("Génial !", response.message, "success")

            getList()

            return
        },
        [getList, showNotification]
    )

    return (
        <QualificatifContext.Provider
            value={{
                updateQualificatifList,
                qualificatifList,
                addNewQualificatif,
                qualificatifMaximal,
                qualificatifMinimal,
                updateQualificatifMaximal,
                updateQualificatifMinimal,

                removeQualificatif,

                modifyQualificatif,
            }}
        >
            {children}
        </QualificatifContext.Provider>
    )
}
