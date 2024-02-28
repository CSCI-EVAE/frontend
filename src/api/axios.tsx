import axios, { AxiosInstance, AxiosResponse } from "axios"
import { ApiResponse } from "../types"
import { API_URL } from "../constants"

const createAxiosInstance = (token: string | null): AxiosInstance => {
    if (token) {
        return axios.create({
            baseURL: API_URL,
            headers: {
                "Content-Type": "application/json",
                // Ajoutez ici les en-têtes communs à toutes les requêtes
                // Par exemple, les tokens d'authentification
                Authorization: `Bearer ${token}`,
            },
        })
    } else {
        return axios.create({
            baseURL: API_URL,
            headers: {
                "Content-Type": "application/json",
                // Ajoutez ici les en-têtes communs à toutes les requêtes
                // Par exemple, les tokens d'authentification
                //'Authorization': `Bearer ${token}`
            },
        })
    }
}

export const postRequest = async (
    url: string,
    body: any
): Promise<ApiResponse> => {
    try {
        const token = localStorage.getItem("jwtToken")
        const axiosInstance: AxiosInstance = createAxiosInstance(token)

        const response: AxiosResponse = await axiosInstance.post(url, body)
        const successMessage = response.data.message
        return { success: true, message: successMessage, data: response.data }
    } catch (error: any) {
        if (error.response) {
            // Le serveur a répondu avec un statut d'erreur
            const errorMessage = error.response.data.message // Récupère le message d'erreur renvoyé par le backend
            return { success: false, message: errorMessage, data: null }
        } else {
            // Une erreur s'est produite lors de l'envoi de la requête
            return {
                success: false,
                message: "Une erreur s'est produite lors de la requête.",
                data: null,
            }
        }
    }
}

export const getRequest = async (url: string): Promise<any> => {
    try {
        const token = localStorage.getItem("jwtToken")
        const axiosInstance: AxiosInstance = createAxiosInstance(token)

        const response: AxiosResponse = await axiosInstance.get(url)
        const successMessage = response.data.message
        return { success: true, message: successMessage, data: response.data }
    } catch (error: any) {
        if (error.response) {
            // Le serveur a répondu avec un statut d'erreur
            const errorMessage = error.response.data.message // Récupère le message d'erreur renvoyé par le backend
            return { success: false, message: errorMessage, data: null }
        } else {
            // Une erreur s'est produite lors de l'envoi de la requête
            return {
                success: false,
                message: "Une erreur s'est produite lors de la requête.",
                data: null,
            }
        }
    }
}

export const putRequest = async (url: string, body: any): Promise<any> => {
    try {
        const token = localStorage.getItem("jwtToken")
        const axiosInstance: AxiosInstance = createAxiosInstance(token)

        const response: AxiosResponse = await axiosInstance.put(url, body)
        const successMessage = response.data.message
        return { success: true, message: successMessage, data: response.data }
    } catch (error: any) {
        if (error.response) {
            // Le serveur a répondu avec un statut d'erreur
            const errorMessage = error.response.data.message // Récupère le message d'erreur renvoyé par le backend
            return { success: false, message: errorMessage, data: null }
        } else {
            // Une erreur s'est produite lors de l'envoi de la requête
            return {
                success: false,
                message: "Une erreur s'est produite lors de la requête.",
                data: null,
            }
        }
    }
}

export const deleteRequest = async (url: string): Promise<any> => {
    try {
        const token = localStorage.getItem("jwtToken")
        const axiosInstance: AxiosInstance = createAxiosInstance(token)

        const response: AxiosResponse = await axiosInstance.delete(url)
        const successMessage = response.data.message
        return { success: true, message: successMessage, data: response.data }
    } catch (error: any) {
        if (error.response) {
            // Le serveur a répondu avec un statut d'erreur
            const errorMessage = error.response.data.message // Récupère le message d'erreur renvoyé par le backend
            return { success: false, message: errorMessage, data: null }
        } else {
            // Une erreur s'est produite lors de l'envoi de la requête
            return {
                success: false,
                message: "Une erreur s'est produite lors de la requête.",
                data: null,
            }
        }
    }
}
