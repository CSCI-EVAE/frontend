import React, { useState } from "react";
import { TextField, Alert, Container, Paper, Typography, Grid } from "@mui/material";
import ButtonComponent from "./common/Button";
import { useLocation, useNavigate } from "react-router-dom";

const InfoGenerales: React.FC = () => {
  const navigate = useNavigate()
  const { state } = useLocation();
  const infoGenerale = state?.rowDataInfo;

  const [designation, setDesignation] = useState("");
  const [dateDebut, setDateDebut] = useState("");
  const [dateFin, setDateFin] = useState("");
  const [error, setError] = useState("");

  const containerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "2rem",
  };

  const paperStyle: React.CSSProperties = {
    padding: "1.5rem",
    width: "1200px",
    maxWidth: "90%",
  };

  const formStyle: React.CSSProperties = {
    width: "100%",
  };

  const textFieldStyle: React.CSSProperties = {
    marginBottom: "1rem",
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
  
    
    if (!designation || !dateDebut || !dateFin) {
      setError("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    if(dateDebut>dateFin){
        setError("Choisir une date valid : Date de fin inferieur a date de début");
        return;
    }
  
    const infoGenerales = {
      nomFormation: infoGenerale.nomFormation,
      anneePro: infoGenerale.anneePro,
      codeUE: infoGenerale.codeUE,
      codeEC: infoGenerale.codeEC ,
      designation,
      dateDebut,
      dateFin,
    };
  
    localStorage.setItem('formData', JSON.stringify(infoGenerales));
    navigate(`/dashboard/enseignant/rubrique-evaluation`);
    setDesignation("");
    setDateDebut("");
    setDateFin("");
    setError("");
  
    // Supprimer les données du localStorage apres 10 minutes
    setTimeout(() => {
      localStorage.removeItem('formData');
    }, 10 * 60 * 1000);
  };
  

  return (
    <Container style={containerStyle}>
      <Paper elevation={3} style={paperStyle}>
        <Typography variant="h5" gutterBottom>
          Formulaire d'Informations Générales
        </Typography>
        <form onSubmit={handleSubmit} style={formStyle}>
          {error && <Alert severity="error">{error}</Alert>}

          <Grid container spacing={2}>
            <Grid item xs={10} sm={9}>
              <TextField
                label="Formation"
                variant="outlined"
                fullWidth
                value={infoGenerale.nomFormation}
                style={textFieldStyle}
              />
            </Grid>
            <Grid item xs={10} sm={3}>
              <TextField
                label="Promotion"
                variant="outlined"
                fullWidth
                value={infoGenerale.anneePro}
                style={textFieldStyle}
              />
            </Grid>
            <Grid item xs={10} sm={6}>
              <TextField
                label="Unité enseignement"
                variant="outlined"
                fullWidth
                value={infoGenerale.codeUE}
                style={textFieldStyle}
              />
            </Grid>
            <Grid item xs={10} sm={6}>
              <TextField
                label="Unité enseignement"
                variant="outlined"
                fullWidth
                value={infoGenerale.codeEC || "------- Cette évaluation concerne UE --------"}
                style={textFieldStyle}
              />
            </Grid>
            <Grid item xs={10} sm={6}>
              <TextField
                label="Désignation"
                variant="outlined"
                fullWidth
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
                placeholder="Entrez la désignation de l'évaluation"
                style={textFieldStyle}
              />
            </Grid>
           
            <Grid item xs={10} sm={3}>
            <TextField
                label="Date de début"
                type="date" 
                variant="outlined"
                fullWidth
                value={dateDebut}
                onChange={(e) => setDateDebut(e.target.value)}
                InputLabelProps={{
                shrink: true, 
                }}
                style={textFieldStyle}
            />
            </Grid>
            <Grid item xs={10} sm={3}>
            <TextField
                label="Date de fin"
                type="date" 
                variant="outlined"
                fullWidth
                value={dateFin}
                onChange={(e) => setDateFin(e.target.value)}
                InputLabelProps={{
                shrink: true, 
                }}
                style={textFieldStyle}
            />
            </Grid>
            

          

          </Grid>
          <div style={{ textAlign: 'right' }}>
          <ButtonComponent  text="Suivant" type="submit" variant="contained" />
          </div>
        </form>
      </Paper>
    </Container>
  );
};

export default InfoGenerales;
