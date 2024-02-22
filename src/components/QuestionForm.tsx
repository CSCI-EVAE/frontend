import React, { useContext, useEffect } from "react";
import { TextField, Box, Typography } from "@mui/material";
import Select from "./common/Select";
import ButtonComponent from "./common/Button";
import {
    QuestionContext,
    trouverIdQuestion,
} from "../context/questionContext";
import { ListContext } from "../context/listContext";
import { QualificatifContext } from "../context/qualificatifContext";
import { Qualificatif } from "../types/qualificatifTypes";
import { TYPE_STANDARD } from "../constants";
interface questionFormProps {
    add: boolean; 
}

const QuestionForm: React.FC<questionFormProps> = ({ add }) => {
    
    const {
        questionListe,
        questionintitule,
        updateQuestionintitule,
        addNewQuestion,
        modifyQuestion,
        coupleQualificatif
        
    } = useContext(QuestionContext);
  
    const {
        qualificatifList
    }  = useContext(QualificatifContext);

    const [selectedQualificatif, setSelectedQualificatif] = React.useState<string >(coupleQualificatif);
    useEffect(()=>{
        setSelectedQualificatif(coupleQualificatif);
    },[coupleQualificatif])
    //  const [initialIntitule, setInitialIntitule] = useState<any | undefined>(undefined);
  
        const transformedQuestionListe = qualificatifList.map((qualificatif: Qualificatif) => ({
            label: `${qualificatif.maximal}-${qualificatif.minimal}`,
            value: `${qualificatif.maximal}-${qualificatif.minimal}`,
            idLabel: "ID qualificatif", 
            idValue: qualificatif.id 
        }));
    
    const { updateModalOpen, selectedRow } = useContext(ListContext);


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (add === true) {
            const selectedQualificatifObj = transformedQuestionListe.find((item: { value: string | number; }) => item.value === selectedQualificatif);
            addNewQuestion({
                
                idQualificatif: { id: selectedQualificatifObj.idValue},
                noEnseignant: null,
                 type: TYPE_STANDARD.question_standard,
                 intitule: questionintitule,
            });
        } else {
            const id = trouverIdQuestion(selectedRow, questionListe);
          //  const intitul = trouverIntitule(selectedRow, questionListe);
          
           const selectedQualificatifObj = transformedQuestionListe.find((item: { value: string | number; }) => item.value === selectedQualificatif);

            modifyQuestion(id, {
                idQualificatif: { id: selectedQualificatifObj.idValue },
                noEnseignant: null,
                type: TYPE_STANDARD.question_standard,
                intitule: questionintitule,
            });
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
                label="Intitulֹé"
                variant="outlined"
                value={questionintitule}
                onChange={(e) => updateQuestionintitule(e.target.value)}
                required
                //sx={{ width: "50%" }} // Ajustez la largeur comme vous le souhaitez
            />
            </Box>
          
            <Box sx={{ display: "flex", gap: "1rem" }}>
    <Select
        label="Qualificatifs"
        options={transformedQuestionListe} 
        value={selectedQualificatif} 
        onChange={(value) => setSelectedQualificatif(value as string)}
        required
        multiple={false}
      //  sx={{ width: "50%" }} // Ajustez la largeur comme vous le souhaitez
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

export default QuestionForm;

