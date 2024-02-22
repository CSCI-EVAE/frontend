import React, {
    createContext,
    ReactNode,
    useCallback,
    useEffect,
    useState,
} from "react";
import { Qualificatif } from "../types/qualificatifTypes";
import {
    addQualificatif,
    deleteQualificatif,
    getQualificatifList,
    updateQualificatif,
} from "../services/qualificatifService";

// Définition du type des props pour qualificatifContextProvider
interface qualificatifContextProviderProps {
    children: ReactNode; // children doit être de type ReactNode
}

// Création du contexte
export const QualificatifContext = createContext<any>(null); // Vous pouvez remplacer 'any' par le type spécifique que vous souhaitez utiliser

export function trouverIdQualificatif(
    qualificatif: Qualificatif,
    qualificatifListe: Qualificatif[]
): number | null {
    if (qualificatif && qualificatifListe) {
        console.log("troub");
        // Recherche du qualificatif dans la liste
        const qualificatifTrouve = qualificatifListe.find(
            (item) =>
                item.minimal === qualificatif.minimal &&
                item.maximal === qualificatif.maximal
        );
        console.log("trouveeeeeeeeeeeeee", qualificatifTrouve);

        // Si le qualificatif est trouvé, retourne son ID
        if (qualificatifTrouve && qualificatifTrouve.id !== undefined) {
            return qualificatifTrouve.id;
        } else {
            return null; // Retourne null si le qualificatif n'est pas trouvé ou s'il n'a pas d'ID
        }
    } else {
        return null; // Retourne null si les données d'entrée sont invalides ou manquantes
    }
}

export function supprimerColonnesId(qualificatifList: Qualificatif[]): any[] {
    // Vérifier si qualificatifList et qualficatifList.qualficatifList sont définis
    if (qualificatifList) {
        // Mappez chaque élément en retirant la colonne id
        return qualificatifList.map((qualificatif: Qualificatif) => {
            const { id, ...rest } = qualificatif;
            return rest;
        });
    } else {
        return []; // Retourne un tableau vide si les données d'entrée sont invalides ou manquantes
    }
}

// Composant qualificatifContextProvider
export const QualificatifContextProvider: React.FC<
    qualificatifContextProviderProps
> = ({ children }) => {
    const [qualificatifMinimal, setQualificatifMinimal] = useState("");
    const [qualificatifMaximal, setQualificatifMaximal] = useState("");
    const [qualificatifList, setQualificatifList] = useState<Qualificatif[]>();
    const [qualificatifListError, setQualificatifListError] = useState("");
    const [addQualificatifError, setAddQualificatifError] = useState("");
    const [deleteQualificatifError, setDeleteQualificatifError] = useState("");
    const [modifyQualificatifError, setModifyQualificatifError] = useState("");

    const updateQualificatifList = useCallback((value: Qualificatif[]) => {
        setQualificatifList(value);
    }, []);

    const updateQualificatifMaximal = useCallback((value: string) => {
        setQualificatifMaximal(value);
    }, []);

    const updateQualificatifMinimal = useCallback((value: string) => {
        setQualificatifMinimal(value);
    }, []);
    const getList = useCallback(async () => {
        let list = await getQualificatifList();
        if (list) {
            setQualificatifListError("");
            updateQualificatifList(list.data);
        } else {
            setQualificatifListError("Une erreur de chargement est survenue");
        }
    }, [updateQualificatifList]);
    useEffect(() => {
        getList();
    }, [getList]);
    const addNewQualificatif = useCallback(
        async (qualificatif: Qualificatif) => {
            const response = await addQualificatif(qualificatif);
            if (response) {
                setQualificatifMinimal("");
                setQualificatifMaximal("");
                setAddQualificatifError("");
                getList();
                return;
            } else {
                setAddQualificatifError("Erreur à lAjout");

            }
        },
        [getList]
    );

    const modifyQualificatif = useCallback(
        async (id_qualificatif: number, qualificatif: Qualificatif) => {
            const response = await updateQualificatif(
                id_qualificatif,
                qualificatif
            );
            if (response) {
                setQualificatifMinimal("");
                setQualificatifMaximal("");
                setModifyQualificatifError("");
                getList();
                return;
            } else {
                setModifyQualificatifError("Erreur à la modification");
            }
        },
        [getList]
    );

    const removeQualificatif = useCallback(async (qualificatif_id: number) => {
        const response = await deleteQualificatif(qualificatif_id);
        if (response) {
            
            setDeleteQualificatifError("");
            getList();
            return;
        } else {
            setDeleteQualificatifError("Erreur lors de  la suppression");
        }
    }, [getList]);

  

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
                qualificatifListError,
                addQualificatifError,
                removeQualificatif,
                deleteQualificatifError,
                modifyQualificatifError,
                modifyQualificatif,
            }}
        >
            {children}
        </QualificatifContext.Provider>
    );
};
