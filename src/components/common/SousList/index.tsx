import React from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";

const EvaluationList = () => {
  const mockEvaluationData = {
    success: true,
    message: "Operation successful",
    data: {
      id: 1,
      designation: "Mock Evaluation",
      debutReponse: "2022-02-19",
      finReponse: "2022-02-28",
      rubriqueEvaluations: [
        {
          id: 1,
          designation: "Rubrique 1",
          ordre: 1,
          questionEvaluations: [
            {
              id: 1,
              intitule: "Question 1.1",
              ordre: 1,
            },
            {
              id: 2,
              intitule: "Question 1.2",
              ordre: 2,
            },
          ],
        },
        {
          id: 2,
          designation: "Rubrique 2",
          ordre: 2,
          questionEvaluations: [
            {
              id: 3,
              intitule: "Question 2.1",
              ordre: 1,
            },
            {
              id: 4,
              intitule: "Question 2.2",
              ordre: 2,
            },
          ],
        },
      ],
    },
  };

  const { data } = mockEvaluationData;

  return (
    <List
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader" sx={{ fontSize: "18px", fontWeight: "bold" }}>
          {data.designation}
        </ListSubheader>
      }
    >
      {data.rubriqueEvaluations.map((rubrique) => (
        <div key={rubrique.id}>
          <ListItemButton sx={{ background: "#f0f0f0", borderRadius: "4px", margin: "4px 0" }}>
            <ListItemText primary={`Rubrique: ${rubrique.designation}`} sx={{ fontWeight: "bold" }} />
          </ListItemButton>
          <List sx={{ pl: 4 }}>
            {rubrique.questionEvaluations.map((question) => (
              <ListItemButton key={question.id} sx={{ background: "#fafafa", borderRadius: "4px", margin: "4px 0" }}>
                <ListItemText primary={`Question: ${question.intitule}`} sx={{ fontStyle: "italic" }} />
              </ListItemButton>
            ))}
          </List>
        </div>
      ))}
    </List>
  );
};

export default EvaluationList;
