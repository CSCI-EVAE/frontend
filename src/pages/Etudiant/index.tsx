// const Etudiant = () => {
//     return <div>Etudiant</div>;
// };
// export default Etudiant;

import React from 'react';
import { Container,  Typography } from '@mui/material';
import Header from '../../components/Layout/Header';


function BigMenu() {


    return (
        <>
        <Header />
        <Container maxWidth="lg" >
            <Typography variant="h4" align="center" gutterBottom>
                List
            </Typography>
            

        </Container>
        </>
    );
}

export default BigMenu;
