import React, { FC, useState } from 'react';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { Divider , Stack} from '@mui/material';
import { StepContext } from '../context/stepperContext';
import { RubriqueCompose } from '../types/rubriquesComposeTypes ';
import ButtonComponent from './common/Button';
interface QuestionRatingProps {
    rubrique : RubriqueCompose;
    handleSubmit :(rubrique : RubriqueCompose, ratings : any[])=>void;
}
const QuestionRating : FC<QuestionRatingProps>= ({rubrique, handleSubmit}) => {
    const {activeStep, handleBack}= React.useContext(StepContext);

  const [ratings, setRatings] = useState(new Array(rubrique.questions.length).fill(0));

  const handleRatingChange = (index :any, value : any) => {
    const newRatings = [...ratings];
    newRatings[index] = value;
    setRatings(newRatings);
  };

  const handleValidate = () => {
    // Vérification pour s'assurer que toutes les questions ont été évaluées
    for (let i = 0; i < ratings.length; i++) {
      if (ratings[i] === 0) {
        alert('Veuillez répondre à toutes les questions.');
        return;
      }
    }
    // Soumettre les évaluations
    console.log('Évaluations soumises :', ratings);
    handleSubmit(rubrique,ratings);
    setRatings(new Array(rubrique.questions.length).fill(0));
   // handleComplete();
  };

  return (
    
    <div
    style={{
     maxWidth: "90%",
       margin: "auto",
      display: "flex",
       flexDirection: "column",
    //   alignItems: "center",
    }}
  >
    <Typography style={{ marginBottom: '32px' }} variant="h4" gutterBottom>
      {rubrique.designation}
    </Typography>
    {rubrique.questions.map((questionItem, index) => (
      <div key={index} style={{ marginBottom: '20px' }}>
       
        <Stack direction="row" alignItems="center" justifyContent="space-around" spacing={2}>
        <Typography variant="body1" gutterBottom>
          {questionItem.intitule}
        </Typography>
        <div  style={{
    // maxWidth: "90%",
      // margin: "auto",
       display: "flex",
       flexDirection: "row",
       alignItems: "center",
    }}>
          <Typography style={{ marginRight: '48px' }} variant="body1">{questionItem.minimal}</Typography>
          
          <Rating
            name={`rating-${index}`}
            value={ratings[index]}
            onChange={(event, value) => handleRatingChange(index, value)}
            precision={1}
          />
          <Typography style={{ marginLeft: '48px' }} variant="body1">{questionItem.maximal}</Typography>
          </div>
        </Stack>
        {index !== rubrique.questions.length - 1 && <Divider />}
      </div>
    ))}
     <div style={{ display: "flex", justifyContent: "space-between", marginTop: '20px' }}>
    <ButtonComponent text='Retour' variant="contained" onClick={handleBack} disabled={activeStep === 0} />
    <ButtonComponent text='Suivant' variant="contained" onClick={handleValidate} />
  </div>
  </div>
  );
};

export default QuestionRating;
