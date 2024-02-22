export interface Rubrique {
    id?: number;
    designation: string;
    type: string;
    ordre:number;
    noEnseignant ?: {
        id : number
    }
}

export interface RubriqueListResponse {
    message: string;
    data: Rubrique[];
    success: boolean;
}


