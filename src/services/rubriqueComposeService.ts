import axios from "axios";

import { RubriqueCompose,  RubriqueComposeListResponse, CreateRubriqueCompose } from "../types/rubriquesComposeTypes ";
const API_URL = "http://localhost:8080/api/v1";
//const token = userInfos().token;
//const token = getToken();
const token = localStorage.getItem("jwtToken");

const axiosInstance = axios.create({
    //baseURL: 'https://votre-api.com',
    headers: {
        "Content-Type": "application/json",

        Authorization: `Bearer ${token}`,
    },
});

export const getRubriqueComposeList = async () => {
    try {
        const response = await axiosInstance.get<RubriqueComposeListResponse>(
            `${API_URL}/rubriqueQuestion/all`
        );
//console.log("data", response.data.data)
        return response.data;

    } catch (error) {
        //console.error("rubriqueCompose list failed:", error);
        //throw error;
    }
};

export const addRubriqueCompose = async (rubriqueCompose: CreateRubriqueCompose) => {
    try {
        const response = await axiosInstance.post(
            `${API_URL}/rubriqueQuestion/AjouterRubriqueQuestion`,
            rubriqueCompose
        );

        return response.data;
    } catch (error) {
        console.error("rubriqueCompose failed:", error);
        //throw error;
    }
};
export const deleteRubriqueCompose = async (id_rubriqueCompose: number) => {
    try {
        const response = await axiosInstance.delete<RubriqueCompose>(
            `${API_URL}/rubriqueQuestion/deleteAll/${id_rubriqueCompose}`
        );

        if (response.status === 400) {
            return true;
        }
        return response.data;
    } catch (error) {
        console.error("rubriqueCompose failed:", error);
        return false;
    }
};

export const updateRubriqueCompose = async (
    id_rubriqueCompose: number,
    rubriqueCompose: RubriqueCompose
) => {
    try {
        const response = await axiosInstance.post<RubriqueCompose>(
            `${API_URL}/rubriqueQuestion/UpdateRubriqueQuestions`,
            rubriqueCompose
        );
        // log the response to the console
        console.log("rubriqueCompose response:", response);

        if (response.status === 400) {
            return true;
        }
        console.log(response.data)
        return response.data;
        
    } catch (error) {
        console.error("rubriqueCompose failed:", error);
        return false;
    }
};
