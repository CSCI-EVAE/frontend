
export interface RubriqueComposeDTO {
    idRubrique: {
        id?: number;
        designation: string;
        ordre: number;
        type: string;
    };
    questionsOrdre: {
        id: number;
        ordre: number;
        idQuestion: {
            id: number;
            type: string;
            intitule: string;
            idQualificatif: {
                id: number;
                minimal: string;
                maximal: string;
            };
        };
        
    }[]; // Mise à jour du type de questionsOrdre
}
export interface RubriqueCompose {
    idRubrique: number;
    designation :string;
    ordre : number;
    questions: questionsInRubrique[];
}
export interface questionsInRubrique {
    idQuestion: number;
    intitule: string;
    ordre : number;
    idQualificatif: number;
    minimal: string;
    maximal: string;
}


export function transformRubriquesComposeDTOToMyRubriquesCompose(rubriques: RubriqueComposeDTO[]): RubriqueCompose[] {
    return rubriques.map(rubrique => {
        const { idRubrique, questionsOrdre } = rubrique;

        // Transformation de l'objet idRubrique
        const { id: idRubriqueId, designation, ordre } = idRubrique;

        // Transformation des questions
        const questions = questionsOrdre.map(question => ({
            idQuestion: question.idQuestion.id,
            intitule: question.idQuestion.intitule,
            idQualificatif: question.idQuestion.idQualificatif.id,
            minimal: question.idQuestion.idQualificatif.minimal,
            maximal: question.idQuestion.idQualificatif.maximal,
            ordre : question.ordre
        }));

        // Retourner un nouvel objet de type MyRubriqueCompose
        return {
            idRubrique: idRubriqueId || 0, // En utilisant 0 par défaut si idRubriqueId est null
            designation,
            ordre: ordre, // Conversion de l'ordre en string
            questions
        };
    });
}
export interface RubriqueComposeListResponse {
    message: string;
    data: RubriqueComposeDTO[];
    success: boolean;
}

export interface CreateRubriqueCompose {
    idRubrique : number;
    questionIds : number  [];
    ordre : number
}