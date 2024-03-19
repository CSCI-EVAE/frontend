import React, { ReactNode, useContext, useEffect, useState } from "react"
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
    Tooltip,
    TablePagination,
} from "@mui/material"
import {
    AddCircleOutline,
    Edit,
    Delete,
    Visibility,
    KeyboardBackspace,
} from "@mui/icons-material"

import { ListContext } from "../../context/listContext"
import ButtonComponent from "../Button"
import AddCircleIcon from "@mui/icons-material/AddCircle"
import { LIST_ACTIONS } from "../../constants"
import { useNavigate } from "react-router-dom"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import { red, yellow } from "@mui/material/colors"

interface Column {
    id: string
    label: string
}
interface Props {
    title: string
    columns: Column[]
    data: any[]
    actions: boolean
    details?: boolean
    remove?: boolean
    modify?: boolean
    create?: boolean
    detailsHandler?: (rowData: any) => void
    modifyHandler?: (rowData: any) => void
    deleteHandler?: (rowData: any) => void
    createHandler?: (rowData: any) => void
    modifyElement?: ReactNode
    addElement?: ReactNode
    detailsElement?: ReactNode
    handleAdd?: (rowData: any) => void
    redirect?: boolean
    redirectEdit?: boolean
    redirectAdd?: boolean
    url?: string
    urlEdit?: string
    urlAdd?: string
    filter?: boolean
    noBoutonAjouter?: boolean
    noBoutonRetour?: boolean
}

const ListComponent: React.FC<Props> = ({
    title,
    columns,
    data,
    actions,
    create,
    createHandler,
    redirectEdit,
    remove,
    redirectAdd,
    deleteHandler,
    details,
    urlAdd,
    detailsHandler,
    modify,
    modifyElement,
    addElement,
    handleAdd,
    modifyHandler,
    detailsElement,
    urlEdit,
    url,
    redirect,
    filter,
    noBoutonAjouter,
    noBoutonRetour,
}) => {
    const [filters, setFilters] = useState<{ [key: string]: string }>({})
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

    const textStyle: React.CSSProperties = {
        fontFamily: "cursive",
        color: "#e3a12f",
        marginTop: "20px",
        marginBottom: "50px",
    }

    const handleFilterChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        columnId: string
    ) => {
        setFilters({ ...filters, [columnId]: e.target.value })
    }

    const [dataset, setDataset] = useState(data)
    useEffect(() => {
        setDataset(data)
    }, [data])

    const onDragEnd = (result: any) => {
        if (!result.destination) return

        const newItems = Array.from(dataset)
        const [reorderedItem] = newItems.splice(result.source.index, 1)
        newItems.splice(result.destination.index, 0, reorderedItem)

        // Mise à jour de l'ordre de chaque élément
        newItems.forEach((item, index) => {
            item.order = index + 1
            if (item.ordre) {
                item.ordre = item.order
            }
        })
        console.log(newItems)

        setDataset(newItems)
    }

    const filteredData = dataset.filter((row: any) => {
        return Object.entries(filters).every(([columnId, filter]) => {
            return String(row[columnId])
                .toLowerCase()
                .includes(filter.toLowerCase())
        })
    })
    const navigate = useNavigate()

    return (
        <>
            {!noBoutonRetour && (
                <div
                    style={{
                        maxWidth: "90%",
                        marginLeft: "150px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                    }}
                >
                    <ButtonComponent
                        text="Retour"
                        variant="contained"
                        icon={<KeyboardBackspace />}
                        onClick={() => {
                            navigate("/dashboard/admin")
                        }}
                    />
                </div>
            )}
            <div
                style={{
                    maxWidth: "90%",
                    margin: "auto",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Typography variant="h4" style={textStyle}>
                    {title}
                </Typography>
                {!noBoutonAjouter && (
                    <ButtonComponent
                        text="Ajouter"
                        variant="contained"
                        icon={<AddCircleOutline />}
                        onClick={() => {
                            if (redirectAdd) {
                                urlAdd && navigate(urlAdd)
                            }
                            setSelectedActions(LIST_ACTIONS.add)
                            updateModalOpen(true)
                            updateSelectedRow({})
                        }}
                    />
                )}
                <div style={{ height: "20px" }} />

                <div style={{ width: "90%" }}>
                    {!filter && (
                        <div
                            style={{
                                border: "3px solid #3c768c",
                                padding: "10px",
                                marginBottom: "20px",
                                width: "100%",
                                boxSizing: "border-box",
                                marginTop: "20px",
                            }}
                        >
                            <>
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
                                {columns.map((column) => (
                                    <TextField
                                        key={column.id}
                                        label={` ${column.label}`}
                                        variant="filled"
                                        value={filters[column.id] || ""}
                                        onChange={(e) =>
                                            handleFilterChange(e, column.id)
                                        }
                                        style={{
                                            marginRight: "10px",

                                            width: "20%",
                                        }}
                                    />
                                ))}
                            </>
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
                            <DragDropContext onDragEnd={onDragEnd}>
                                <Droppable droppableId="rubriqueItems">
                                    {(provided: any) => (
                                        <TableBody
                                            {...provided.droppableProps}
                                            ref={provided.innerRef}
                                        >
                                            {filteredData
                                                .slice(startIndex, endIndex)
                                                .map(
                                                    (
                                                        row: any,
                                                        rowIndex: any
                                                    ) => (
                                                        <Draggable
                                                            key={rowIndex}
                                                            draggableId={String(
                                                                rowIndex
                                                            )}
                                                            index={rowIndex}
                                                        >
                                                            {(
                                                                provided: any
                                                            ) => (
                                                                <TableRow
                                                                    key={
                                                                        rowIndex
                                                                    }
                                                                    style={{
                                                                        backgroundColor:
                                                                            rowIndex %
                                                                                2 ===
                                                                            0
                                                                                ? "#fffff"
                                                                                : "#f9f9f9",
                                                                    }}
                                                                    ref={
                                                                        provided.innerRef
                                                                    }
                                                                    {...provided.draggableProps}
                                                                    {...provided.dragHandleProps}
                                                                >
                                                                    {columns.map(
                                                                        (
                                                                            column,
                                                                            colIndex
                                                                        ) => (
                                                                            <TableCell
                                                                                key={`${rowIndex}-${colIndex}`}
                                                                            >
                                                                                {
                                                                                    row[
                                                                                        column
                                                                                            .id
                                                                                    ]
                                                                                }
                                                                            </TableCell>
                                                                        )
                                                                    )}
                                                                    {actions && (
                                                                        <TableCell>
                                                                            {create && (
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
                                                                                    <AddCircleIcon />
                                                                                </IconButton>
                                                                            )}
                                                                            {details && (
                                                                                <Tooltip title="Consulter le détails">
                                                                                    <IconButton
                                                                                        onClick={() => {
                                                                                            if (
                                                                                                redirect
                                                                                            ) {
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
                                                                                        <Visibility />
                                                                                    </IconButton>
                                                                                </Tooltip>
                                                                            )}
                                                                            {modify && (
                                                                                <>
                                                                                    <Tooltip title="Modifier">
                                                                                        <IconButton
                                                                                            onClick={() => {
                                                                                                if (
                                                                                                    redirectEdit
                                                                                                ) {
                                                                                                    updateSelectedRow(
                                                                                                        row
                                                                                                    )
                                                                                                    urlEdit &&
                                                                                                        navigate(
                                                                                                            urlEdit
                                                                                                        )
                                                                                                } else {
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
                                                                                                }
                                                                                            }}
                                                                                        >
                                                                                            <Edit
                                                                                                sx={{
                                                                                                    color: yellow[700],
                                                                                                }}
                                                                                            />
                                                                                        </IconButton>
                                                                                    </Tooltip>
                                                                                </>
                                                                            )}
                                                                            {remove && (
                                                                                <Tooltip title="Supprimer">
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
                                                                                        <Delete
                                                                                            sx={{
                                                                                                color: red[700],
                                                                                            }}
                                                                                        />
                                                                                    </IconButton>
                                                                                </Tooltip>
                                                                            )}
                                                                        </TableCell>
                                                                    )}
                                                                </TableRow>
                                                            )}
                                                        </Draggable>
                                                    )
                                                )}
                                            {provided.placeholder}
                                        </TableBody>
                                    )}
                                </Droppable>
                            </DragDropContext>
                        </Table>
                    </TableContainer>

                    <div
                        style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            marginBottom: "40px",
                            marginTop: "40px",
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
                </div>

                {selectedRow && actions && selectedAction && (
                    <Dialog
                        open={openModal}
                        onClose={() => updateModalOpen(false)}
                        PaperProps={{
                            style: {
                                minHeight: 200,
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
                            {selectedAction === LIST_ACTIONS.update &&
                                modifyElement}
                            {selectedAction === LIST_ACTIONS.read &&
                                detailsElement}

                            {selectedAction === LIST_ACTIONS.delete && (
                                <div
                                    style={{
                                        fontSize: "1.5rem",
                                        //border:"1px solid black"
                                    }}
                                >
                                    Êtes-vous sûr de vouloir supprimer ?
                                </div>
                            )}
                            {selectedAction === LIST_ACTIONS.add && addElement}
                        </DialogContent>
                        <DialogActions
                            style={{
                                margin: "auto",
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                            }}
                        >
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
                        </DialogActions>
                    </Dialog>
                )}
            </div>
        </>
    )
}

export default ListComponent
