import LiveHelpIcon from "@mui/icons-material/LiveHelp"
import WidgetsIcon from "@mui/icons-material/Widgets"
import AccountTreeIcon from "@mui/icons-material/AccountTree"
import AllOutIcon from "@mui/icons-material/AllOut"
import AltRouteIcon from "@mui/icons-material/AltRoute"
import { FormatListBulleted, List } from "@mui/icons-material"

export const API_URL = "http://localhost:8080/api/v1"

export const ROLE = {
    admin: "ADM",
    enseigannt: "ENS",
    etudiant: "ETU",
}

export const LIST_ACTIONS = {
    create: "CREATE",
    add: "ADD",
    read: "READ",
    update: "UPDATE",
    delete: "DELETE",
    soumettre: "SOUMETTRE",
    addRubriqueStandard: "ADD_RUBRIQUE_STANDARD",
}

export const LIST_ACTIONS_ETUDIANT = {
    read: "READ",
    answer: "ANSWER",
}

export const LIST_Etat = {
    ELA: {
        value: "ELA",
        label: "En cours d'elaboration",
    },
    DIS: {
        value: "DIS",
        label: "Mise a disposition",
    },
    CLO: {
        value: "CLO",
        label: "Cloturé",
    },
    AN: {
        value:"Tous",
        label: "Tous"
    }
    
    

}
export const LIST_Etat_Etudiant = {
    DIS: {
        value: "DIS",
        label: "Mise a disposition",
    },
    CLO: {
        value: "CLO",
        label: "Cloturé",
    },
}

export const QUALIFICATIF_COLUMNS = [
    { id: "minimal", label: "minimal" },
    { id: "maximal", label: "maximal" },
]

export const Question_COLUMNS = [
    { id: "intitule", label: "intitule" },
    { id: "minimal", label: "minimal" },
    { id: "maximal", label: "maximal" },
]

export const RUBRIQUE_COLUMNS = [
    { id: "designation", label: "designation" },
    //{ id: "ordre", label: "ordre" }
]

export const PROMOTION_ADMIN_COLUMNS = [
    { id: "codeFormation", label: "Code Formation" },
    { id: "anneeUniversitaire", label: "Année Universitaire" },
    { id: "siglePromotion", label:"Sigle Promotion"}  
]

export const Evalution_Etudiant_COLUMNS = [
    { id: "anneeUniversitaire", label: "annee Universitaire" },
    { id: "codeFormation", label: "Nom Formation" },
    { id: "noEvaluation", label: "Evaluation" },
    { id: "designation", label: "designation" },
    { id: "etat", label: "etat" },
    { id: "periode", label: "periode" },
    { id: "nomEnseignant", label: "nom Enseignant" },
    { id: "debutReponse", label: "debut Reponse" },
    { id: "finReponse", label: "fin Reponse" },
]

export const UE_COLUMNS_FILTER_Etudiant = [
    { id: "codeFormation", label: "Nom Formation" },
    { id: "noEvaluation", label: "Evaluation" },
    { id: "designation", label: "designation" },
    { id: "periode", label: "periode" },
    { id: "nomEnseignant", label: "nom Enseignant" },
]

export const TYPE_STANDARD = {
    question_standard: "QUS",
    rubrique_standard: "RBS",
}

interface Dashboard {
    id: number
    icon: React.ReactElement
    title: string
    link: string
}

export const ADMIN_DASHBOARD: Dashboard[] = [
    {
        id: 1,
        icon: <WidgetsIcon />,
        title: "Menu",
        link: "/dashboard/admin",
    },
    {
        id: 2,
        icon: <LiveHelpIcon />,
        title: "Questions",
        link: "/dashboard/questions",
    },
    {
        id: 3,
        icon: <AltRouteIcon />,
        title: "Qualificatifs",
        link: "/dashboard/qualificatif",
    },
    {
        id: 4,
        icon: <AllOutIcon />,
        title: "Rubriques",
        link: "/dashboard/rubrique",
    },
    {
        id: 5,
        icon: <AccountTreeIcon />,
        title: "Rubriques Composées",
        link: "/dashboard/rubriquecompose",
    },

    {
        id: 6,
        icon: <List />,
        title: "Promotions",
        link: "/dashboard/promotions",
    },
]

export const ENSEIGNANT_DASHBOARD: Dashboard[] = [
    {
        id: 1,
        icon: <WidgetsIcon />,
        title: "Menu",
        link: "/dashboard/enseignant",
    },
    {
        id: 2,
        icon: <FormatListBulleted />,
        title: "Unités d'enseignement",
        link: "/dashboard/enseignant/unitésEnseignement",
    },
    {
        id: 3,
        icon: <AltRouteIcon />,
        title: "Promotions",
        link: "/dashboard/enseignant/Promotion",
    },
    
  
]

export const UE_COLUMNS = [
   
    { id: "codeFormation", label: "Formation" },
    { id: "codeUE", label: "UE" },
    { id: "codeEC", label: "EC" },
    { id: "nbhCM", label: "nbh CM"},
    { id: "nbhTD", label: "nbh TD"},
    { id: "nbhTP", label: "nbh TP"},
    { id: "totaleHeures", label: "TOTAL"},
    { id: "designation", label: "Désignation" },
    { id: "etat", label: "Etat" },

]
export const UE_COLUMNS_FILTER = [
    { id: "anneePro", label: "Promotion" },
    { id: "nomFormation", label: "Formation" },
    { id: "codeUE", label: "UE" },
    { id: "codeEC", label: "EC" },
    { id: "designation", label: "Désignation" },
]

