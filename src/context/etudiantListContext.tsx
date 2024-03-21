import {
    ReactNode,
    createContext,
    useCallback,
    useContext,
    useState,
} from "react"
// import {ApiResponse, Etudiant} from "../types/index"
import { NotificationContext } from "./notificationContext"
import { ApiResponse, EtudiantDTO } from "../types"
import {
    deleteRequest,
    getRequest,
    postRequest,
    putRequest,
} from "../api/axios"
import { formatDate } from "../components/detailsPromotionComponent"
// import { getRequest } from "../api/axios";

interface EtudiantListProps {
    children: ReactNode
}

export const EtudiantListContext = createContext<any>(null)

export function trouverIdEtudiant(
    etudiant: EtudiantDTO,
    etudiantListe: EtudiantDTO[]
): string | null {
    if (etudiant && etudiantListe) {
        const etudiantTrouve = etudiantListe.find(
            (item) => item.noEtudiant === etudiant.noEtudiant
        )

        if (etudiantTrouve && etudiantTrouve.noEtudiant !== undefined) {
            return etudiantTrouve.noEtudiant
        } else {
            return null // Retourne null si l'etudiant n'est pas trouvé ou s'il n'a pas d'ID
        }
    } else {
        return null
    }
}

export const EtudiantListContextPorvider: React.FC<EtudiantListProps> = ({
    children,
}) => {
    // const [etudiantList, setEtudiantList] = useState<EtudiantDTO[] | undefined>();
    const [etudiantList, setEtudiantList] = useState<EtudiantDTO[]>([])
    const { showNotification } = useContext(NotificationContext)

    const updateEtudiantList = useCallback((value: EtudiantDTO[]) => {
        setEtudiantList(value)
    }, [])

  

    const getList = useCallback(
        async (anneeUniversitaire: number, codeFormation: string) => {
            try {
                const response: ApiResponse = await getRequest(
                    `/etudiant/${anneeUniversitaire}/${codeFormation}/etudiants`
                )
                if (!response.success) {
                    showNotification("Erreur", response.message, "error")
                    return
                }
                const { data } = response.data
                const newdata = data.map((d: any) => {
                    return { ...d, dateNaissance: formatDate(d.dateNaissance) }
                })

                updateEtudiantList(newdata)
            } catch (error) {
                console.error(
                    "Une erreur s'est produite lors de la récupération de la liste des étudiants :",
                    error
                )
                showNotification(
                    "Erreur",
                    "Une erreur s'est produite lors de la récupération de la liste des étudiants.",
                    "error"
                )
            }
        },
        [showNotification, updateEtudiantList]
    )

    const addNewEtudiant = useCallback(
        async (
            etudiantBody: EtudiantDTO,
            anneeUniversitaire: number,
            codeFormation: string
        ) => {
            const response: ApiResponse = await postRequest(
                "/etudiant/register-etudiant",
                etudiantBody
            )
            if (!response.success) {
                showNotification("Erreur", response.message, "error")
                return
            }
            showNotification("Génial !", response.message, "success")

            getList(anneeUniversitaire, codeFormation)
            return
        },
        [getList, showNotification]
    )

    const getEtudiant = useCallback(async (no_etudiant: string) => {
        try {
            const response: ApiResponse = await getRequest(
                `/etudiant/${no_etudiant}`
            )
            const { data } = response
            return data.data
        } catch (error) {
            console.error(
                "Une erreur s'est produite lors de la récupération de l'étudiant"
            )
            throw error
        }
    }, [])

    const modifyEtudiant = useCallback(
        async (
            no_etudiant: number,
            etudiantBody: EtudiantDTO,
            anneeUniversitaire: number,
            codeFormation: string
        ) => {
            const response: ApiResponse = await putRequest(
                `/etudiant/update-etudiant/${no_etudiant}`,
                etudiantBody
            )
            if (!response.success) {
                showNotification("Erreur", response.message, "error")
                return
            }

            showNotification("Génial !", response.message, "success")

            getList(anneeUniversitaire, codeFormation)
            return
        },
        [getList, showNotification]
    )

    const removeEtudiant = useCallback(
        async (
            no_etudiant: number,
            anneeUniversitaire: number,
            codeFormation: string
        ) => {
            const response: ApiResponse = await deleteRequest(
                `/etudiant/etudiants/${no_etudiant}`
            )

            if (response.success) {
                showNotification("Génial !", response.message, "success")
                getList(anneeUniversitaire, codeFormation)
                return
            } else {
                showNotification("Erreur", response.message, "error")
            }
        },
        [getList, showNotification]
    )

    return (
        <EtudiantListContext.Provider
            value={{
                updateEtudiantList,
                getList,
                removeEtudiant,
                addNewEtudiant,
                getEtudiant,
                modifyEtudiant,
                etudiantList,
            }}
        >
            {children}
        </EtudiantListContext.Provider>
    )
}
