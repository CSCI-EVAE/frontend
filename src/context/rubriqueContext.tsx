import React, {
    createContext,
    ReactNode,
    useCallback,
    useEffect,
    useState,
} from "react";
import { Rubrique } from "../types/rubriquesTypes";
import {
    addRubrique,
    deleteRubrique,
    getRubriqueList,
    updateRubrique,
} from "../services/rubriqueService";

// Définition du type des props pour rubriqueContextProvider
interface rubriqueContextProviderProps {
    children: ReactNode; // children doit être de type ReactNode
}



// Création du contexte
export const RubriqueContext = createContext<any>(null); // Vous pouvez remplacer 'any' par le type spécifique que vous souhaitez utiliser

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
        );

        // Si le rubrique est trouvé, retourne son ID
        if (rubriqueTrouve ) {
            return rubriqueTrouve;
        } else {
            return null; // Retourne null si le rubrique n'est pas trouvé ou s'il n'a pas d'ID
        }
    } else {
        return null; // Retourne null si les données d'entrée sont invalides ou manquantes
    }
}

export function supprimerColonnesId(rubriqueList: Rubrique[]): any[] {
    // Vérifier si rubriqueList et qualficatifList.qualficatifList sont définis
    if (rubriqueList) {
        // Mappez chaque élément en retirant la colonne id
        return rubriqueList.map((rubrique: Rubrique) => {
            const { id, noEnseignant,type, ...rest } = rubrique;
            return rest;
        });
    } else {
        return []; // Retourne un tableau vide si les données d'entrée sont invalides ou manquantes
    }
}

export function getMaxOrdre(liste: Rubrique[]): number {
    if (liste.length === 0) {
        return 0; // Retourne 0 si la liste est vide
    }

    let maxOrdre = liste[0].ordre; // Initialise le maximum avec le premier élément de la liste

    for (let i = 1; i < liste.length; i++) {
        if (liste[i].ordre > maxOrdre) {
            maxOrdre = liste[i].ordre; // Met à jour le maximum si un élément a un ordre plus grand
        }
    }

    return maxOrdre;
}

export function trierParOrdre(liste: Rubrique[]): Rubrique[] {
    // Utilise Array.sort() pour trier la liste en fonction de la propriété 'ordre'
    return liste.sort((a, b) => a.ordre - b.ordre);
}

// Composant rubriqueContextProvider
export const RubriqueContextProvider: React.FC<
    rubriqueContextProviderProps
> = ({ children }) => {
    const [rubrique, setRubrique] = useState({});
    const [rubriqueList, setRubriqueList] = useState<Rubrique[]>();
    const [rubriqueListError, setRubriqueListError] = useState("");
    const [addRubriqueError, setAddRubriqueError] = useState("");
    const [deleteRubriqueError, setDeleteRubriqueError] = useState("");
    const [modifyRubriqueError, setModifyRubriqueError] = useState("");

    const updateRubriqueList = useCallback((value: Rubrique[]) => {
        setRubriqueList(value);
    }, []);

    const updateCurrentRubrique= useCallback((value: {}) => {
        setRubrique(value);
    }, []);
    const getList = useCallback(async () => {
        let list = await getRubriqueList();
        if (list) {
            setRubriqueListError("");
            updateRubriqueList(list.data);
        } else {
            setRubriqueListError("Une erreur de chargement est survenue");
        }
    }, [updateRubriqueList]);

    useEffect(() => {
        getList();
    }, [getList]);

    const addNewRubrique = useCallback(
        async (rubrique: Rubrique) => {
            const response = await addRubrique(rubrique);
            if (response) {
                setRubrique({});
                setAddRubriqueError("");
                getList();
                return;
            } else {
                setAddRubriqueError("Erreur à lAjout");
            }
        },
        [getList]
    );

    const modifyRubrique = useCallback(
        async (id_rubrique: number, rubrique: Rubrique) => {
            const response = await updateRubrique(
                id_rubrique,
                rubrique
            );
            if (response) {
                setRubrique({});
                
                setModifyRubriqueError("");
                getList();
                return;
            } else {
                setModifyRubriqueError("Erreur à la modification");
            }
        },
        [getList]
    );

    const removeRubrique = useCallback(async (rubrique_id: number) => {
        const response = await deleteRubrique(rubrique_id);
        if (response) {
            setDeleteRubriqueError("");
            getList();
            return;
        } else {
            setDeleteRubriqueError("Erreur lors de  la suppression");
        }
    }, [getList]);

  

    return (
        <RubriqueContext.Provider
            value={{
                updateRubriqueList,
                rubriqueList,
                addNewRubrique,
                rubrique,
                updateCurrentRubrique,
                rubriqueListError,
                addRubriqueError,
                removeRubrique,
                deleteRubriqueError,
                modifyRubriqueError,
                modifyRubrique,
                getList,
            }}
        >
            {children}
        </RubriqueContext.Provider>
    );
};
