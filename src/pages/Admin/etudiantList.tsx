import React from "react"
import ListComponent from "../../common/List/list"
import { useContext } from "react"
import { UE_COLUMNS_LISTEtudiant } from "../../constants/index"
import { EtudiantListContext } from "../../context/etudiantListContext"
import { AdjustColumns } from "../../context/etudiantListContext"
import Header from "../../Layout/Header"
import Sidebar from "../../Layout/sideBar/SidebarPage"

const EtudiantListPage: React.FC = () => {
    const {
     etudiantList
    } = useContext(EtudiantListContext);
   
     const dat = etudiantList ? AdjustColumns(etudiantList) : [];
     const handleEdit = (rowData: any) => {
        console.log("Modifier:", rowData)
       
    }

    const handleDelete = (rowData: any) => {
        console.log("Supprimer:", rowData)
       
    } 

    return (
       
     <div>
               <Sidebar />
        <Header />
          
            <ListComponent
                    title={"Liste des etudiants"}
                    columns={UE_COLUMNS_LISTEtudiant}
                    data={dat.reverse()}
                    actions={true}
                    remove={true}
                    deleteHandler={handleDelete}
                    modify={true}
                    modifyElement={
                        <div>
                            <p>Update etudiant</p>
                        </div>
                    }
                    modifyHandler={handleEdit}
                    addElement={
                        <div>
                             <p>creer etudiant</p>
                        </div>
                    }
                />
     </div>  
    );
 }
 
 export default EtudiantListPage;