import React, { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {  isTokenValid, logout } from '../../utils/authUtils';

interface Props {
  children : ReactNode
}

const TokenExpirationWrapper: React.FC<Props> = ({ children }) => {
  const navigate = useNavigate();
    //const token = userInfos().token;
    //const {token }= useContext(AuthContext);
    const token = localStorage.getItem("jwtToken") || "";

   // const token = getToken();

  useEffect(() => {
  

    if (!isTokenValid(token)) {
        logout();
      // Rediriger vers la page de connexion
      navigate('/login');
    }
  }, [navigate,token]);

  return <>{children}</>;
};

export default TokenExpirationWrapper;
