import React, { useContext, useEffect, useMemo, useState } from "react";
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
    Tooltip,
    
} from "@mui/material";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { RemoveRedEye } from "@mui/icons-material";
import { ListContext } from "../../context/listContext";
import EditNoteIcon from '@mui/icons-material/EditNote';
import { LIST_Etat_Etudiant } from "../../constants";
import { AdjustColumns } from "../../context/evaluationEtudiantContext";
import BorderColorIcon from '@mui/icons-material/BorderColor';

interface Column {
    id: string;
    label: string;
}

interface Props {
    title: string;
    columns: Column[];
    columnsFilter?: Column[];
    data: any[];
    actions: boolean;
    details?: boolean;
    filterreades?: { [key: string]: boolean }; 
    filteransweres?: { [key: string]: boolean }; 
    detailsHandler?: (rowData: any) => void;
    modifyHandler?: (rowData: any) => void;
    deleteHandler?: (rowData: any) => void;
    createHandler?: (rowData: any) => void;
    soumettreHandler?: (rowData: any) => void;
    modifyElement?: React.ReactNode;
    addElement?: React.ReactNode;
    evaRepondu?: { [key: string]: boolean }; 
    handleAdd?: (rowData: any) => void;
}

const ListComponent: React.FC<Props> = ({
    title,
    columns,
    data,
    actions,
    filterreades,
    evaRepondu,
    filteransweres,
    createHandler,
    columnsFilter
}) => {
    const [filters, setFilters] = useState<{ [key: string]: string }>({});
    const { updateSelectedRow } = useContext(ListContext);
    const [etats, setEtats] = useState('');
    const [filterread, setFilterreads] = useState<{ [key: string]: boolean }>(filterreades || {}); 
    const [filteranswer, setFilteranswers] = useState<{ [key: string]: boolean}>(filteransweres || {}); 

    console.log("The value from etudiant list answ "+JSON.stringify(filteransweres,null))

    const handleFilterChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        columnId: string
    ) => {
        setFilters({ ...filters, [columnId]: e.target.value });
    };

    const handleChangeSelect = (event: SelectChangeEvent) => {
        const newValue = event.target.value;
        setEtats(newValue);
        setFilters({ ...filters, etat: newValue });
    };
    const filteredData = useMemo(() => {
        return AdjustColumns(data).filter((row: any) => {
            return Object.entries(filters).every(([columnId, filter]) => {
                return String(row[columnId])
                    .toLowerCase()
                    .includes(filter.toLowerCase());
            });
        });
    }, [data, filters]);


    useEffect(() => {
        const filteredReadStatus: { [key: string]: boolean } = {};
        const filteredAnswersStatus: { [key: string]: boolean } = {};
        filteredData.forEach((evaluation) => {
            filteredReadStatus[evaluation.noEvaluation] = evaluation.readStatus;
            filteredAnswersStatus[evaluation.noEvaluation] = evaluation.answerStatus;
                     
        });
        setFilterreads(filteredReadStatus); 
        setFilteranswers(filteredAnswersStatus); 
    }, [filteredData]);
 
   // console.log("This is value of read "+JSON.stringify(setReads,null))

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
            <h2 style={{ fontFamily: "cursive", color: "#e3a12f", marginTop: "20px", marginBottom: "50px" }}>{title}</h2>

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
                                        rowIndex % 2 === 0 ? "#fffff" : "#f9f9f9",
                                }}
                            >
                                {columns.map((column, colIndex) => (
                                    <TableCell key={`${rowIndex}-${colIndex}`}>
                                        {row[column.id]}
                                    </TableCell>
                                ))}
                            
                            <TableCell>
                          
{evaRepondu?.[row.noEvaluation] === true ? (
    <>
        {filterread?.[row.noEvaluation] === true && (
            <IconButton
                onClick={() => {
                   // setSelectedActions(LIST_ACTIONS_ETUDIANT.read);
                    updateSelectedRow(row);
                    createHandler && createHandler(row);
                    console.log("The result "+filterread[row.noEvaluation] )
                }}
            >
                <Tooltip title="Consulter" arrow>
                <RemoveRedEye />
</Tooltip>
              
            </IconButton>
        )}
        {filteranswer?.[row.noEvaluation] === true && (
            <>
                <IconButton
                    onClick={() => {
                       // setSelectedActions(LIST_ACTIONS_ETUDIANT.answer);
                        updateSelectedRow(row);
                        createHandler && createHandler(row);
                    }}
                >
                    <Tooltip title="Modifier" arrow>
                    <EditNoteIcon />
</Tooltip>
                   
                </IconButton>
                <IconButton
                    onClick={() => {
                       // setSelectedActions(LIST_ACTIONS_ETUDIANT.answer);
                        updateSelectedRow(row);
                        createHandler && createHandler(row);
                    }}
                >
                     <Tooltip title="Consulter" arrow>
                     <RemoveRedEye />
</Tooltip>
                    
                </IconButton>
            </>
        )}
    </>
) : (
    <>
    {filterread?.[row.noEvaluation] === true && (
   <div></div>
)}
    {filteranswer?.[row.noEvaluation] === true && (
    <IconButton
        onClick={() => {
           // setSelectedActions(LIST_ACTIONS_ETUDIANT.answer);
            updateSelectedRow(row);
            createHandler && createHandler(row);
            console.log("The result answer "+filteranswer[row.noEvaluation] )
        }}
    >
        <Tooltip title="Répondre" arrow>
        <BorderColorIcon />
</Tooltip>
       
    </IconButton>
)}
    </>
)}


</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default ListComponent;
