import React from "react";
import ListComponent from "../../components/common/List/list";
import RubriqueForm from "../../components/RubriqueForm";
import { useContext } from "react";
import { RubriqueContext, trierParOrdre } from "../../context/rubriqueContext";
import {  RUBRIQUE_COLUMNS } from "../../constants";
import {
    supprimerColonnesId,
    trouverRubrique
} from "../../context/rubriqueContext";
import Header from "../../components/Layout/Header";
import Sidebar from "../../components/Layout/sideBar/SidebarPage";
import Alert from "@mui/material/Alert";


const RubriquePage: React.FC = () => {
    const {
        rubriqueList,
        rubriqueListError,
        removeRubrique,
        deleteRubriqueError,
        modifyRubriqueError,
        updateCurrentRubrique,
        addRubriqueSucces,
        deleteRubriqueSucces,
        modifyRubriqueSucces
        
       
    } = useContext(RubriqueContext);

  

    
    
    // Données fictives
    
    const getR = () =>{
        if(rubriqueList){
            const dat = supprimerColonnesId(trierParOrdre(rubriqueList));
            return  dat;
        }
        return null;
        
    }
   const dat = getR();

    // Handlers pour les actions

    const handleEdit = (rowData: any) => {
        console.log("Modifier:", rowData);
        updateCurrentRubrique(rowData);
        
        
    };

    const handleDelete = (rowData: any) => {
        console.log("Supprimer:", rowData);
        
        const currentRub = trouverRubrique(rowData, rubriqueList);
        removeRubrique(currentRub?.id);
        
       
    
    };

    return (
        <>
        <Sidebar />
        <Header />
        
        <div>

        <div style={{ textAlign: "center", color: "green" }}>
                    {addRubriqueSucces && (
                        <Alert severity="success" variant="outlined" style={{ width: '600px', margin: '0 auto' }}>
                            {addRubriqueSucces}
                        </Alert>

                    )}

                    

                    {deleteRubriqueSucces && (
                        <Alert  variant="outlined" severity="success" style={{ width: '600px', margin: '0 auto' }}>
                            {deleteRubriqueSucces}
                        </Alert>

                    )}

                    {modifyRubriqueSucces && (
                        <Alert variant="outlined" severity="success" style={{ width: '600px', margin: '0 auto' }}>
                            {modifyRubriqueSucces}
                        </Alert>

                    )}



                </div>
            <div style={{ textAlign: "center", color: "red" }}>
                
                {rubriqueListError && (
                        <Alert variant="outlined" severity="error" style={{ width: '600px', margin: '0 auto' }}>
                            {rubriqueListError}
                        </Alert>

                    )}

                    {deleteRubriqueError && (
                        <Alert variant="outlined" severity="error" style={{ width: '600px', margin: '0 auto' }}>
                            {deleteRubriqueError}
                        </Alert>

                    )}

                    {modifyRubriqueError && (
                        <Alert variant="outlined" severity="error" style={{ width: '600px', margin: '0 auto' }}>
                            {modifyRubriqueError}
                        </Alert>

                    )}
            </div>
            <ListComponent
             
            
                title={"Liste des Rubriques"}
                columns={RUBRIQUE_COLUMNS}
                data={dat ? dat.reverse() : []}
                actions={true}
                remove={true}
                deleteHandler={handleDelete}
                modify={true}
                modifyElement={
                    <div>
                        <RubriqueForm add={false} />
                    </div>
                }
                modifyHandler={handleEdit}
                addElement={
                    <div>
                        <RubriqueForm add={true} />
                    </div>
                }
                
            />
        </div>
        </>
   
    );
};

export default RubriquePage;
