import React from "react";
import ListComponent from "../../components/common/List/list";
import QualificatifForm from "../../components/QualificatifForm";
import { useContext } from "react";
import { QualificatifContext } from "../../context/qualificatifContext";
import { QUALIFICATIF_COLUMNS } from "../../constants";
import {
    supprimerColonnesId,
    trouverIdQualificatif,
} from "../../context/qualificatifContext";
import Header from "../../components/Layout/Header";
import Sidebar from "../../components/Layout/sideBar/SidebarPage";
import Alert from "@mui/material/Alert";


const QualificatifPage: React.FC = () => {
    const {
        qualificatifList,
        qualificatifListError,
        removeQualificatif,
        deleteQualificatifError,
        modifyQualificatifError,
        updateQualificatifMaximal,
        updateQualificatifMinimal,
    } = useContext(QualificatifContext);


    // Données fictives
    const dat = supprimerColonnesId(qualificatifList);

    // Handlers pour les actions

    const handleEdit = (rowData: any) => {
        console.log("Modifier:", rowData);
        updateQualificatifMinimal(rowData.minimal);
        updateQualificatifMaximal(rowData.maximal);
    };

    const handleDelete = (rowData: any) => {
        console.log("Supprimer:", rowData);
        const id_supp = trouverIdQualificatif(rowData, qualificatifList);
        removeQualificatif(id_supp);
    };

    return (
        <>
        <Sidebar />
            <Header />
            
            <div>
                <div style={{ textAlign: "center", color: "red" }}>
                    {qualificatifListError && (
                        <Alert variant="outlined" severity="error" style={{ width: '600px', margin: '0 auto' }}>
                            {qualificatifListError}
                        </Alert>

                    )}

                    {deleteQualificatifError && (
                        <Alert variant="outlined" severity="error" style={{ width: '600px', margin: '0 auto' }}>
                            {deleteQualificatifError}
                        </Alert>

                    )}

                    {modifyQualificatifError && (
                        <Alert variant="outlined" severity="error" style={{ width: '600px', margin: '0 auto' }}>
                            {modifyQualificatifError}
                        </Alert>

                    )}



                </div>
                <ListComponent

                    title={"Liste des qualificatifs"}
                    columns={QUALIFICATIF_COLUMNS}
                    data={dat.reverse()}
                    actions={true}
                    remove={true}
                    deleteHandler={handleDelete}
                    modify={true}
                    modifyElement={
                        <div>
                            <QualificatifForm add={false} />
                        </div>
                    }
                    modifyHandler={handleEdit}
                    addElement={
                        <div>
                            <QualificatifForm add={true} />
                        </div>
                    }
                />
            </div>
        </>
    );
};

export default QualificatifPage;
