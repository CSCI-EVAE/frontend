import React, { createContext, ReactNode, useCallback, useState } from "react";

// Définition du type des props pour ListContextProvider
interface ListContextProviderProps {
    children: ReactNode; // children doit être de type ReactNode
}

// Création du contexte
export const ListContext = createContext<any>(null); // Vous pouvez remplacer 'any' par le type spécifique que vous souhaitez utiliser

// Composant ListContextProvider
export const ListContextProvider: React.FC<ListContextProviderProps> = ({
    children,
}) => {
    const [openModal, setOpenModal] = useState(false);
    const [selectedRow, setSelectedRow] = useState<any | null>(null);

    const updateModalOpen = useCallback((value: boolean) => {
        setOpenModal(value);
    }, []);
    const updateSelectedRow = useCallback((value: any) => {
        setSelectedRow(value);
    }, []);

    return (
        <ListContext.Provider
            value={{
                openModal,
                selectedRow,
                updateModalOpen,
                updateSelectedRow,
            }}
        >
            {children}
        </ListContext.Provider>
    );
};
