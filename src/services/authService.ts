import axios from "axios";
import { LoginCredentials, AuthResponse } from "../types/authTypes";

const API_URL = "http://localhost:8080/api/v1";

export const login = async (
    credentials: LoginCredentials
): Promise<AuthResponse> => {
    try {
        const response = await axios.post<AuthResponse>(
            `${API_URL}/login`,
            credentials
        );
        // log the response to the console
        console.log("Login response:", response.data);
        const token = response.data.data.accessToken;
        localStorage.setItem("jwtToken", token);
        localStorage.setItem("user", JSON.stringify(response.data.data.user));
            
        return response.data;
    } catch (error) {
        console.error("Login failed:", error);
        throw error;
    }
};
