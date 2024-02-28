import React from "react"
import ListComponent from "../../common/List/list"
import QuestionForm from "../../components/QuestionForm"
import { useContext } from "react"
import {
    QuestionContext,
    trouverIdQuestion,
} from "../../context/questionContext"
import { Question_COLUMNS } from "../../constants"
import { supprimerColonnesId } from "../../context/questionContext"
import Header from "../../Layout/Header"
import Sidebar from "../../Layout/sideBar/SidebarPage"

const QuestionPage: React.FC = () => {
    const {
        questionListe,
        removeQuestion,

        updateQuestionintitule,
        updateCoupleQualificatif,
    } = useContext(QuestionContext)

    // Données fictives
    const dat = supprimerColonnesId(questionListe)

    const handleEdit = (rowData: any) => {
        updateQuestionintitule(rowData.intitule)

        updateCoupleQualificatif(`${rowData.maximal}-${rowData.minimal}`)
    }

    const handleDelete = (rowData: any) => {
        console.log("Supprimer:", rowData)
        const id_supp = trouverIdQuestion(rowData, questionListe)
        removeQuestion(id_supp)
    }

    return (
        <>
            <Sidebar />
            <Header />

            <div>
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
        </>
    )
}

export default QuestionPage
