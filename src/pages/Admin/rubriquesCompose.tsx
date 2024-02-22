import React from "react";
import ListComponent from "../../components/common/List/list";
import { useContext } from "react";
import { RubriqueComposeContext } from "../../context/rubriqueComposeContext";
import {  RUBRIQUE_COLUMNS } from "../../constants";

import RubriqueComposeView from "../../components/RubriqueComposeView";
import RubriqueComposeAdd from "../../components/RubriqueComposeAdd";
import Header from "../../components/Layout/Header";
import Sidebar from "../../components/Layout/sideBar/SidebarPage";
import Alert from "@mui/material/Alert";


const RubriquePage: React.FC = () => {
    const {
     
        rubriqueComposeList,
      
        updateCurrentRubriqueCompose,
        rubriqueComposeListError,
        removeRubriqueCompose,
        deleteRubriqueComposeError,
        modifyRubriqueComposeError,
        updateModifyRubrique
       
       

        
       
    } = useContext(RubriqueComposeContext);

      
    const getR = () =>{
        if(rubriqueComposeList){
            const dat  = rubriqueComposeList;
            return  dat;
        }
        return null;
        
    }
   const dat = getR();

    // Handlers pour les actions

    const handleEdit = (rowData: any) => {
        console.log("Modifier:", rowData);
        updateCurrentRubriqueCompose(rowData);  
        updateModifyRubrique(rowData.designation);  
          
    };

    const handleDelete = (rowData: any) => {
        console.log("Supprimer:", rowData);
        
       // const currentRub = trouverRubriqueCompose(rowData, rubriqueComposeList);
        removeRubriqueCompose(rowData.idRubrique);
        
       
    
    };
    const handleView = (rowData: any) => {
        console.log("vue:", rowData);
        updateCurrentRubriqueCompose(rowData);
  
    };


    return (
        <>
        <Sidebar />
        <Header />
        
        <div>
            <div style={{ textAlign: "center", color: "red" }}>
              
                {rubriqueComposeListError && (
                        <Alert variant="outlined" severity="error" style={{ width: '600px', margin: '0 auto' }}>
                            {rubriqueComposeListError}
                        </Alert>

                    )}

                    {deleteRubriqueComposeError && (
                        <Alert variant="outlined" severity="error" style={{ width: '600px', margin: '0 auto' }}>
                            {deleteRubriqueComposeError}
                        </Alert>

                    )}

                    {modifyRubriqueComposeError && (
                        <Alert variant="outlined" severity="error" style={{ width: '600px', margin: '0 auto' }}>
                            {modifyRubriqueComposeError}
                        </Alert>

                    )}
            </div>

            <ListComponent
             
                details={true}
                detailsElement={
                    <div>
                        <RubriqueComposeView/>
                    </div>
                }
                detailsHandler={handleView}
                title={"Liste des Rubriques Composes"}
                columns={RUBRIQUE_COLUMNS}
                data={dat ? dat.reverse() : []}
                actions={true}
                remove={true}
                deleteHandler={handleDelete}
                modify={true}
                modifyElement={
                    <div>
                        <RubriqueComposeAdd add={false} />
                    </div>
                }
                modifyHandler={handleEdit}
                addElement={
                    <div>
                        <RubriqueComposeAdd add={true} />
                    </div>
                }
                
            />
        </div>
        </>
     
    );
};

export default RubriquePage;
