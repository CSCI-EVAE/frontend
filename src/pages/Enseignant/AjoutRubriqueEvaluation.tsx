import React, { useContext, useEffect, useState } from "react"
import {
    DialogTitle,
    DialogActions,
    DialogContent,
    Dialog,
    List,
    ListItemIcon,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    ListItemButton,
    ListItemText,
} from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import AddCircleIcon from "@mui/icons-material/AddCircle"
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep"
import { ListContext } from "../../context/listContext"
import ButtonComponent from "../../common/Button"
import EnseignantRubrique from "../../components/EnsignantRubrique"
import { LIST_ACTIONS } from "../../constants"
import { RubriqueEnseignantContext } from "../../context/rubriqueEnseignantContext"
import AjoutQuestionEvaluation from "./AjoutQuestionEvaluation"
import Header from "../../Layout/Header"
import { CreateRubriqueCompose, RubriqueCompose, questionsInRubrique } from "../../types"
import SideBarEnseignant from "../../Layout/sideBar/SideBarEnseignant"
import EnseignantAddRubriqueStandard from "../../components/EnseignantAddRubriqueStandard"
import { EvaluationContext } from "../../context/evaluationEnseignantContext"

const AjoutRubriqueEvaluation = () => {
    const {
        rubriqueAdded,
        rubriqueSelectedEns,
        updateRubriqueSelectedEns,
        updateRubriqueAddedByList,
        updateRubriqueSelected,
    } = useContext(RubriqueEnseignantContext)


    const {
        addNewEvaluation
    } = useContext(EvaluationContext)

    const [dataset, setDataset] = useState<RubriqueCompose[]>(rubriqueAdded)

    useEffect(() => {
        setDataset(rubriqueAdded)
    }, [rubriqueAdded])

    const onDragEnd = (result: any) => {
        if (!result.destination) return
        const newItems = Array.from(dataset)
        const [reorderedItem] = newItems.splice(result.source.index, 1)
        newItems.splice(result.destination.index, 0, reorderedItem)

        newItems.forEach((item, index) => {
            item.ordre = index + 1
        })

        setDataset(newItems)
    }
    const { openModal, updateModalOpen, updateSelectedRow } =
        useContext(ListContext)

    const [selectedAction, setSelectedActions] = useState<any | null>(null)
    const handleDelete = () => {
        //  updateRubriqueAdded();
        updateRubriqueAddedByList(
            rubriqueAdded.filter(
                (element: RubriqueCompose) =>
                    element.designation !== rubriqueSelectedEns.designation
            )
        )

        updateModalOpen(false)
    }
    const deleteQuestionHandler = (
        row: questionsInRubrique,
        rubriqueParent: RubriqueCompose
    ) => {
        const newRubrique: RubriqueCompose = {
            ...rubriqueParent,
            questions: rubriqueParent.questions.filter(
                (element) => element.intitule !== row.intitule
            ),
        }
        let NewList: RubriqueCompose[] = rubriqueAdded.filter(
            (element: RubriqueCompose) =>
                element.designation !== newRubrique.designation
        )
        NewList.push(newRubrique)
        console.log(NewList)
        updateRubriqueAddedByList(NewList)
    }

    const rubriquesToAdd: CreateRubriqueCompose[] = rubriqueAdded.map((rubrique: any) => {
        return {
            idRubrique: rubrique.idRubrique || 0, 
            questionIds: rubrique.questions.reduce((acc: { [questionId: number]: number }, question: any) => {
                acc[question.idQuestion || 0] = question.ordre || 0; 
                return acc;
            }, {}),
            ordre: rubrique.ordre || 0 
        };
    });
    

    console.log(rubriquesToAdd)

    const handleSubmit = () => {
         const formData = localStorage.getItem("formData");
            if (formData) {
                const parsedFormData = JSON.parse(formData);
                const evaluationData = {
                    codeFormation: parsedFormData.codeFormation,
                    designation: parsedFormData.designation,
                    anneePro: "2014-2015",
                    //periode: "aaa",
                    codeEC: parsedFormData.codeEC ? parsedFormData.codeEC : "", 
                    codeUE: parsedFormData.codeUE,
                    debutReponse: parsedFormData.dateDebut,
                    finReponse: parsedFormData.dateFin,
                    RubriqueQuestion:  rubriquesToAdd
                };
                console.log(evaluationData)
                
               addNewEvaluation(evaluationData);
            }
        updateRubriqueSelected([])
    }

    return (
        <>
            <SideBarEnseignant />
            <Header />

            <div
                style={{
                    maxWidth: "70%",
                    margin: "auto",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <ListItemButton
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        marginBottom: "16px",
                    }}
                >
                    <ListItemIcon
                        onClick={() => {
                            setSelectedActions(LIST_ACTIONS.add)
                            updateModalOpen(true)
                            updateSelectedRow({})
                        }}
                    >
                        <AddCircleIcon /> Ajouter une Rubrique Composée
                    </ListItemIcon>
                </ListItemButton>
                <ListItemButton
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        marginBottom: "16px",
                    }}
                >
                    <ListItemIcon
                        onClick={() => {
                            setSelectedActions(LIST_ACTIONS.addRubriqueStandard)
                            updateModalOpen(true)
                            updateSelectedRow({})
                        }}
                    >
                        <AddCircleIcon /> Ajouter une Rubrique Standard
                    </ListItemIcon>
                </ListItemButton>
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="evaeItems">
                        {(provided: any) => (
                            <List
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                style={{ width: "100%", marginBottom: "32px" }}
                            >
                                {dataset.map((row, index: number) => (
                                    <Draggable
                                        key={String(row.idRubrique)}
                                        draggableId={String(row.idRubrique)}
                                        index={index}
                                    >
                                        {(provided: any) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                            >
                                                <Accordion
                                                    key={row.idRubrique}
                                                    style={{
                                                        marginBottom: "16px",
                                                    }}
                                                >
                                                    <AccordionSummary
                                                        expandIcon={
                                                            <ExpandMoreIcon />
                                                        }
                                                    >
                                                        <ListItemText
                                                            style={{
                                                                width: "80%",
                                                            }}
                                                        >
                                                            {row.designation}
                                                        </ListItemText>
                                                        <ListItemButton
                                                            sx={{
                                                                display: "flex",
                                                                flexDirection:
                                                                    "column",
                                                                alignItems:
                                                                    "flex-end",
                                                            }}
                                                        >
                                                            <ListItemIcon
                                                                onClick={() => {
                                                                    setSelectedActions(
                                                                        LIST_ACTIONS.delete
                                                                    )
                                                                    //updateSelectedRow(row);
                                                                    updateRubriqueSelectedEns(
                                                                        row
                                                                    )
                                                                    updateModalOpen(
                                                                        true
                                                                    ) // createHandler && createHandler(row);
                                                                }}
                                                            >
                                                                <DeleteSweepIcon />
                                                            </ListItemIcon>
                                                        </ListItemButton>
                                                    </AccordionSummary>
                                                    <ListItemButton
                                                        sx={{
                                                            display: "flex",
                                                            flexDirection:
                                                                "column",
                                                            alignItems:
                                                                "center",
                                                        }}
                                                    >
                                                        <ListItemIcon
                                                            onClick={() => {
                                                                setSelectedActions(
                                                                    LIST_ACTIONS.read
                                                                )
                                                                //readp pour les questions
                                                                updateRubriqueSelectedEns(
                                                                    row
                                                                )
                                                                updateModalOpen(
                                                                    true
                                                                )
                                                                // updateSelectedRow({});
                                                            }}
                                                        >
                                                            <AddCircleIcon />{" "}
                                                            Ajouter une question
                                                        </ListItemIcon>
                                                    </ListItemButton>
                                                    <AccordionDetails>
                                                        <AjoutQuestionEvaluation
                                                            rubriqueParent={row}
                                                            questions={
                                                                row.questions
                                                            }
                                                            deleteQuestionHandler={
                                                                deleteQuestionHandler
                                                            }
                                                        />
                                                    </AccordionDetails>
                                                </Accordion>
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </List>
                        )}
                    </Droppable>
                </DragDropContext>
                <ButtonComponent
                    onClick={handleSubmit}
                    text="Valider"
                    type="submit"
                />
                <Dialog
                    open={openModal}
                    onClose={() => updateModalOpen(false)}
                    PaperProps={{
                        style: {
                            minHeight: 500,
                            minWidth: 800,
                            border: "1px solid #ccc",
                            borderRadius: 8,
                            backgroundColor: "rgba(255, 255, 255, 0.9)",
                            overflowY: "auto",
                        },
                    }}
                >
                    <DialogTitle>{"Ajout"}</DialogTitle>
                    <DialogContent
                        style={{
                            margin: "auto",
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            //border:"1px solid black"
                        }}
                    >
                        {selectedAction ===
                            LIST_ACTIONS.addRubriqueStandard && (
                            <EnseignantAddRubriqueStandard />
                        )}
                        {selectedAction === LIST_ACTIONS.add && (
                            <EnseignantRubrique add={true} />
                        )}
                        {selectedAction === LIST_ACTIONS.read && (
                            <EnseignantRubrique add={false} />
                        )}

                        {selectedAction === LIST_ACTIONS.delete && (
                            <div
                                style={{
                                    fontSize: "1.5rem",
                                    border: "1px solid black",
                                }}
                            >
                                Êtes-vous sûr de vouloir supprimer ?
                            </div>
                        )}
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
                                    onClick={handleDelete}
                                />
                                <ButtonComponent
                                    onClick={() => updateModalOpen(false)}
                                    text="Non"
                                />
                            </>
                        )}
                    </DialogActions>
                </Dialog>
            </div>
        </>
    )
}

export default AjoutRubriqueEvaluation
