import { Enseignant } from "."

export interface Qualificatif {
    id: number
    maximal: string
    minimal: string
}

export interface Question {
    id: number
    type: string
    noEnseignant: number | null
    idQualificatif: Qualificatif
    intitule: string
}

export interface Rubrique {
    id: number
    type: string
    designation: string | null
    ordre: number
    questionEvaluations: QuestionEvaluation[] | null
}
export interface QuestionEvaluation {
    moyen: any
    id: number
    intitule: string | null
    idQuestion: Question
    ordre: number
    positionnement?: number
}

export interface RubriqueEvaluation {
    id: number
    designation: string | null
    idRubrique: Rubrique
    ordre: number
    questionEvaluations: QuestionEvaluation[] | null
}

export interface Evaluation {
    id?: number
    idEvaluationId?: number
    designation: string
    debutReponse: string
    finReponse: string
    etat: string
    periode: string | null
    anneUniv: string
    noEvaluation: string
    nomEnseignant?: string
    prenomEnseignant?: string
    rubriqueEvaluations: RubriqueEvaluation[]
}

export interface EvaluationResponse {
    success: boolean
    message: string
    data: Evaluation
}

export interface ElementConstitutif {
    codeFormation: string
    codeUe: string
    codeEc: string | null
}
export interface Promotion {
    anneeUniversitaire: string
    codeFormation: string
}

export interface CreateEvaluation {
    id: number
    noEnseignant: Enseignant
    elementConstitutif: ElementConstitutif
    promotion: Promotion
    noEvaluation: number
    designation: string
    etat: string
    periode: string
    debutReponse: Date
    finReponse: Date
    rubriqueEvaluations: RubriqueEvaluation[]
    nbEtuRepondu?: number
}
