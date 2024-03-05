import React, {
    createContext,
    ReactNode,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react"

import {
    ApiResponse,
    CreateRubriqueCompose,
    RubriqueCompose,
    RubriqueComposeDTO,
} from "../types"
import { deleteRequest, getRequest, postRequest } from "../api/axios"
import { NotificationContext } from "./notificationContext"

// Définition du type des props pour rubriqueComposeContextProvider
interface rubriqueComposeContextProviderProps {
    children: ReactNode // children doit être de type ReactNode
}

// Création du contexte
export const RubriqueComposeContext = createContext<any>(null) // Vous pouvez remplacer 'any' par le type spécifique que vous souhaitez utiliser

export function transformRubriquesComposeDTOToMyRubriquesCompose(
    rubriques: RubriqueComposeDTO[]

    
): RubriqueCompose[] {

    console.log(rubriques)
    
    return rubriques.map((rub) => {

        const {rubriqueQuestions } = rub
        
        console.log("queq", rubriqueQuestions)

        // Transformation de l'objet idRubrique
        const { id: idRubriqueId, designation, ordre } = rub
        

        // Transformation des questions
        const questions = rubriqueQuestions.map((question) => ({
            idQuestion: question.idQuestion.id,
            intitule: question.idQuestion.intitule,
            idQualificatif: question.idQuestion.idQualificatif.id,
            minimal: question.idQuestion.idQualificatif.minimal,
            maximal: question.idQuestion.idQualificatif.maximal,
            ordre: question.ordre,
        }))

        // Retourner un nouvel objet de type MyRubriqueCompose
        return {
            idRubrique: idRubriqueId || 0, // En utilisant 0 par défaut si idRubriqueId est null
            designation,
            ordre: ordre, // Conversion de l'ordre en string
            questions,
        }
    })
}

// Composant rubriqueComposeContextProvider
export const RubriqueComposeContextProvider: React.FC<
    rubriqueComposeContextProviderProps
> = ({ children }) => {
    const [rubriqueCompose, setRubriqueCompose] = useState({})

    const [rubriqueComposeList, setRubriqueComposeList] =
        useState<RubriqueCompose[]>()

    const [modifyRubrique, setModifyRubrique] = useState("")
    const [currentRubriqueCompose, setcurrentRubriqueCompose] =
        useState<RubriqueCompose>()
    const { showNotification } = useContext(NotificationContext)

    const updateModifyRubrique = useCallback((value: string) => {
        setModifyRubrique(value)
    }, [])
    const updateRubriqueComposeList = useCallback(
        (value: RubriqueCompose[]) => {
            setRubriqueComposeList(value)
        },
        []
    )

    const updateCurrentRubriqueCompose = useCallback(
        (value: RubriqueCompose) => {
            setcurrentRubriqueCompose(value)
        },
        []
    )

    const getList = useCallback(async () => {
        const response: ApiResponse = await getRequest(`/rubriqueQuestion/all`)
        if (!response.success) {
            showNotification("Erreur", response.message, "error")
            return
        }
        let list = response.data
        const newList = transformRubriquesComposeDTOToMyRubriquesCompose(
            list.data
        )
        updateRubriqueComposeList(newList)
    }, [updateRubriqueComposeList, showNotification])

    useEffect(() => {
        const getList = async() => {
            const response: ApiResponse = await getRequest(`/rubriqueQuestion/all`)
            if (!response.success) {
                showNotification("Erreur", response.message, "error")
                return
            }
            let list = response.data
            const newList = transformRubriquesComposeDTOToMyRubriquesCompose(
                list.data
            )
            updateRubriqueComposeList(newList)
        }
        getList()
    }, [showNotification, updateRubriqueComposeList])

    const addNewRubriqueCompose = useCallback(
        async (rubriqueCompose: CreateRubriqueCompose) => {
            const response: ApiResponse = await postRequest(
                `/rubriqueQuestion/AjouterRubriqueQuestion`,
                rubriqueCompose
            )
            if (!response.success) {
                showNotification("Erreur", response.message, "error")
                return
            }

            setRubriqueCompose({})
            showNotification("Génial !", response.message, "success")

            getList()
            return
        },
        [getList, showNotification]
    )

    const modifyRubriqueCompose = useCallback(
        async (
            id_rubriqueCompose: number,
            rubriqueCompose: RubriqueCompose
        ) => {
            const response: ApiResponse = await postRequest(
                `/rubriqueQuestion/UpdateRubriqueQuestions`,
                rubriqueCompose
            )
            if (!response.success) {
                showNotification("Erreur", response.message, "error")
                return
            }

            setRubriqueCompose({})
            showNotification("Génial !", response.message, "success")

            getList()
            return
        },
        [getList, showNotification]
    )

    const removeRubriqueCompose = useCallback(
        async (rubriqueCompose_id: number) => {
            const response: ApiResponse = await deleteRequest(
                `/rubriqueQuestion/deleteAll/${rubriqueCompose_id}`
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
        <RubriqueComposeContext.Provider
            value={{
                updateRubriqueComposeList,
                rubriqueComposeList,
                addNewRubriqueCompose,
                rubriqueCompose,
                updateCurrentRubriqueCompose,

                removeRubriqueCompose,

                modifyRubriqueCompose,
                getList,
                updateModifyRubrique,
                modifyRubrique,
                currentRubriqueCompose,
            }}
        >
            {children}
        </RubriqueComposeContext.Provider>
    )
}
