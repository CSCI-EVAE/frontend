import React, { createContext, ReactNode, useCallback, useState } from "react";

// Définition du type des props pour ListContextProvider
interface StepContextProviderProps {
    children: ReactNode; // children doit être de type ReactNode
}

// Création du contexte
export const StepContext = createContext<any>(null); // Vous pouvez remplacer 'any' par le type spécifique que vous souhaitez utiliser

// Composant ListContextProvider
export const StepContextProvider: React.FC<StepContextProviderProps> = ({
    children,
}) => {
    const [completed, setCompleted] = React.useState<{
        [k: number]: boolean;
      }>({});
    const [activeStep, setActiveStep] = useState(0);
    const [totalSteps,setTotalSteps]= useState(0);
   

    const handleNext = () => {
        const newActiveStep =
          isLastStep() && !allStepsCompleted()
            ? // It's the last step, but not all steps have been completed,
              // find the first step that has been completed
              [...Array(totalSteps)].findIndex((step, i) => !(i in completed))
            : activeStep + 1;
        updateActiveStep(newActiveStep);
      };
      const handleStep = (step: number) => () => {
        updateActiveStep(step);
      };
      const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
      };
    const updateActiveStep = useCallback((value: number) => {
        setActiveStep(value);
    }, []);
    const updateCompletedStep = useCallback((value: {
        [k: number]: boolean;
    }) => {
        setCompleted(value);
    }, []);
    const completedSteps = () => {
        return Object.keys(completed).length;
      };
      const updateTotalStep = useCallback((value: number) => {
        setTotalSteps(value);
    }, []);

    const isLastStep = () => {
        return activeStep === totalSteps - 1;
      };

      const allStepsCompleted = () => {
        return completedSteps() === totalSteps;
      };
      const handleComplete = () => {
        const newCompleted = completed;
        newCompleted[activeStep] = true;
        setCompleted(newCompleted);
        handleNext();
      };
      const handleReset = () => {
        updateActiveStep(0);
        setCompleted({});
      };
    return (
        <StepContext.Provider
            value={{
                activeStep,
               
                updateActiveStep,
                
                handleNext,
                handleBack,
                completed, updateCompletedStep,completedSteps,
                updateTotalStep,
                totalSteps,
                isLastStep,
                allStepsCompleted,handleStep, handleComplete,handleReset

            }}
        >
            {children}
        </StepContext.Provider>
    );
};

