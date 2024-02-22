import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./components/Layout/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Logout from "./components/Logout"; // Adjust the import path based on your file structure
import { Box } from "@mui/material";
import Page404 from "./pages/Page404";

import Sidebar from "./components/Layout/Sidebar";
import { ThemeProvider } from '@mui/material/styles';
import theme from "./constants/theme";

function App() {
   



    return (
        <ThemeProvider theme={theme}>
        <div className="App">
            {/* <Header /> */}
            <Sidebar/>
            <Box sx={{ marginBottom: "128px" }}></Box>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/logout" element={<Logout />} />
              
                    <Route
                        path="/dashboard/*"
                        element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        }
                    />
            
                {/* other routes */}
                <Route path="/404" element={<Page404 />} />
                        <Route path="*" element={<Page404 />} />
            </Routes>
            
        </div>
        </ThemeProvider>
    );
}

export default App;
