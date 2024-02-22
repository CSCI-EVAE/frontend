import React, { useContext } from "react";
import { TextField, Box, Typography } from "@mui/material";
import ButtonComponent from "./common/Button";
import {
    RubriqueComposeContext,
   
} from "../context/rubriqueComposeContext";
import { ListContext } from "../context/listContext";
interface rubriqueComposeFormProps {
    add: boolean; 
}

const RubriqueComposeForm: React.FC<rubriqueComposeFormProps> = ({ add }) => {
    const {
        
        rubriqueCompose,
        updateCurrentRubriqueCompose,
        addNewRubriqueCompose,
        modifyRubriqueCompose,
        rubriqueComposeList,
    } = useContext(RubriqueComposeContext);
    const { updateModalOpen, selectedRow } = useContext(ListContext);
    

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault(); 
        
        if (add === true) {
            
            addNewRubriqueCompose({...rubriqueCompose});
        } else {

         //   const rubriqueComposeModify = trouverRubriqueCompose(selectedRow, rubriqueComposeList);
            
        //    modifyRubriqueCompose(rubriqueComposeModify?.id, {...rubriqueCompose, id : rubriqueComposeModify?.id,   noEnseignant :rubriqueComposeModify?.noEnseignant});
        }

        updateModalOpen(false);
    };
    const handleReset = () => {
        updateModalOpen(false);
    };

    return (
        <form
            onSubmit={handleSubmit}
            style={{
                display: "flex",
                flexDirection: "column",
                gap: "2rem",
            }}
        >
            <Typography
                variant="h5"
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                {" "}
                Entrez les informations
            </Typography>
            <Box sx={{ display: "flex", gap: "1rem" }}>
                <TextField
                    label="Désignation"
                    variant="outlined"
                    value={rubriqueCompose.designation}
                    onChange={(e) => updateCurrentRubriqueCompose({...rubriqueCompose, designation : e.target.value})}
                    required
                />
                  <TextField
                    label="Ordre"
                    variant="outlined"
                    value={rubriqueCompose.ordre}
                    onChange={(e) => updateCurrentRubriqueCompose({...rubriqueCompose, ordre : e.target.value})}
                    required
                />
                
            </Box>
            <Box sx={{ display: "flex", justifyContent: "start", gap: "1rem" }}>
                <ButtonComponent
                    text="Valider"
                    type="submit"
                    variant="contained"
                />

                <ButtonComponent
                    text="Annuler"
                    onClick={handleReset}
                    type="reset"
                    variant="contained"
                />
            </Box>
        </form>
    );
};

export default RubriqueComposeForm;
