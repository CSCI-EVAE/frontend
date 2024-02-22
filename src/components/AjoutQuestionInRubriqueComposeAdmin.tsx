import React, { useContext, useEffect, useState } from 'react';
import {  TableCell, List, ListItem,ListItemIcon, ListItemButton,Modal,Box } from '@mui/material';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import { RubriqueCompose, questionsInRubrique } from '../types/rubriquesComposeTypes ';
import { RubriqueComposeContext } from '../context/rubriqueComposeContext';
import ButtonComponent from './common/Button';
import { AddCircle } from '@mui/icons-material';
import AdminAddQuestion from './AdminAddQuestion';


interface TableQuestionProps {

  rubriqueParent : RubriqueCompose;
  questions : questionsInRubrique[];
  deleteQuestionHandler : (row : questionsInRubrique,rubriqueParent : RubriqueCompose )=> void;
}
const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  


const AjoutQuestionRCompose : React.FC<TableQuestionProps>= ({ rubriqueParent, questions, deleteQuestionHandler }) => {
const [dataset, setDataset] = useState<questionsInRubrique[]>(questions );
const {currentRubriqueCompose} = useContext(RubriqueComposeContext);
 useEffect(()=>{
  setDataset(questions);
 },[questions,deleteQuestionHandler, rubriqueParent,currentRubriqueCompose])
 console.log("current", currentRubriqueCompose);


  const onDragEnd = (result: any) => {
    if (!result.destination) return;
  
    const newItems = Array.from(dataset);
    const [reorderedItem] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, reorderedItem);
  
    //Mise à jour de l'ordre de chaque élément
      newItems.forEach((item, index) => {
      
          item.ordre = index + 1;
        
      });
     console.log(newItems);
  
    setDataset(newItems);
  };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
    <div style={{ display: "flex",
                          flexDirection: "row",
                          alignItems: "center" }}>
                          <ButtonComponent
                             onClick={handleOpen}
                          icon={ <AddCircle/>}
                          text='Ajouter une question'
                          />
                            
                           
                            
                            
                        </div>
     <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="questItems">
                    {(provided : any) => (
    <List
    {...provided.droppableProps} ref={provided.innerRef}
    style={{
      maxWidth: "90%",
      margin: "auto",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
  }}
  
    >
          <>
          {dataset.map((row , index:number)=> (
             <Draggable key={row.idQuestion} draggableId={String(row.idQuestion)} index={index}>
             {(provided : any) => (
            <ListItem
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            >

               <TableCell style={{width:'90%'}}>{row.intitule}</TableCell>
               {/* <ListItemText style={{width:'90%'}}>{row.intitule}</ListItemText> */}

                <ListItemButton
                        onClick={()=> deleteQuestionHandler(row, rubriqueParent)}
                        
                        sx={{ display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-end" }}
                        >
                          <ListItemIcon><DeleteSweepIcon/></ListItemIcon>
                        </ListItemButton>
                </ListItem>
             )}
                           
             </Draggable>
          ))}
           {provided.placeholder}
          </>
          
          </List>
          )}
          </Droppable>
          </DragDropContext>
          <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <AdminAddQuestion handleClose={handleClose}/>
        </Box>
      </Modal>
          </>
  );
};

export default AjoutQuestionRCompose;
