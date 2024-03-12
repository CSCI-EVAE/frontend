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
    redirect: "REDIRECT",
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
        value: "Tous",
        label: "Tous",
    },
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
    { id: "siglePromotion", label: "Sigle Promotion" },
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
    { id: "nbhCM", label: "nbh CM" },
    { id: "nbhTD", label: "nbh TD" },
    { id: "nbhTP", label: "nbh TP" },
    { id: "totaleHeures", label: "TOTAL" },
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

export const Enseignant_DASHBOARD: Dashboard[] = [
    {
        id: 1,
        icon: <WidgetsIcon />,
        title: "Menu",
        link: "/dashboard/enseignant/Menu",
    },
    {
        id: 2,
        icon: <AccountTreeIcon />,
        title: "Liste UE",
        link: "/dashboard/enseignant",
    },

    {
        id: 3,
        icon: <AllOutIcon />,
        title: "Rubrique Evaluation",
        link: "/dashboard/enseignant/rubrique-evaluation",
    },
]

export const GENDERS = {
    homme: {
        label: "Homme",
        value: "H",
    },
    femme: {
        label: "Femme",
        value: "F",
    },
}

export const UNIVERSITE_ORIGINE_OPTIONS = [
    { label: "Université Abdelamlek Essaâdi - UAE", value: "UAE" },
    { label: "Université Chouaïb Doukkali - UCD", value: "UCD" },
    { label: "Université Cadi Ayyad - UCAM", value: "UCAM" },
    { label: "Université Hassan 2 Mohamedia - UH2M", value: "UH2M" },
    { label: "Université Ibn Tofail - UIT", value: "UIT" },
    { label: "Université Hassan 1er - UH1", value: "UH1" },
    { label: "Université Ibn Zhor - UIZ", value: "UIZ" },
    { label: "Université Mohamed 5 Agdal - UM5A", value: "UM5A" },
    { label: "Université Sidi Mohammed Ben Abdellah - USMBA", value: "USMBA" },
    // Ajoutez d'autres options pertinentes
]

export const PAYS_OPTIONS = [
    { label: "France", value: "FR" },
    { label: "Maroc", value: "MA" },
    { label: "Tunisie", value: "TU" },
    { label: "Université Hassan 2 Mohamedia", value: "UH2M" },
    { label: "Algérie", value: "AL" },
    { label: "Burkina Faso", value: "BF" },

    // Ajoutez d'autres options pertinentes
]
