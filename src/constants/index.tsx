import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import WidgetsIcon from '@mui/icons-material/Widgets';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import AllOutIcon from '@mui/icons-material/AllOut';
import AltRouteIcon from '@mui/icons-material/AltRoute';
export const ROLE = {
    admin: "ADM",
    enseigannt: "ENS",
    etudiant: "ETU",
};

export const LIST_ACTIONS = {
    create: "CREATE",
    add: "ADD",
    read: "READ",
    update: "UPDATE",
    delete: "DELETE",
    soumettre: "SOUMETTRE"
};

export const QUALIFICATIF_COLUMNS = [
    { id: "minimal", label: "minimal" },
    { id: "maximal", label: "maximal" },
];

export const Question_COLUMNS = [
    { id: "intitule", label: "intitule" },
    { id: "minimal", label: "minimal" },
    { id: "maximal", label: "maximal" }
];

export const RUBRIQUE_COLUMNS = [
    { id: "designation", label: "designation" },
    //{ id: "ordre", label: "ordre" }
    
];

export const Evalution_Etudiant_COLUMNS = [
    { id: "anneeUniversitaire", label: "annee Universitaire" },
    { id: "codeFormation", label: "Nom Formation" },
    { id: "noEvaluation", label: "Evaluation" },
    { id: "designation", label: "designation" },
    { id: "etat", label: "etat" },
    { id: "periode", label: "periode" },
    { id: "nomEnseignant", label: "nom Enseignant" },
    { id: "debutReponse", label: "debut Reponse" },
    { id: "finReponse", label: "fin Reponse" }
];

export const TYPE_STANDARD ={
    question_standard : "QUS",
    rubrique_standard : "RBS"
}


interface Dashboard {
    id: number;
    icon: React.ReactElement;
    title: string;
    link: string;
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
        icon: <LiveHelpIcon />,
        title: "Essai",
        link: "/dashboard/essai",
    },
];


export const UE_COLUMNS = [
    { id: "anneePro", label: "Promotion" },
    { id: "nomFormation", label: "Formation" },
    { id: "codeUE", label: "UE" },
    { id: "codeEC", label: "EC" },
    { id: "designation", label: "Désignation" },
    { id: "etat", label: "Etat" }
];