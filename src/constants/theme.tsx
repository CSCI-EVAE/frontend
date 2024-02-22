import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#3c768c', // Bleu
    },
    
    secondary: {
      main: '#3c768c', // Rose
    },
    
    info: {
      main: '#008080', // Vert foncé
    },
    background: {
      default: '#fff', // Fond par défaut
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    h1: {
      fontSize: '2rem',
      fontWeight: 600,
    },
    h2: {
      fontSize: '1.5rem',
      fontWeight: 500,
    },
    button: {
      textTransform: 'none', // Pas de transformation de texte
    },
  },
  components: {
    MuiTable: {
      styleOverrides: {
        root: {
          color: 'black', // Couleur du texte du tableau
          background: 'white', // Couleur de fond du tableau
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          color: 'blue', // Couleur du texte de l'en-tête du tableau
          background: '#3c768c', // Couleur de fond de l'en-tête du tableau
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          //color: 'green', // Couleur du texte des lignes du tableau
       //  background: 'lightgreen', // Couleur de fond des lignes du tableau
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
         // color: 'red', // Couleur du texte des cellules du tableau
          //background: 'lightcoral', // Couleur de fond des cellules du tableau
        },
      },
    },
  
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8, // Bord arrondi pour les boutons
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          margin: '8px 0',
          backgroundColor : '#3c768c' // Marge supérieure et inférieure pour les diviseurs
        },
      },
    },
    MuiIconButton : {
      
      styleOverrides:{
        root: {
          color: '#040b69'

        }
      }
    },
    MuiListItemIcon : {
      
      styleOverrides:{
        root: {
          color: '#040b69'

        }
      }
    },
    MuiIcon : {
      
      styleOverrides:{
        root: {
          color: '#040b69'

        }
      }
    },
    
  },
  shape: {
    borderRadius: 8, // Bord arrondi global pour les éléments
  },
  transitions: {
    easing: {
      // Définition des courbes de transition
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
    },
    duration: {
      // Durée des transitions
      shortest: 150,
      shorter: 200,
      short: 250,
      standard: 300,
      complex: 375,
      enteringScreen: 225,
      leavingScreen: 195,
    },
  },
 
});

export default theme;
