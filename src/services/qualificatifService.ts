import axios from "axios";
import {
    Qualificatif,
    QualificatifListResponse,
} from "../types/qualificatifTypes";
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

export const getQualificatifList = async () => {
    try {
        const response = await axiosInstance.get<QualificatifListResponse>(
            `${API_URL}/qualificatif`
        );

        return response.data;
    } catch (error) {
        console.error("qualificatif list failed:", error);
        //throw error;
    }
};

export const addQualificatif = async (qualificatif: Qualificatif) => {
    try {
        const response = await axiosInstance.post<Qualificatif>(
            `${API_URL}/qualificatif`,
            qualificatif
        );

        return response.data;
    } catch (error) {
        console.error("qualificatif failed:", error);
        //throw error;
    }
};
export const deleteQualificatif = async (id_qualificatif: number) => {
    try {
        const response = await axiosInstance.delete<Qualificatif>(
            `${API_URL}/qualificatif/${id_qualificatif}`
        );

        if (response.status === 400) {
            return true;
        }
        
        return response.data;
    } catch (error) {
        console.error("qualificatif failed:", error);
        return false;
    }
};

export const updateQualificatif = async (
    id_qualificatif: number,
    qualificatif: Qualificatif
) => {
    try {
        const response = await axiosInstance.put<Qualificatif>(
            `${API_URL}/qualificatif/${id_qualificatif}`,
            qualificatif
        );
        // log the response to the console
        console.log("qualificatif response:", response);

        if (response.status === 400) {
            return true;
        }
        return response.data;
    } catch (error) {
        console.error("qualificatif failed:", error);
        return false;
    }
};
