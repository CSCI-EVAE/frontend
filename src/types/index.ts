import { RubriqueEvaluation } from "./EvaluationTypes"

export interface ApiResponse {
    success: boolean
    message: string
    data: any
}
export interface LoginCredentials {
    username: string
    password: string
}
export interface AuthResponse {
    message: string
    data: {
        accessToken: string
        user: User
    }
    success: boolean
}

// export interface Etudiant {
//     noEtudiant: string
//     nom: string
//     prenom: string
//     sex:string
//     datenaissance:string
//     lieuNaissance?:string
//     nationalite?:string
//     telephone?:string
//     email?:string
//     emailUBO?:string
//     adress?:string
//     codePostale?:string
//     ville?:string
//     promotion?:string
// }

export interface User {
    id: number
    username: string
    email?: string
    nom?: string
    prenom?: string
    role: string
}
export interface Qualificatif {
    id?: number
    minimal: string
    maximal: string
}

export interface QualificatifListResponse {
    message: string
    data: Qualificatif[]
    success: boolean
}

export interface Enseignant {
    id?: number
    adresse: string
    cp: string
    encPersoEmail: string
    encPersoTel: string
    encUboEmail: string
    encUboTel: string
    intFonction: string
    intNoInsee: string
    intProfEmail: string
    intProfTel: string
    intSocAdresse: string
    intSocCp: string
    intSocNom: string
    intSocPays: string
    intSocVille: string
    nom: string
    pays: string
    prenom: string
    sexe: string
    telPort: string
    type: string
    ville: string
}

export interface QuestionBody {
    intitule: string
    type: string
    idQualificatif: {
        id: number
    }
    noEnseignant: {
        id: number
    }
}

export interface Question {
    id?: number
    intitule: string
    type: string
    idQualificatif: Qualificatif
    noEnseignant: Enseignant | null
    ordre?: number
}

export interface QuestionListResponse {
    message: string
    data: Question[]
    success: boolean
}
export interface Rubrique {
    id?: number
    designation: string
    type: string
    ordre: number
    noEnseignant?: {
        id: number
    }
}

export interface RubriqueListResponse {
    message: string
    data: Rubrique[]
    success: boolean
}

export interface RubriqueComposeDTO {
    id?: number
    designation: string
    type: string
    ordre: number
    rubriqueQuestions: {
        id: number
        ordre: number
        idQuestion: {
            id: number
            type: string
            intitule: string
            idQualificatif: {
                id: number
                minimal: string
                maximal: string
            }
        }
    }[] // Mise à jour du type de questionsOrdre
}
export interface RubriqueCompose {
    idRubrique: number
    designation: string
    ordre: number
    questions: questionsInRubrique[]
}
export interface questionsInRubrique {
    idQuestion: number
    intitule: string
    ordre: number
    idQualificatif: number
    minimal: string
    maximal: string
}

export interface RubriqueComposeListResponse {
    message: string
    data: RubriqueComposeDTO[]
    success: boolean
}
export interface IncomingRubriqueQuestionDTO {
    idRubrique: number
    questionIds: { [questionId: number]: number }
    ordre: number
}

export interface CreateRubriqueCompose {
    idRubrique: number
    questionIds: { [questionId: number]: number }
    ordre: number
}

export interface UE {
    evaluationId: number | null
    etat: string | null
    nomFormation: string
    codeFormation: string
    codeUe: string
    codeEc: string | null
    designation: string | null
    evaExiste: boolean
    debutReponse: string | null
    finReponse: string | null
    totaleHeures: number
    nbhCm: number
    nbhTd: number
    nbhTp: number
    anneePro: string | null
}

export interface UEListResponse {
    success: boolean
    message: string
    data: UE[]
}

export interface EtudiantDTO {
    noEtudiant: string
    nom: string
    prenom: string
    sexe: string
    dateNaissance: string
    lieuNaissance: string
    nationalite: string
    telephone: string
    mobile: string
    email: string
    emailUbo: string
    adresse: string
    codePostal: string
    ville: string
    paysOrigine: string
    universiteOrigine: string
    groupeTp: number
    groupeAnglais: number
    //promotion
    CodeFormation?: string
    anneeUniversitaire?: string
}

export interface Promotion {
    codeFormation: string
    anneeUniversitaire: string
    siglePromotion: string | null
    nbMaxEtudiant: number
    dateReponseLp: string | null
    dateReponseLalp: string | null
    dateRentree: string | null
    lieuRentree: string | null
    processusStage: string | null
    commentaire: string | null
}

export interface Evaluation {
    id: number
    codeFormation: string
    periode: string | null
    designation: string
    codeEC: string | null
    codeUE: string
    debutReponse: string
    finReponse: string
    RubriqueQuestion: RubriqueEvaluation[]
}

export interface UeToDisplay {
    codeUe: string
    nomEnseignant: string
    designation: string
    nbhCm: number
    nbhTd: number
    nbhTp: number
    totaleHeures: number
}
export interface reponseQuestions {
    id?: number
    idQuestionEvaluation: {
        id: number
        idQualificatif?: {
            id: number
            minimal: string
            maximal: string
        }
        intitule?: string
    }
    positionnement: number
}

export interface ReponseEvaluation {
    idEvaluation: number

    commentaire: string
    nom: string
    prenom: string
    reponseQuestions: reponseQuestions[]
}

export interface DefaultValue {
    [id: number]: number // Déclare un objet avec des clés de type number et des valeurs de type number
}

export interface ConsulterReponse {
    rubrique: {
        designation: string
        question: {
            intitule: string
            minimal: string
            maximal: string
        }[]
    }
}
