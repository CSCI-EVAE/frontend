
export interface Evaluation {
    id: number;
    codeFormation: string;
    anneeUniversitaire: string;
    nomEnseignant: string;
    noEvaluation: number;
    designation: string;
    etat: string;
    periode?: string;
    debutReponse: string; 
    finReponse: string; 
}


export interface EvaluationListResponse {
    message: string;
    data: Evaluation[];
    success: boolean;
}
