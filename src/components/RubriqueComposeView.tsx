import React, { useContext, useState } from 'react';
import { Typography, Box, List, ListItem, ListItemText, Divider } from '@mui/material';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { RubriqueComposeContext } from '../context/rubriqueComposeContext';
import { questionsInRubrique } from '../types/rubriquesComposeTypes ';



 

const RubriqueComposeView= () => {
  const {

    currentRubriqueCompose

    
   
} = useContext(RubriqueComposeContext);

    const title = currentRubriqueCompose.designation;
   
      
  const [rubriqueItems, setRubriqueItems] = useState<questionsInRubrique[]>(currentRubriqueCompose.questions);
  console.log("rrr", currentRubriqueCompose);

  const onDragEnd = (result: any) => {
    if (!result.destination) return;
  
    const newItems = Array.from(rubriqueItems);
    const [reorderedItem] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, reorderedItem);
  
    // Mise à jour de l'ordre de chaque élément
    newItems.forEach((item, index) => {
      item.ordre = index + 1;
    });
    console.log(newItems);
  
    setRubriqueItems(newItems);
  };
  

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        {title}
      </Typography>
      <Divider />
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="rubriqueComposeItems">
          {(provided : any) => (
            <List {...provided.droppableProps} ref={provided.innerRef}>
              {rubriqueItems.map((item , index: number) => (
                <Draggable key={String(item.idQuestion)} draggableId={String(item.idQuestion)} index={index}>
                  {(provided : any) => (
                    <ListItem
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                    
    <ListItemText primary={item.intitule} />
    <ListItemText secondary={`${item.maximal} - ${item.minimal}`} />

                    </ListItem>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </List>
          )}
        </Droppable>
      </DragDropContext>
    </Box>
  );
};

export default RubriqueComposeView;
