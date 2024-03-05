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

export interface CreateRubriqueCompose {
    idRubrique: number
    questionIds: number[]
    ordre: number
}

export interface UE {
    evaluationId: number | null
    etat: string | null
    anneeUniversitaire: string
    nomFormation: string
    codeUe: string
    codeEc: string | null
    designation: string | null
    evaExiste: boolean
    debutReponse: Date | null
    finReponse: Date | null
}

export interface UEListResponse {
    success: boolean
    message: string
    data: UE[]
}
