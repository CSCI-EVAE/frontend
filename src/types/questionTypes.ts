import { Qualificatif } from "./qualificatifTypes";

export interface Enseignant {
    id?: number;
    adresse: string;
    cp: string;
    encPersoEmail: string;
    encPersoTel: string;
    encUboEmail: string;
    encUboTel: string;
    intFonction: string;
    intNoInsee: string;
    intProfEmail: string;
    intProfTel: string;
    intSocAdresse: string;
    intSocCp: string;
    intSocNom: string;
    intSocPays: string;
    intSocVille: string;
    nom: string;
    pays: string;
    prenom: string;
    sexe: string;
    telPort: string;
    type: string;
    ville: string;
}

export interface QuestionBody {
   
    intitule: string;
    type: string;
    idQualificatif: {
        id: number;
    };
    noEnseignant: {
        id: number;
    };
}




export interface Question {
    id?: number;
    intitule: string;
    type: string;
    idQualificatif: Qualificatif;
    noEnseignant: Enseignant |null;
}

export interface QuestionListResponse {
    message: string;
    data: Question[];
    success: boolean;
}
