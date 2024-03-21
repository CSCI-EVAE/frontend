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
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Typography,
    InputLabel,
    MenuItem,
    FormControl,
    Tooltip,
    TablePagination,
} from "@mui/material"
import Select, { SelectChangeEvent } from "@mui/material/Select"
import { Edit, Delete, Visibility, Send, AutoGraph } from "@mui/icons-material"

import { ListContext } from "../../context/listContext"
import ButtonComponent from "../Button"
import AddCircleIcon from "@mui/icons-material/AddCircle"
import { COLORS, LIST_ACTIONS, LIST_Etat } from "../../constants"
import { useNavigate } from "react-router-dom"
import { green, red, yellow } from "@mui/material/colors"

interface Column {
    id: string
    label: string
}
interface Props {
    title: string
    columns: Column[]
    columnsFilter?: Column[]
    indice?: any[]
    data: any[]
    actions: boolean
    details?: boolean
    soumettre?: boolean
    remove?: boolean
    modify?: boolean
    create?: boolean
    detailsHandler?: (rowData: any) => void
    modifyHandler?: (rowData: any) => void
    deleteHandler?: (rowData: any) => void
    createHandler?: (rowData: any) => void
    soumettreHandler?: (rowData: any) => void
    modifyElement?: ReactNode
    addElement?: ReactNode
    handleAdd?: (rowData: any) => void
    afficherEtat?: boolean
    redirect?: boolean
    url?: string
    filter?: boolean
    supprimerHandler ?:(rowData: any) => void
}

const ListComponent: React.FC<Props> = ({
    title,
    columns,
    indice,
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
    columnsFilter,
    afficherEtat,
    url,
    redirect,
    filter,
    
    supprimerHandler
}) => {
    const [filters, setFilters] = useState<{ [key: string]: string }>({})
    const navigate = useNavigate()
    const [page, setPage] = useState(0) // État pour la pagination
    const [rowsPerPage, setRowsPerPage] = useState(10) // État pour les lignes par page
    const { openModal, updateModalOpen, selectedRow, updateSelectedRow } =
        useContext(ListContext)
    const [selectedAction, setSelectedActions] = useState<any | null>(null)

    // Fonction pour changer de page
    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage)
    }

    // Fonction pour changer le nombre de lignes par page
    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }

    // Calcul de l'index de départ et de fin pour l'affichage des données selon la pagination
    const startIndex = page * rowsPerPage
    const endIndex = startIndex + rowsPerPage

    const handleFilterChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        columnId: string
    ) => {
        console.log("id", columnId)
        setFilters({ ...filters, [columnId]: e.target.value })
    }

    const [etats, setEtats] = React.useState("")

    const handleChangeSelect = (event: SelectChangeEvent) => {
        const newValue = event.target.value
        setEtats(newValue)
        console.log("This is etat " + newValue)
        setFilters({ ...filters, etat: newValue })
    }

    const filteredData = data.filter((row: any) => {
        return Object.entries(filters).every(([columnId, filter]) => {
            return String(row[columnId])
                .toLowerCase()
                .includes(filter.toLowerCase())
        })
    })

    const textStyle: React.CSSProperties = {
        fontFamily: "system-ui",
        color: COLORS.color3,
        marginTop: "20px",
        marginBottom: "50px",
    }
    

    return (
        <div>
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
                <Typography variant="h4" style={textStyle}>
                    {title}
                </Typography>
                {!filter && (
                    <div
                        style={{
                            padding: "5px",
                            marginBottom: "20px",
                            width: "100%",
                            boxSizing: "border-box",
                            marginTop: "20px",
                        }}
                    >
                        <div
                            style={{
                                maxWidth: "90%",
                                margin: "auto",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                marginBottom: "10px",
                            }}
                        >
                            <Typography variant="h5">Filtre</Typography>
                        </div>

                        <div
                            style={{
                                maxWidth: "90%",
                                margin: "auto",
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            {afficherEtat && afficherEtat === true ? (
                                <>
                                    {columnsFilter &&
                                        columnsFilter.map((column) => (
                                            <TextField
                                                key={column.id}
                                                label={` ${column.label}`}
                                                variant="outlined"
                                                value={filters[column.id] || ""}
                                                onChange={(e) =>
                                                    handleFilterChange(
                                                        e,
                                                        column.id
                                                    )
                                                }
                                                style={{
                                                    width: "220px",
                                                    marginRight: "10px",
                                                }}
                                            />
                                        ))}

                                    <FormControl style={{ width: "250px" }}>
                                        <InputLabel id="etat">Etat</InputLabel>
                                        <Select
                                            labelId="etat"
                                            id="etat"
                                            label="Etat"
                                            onChange={handleChangeSelect}
                                            value={etats}
                                        >
                                            <MenuItem
                                                value={LIST_Etat.ELA.value}
                                            >
                                                {LIST_Etat.ELA.label}
                                            </MenuItem>
                                            <MenuItem
                                                value={LIST_Etat.CLO.value}
                                            >
                                                {LIST_Etat.CLO.label}
                                            </MenuItem>
                                            <MenuItem
                                                value={LIST_Etat.DIS.value}
                                            >
                                                {LIST_Etat.DIS.label}
                                            </MenuItem>
                                            <MenuItem value="">
                                                {LIST_Etat.AN.label}
                                            </MenuItem>
                                        </Select>
                                    </FormControl>
                                </>
                            ) : (
                                <>
                                    {columns.map((column) => (
                                        <TextField
                                            key={column.id}
                                            label={` ${column.label}`}
                                            variant="outlined"
                                            value={filters[column.id] || ""}
                                            onChange={(e) =>
                                                handleFilterChange(e, column.id)
                                            }
                                            style={{ marginRight: "10px" }}
                                        />
                                    ))}
                                </>
                            )}
                        </div>
                    </div>
                )}
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        style={{
                                            fontWeight: "bold",
                                            // color: "white",
                                            background: COLORS.color7,
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
                                            //color: "white",
                                            background: COLORS.color7,
                                        }}
                                    >
                                        ACTIONS
                                    </TableCell>
                                )}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredData
                                .slice(startIndex, endIndex)
                                .map((row, rowIndex) => (
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
                                            <TableCell
                                                key={`${rowIndex}-${colIndex}`}
                                            >
                                                {colIndex === 0 ? (
                                                    <Tooltip
                                                        title={
                                                            indice &&
                                                            indice[rowIndex]
                                                        }
                                                    >
                                                        <div>
                                                            {row[column.id]}
                                                        </div>
                                                    </Tooltip>
                                                ) : (
                                                    row[column.id]
                                                )}
                                            </TableCell>
                                        ))}
                                        {actions && (
                                            <TableCell>
                                                {row.createValue && (
                                                    <Tooltip title="Créer une évaluation">
                                                        <IconButton
                                                            onClick={() => {
                                                                setSelectedActions(
                                                                    LIST_ACTIONS.create
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
                                                            <AddCircleIcon
                                                                sx={{
                                                                    color: COLORS.color3,
                                                                }}
                                                            />
                                                        </IconButton>
                                                    </Tooltip>
                                                )}
                                                {row.detailsValue && (
                                                    <Tooltip title="Consulter le détails de l'évaluation">
                                                        <IconButton
                                                            onClick={() => {
                                                                if (redirect) {
                                                                    updateSelectedRow(
                                                                        row
                                                                    )
                                                                    localStorage.setItem(
                                                                        "promotion",
                                                                        JSON.stringify(
                                                                            row
                                                                        )
                                                                    )
                                                                    url &&
                                                                        navigate(
                                                                            url +
                                                                                `/${row.codeFormation}/${row.anneeUniversitaire}`
                                                                        )
                                                                } else {
                                                                    setSelectedActions(
                                                                        LIST_ACTIONS.read
                                                                    )
                                                                    updateSelectedRow(
                                                                        row
                                                                    )
                                                                    detailsHandler &&
                                                                        detailsHandler(
                                                                            row
                                                                        )
                                                                    updateModalOpen(
                                                                        true
                                                                    )
                                                                }
                                                            }}
                                                        >
                                                            <Visibility
                                                                sx={{
                                                                    color: COLORS.color4,
                                                                }}
                                                            />
                                                        </IconButton>
                                                    </Tooltip>
                                                )}
                                                {modify && (
                                                    <>
                                                        <Tooltip title="Modifier l'évaluation">
                                                            <IconButton
                                                                onClick={() => {
                                                                    modifyHandler &&
                                                                        modifyHandler(
                                                                            row
                                                                        )
                                                                    setSelectedActions(
                                                                        LIST_ACTIONS.update
                                                                    )
                                                                    updateModalOpen(
                                                                        true
                                                                    )
                                                                    updateSelectedRow(
                                                                        row
                                                                    )
                                                                }}
                                                            >
                                                                <Edit />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </>
                                                )}
                                                {remove && (
                                                    <Tooltip title="Supprimer l'évaluation">
                                                        <IconButton
                                                            onClick={() => {
                                                                setSelectedActions(
                                                                    LIST_ACTIONS.delete
                                                                )
                                                                updateModalOpen(
                                                                    true
                                                                )
                                                                updateSelectedRow(
                                                                    row
                                                                )
                                                            }}
                                                        >
                                                            <Delete />
                                                        </IconButton>
                                                    </Tooltip>
                                                )}

                                                {row.soumettreValue && (
                                                
                                                    <Tooltip title="Soumettre l'évaluation">
                                                        <IconButton
                                                            onClick={() => {
                                                                setSelectedActions(
                                                                    LIST_ACTIONS.soumettre
                                                                )
                                                                updateModalOpen(
                                                                    true
                                                                )
                                                                updateSelectedRow(
                                                                    row
                                                                )
                                                            }}
                                                        >
                                                            <Send
                                                                sx={{
                                                                    color: yellow[700],
                                                                }}
                                                            />
                                                        </IconButton>
                                                    </Tooltip>
                                                    
                                                    
                                                )}
                                                {row.delete && (<Tooltip title="Supprimer l'évaluation">
                                                        <IconButton
                                                            onClick={() => {
                                                                setSelectedActions(
                                                                    LIST_ACTIONS.supprimer
                                                                )
                                                                updateModalOpen(
                                                                    true
                                                                )
                                                                updateSelectedRow(
                                                                    row
                                                                )
                                                            }}
                                                        >
                                                            <Delete
                                                                sx={{
                                                                    color: red[700],
                                                                }}
                                                            />
                                                        </IconButton>
                                                    </Tooltip>)}
                                                {row.statistiques && (
                                                    <Tooltip title="Consulter les résultats">
                                                        <IconButton
                                                            onClick={() => {
                                                                setSelectedActions(
                                                                    LIST_ACTIONS.statistiques
                                                                )

                                                                updateSelectedRow(
                                                                    row
                                                                )

                                                                navigate(
                                                                    `/dashboard/enseignant/reponse-evaluation/${row.idEvaluation}`
                                                                )
                                                            }}
                                                        >
                                                            <AutoGraph
                                                                sx={{
                                                                    color: green[700],
                                                                }}
                                                            />
                                                        </IconButton>
                                                    </Tooltip>
                                                )}
                                            </TableCell>
                                        )}
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>

            <div
                style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginRight: "180px",
                    marginTop: "-60px",
                }}
            >
                <TablePagination
                    rowsPerPageOptions={[5, 10, 20]}
                    component="div"
                    count={filteredData.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    labelRowsPerPage="Lignes par page :"
                    labelDisplayedRows={({ from, to, count }) =>
                        `${from}-${to} sur ${count}`
                    }
                />
            </div>

            {selectedRow && actions && selectedAction && (
                <Dialog
                    open={openModal}
                    onClose={() => updateModalOpen(false)}
                    PaperProps={{
                        style: {
                            width: 500, // Largeur fixe du modal
                            border: "1px solid #ccc", // Bordure
                            borderRadius: 8, // Bord arrondi
                            backgroundColor: "rgba(255, 255, 255, 1)", // Transparence
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
                            <div>
                                Êtes-vous sûr de vouloir soumettre l'évaluation
                                ?
                            </div>
                        )}
                         {selectedAction === LIST_ACTIONS.supprimer && (
                            <div>
                                Êtes-vous sûr de vouloir supprimer l'évaluation
                                ?
                            </div>
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
                                            deleteHandler(selectedRow)
                                        console.log(selectedRow)
                                        updateModalOpen(false)
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
                                            soumettreHandler(selectedRow)

                                        updateModalOpen(false)
                                    }}
                                />

                                <ButtonComponent
                                    onClick={() => updateModalOpen(false)}
                                    text="Non"
                                />
                            </>
                        )}
                         {selectedAction === LIST_ACTIONS.supprimer && (
                            <>
                                <ButtonComponent
                                    text="Oui"
                                    onClick={() => {
                                        supprimerHandler &&
                                        supprimerHandler(selectedRow)

                                        updateModalOpen(false)
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
    )
}

export default ListComponent
