import axios from "axios";

import { Rubrique, RubriqueListResponse } from "../types/rubriquesTypes";
const API_URL = "http://localhost:8080/api/v1";

const token = localStorage.getItem("jwtToken");
const axiosInstance = axios.create({
    //baseURL: 'https://votre-api.com',
    headers: {
        "Content-Type": "application/json",

        Authorization: `Bearer ${token}`,
    },
});

export const getRubriqueList = async () => {
    try {
        const response = await axiosInstance.get<RubriqueListResponse>(
            `${API_URL}/rubrique/all`
        );

        return response.data;
    } catch (error) {
        console.error("rubrique list failed:", error);
        //throw error;
    }
};

export const addRubrique = async (rubrique: Rubrique) => {
    try {
        const response = await axiosInstance.post<Rubrique>(
            `${API_URL}/rubrique/create`,
            rubrique
        );

        return response.data;
    } catch (error) {
        console.error("rubrique failed:", error);
        //throw error;
    }
};
export const deleteRubrique = async (id_rubrique: number) => {
    try {
        const response = await axiosInstance.delete<Rubrique>(
            `${API_URL}/rubrique/${id_rubrique}`
        );

        if (response.status === 400) {
            return true;
        }
        return response.data;
    } catch (error) {
        console.error("rubrique failed:", error);
        return false;
    }
};

export const updateRubrique = async (
    id_rubrique: number,
    rubrique: Rubrique
) => {
    try {
        const response = await axiosInstance.put<Rubrique>(
            `${API_URL}/rubrique/${id_rubrique}`,
            rubrique
        );
        // log the response to the console
        console.log("rubrique response:", response);

        if (response.status === 400) {
            return true;
        }
        console.log(response.data)
        return response.data;
        
    } catch (error) {
        console.error("rubrique failed:", error);
        return false;
    }
};
