

import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
 import Header from './Header';
 import { isAuthenticated, userInfos } from "../../utils/authUtils";
 import { useEffect, useState } from 'react';
 import { ADMIN_DASHBOARD, ROLE } from '../../constants';
 import { useNavigate } from 'react-router-dom';

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);
const item = {
    py: '2px',
    px: 3,
    color: 'rgba(255, 255, 255, 0.7)',
    '&:hover, &:focus': {
      bgcolor: 'rgba(255, 255, 255, 0.08)',
    },
  };
  
  const itemCategory = {
    boxShadow: '0 -1px 0 rgb(255,255,255,0.1) inset',
    py: 1.5,
    px: 3,
  };
export default function MiniDrawer() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
    const isAuth = isAuthenticated();
  const [role, setRole] = useState("");

  useEffect(() => {
      if (isAuth) {
          setRole(userInfos().role);
      }
  }, [isAuth]);
  const navigate = useNavigate();
  const myTheme  = useTheme();
  React.useEffect(() => {
    const handleDrawerCloseClickOutside = (event: MouseEvent) => {
      const drawer = document.getElementById('drawer'); // Ajoutez une ID à votre drawer
  
      // Vérifiez si le drawer existe et si le clic est en dehors du drawer
      if (drawer && !drawer.contains(event.target as Node) && open) {
        handleDrawerClose();
      }
    };
  
    // Ajoutez un écouteur d'événement pour les clics sur le document entier
    document.addEventListener('mousedown', handleDrawerCloseClickOutside);
  
    return () => {
      // Retirez l'écouteur d'événement lors du démontage du composant
      document.removeEventListener('mousedown', handleDrawerCloseClickOutside);
    };
  }, [open]); // Écoutez les changements d'état de 'open'
  

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      
      <AppBar position="fixed" open={open} 
      sx={{backgroundColor : myTheme.palette.secondary.main}}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 2,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Header/>
        </Toolbar>
      </AppBar>
      <Drawer 
       id="drawer"
       sx={{
        '& .MuiDrawer-paper': {
          backgroundColor: myTheme.palette.secondary.main, // Définir la couleur de fond en bleu
        }
      }}
       
        variant="permanent" open={open}>
         <DrawerHeader
         
         >
         <Box mb={2}>
                         <img
                             src="https://upload.wikimedia.org/wikipedia/fr/thumb/5/51/Universit%C3%A9_de_Bretagne_occidentale_%28logo%29.svg/1280px-Universit%C3%A9_de_Bretagne_occidentale_%28logo%29.svg.png"
                             alt="Logo"
                             width="100"
                         />
                     </Box>
           <IconButton onClick={handleDrawerClose}>
             {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
           </IconButton>
         </DrawerHeader>
        <Divider />
        
        <List>
             {isAuth && role===ROLE.admin && (
                 ADMIN_DASHBOARD.map((element, index)=> (
                     <ListItem key={index} disablePadding sx={{...item, ...itemCategory,  display: 'block' }}>
               <ListItemButton 
              // selected={true}
               sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
               onClick={() => {
                     navigate(element.link);
                     handleDrawerClose();
                 }}>
                     <ListItemIcon
                     sx={{
                        minWidth: 0,
                        mr: open ? 3 : 'auto',
                        justifyContent: 'center',
                      }}
                      >
                         {element.icon}
                     </ListItemIcon>
                     <ListItemText primary={element.title} sx={{ opacity: open ? 1 : 0 }} />
                 </ListItemButton>
                 
             </ListItem>
                 ))
             )}

         </List>
         
        <Divider />
       
        
      </Drawer>
      
    </Box>
  );
}
