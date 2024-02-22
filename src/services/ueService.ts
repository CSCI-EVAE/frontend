import axios from "axios";
import { UEListResponse } from "../types/UeTypes";

const API_URL = "http://localhost:8080/api/v1/enseignant/ue";
//const token = userInfos().token;
const token = localStorage.getItem("jwtToken");


const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});

export const getUEList = async () => {
    try {
        const response = await axiosInstance.get<UEListResponse>(
            `${API_URL}/all`
        );
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("ue list failed:", error);
      
    }
};



