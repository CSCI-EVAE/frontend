import React, { createContext, ReactNode, useCallback, useContext } from "react"
import { postRequest } from "../api/axios"
import { NotificationContext } from "./notificationContext"
import { ApiResponse, LoginCredentials } from "../types"

// Définition du type des props pour AuthContextProvider
interface AuthContextProviderProps {
    children: ReactNode // children doit être de type ReactNode
}

// Création du contexte
export const AuthContext = createContext<any>(null) // Vous pouvez remplacer 'any' par le type spécifique que vous souhaitez utiliser

// Composant AuthContextProvider
export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
    children,
}) => {
    const { showNotification } = useContext(NotificationContext)

    const login = useCallback(
        async (credentials: LoginCredentials) => {
            const response: ApiResponse = await postRequest(
                "/login",
                credentials
            )
            if (!response.success) {
                showNotification("Erreur", response.message, "error")
                return
            }
            const token = response.data.data.accessToken
            localStorage.setItem("jwtToken", token)
            localStorage.setItem(
                "user",
                JSON.stringify(response.data.data.user)
            )
            showNotification("Bienvenue", "Connexion Réussie", "info")

            return response.data
        },
        [showNotification]
    )

    return (
        <AuthContext.Provider
            value={{
                login,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
