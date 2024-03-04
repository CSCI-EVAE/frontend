import React, { createContext, ReactNode, useState } from "react"

// Définition du type des props pour NotificationContextProvider
interface NotificationContextProviderProps {
    children: ReactNode // children doit être de type ReactNode
}

// Création du contexte
export const NotificationContext = createContext<any>(null) // Vous pouvez remplacer 'any' par le type spécifique que vous souhaitez utiliser

// Composant NotificationContextProvider
export const NotificationContextProvider: React.FC<
    NotificationContextProviderProps
> = ({ children }) => {
    const [message, setMessage] = useState("")
    const [toggle, setToggle] = useState(false)
    const [title, setTitle] = useState("")
    const [type, setType] = useState("")

    const showNotification = (title: string, message: string, type: string) => {
        setTitle(title)
        setType(type)
        setMessage(message)
        setToggle((prev) => !prev)
    }

    return (
        <NotificationContext.Provider
            value={{
                showNotification,
                message,
                title,
                type,
                toggle,
            }}
        >
            {children}
        </NotificationContext.Provider>
    )
}
