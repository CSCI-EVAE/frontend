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

import React, { ReactNode, useContext, useState } from "react"
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
    Typography,
    InputLabel,
    MenuItem,
    FormControl,
} from "@mui/material"
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {  RemoveRedEye } from "@mui/icons-material"
import { ListContext } from "../../context/listContext"
import EditNoteIcon from '@mui/icons-material/EditNote';
import { LIST_ACTIONS_ETUDIANT , LIST_Etat_Etudiant } from "../../constants"

interface Column {
    id: string
    label: string
}
interface Props {
    title: string
    columns: Column[]
    columnsFilter?: Column[]
    data: any[]
    actions: boolean
    details?: boolean
    read?: boolean
    answer?: boolean
    detailsHandler?: (rowData: any) => void
    modifyHandler?: (rowData: any) => void
    deleteHandler?: (rowData: any) => void
    createHandler?: (rowData: any) => void
    soumettreHandler?: (rowData: any) => void
    modifyElement?: ReactNode
    addElement?: ReactNode
    handleAdd?: (rowData: any) => void
}

const ListComponent: React.FC<Props> = ({
    title,
    columns,
    data,
    actions,
    createHandler,
    read,
    answer,
   
    columnsFilter
}) => {
    const [filters, setFilters] = useState<{ [key: string]: string }>({})
    const {updateSelectedRow } =
        useContext(ListContext)
    const [selectedAction, setSelectedActions] = useState<any | null>(null)

    console.log(selectedAction);

    const handleFilterChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        columnId: string
    ) => {
        console.log("id", columnId)
        setFilters({ ...filters, [columnId]: e.target.value })
    }
  
    const [etats, setEtats] = React.useState('');

    const handleChangeSelect = (event: SelectChangeEvent) => {
        const newValue = event.target.value;
        setEtats(newValue);
        console.log("This is etat " + newValue);
        setFilters({...filters, etat: newValue});
      };
      

     // setFilters({...filters, ["etat"] : etats});


    const filteredData = data.filter((row: any) => {
        return Object.entries(filters).every(([columnId, filter]) => {
            return String(row[columnId])
                .toLowerCase()
                .includes(filter.toLowerCase())
        })
    })
 
    const textStyle: React.CSSProperties = {
        fontFamily: "cursive",
        color: "#e3a12f",
        marginTop: "20px",
        marginBottom: "50px",
    }

    return (
        <div
            style={{
                maxWidth: "80%",
                margin: "auto",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginBottom: "100px",
            }}
        >
            <h2 style={textStyle}>{title}</h2>

            <div
                style={{
                    border: "1px solid #ccc",
                    padding: "10px",
                    marginBottom: "10px",
                    width: "100%",
                    boxSizing: "border-box",
                }}
            >
                <div
                    style={{
                        maxWidth: "90%",
                        margin: "auto",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Typography variant="h5">Filtre</Typography>
                </div>
                {columnsFilter && columnsFilter.map((column) => (
                    <TextField
                        key={column.id}
                        label={` ${column.label}`}
                        variant="outlined"
                        value={filters[column.id] || ""}
                        onChange={(e) => handleFilterChange(e, column.id)}
                        style={{ width: "220px", marginRight: "10px" }} 
                    />
                ))}
                 <FormControl style={{ width: '250px' }}>
                <InputLabel id="etat">Etat</InputLabel>
  <Select
    labelId="etat"
    id="etat"
   
    label="Etat"
    onChange={handleChangeSelect}
    value={etats}
  >
    <MenuItem value={LIST_Etat_Etudiant.CLO.value}>{LIST_Etat_Etudiant.CLO.label}</MenuItem>
    <MenuItem value={LIST_Etat_Etudiant.DIS.value}>{LIST_Etat_Etudiant.DIS.label}</MenuItem>
  </Select>
  
  </FormControl>
                
                {/* {columns.map((column) => (
                    <TextField
                        key={column.id}
                        label={` ${column.label}`}
                        variant="outlined"
                        value={filters[column.id] || ""}
                        onChange={(e) => handleFilterChange(e, column.id)}
                        style={{ marginRight: "10px" }}
                    />
                ))} */}
                
            </div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    style={{
                                        fontWeight: "bold",
                                        color: "white",
                                    }}
                                    key={column.id}
                                >
                                    {" "}
                                    {column.label.toUpperCase()}
                                </TableCell>
                            ))}
                            {actions && (
                                <TableCell
                                    style={{
                                        fontWeight: "bold",
                                        color: "white",
                                    }}
                                >
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
                                         {answer && (
                                                                            <IconButton
                                                                                onClick={() => {
                                                                                    setSelectedActions(
                                                                                        LIST_ACTIONS_ETUDIANT.answer
                                                                                    )
                                                                                    updateSelectedRow(
                                                                                        row
                                                                                    )
                                                                                    createHandler &&
                                                                                        createHandler(
                                                                                            row
                                                                                        )
                                                                                }}
                                                                            >
                                                                                <EditNoteIcon />
                                                                            </IconButton>
                                                                        )}
                                        {read && (
                                       <IconButton
                                                                                onClick={() => {
                                                                                    setSelectedActions(
                                                                                        LIST_ACTIONS_ETUDIANT.read
                                                                                    )
                                                                                    updateSelectedRow(
                                                                                        row
                                                                                    )
                                                                                    createHandler &&
                                                                                        createHandler(
                                                                                            row
                                                                                        )
                                                                                }}
                                                                            >
                                                                                <RemoveRedEye />
                                                                            </IconButton>
                                                                        )}
                                      

                                      
                                    </TableCell>
                                )}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

          
        </div>
    )
}

export default ListComponent
