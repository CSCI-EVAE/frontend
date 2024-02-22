export interface UE {
  evaluationId: number | null;
  etat: string | null;
  anneeUniversitaire: string;
  nomFormation: string;
  codeUe: string;
  codeEc: string | null;
  designation: string | null;
  evaExiste: boolean;
  debutReponse: Date | null;
  finReponse: Date | null;
}

export interface UEListResponse {
  success: boolean;
  message: string;
  data: UE[];
}



  