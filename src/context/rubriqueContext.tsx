import React, {
    createContext,
    ReactNode,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react"

import {
    deleteRequest,
    getRequest,
    postRequest,
    putRequest,
} from "../api/axios"
import { ApiResponse, Rubrique } from "../types"
import { NotificationContext } from "./notificationContext"

// Définition du type des props pour rubriqueContextProvider
interface rubriqueContextProviderProps {
    children: ReactNode // children doit être de type ReactNode
}

// Création du contexte
export const RubriqueContext = createContext<any>(null) // Vous pouvez remplacer 'any' par le type spécifique que vous souhaitez utiliser

export function trouverRubrique(
    rubrique: Rubrique,
    rubriqueListe: Rubrique[]
): Rubrique | null {
    if (rubrique && rubriqueListe) {
        // Recherche du rubrique dans la liste
        const rubriqueTrouve = rubriqueListe.find(
            (item) =>
                item.ordre === rubrique.ordre &&
                item.designation === rubrique.designation
        )

        // Si le rubrique est trouvé, retourne son ID
        if (rubriqueTrouve) {
            return rubriqueTrouve
        } else {
            return null // Retourne null si le rubrique n'est pas trouvé ou s'il n'a pas d'ID
        }
    } else {
        return null // Retourne null si les données d'entrée sont invalides ou manquantes
    }
}

export function supprimerColonnesId(rubriqueList: Rubrique[]): any[] {
    // Vérifier si rubriqueList et qualficatifList.qualficatifList sont définis
    if (rubriqueList) {
        // Mappez chaque élément en retirant la colonne id
        return rubriqueList.map((rubrique: Rubrique) => {
            const { id, noEnseignant, type, ...rest } = rubrique
            return rest
        })
    } else {
        return [] // Retourne un tableau vide si les données d'entrée sont invalides ou manquantes
    }
}

export function getMaxOrdre(liste: Rubrique[]): number {
    if (liste.length === 0) {
        return 0 // Retourne 0 si la liste est vide
    }

    let maxOrdre = liste[0].ordre // Initialise le maximum avec le premier élément de la liste

    for (let i = 1; i < liste.length; i++) {
        if (liste[i].ordre > maxOrdre) {
            maxOrdre = liste[i].ordre // Met à jour le maximum si un élément a un ordre plus grand
        }
    }

    return maxOrdre
}

export function trierParOrdre(liste: Rubrique[]): Rubrique[] {
    // Utilise Array.sort() pour trier la liste en fonction de la propriété 'ordre'
    return liste.sort((a, b) => a.ordre - b.ordre)
}

// Composant rubriqueContextProvider
export const RubriqueContextProvider: React.FC<
    rubriqueContextProviderProps
> = ({ children }) => {
    const [rubrique, setRubrique] = useState({})
    const [rubriqueList, setRubriqueList] = useState<Rubrique[]>()
    const { showNotification } = useContext(NotificationContext)
    const updateRubriqueList = useCallback((value: Rubrique[]) => {
        setRubriqueList(value)
    }, [])

    const updateCurrentRubrique = useCallback((value: {}) => {
        setRubrique(value)
    }, [])
    const getList = useCallback(async () => {
        const response: ApiResponse = await getRequest("/rubrique/all")
        if (!response.success) {
            showNotification("Erreur", response.message, "error")
            return
        }

        let list = response.data
        updateRubriqueList(list.data)
    }, [updateRubriqueList, showNotification])

    useEffect(() => {
        const getList = async () => {
            const response: ApiResponse = await getRequest("/rubrique/all")
            if (!response.success) {
                showNotification("Erreur", response.message, "error")
                return
            }
    
            let list = response.data
            updateRubriqueList(list.data)
        }
        getList()
<<<<<<< HEAD
    }, [])
=======
    }, [updateRubriqueList, showNotification])
>>>>>>> 5cdcfee275345f408177040fd10144de041f54cb

    const addNewRubrique = useCallback(
        async (rubrique: Rubrique) => {
            const response: ApiResponse = await postRequest(
                `/rubrique/create`,
                rubrique
            )
            if (!response.success) {
                showNotification("Erreur", response.message, "error")
                return
            }
            setRubrique({})
            showNotification("Génial !", response.message, "success")
            getList()
            return
        },
        [getList, showNotification]
    )

    const modifyRubrique = useCallback(
        async (id_rubrique: number, rubrique: Rubrique) => {
            const response: ApiResponse = await putRequest(
                `/rubrique/${id_rubrique}`,
                rubrique
            )

            if (!response.success) {
                showNotification("Erreur", response.message, "error")
                return
            }
            showNotification("Génial !", response.message, "success")
            setRubrique({})

            getList()
            return
        },
        [getList, showNotification]
    )

    const removeRubrique = useCallback(
        async (rubrique_id: number) => {
            const response: ApiResponse = await deleteRequest(
                `/rubrique/${rubrique_id}`
            )

            if (response.success) {
                showNotification("Génial !", response.message, "success")
                getList()
                return
            } else {
                showNotification("Erreur", response.message, "error")
            }
        },
        [getList, showNotification]
    )

    return (
        <RubriqueContext.Provider
            value={{
                updateRubriqueList,
                rubriqueList,
                addNewRubrique,
                rubrique,
                updateCurrentRubrique,

                removeRubrique,

                modifyRubrique,
                getList,
            }}
        >
            {children}
        </RubriqueContext.Provider>
    )
}
