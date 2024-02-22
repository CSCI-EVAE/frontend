import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../utils/authUtils";

const Logout: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        logout(); // Clear authentication token and user data
        navigate("/login"); // Redirect to login page
    }, [navigate]);

    // Optionally, display a loading message or spinner here
    return <div>Logging out...</div>;
};

export default Logout;
