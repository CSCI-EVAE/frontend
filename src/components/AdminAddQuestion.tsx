import React, { useContext, useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import Select from "./common/Select";
import ButtonComponent from "./common/Button";
import {
    QuestionContext,
    
} from "../context/questionContext";


import { Question } from "../types/questionTypes";
import { RubriqueComposeContext } from "../context/rubriqueComposeContext";
import { RubriqueCompose, questionsInRubrique } from "../types/rubriquesComposeTypes ";
import {  convertirQuestionsEnQuestionsInRubrique, convertirQuestionsInRubriqueEnQuestions } from "../context/rubriqueEnseignantContext";

interface AddProps {
    handleClose : ()=> void
}
const AdminAddQuestion : React.FC <AddProps>= ({handleClose}) => {
   
    const {questionListe} = useContext(QuestionContext);
    const {rubriqueComposeList, currentRubriqueCompose, updateCurrentRubriqueCompose} = useContext(RubriqueComposeContext);
  
    const [selectedQuestionInRubriqueCompose, setSelectedQuestionInRubriqueCompose] = React.useState<string []>([]);

    const [questionsListOptions, setQuestionsListOptions] = useState<{ label: string; value: string; }[]>([]);


  
    const getQuestionsListOptions = (liste1 : Question[] )=> {

        return   liste1.map((question: Question) => ({
               label: `${question.intitule}`,
               value: `${question.intitule}`
           }));
       }

    useEffect(()=>{
        if (currentRubriqueCompose){
            const l1 = convertirQuestionsInRubriqueEnQuestions(currentRubriqueCompose.questions);
            const l2 = questionListe.filter((element: Question) => !l1.some((item: Question) => item.id=== element.id && item.intitule===element.intitule));
        
            
          setQuestionsListOptions(getQuestionsListOptions(l2));

        }
     }, [selectedQuestionInRubriqueCompose, questionListe,rubriqueComposeList, currentRubriqueCompose])

   

    const handleSubmit = () => {
       // e.preventDefault(); 
       
      

            let newQuestions : Question[] = questionListe.filter((element : Question)=> selectedQuestionInRubriqueCompose.some((elementSelect: string )=> element.intitule===elementSelect));

            let newQuestionsInRubrique :questionsInRubrique[] = convertirQuestionsEnQuestionsInRubrique(newQuestions);
            let newRubrique : RubriqueCompose= {...currentRubriqueCompose, questions : currentRubriqueCompose.questions.concat(newQuestionsInRubrique)};
            console.log("newRubrique", newRubrique);
            updateCurrentRubriqueCompose(newRubrique);
          handleClose();




      //  updateModalOpen(false);
    };
    const handleReset = () => {
        handleClose();
    };

 

    return (
        <form
          //  onSubmit={handleSubmit}
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
                <Select
                    label="Choiissiez les questions"
                    options={questionsListOptions} 
                    value={selectedQuestionInRubriqueCompose} 
                    onChange={(value) => setSelectedQuestionInRubriqueCompose(value as string [])}
                    required
                    multiple={true}
                    sx={{ width: "50%" }} // Ajustez la largeur comme vous le souhaitez
                />
            </Box>
           
           
           
            <Box sx={{ display: "flex", justifyContent: "start", gap: "1rem" }}>
                <ButtonComponent
                    text="Valider"
                   // type="submit"
                    variant="contained"
                    onClick={handleSubmit}
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

export default AdminAddQuestion;
