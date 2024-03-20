export interface Evaluation {
    id: number
    // codeFormation: string
    // anneeUniversitaire: string
    nomEnseignant?: string
    prenomEnseignant?: string
    nomPrenomEns?: string
    noEvaluation: number
    designation: string
    etat: string
    periode?: string
    debutReponse: string
    finReponse: string
    evaRepondu?: boolean
    newEtat?: string
}

export interface EvaluationListResponse {
    message: string
    data: Evaluation[]
    success: boolean
}
