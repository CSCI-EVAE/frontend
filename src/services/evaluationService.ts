import axios from "axios";
import { EvaluationResponse } from "../types/EvaluationTypes";

const API_URL = "http://localhost:8080/api/v1/evaluation";
//const token = userInfos().token;
//const token = getToken();
const token = localStorage.getItem("jwtToken");

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});

export const getEvaluationDetails = async (evaluationId: number) => {
    try {
        const response = await axiosInstance.get<EvaluationResponse>(
            `${API_URL}/details/${evaluationId}`
        );
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Fetching evaluation details failed:", error);
        throw error;
    }
};

export const soumettreEvaluation = async (
  evaluationId: number,
) => {
  try {
      const response = await axiosInstance.put<EvaluationResponse>(
          `${API_URL}/soumettre/${evaluationId}`
      );
      // log the response to the console
      console.log("Evaluation response:", response);

      if (response.status === 400) {
          return true;
      }
      return response.data;
  } catch (error) {
      console.error("Evaluation failed:", error);
      return false;
  }
};