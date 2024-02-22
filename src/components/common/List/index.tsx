// @title  : titre de la liste
// @columns : Objet qui représente les titres des colonnes du tableau  sous la forme :  ({id : "", label:""})
// @data : les données du Tableau, il doit contenir les id exacts de columns [{id : ""},{id : ""}] 
// @actions : boolean, à true, on affiche les actions du Tableau 
// @details : boolean : si à true, on affiche le bouton voir 
// @modify : boolean : si à true, on affiche le bouton modifier 
// @details : boolean : si à true, on affiche le bouton voir 
// @remove : boolean : si à true, on affiche le bouton supprimer
// @create : boolean : si à true, on affiche le bouton ajout sur la ligne 
// @detailsHandler : 
// @modifyHandler :fonction à passer dans le composant parent  pour gérer la logique de modifier
// deleteHandler à passer dans le composant parent  pour gérer la logique de détails
// modifyHandler à passer dans le composant parent  pour gérer la logique de détails
// addElement : composant à afficher pour l'ajout
// modifyElement?: ReactNode : composant à afficher pour la modification




import React, { ReactNode, useContext, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TextField,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from "@mui/material";
import {
  
    Edit,
    Delete,
    Visibility,
    Backup,
} from "@mui/icons-material";
import { ListContext } from "../../../context/listContext";
import ButtonComponent from "../Button";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { LIST_ACTIONS } from "../../../constants";

interface Column {
    id: string;
    label: string;
}
interface Props {
    title: string;
    columns: Column[];
    data: any[];
    actions: boolean;
    details?: boolean;
    soumettre?: boolean;
    remove?: boolean;
    modify?: boolean;
    create?: boolean
    detailsHandler?: (rowData: any) => void;
    modifyHandler?: (rowData: any) => void;
    deleteHandler?: (rowData: any) => void;
    createHandler?: (rowData: any) => void;
    soumettreHandler?: (rowData: any) => void;
    modifyElement?: ReactNode;
    addElement?: ReactNode;
    handleAdd?: (rowData: any) => void;
}

const ListComponent: React.FC<Props> = ({
    title,
    columns,
    data,
    actions,
    create,
    createHandler,
    remove,
    deleteHandler,
    details,
    detailsHandler,
    modify,
    modifyElement,
    addElement,
    handleAdd,
    modifyHandler,
    soumettre,
    soumettreHandler,

}) => {
    const [filters, setFilters] = useState<{ [key: string]: string }>({});
    const { openModal, updateModalOpen, selectedRow, updateSelectedRow } =
        useContext(ListContext);
    const [selectedAction, setSelectedActions] = useState<any | null>(null);

    const handleFilterChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        columnId: string
    ) => {
        setFilters({ ...filters, [columnId]: e.target.value });
    };

    const filteredData = data.filter((row: any) => {
        return Object.entries(filters).every(([columnId, filter]) => {
            return String(row[columnId])
                .toLowerCase()
                .includes(filter.toLowerCase());
        });
    });

    return (
        <div
            style={{
                maxWidth: "90%",
                margin: "auto",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <h2>{title}</h2>
       

            <div
                style={{
                    border: "1px solid #ccc",
                    padding: "10px",
                    marginBottom: "10px",
                    width: "100%",
                    boxSizing: "border-box",
                }}
            >
                {columns.map((column) => (
                    <TextField
                        key={column.id}
                        label={`Filtrer par ${column.label}`}
                        variant="outlined"
                        value={filters[column.id] || ""}
                        onChange={(e) => handleFilterChange(e, column.id)}
                        style={{ marginRight: "10px" }}
                    />
                ))}
            </div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow style={{ backgroundColor: "#d1def0" }}>
                            {columns.map((column) => (
                                <TableCell
                                    style={{ fontWeight: "bold" }}
                                    key={column.id}
                                >
                                    {" "}
                                    {column.label.toUpperCase()}
                                </TableCell>
                            ))}
                            {actions && (
                                <TableCell style={{ fontWeight: "bold" }}>
                                    ACTIONS
                                </TableCell>
                            )}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredData.map((row, rowIndex) => (
                            <TableRow
                                key={rowIndex}
                                style={{
                                    backgroundColor:
                                        rowIndex % 2 === 0
                                            ? "#fffff"
                                            : "#f9f9f9",
                                }}
                            >
                                {columns.map((column, colIndex) => (
                                    <TableCell key={`${rowIndex}-${colIndex}`}>
                                        {row[column.id]}
                                    </TableCell>
                                ))}
                                {actions && (
                                    <TableCell>
                                        {row.createValue && (
                                            <IconButton
                                                onClick={() => {
                                                    setSelectedActions(
                                                        LIST_ACTIONS.create
                                                    );
                                                    updateSelectedRow(row);
                                                    createHandler &&
                                                        createHandler(row);
                                                }}
                                            >
                                                <AddCircleIcon />
                                            </IconButton>
                                        )}
                                        {row.detailsValue && (
                                            <IconButton
                                                onClick={() => {
                                                    setSelectedActions(
                                                        LIST_ACTIONS.read
                                                    );
                                                    updateSelectedRow(row);
                                                    detailsHandler &&
                                                        detailsHandler(row);
                                                }}
                                            >
                                                <Visibility />
                                            </IconButton>
                                        )}
                                        {modify && (
                                            <>
                                                <IconButton
                                                    onClick={() => {
                                                        modifyHandler &&
                                                            modifyHandler(row);
                                                        setSelectedActions(
                                                            LIST_ACTIONS.update
                                                        );
                                                        updateModalOpen(true);
                                                        updateSelectedRow(row);
                                                    }}
                                                >
                                                    <Edit />
                                                </IconButton>
                                            </>
                                        )}
                                        {remove && (
                                            <IconButton
                                                onClick={() => {
                                                    setSelectedActions(
                                                        LIST_ACTIONS.delete
                                                    );
                                                    updateModalOpen(true);
                                                    updateSelectedRow(row);
                                                }}
                                            >
                                                <Delete />
                                            </IconButton>
                                        )}

                                        {row.soumettreValue && (
                                            <IconButton
                                                onClick={() => {
                                                    setSelectedActions(
                                                        LIST_ACTIONS.soumettre
                                                    );
                                                    updateModalOpen(true);
                                                    updateSelectedRow(row);
                                                }}
                                            >
                                                <Backup />
                                            </IconButton>
                                        )} 
                                    </TableCell>
                                )}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {selectedRow && actions && selectedAction && (
                <Dialog
                    open={openModal}
                    onClose={() => updateModalOpen(false)}
                    PaperProps={{
                        style: {
                            width: 500, // Largeur fixe du modal
                            border: "1px solid #ccc", // Bordure
                            borderRadius: 8, // Bord arrondi
                            backgroundColor: "rgba(255, 255, 255, 0.9)", // Transparence
                            overflowY: "auto", // Scrollable en cas de contenu trop long
                        },
                    }}
                >
                    <DialogTitle>{selectedRow.name}</DialogTitle>
                    <DialogContent>
                        {selectedAction === LIST_ACTIONS.update &&
                            modifyElement}
                        {selectedAction === LIST_ACTIONS.delete && (
                            <div>Êtes-vous sûr de vouloir supprimer ?</div>
                        )}
                        {selectedAction === LIST_ACTIONS.soumettre && (
                            <div>Êtes-vous sûr de vouloir soumettre l'évaluation ?</div>
                        )}

                        {selectedAction === LIST_ACTIONS.add && addElement}
                    </DialogContent>
                    <DialogActions>
                        {selectedAction === LIST_ACTIONS.delete && (
                            <>
                                <ButtonComponent
                                    text="Oui"
                                    onClick={() => {
                                        deleteHandler &&
                                            deleteHandler(selectedRow);
                                        console.log(selectedRow);
                                        updateModalOpen(false);
                                    }}
                                />

                                <ButtonComponent
                                    onClick={() => updateModalOpen(false)}
                                    text="Non"
                                />
                            </>
                        )}
                        {selectedAction === LIST_ACTIONS.soumettre && (
                            <>
                                <ButtonComponent
                                    text="Oui"
                                    onClick={() => {
                                        soumettreHandler &&
                                            soumettreHandler(selectedRow);
                                        
                                        updateModalOpen(false);
                                    }}
                                />

                                <ButtonComponent
                                    onClick={() => updateModalOpen(false)}
                                    text="Non"
                                />
                            </>
                        )}
                    </DialogActions>
                </Dialog>
            )}
        </div>
    );
};

export default ListComponent;
