import React, {
    createContext,
    ReactNode,
    useCallback,
    useEffect,
    useState,
} from "react";
import { Question, QuestionBody } from "../types/questionTypes";
import {
    addQuestion,
    deleteQuestion,
    getQuestionsList,
    updateQuestion,
} from "../services/questionService";
import { Qualificatif } from "../types/qualificatifTypes";

// Définition du type des props pour questionContextProvider
interface questionContextProviderProps {
    children: ReactNode; // children doit être de type ReactNode
}

// Création du contexte
export const QuestionContext = createContext<any>(null); // Vous pouvez remplacer 'any' par le type spécifique que vous souhaitez utiliser

export function trouverIdQuestion(
    question: Question,
    questionListe: Question[]
): number | null {
    //console.log("this si a question"+question.intitule);
    if (question && questionListe) {
       
        const questionTrouve = questionListe.find(
            (item) =>
                item.intitule === question.intitule 
              
        );

        if (questionTrouve && questionTrouve.id !== undefined) {
            return questionTrouve.id;
        } else {
            return null; // Retourne null si le question n'est pas trouvé ou s'il n'a pas d'ID
        }
    } else {
        return null; // Retourne null si les données d'entrée sont invalides ou manquantes
    }
}

// export function trouverIntitule(
//     question: Question,
//     questionListe: Question[]
// ): { intitule: string | null } | null {
//     if (question && questionListe) {
//         const intituleTrouve = questionListe.find(
//             (item) =>
//                 item.intitule === question.intitule 
//         );

//         if (intituleTrouve) {
//             return {
//                 intitule: intituleTrouve.intitule,
//             };
//         } else {
//             return { intitule: null }; // Retourne un objet avec intitule à null si aucun intitule n'est trouvé
//         }
//     } else {
//         return null; // Retourne null si les données d'entrée sont invalides ou manquantes
//     }
// }

// export function trouverQualificatif(
//     question: Question,
//     questionListe: Question[]
// ): { intitule: string; idQualificatif: any } | null {
//     if (question && questionListe) {
//         const questionTrouve = questionListe.find(
//             (item) =>
//                 item.intitule === question.intitule &&
//                 item.idQualificatif === question.idQualificatif
//         );

//         if (questionTrouve) {
//             return {
//                 intitule: questionTrouve.intitule,
//                 idQualificatif: questionTrouve.idQualificatif,
//             };
//         } else {
//             return null; // Retourne null si la question n'est pas trouvée
//         }
//     } else {
//         return null; // Retourne null si les données d'entrée sont invalides ou manquantes
//     }
// }

export function chargementCoupleQualificatif (qualificatifList : Qualificatif[], questionList : Question[]){
    if (qualificatifList && questionList){
        
    }
}

export function supprimerColonnesId(questionListe: Question[]): any[] {
    // Vérifier si questionList et questionList.questionList sont définis
    if (questionListe) {
        // Mappez chaque élément en retirant la colonne id
        return questionListe.map((question: Question) => {
            const { id, type,noEnseignant,idQualificatif, ...rest } = question;
            
            
            return {...rest, minimal : idQualificatif.minimal, maximal : idQualificatif.maximal};
        });
    } else {
        return []; // Retourne un tableau vide si les données d'entrée sont invalides ou manquantes
    }
}

// Composant questionContextProvider
export const QuestionContextProvider: React.FC<
questionContextProviderProps
> = ({ children }) => {
    const [questionintitule, setQuestionintitule] = useState("");
    const [questionListe, setQuestionListe] = useState<Question[]>();
    const [questionListError, setQuestionListError] = useState("");
    const [addQuestionError, setAddQuestionError] = useState("");
    const [deleteQuestionError, setDeleteQuestionError] = useState("");
    const [modifyQuestionError, setModifyQuestionError] = useState("");
    const [coupleQualificatif , setCoupleQualificatif] = useState<Qualificatif>();


    const updateQuestionList = useCallback((value: Question[]) => {
        setQuestionListe(value);
    }, []);

    const updateCoupleQualificatif = useCallback((value: any) => {
         setCoupleQualificatif(value);
    }, []);


    const updateQuestionintitule = useCallback((value: string) => {
        setQuestionintitule(value);
    }, []);
    

    const getList = useCallback(async () => {
        let list = await getQuestionsList();
        if (list) {
            setQuestionListError("");
            updateQuestionList(list.data);
        } else {
            setQuestionListError("Une erreur de chargement est survenue");
        }
    }, [updateQuestionList]);
    useEffect(() => {
        getList();
    }, [getList]);

    
    const addNewQuestion = useCallback(
        async (questionbody: QuestionBody) => {
            
            const response = await addQuestion(questionbody);
            //console.log("qqqqqqqqqqqqs"+response);
            if (response) {
               // console.log("thiiiiiiiis"+response);
               
                setQuestionintitule("");
                setAddQuestionError("");
                getList();
                return;
            } else {
               // console.log("nooooooo");
                setAddQuestionError("Erreur à lAjout");
            }
        },
        [getList]
    );
  
    const modifyQuestion = useCallback(
        async (id_question: number, questionbody: QuestionBody) => {
            const response = await updateQuestion(
                id_question,
                questionbody
            );
            if (response) {
                setQuestionintitule("");
                setModifyQuestionError("");
                getList();
                return;
            } else {
                setModifyQuestionError("Erreur à la modification");
            }
        },
        [getList]
    );

    const removeQuestion = useCallback(async (question_id: number) => {
        const response = await deleteQuestion(question_id);
        if (response) {
            setDeleteQuestionError("");
            getList();
            return;
        } else {
            setDeleteQuestionError("Erreur lors de  la suppression");
        }
    }, [getList]);

  

    return (
        <QuestionContext.Provider
            value={{
                updateQuestionList,
                questionListe,
                addNewQuestion,
                questionintitule,
                updateQuestionintitule,
                questionListError,
                addQuestionError,
                removeQuestion,
                deleteQuestionError,
                modifyQuestionError,
                modifyQuestion,
                updateCoupleQualificatif,
                coupleQualificatif
            }}
        >
            {children}
        </QuestionContext.Provider>
    );
};
