import React, { ReactNode, useContext, useEffect, useState } from "react";
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
    AddCircleOutline,
    Edit,
    Delete,
    Visibility,
    KeyboardBackspace,
} from "@mui/icons-material";
import { ArrowUpward, ArrowDownward } from '@mui/icons-material';

import { ListContext } from "../../../context/listContext";
import ButtonComponent from "../Button";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { LIST_ACTIONS } from "../../../constants";
import { useNavigate } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

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
    remove?: boolean;
    modify?: boolean;
    create?: boolean;
    detailsHandler?: (rowData: any) => void;
    modifyHandler?: (rowData: any) => void;
    deleteHandler?: (rowData: any) => void;
    createHandler?: (rowData: any) => void;
    modifyElement?: ReactNode;
    addElement?: ReactNode;
    detailsElement?: ReactNode;
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
    detailsElement
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

    const [dataset, setDataset] = useState(data);
    useEffect(()=>{
        setDataset(data);
    },[data]);

    const moveRow = (index: number, direction: number) => {
        const newData = [...dataset];
        const movedItem = newData.splice(index, 1)[0];
        const targetIndex = index + direction;
        newData.splice(targetIndex, 0, movedItem);

        // Update order
        newData.forEach((item, index) => {
            item.order = index + 1;
            if(item.ordre){
                item.ordre = item.order;
              };
        });

        setDataset(newData);
    };
    const onDragEnd = (result: any) => {
        if (!result.destination) return;
      
        const newItems = Array.from(dataset);
        const [reorderedItem] = newItems.splice(result.source.index, 1);
        newItems.splice(result.destination.index, 0, reorderedItem);
      
        // Mise à jour de l'ordre de chaque élément
        newItems.forEach((item, index) => {
          item.order = index + 1;
          if(item.ordre){
            item.ordre = item.order;
          };
        });
        console.log(newItems);
      
        setDataset(newItems);
      };


    const filteredData = dataset.filter((row: any) => {
        return Object.entries(filters).every(([columnId, filter]) => {
            return String(row[columnId])
                .toLowerCase()
                .includes(filter.toLowerCase());
        });
    });
    const navigate = useNavigate();

    return (
        <>
         <div
            style={{
                maxWidth: "90%",
                margin: "auto",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
            }}
        >
        <ButtonComponent
                text="Retour"
                variant="contained"
                icon={<KeyboardBackspace/>}
                onClick={() => {
                    navigate('/dashboard/admin');
                }}
            />
            </div>
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
            <ButtonComponent
                text="Ajouter"
                variant="contained"
                icon={<AddCircleOutline />}
                onClick={() => {
                    setSelectedActions(LIST_ACTIONS.add);
                    updateModalOpen(true);
                    updateSelectedRow({});
                }}
            />
             
            <div
                style={{
                    border: "3px solid #3c768c",
                    padding: "10px",
                    marginBottom: "20px",
                    width: "100%",
                    boxSizing: "border-box",
                    marginTop:"20px",
                }}
            >
                {columns.map((column) => (
                    <TextField
                        key={column.id}
                        label={`Filtrer par ${column.label}`}
                        variant="filled"
                        value={filters[column.id] || ""}
                        onChange={(e) => handleFilterChange(e, column.id)}
                      
                        style={{
                            marginRight: "10px",                         
                          
                            width: "20%",
                           
                        }}
                        
                    />
                ))}
            </div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow >
                            <TableCell style={{ fontWeight: "bold" }}>POSITION</TableCell>
                            {columns.map((column) => (
                                
                                <TableCell
                                
                                    style={{ fontWeight: "bold" }}
                                    key={column.id}
                                >
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
                    <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="rubriqueItems">
                    {(provided : any) => (
            
                    <TableBody {...provided.droppableProps} ref={provided.innerRef}>
                        
                        {filteredData.map((row : any, rowIndex:any) => (
                             <Draggable key={rowIndex} draggableId={String(rowIndex)} index={rowIndex}>
                                 {(provided : any) => (
                            <TableRow
                                key={rowIndex}
                                style={{
                                    backgroundColor:
                                        rowIndex % 2 === 0 ? "#fffff" : "#f9f9f9",
                                }}
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                            >
                                
                                <TableCell>
                                    <IconButton onClick={() => moveRow(rowIndex, -1)} disabled={rowIndex === 0}>
                                        <ArrowUpward />
                                    </IconButton>
                                    <IconButton onClick={() => moveRow(rowIndex, 1)} disabled={rowIndex === data.length - 1}>
                                        <ArrowDownward />
                                    </IconButton>
                                </TableCell>
                                {columns.map((column, colIndex) => (
                                    <TableCell key={`${rowIndex}-${colIndex}`}>
                                        {row[column.id]}
                                    </TableCell>
                                ))}
                                {actions && (
                                    <TableCell>
                                        {create && (
                                            <IconButton
                                                onClick={() => {
                                                    setSelectedActions(LIST_ACTIONS.create);
                                                    updateSelectedRow(row);
                                                    createHandler && createHandler(row);
                                                }}
                                            >
                                                <AddCircleIcon />
                                            </IconButton>
                                        )}
                                        {details && (
                                            <IconButton
                                                onClick={() => {
                                                    setSelectedActions(LIST_ACTIONS.read);
                                                    updateSelectedRow(row);
                                                    detailsHandler && detailsHandler(row);
                                                    updateModalOpen(true);
                                                }}
                                            >
                                                <Visibility />
                                            </IconButton>
                                        )}
                                        {modify && (
                                            <>
                                                <IconButton
                                                    onClick={() => {
                                                        modifyHandler && modifyHandler(row);
                                                        setSelectedActions(LIST_ACTIONS.update);
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
                                                    setSelectedActions(LIST_ACTIONS.delete);
                                                    updateModalOpen(true);
                                                    updateSelectedRow(row);
                                                }}
                                            >
                                                <Delete />
                                            </IconButton>
                                        )}
                                    </TableCell>
                                )}
                                
                            </TableRow>
                             )}
                           
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </TableBody>
                    )}
                    </Droppable>
                    </DragDropContext>
                </Table>
            </TableContainer>

            {selectedRow && actions && selectedAction && (
                <Dialog
                    open={openModal}
                    onClose={() => updateModalOpen(false)}
                    PaperProps={{
                        style: {
                            minHeight:200,
                            minWidth: 400,
                            border: "1px solid #ccc",
                            borderRadius: 8,
                            backgroundColor: "rgba(255, 255, 255, 0.9)",
                            overflowY: "auto",
                        },
                    }}
                >
                    <DialogTitle>{selectedRow.name}</DialogTitle>
                    <DialogContent
                        style={{ 
                        margin: "auto",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        //border:"1px solid black"
                    }}
                    >
                        {selectedAction === LIST_ACTIONS.update && modifyElement}
                        {selectedAction === LIST_ACTIONS.read && detailsElement}

                        {selectedAction === LIST_ACTIONS.delete && (
                            <div style={{fontSize: "1.5rem",
                             //border:"1px solid black"
                            }}>Êtes-vous sûr de vouloir supprimer ?</div>
                        )}
                        {selectedAction === LIST_ACTIONS.add && addElement}
                    </DialogContent>
                    <DialogActions 
                     style={{ 
                        margin: "auto",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",}}
                        >
                        {selectedAction === LIST_ACTIONS.delete && (
                            <>
                                <ButtonComponent
                                    text="Oui"
                                    onClick={() => {
                                        deleteHandler && deleteHandler(selectedRow);
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
                    </DialogActions>
                </Dialog>
            )}
        </div>
        </>
    );
};

export default ListComponent;
