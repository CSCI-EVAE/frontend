import React from "react"
import ListComponent from "../../common/List/list"
import { useContext } from "react"
import { RubriqueComposeContext } from "../../context/rubriqueComposeContext"
import { RUBRIQUE_COLUMNS } from "../../constants"

import RubriqueComposeView from "../../components/RubriqueComposeView"
import RubriqueComposeAdd from "../../components/RubriqueComposeAdd"
import Header from "../../Layout/Header"
import Sidebar from "../../Layout/sideBar/SidebarPage"

const RubriquePage: React.FC = () => {
    const {
        rubriqueComposeList,

        updateCurrentRubriqueCompose,

        removeRubriqueCompose,

        updateModifyRubrique,
    } = useContext(RubriqueComposeContext)

    const getR = () => {
        if (rubriqueComposeList) {
            const dat = rubriqueComposeList
            return dat
        }
        return null
    }
    const dat = getR()

    // Handlers pour les actions

    const handleEdit = (rowData: any) => {
        console.log("Modifier:", rowData)
        updateCurrentRubriqueCompose(rowData)
        updateModifyRubrique(rowData.designation)
    }

    const handleDelete = (rowData: any) => {
        console.log("Supprimer:", rowData)

        // const currentRub = trouverRubriqueCompose(rowData, rubriqueComposeList);
        removeRubriqueCompose(rowData.idRubrique)
    }
    const handleView = (rowData: any) => {
        console.log("vue:", rowData)
        updateCurrentRubriqueCompose(rowData)
    }

    return (
        <>
            <Sidebar />
            <Header />

            <div>
                <ListComponent
                    details={true}
                    detailsElement={
                        <div>
                            <RubriqueComposeView />
                        </div>
                    }
                    detailsHandler={handleView}
                    title={"Liste des rubriques composées"}
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
    )
}

export default RubriquePage
