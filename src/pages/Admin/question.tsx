import React from "react";
import ListComponent from "../../components/common/List/list";
import QuestionForm from "../../components/QuestionForm";
import { useContext } from "react";
import { QuestionContext, trouverIdQuestion } from "../../context/questionContext";
import { Question_COLUMNS } from "../../constants";
import {
    supprimerColonnesId,
    
} from "../../context/questionContext";

const QuestionPage: React.FC = () => {
    const {
        questionListe,
        questionListError,
        removeQuestion,
        deleteQuestionError,
        modifyQuestionError,
        updateQuestionintitule,
        updateCoupleQualificatif
    } = useContext(QuestionContext);

   // Données fictives
    const dat = supprimerColonnesId(questionListe);


    const handleEdit = (rowData: any) => {
        console.log("Modifier:", rowData);
        console.log("Intitulé:", rowData.intitule); 
        console.log("intitule",rowData.maximal);

        updateQuestionintitule(rowData.intitule);
       
        updateCoupleQualificatif(`${rowData.maximal}-${rowData.minimal}`);
    };
    

    const handleDelete = (rowData: any) => {
        console.log("Supprimer:", rowData);
        const id_supp = trouverIdQuestion(rowData, questionListe);
        removeQuestion(id_supp);
    };

    return (
        <div>
             <div style={{ textAlign: "center", color: "red" }}>
                {questionListError && questionListError}
                {deleteQuestionError && deleteQuestionError}
                {modifyQuestionError&& modifyQuestionError}
            </div>
            <ListComponent
                title={"Liste des questions"}
                columns={Question_COLUMNS}
                data={dat.reverse()}
                actions={true}
                remove={true}
                deleteHandler={handleDelete}
                modify={true}
                modifyElement={
                    <div>
                        <QuestionForm add={false} />
                    </div>
                }
                modifyHandler={handleEdit}
                addElement={
                    <div>
                        <QuestionForm add={true} />
                    </div>
                }
            /> 
        </div>
    );
};

export default QuestionPage;
