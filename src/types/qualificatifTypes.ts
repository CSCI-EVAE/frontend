export interface Qualificatif {
    id?: number;
    minimal: string;
    maximal: string;
}

export interface QualificatifListResponse {
    message: string;
    data: Qualificatif[];
    success: boolean;
}
