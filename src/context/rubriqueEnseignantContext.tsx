import React, {
    createContext,
    ReactNode,
    useCallback,
    useState,
} from "react";
import { questionsInRubrique, RubriqueCompose } from "../types/rubriquesComposeTypes ";
import { Question } from "../types/questionTypes";
import { Qualificatif } from "../types/qualificatifTypes";
import { TYPE_STANDARD } from "../constants";

export function convertirQuestionsInRubriqueEnQuestions(questionsInRubriqueArray: questionsInRubrique[]): Question[] {
    const questionsArray: Question[] = [];

    questionsInRubriqueArray.forEach((questionInRubrique: questionsInRubrique) => {
        const { idQuestion, intitule, idQualificatif, minimal, maximal } = questionInRubrique;

        const idQualificatifObj: Qualificatif= {
            id: idQualificatif,
            minimal,
            maximal
        };

        const question: Question = {
            id: idQuestion,
            intitule,
            type: TYPE_STANDARD.question_standard, // Vous devez définir le type selon vos besoins
            idQualificatif: idQualificatifObj,
            noEnseignant: null
        };

        questionsArray.push(question);
    });

    return questionsArray;
}
export function convertirQuestionsEnQuestionsInRubrique(questions: Question[]): questionsInRubrique[] {
    const questionsInRubriqueArray: questionsInRubrique[] = [];

    questions.forEach((question: Question) => {
        const { id, intitule, idQualificatif } = question;
        const { minimal, maximal } = idQualificatif;

        const questionInRubrique: questionsInRubrique = {
            idQuestion: id || 0,
            intitule,
            ordre: 0, // Vous devez définir l'ordre selon vos besoins
            idQualificatif: idQualificatif.id || 0,
            minimal,
            maximal
        };

        questionsInRubriqueArray.push(questionInRubrique);
    });

    return questionsInRubriqueArray;
}
export function elementsNonSelectionnees(liste1: any[], liste2 : any[]) {
    // Utilisation de la méthode filter pour filtrer les éléments de liste2
    // qui ne sont pas présents dans liste1
    console.log("liste1", liste1);
    console.log("liste2", liste2);
    const elementsNonContenus = liste2.filter(element => !liste1.includes(element));

    return elementsNonContenus;
}
// Définition du type des props pour rubriqueContextProvider
interface rubriqueContextProviderProps {
    children: ReactNode; // children doit être de type ReactNode
}

// Création du contexte
export const RubriqueEnseignantContext = createContext<any>(null); // Vous pouvez remplacer 'any' par le type spécifique que vous souhaitez utiliser

export function findRubriqueByDesignation(rubriques: RubriqueCompose[], designation: string): RubriqueCompose | undefined {
    // Parcourir la liste de rubriques
    for (const rubrique of rubriques) {
        // Vérifier si la désignation correspond à celle fournie en entrée
        if (rubrique.designation === designation) {
            // Retourner l'objet de la liste de rubriques correspondant
            return rubrique;
        }
    }

    // Si aucune rubrique ne correspond à la désignation, retourner undefined
    return undefined;
}






// Composant rubriqueContextProvider
export const RubriqueEnseignantContextProvider: React.FC<
    rubriqueContextProviderProps
> = ({ children }) => {

    
    
    const [rubriqueAdded,setRubriqueAdded] = useState<RubriqueCompose []>([]);
    const [rubriqueSelectedEns,setRubriqueSelectedEns] = useState<RubriqueCompose >();
    

  
    const updateRubriqueSelectedEns = useCallback((value: RubriqueCompose ) => {
        setRubriqueSelectedEns(value);
    }, []);
    const updateRubriqueAdded = useCallback((value: RubriqueCompose ) => {
        setRubriqueAdded([...rubriqueAdded, value] );
    }, [rubriqueAdded]);
    const updateRubriqueAddedByList = useCallback((value: RubriqueCompose[] ) => {
        setRubriqueAdded(value );
    }, []);

    

  

 



  

    return (
        <RubriqueEnseignantContext.Provider
            value={{
             
                rubriqueSelectedEns,
                updateRubriqueSelectedEns,
                updateRubriqueAdded,
                rubriqueAdded,
                updateRubriqueAddedByList
                
            }}
        >
            {children}
        </RubriqueEnseignantContext.Provider>
    );
};
