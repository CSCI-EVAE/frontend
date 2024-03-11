import React, { useEffect, useState } from "react";
import {
  Children,
  SidebarContainer,
  SidebarWrapper,
  SidebarLogoWrapper,
  SidebarToggler,
  SidebarLink,
  SidebarListItem
} from "./SidebarStyles";
import { isAuthenticated, userInfos } from "../../utils/authUtils";
// import { useNavigate } from "react-router-dom";
import { ENSEIGNANT_DASHBOARD, ROLE } from "../../constants";



const SideBarEnseignant: React.FC = () => {


  const [displaySidebar, setDisplaySidebar] = useState(false);
  const isHovered = useState(false);
  const [role, setRole] = useState("");
  // const navigate = useNavigate();
  const isAuth = isAuthenticated();

  useEffect(() => {
    if (isAuth) {
        setRole(userInfos().role);
    }
}, [isAuth]);

  const handleSidebarDisplay = (isVisible: boolean) => {
    if (!isHovered) {
      setDisplaySidebar(isVisible);
    }
  };

  return (
    <>
      <style>
        {`
          // /* Ajoutez vos styles personnalisés ici */
         
          .sidebar-container {
            width: 11rem; 
            height: 100vh; 
            transition: width 0.3s ease; 
            position: fixed;
            top: 0;
            left: 0;
            /* Ajustez la valeur selon vos besoins */
            /* Autres styles */
          }          
          
          .sidebar-list {
            width: 100%;
            padding: 1rem;
            overflow-y: hidden;
          }
          

          .sidebar-list {
            width: 100%;
            padding: 0.5rem 1rem; 
            overflow-y: hidden;
          }
          .sidebar-item {
            display: flex;
            align-items: center; 
            padding: 0.5rem;
            font-size: 1rem;
            margin-bottom: 3rem;
          }
          

          .sidebar-icon {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-right: 1rem;
            font-size: 1.5rem;
            height: 100%; 
          }
          


          * {
          margin: 0;
          padding: 0;
          -webkit-box-sizing: border-box;
          box-sizing: border-box;
          outline: none;
          border: none;
          text-decoration: none;
          font-family: "IBM Plex Sans", -apple-system, BlinkMacSystemFont, "Segoe UI",
            "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
            sans-serif;
        }

        #main {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: row;
        }

        .btn {
          margin: 1rem 1rem 0 0;
          padding: 0.25rem 0.5rem;
          display: flex;
          gap: 0.25rem;
          align-items: center;
          justify-content: center;
          background: transparent;
          outline: none;
          border: 1px solid #808080;
          border-radius: 3px;
          cursor: pointer;
          transition: all 0.2s ease-in-out;
        }

        .btn:hover {
          background-color: #e4e3e34d;
        }

        #page {
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          text-transform: capitalize;
          font-size: 1rem;
          overflow: hidden;
        }

        @media screen and (min-width: 468px) {
          #page {
            font-size: 3rem;
          }

          .btn {
            padding: 0.5rem 0.75rem;
            gap: 0.5rem;
          }
        }

        .app__brand__text {
          font-size: 2rem;
          font-weight: 700;
          color: #5a8dee;
          margin-left: 0.5rem;
        }

        /* Sidebar toggle button starts */
        .outer__circle {
          position: relative;
          width: 1.5rem;
          height: 1.5rem;
          border-radius: 50%;
          background-color: #5f97ef;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .outer__circle::after {
          position: absolute;
          top: 0.225rem;
          left: 0.215rem;
          content: "";
          width: 1.1rem;
          height: 1.1rem;
          border-radius: 50%;
          background-color: #fff;
        }

        .inner__circle {
          position: relative;
          width: 0.75rem;
          height: 0.75rem;
          border-radius: 50%;
          background-color: #5f97ef;
          z-index: 100;
        }

        .inner__circle::after {
          position: absolute;
          top: 0.125rem;
          left: 0.15rem;
          content: "";
          width: 0.5rem;
          height: 0.5rem;
          border-radius: 50%;
          background-color: #fff;
        }

        `}
      </style>
      <SidebarContainer
        displaySidebar={displaySidebar}
        className="sidebar-container"
        onMouseEnter={() => handleSidebarDisplay(true)}
        onMouseLeave={() => handleSidebarDisplay(false)}
      >
        <SidebarWrapper>
          <SidebarLogoWrapper displaySidebar={displaySidebar}>
  {/* <span className="app-brand-logo demo" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}> */}
  {/* <AppBrandLogo>
      <img src="./echoSim.png" alt="Brand logo" />
    </AppBrandLogo>  </span> */}
  {/* <SidebarBrand
    displaySidebar={displaySidebar}
    className="app__brand__text"
  >  EchoSim
  </SidebarBrand> */}


            {/* Logo wrapper ends */}
            {/* Toggle button */}
            <SidebarToggler
              displaySidebar={displaySidebar}
              onClick={() => handleSidebarDisplay(!displaySidebar)}
            >
             
            </SidebarToggler>
          </SidebarLogoWrapper>
          
        
 

<ul className="sidebar-list" style={{ justifyContent: 'center', alignItems: 'center', marginTop: '6rem' }}>
            {isAuthenticated() && role === ROLE.enseigannt && (
              ENSEIGNANT_DASHBOARD.map((element, index)=> (
                <SidebarLink key={index} href={element.link} className="sidebar-link">
                  <SidebarListItem className="sidebar-item">
                  <span className="sidebar-icon" style={{ color: '#3c768c' }}>{element.icon}</span>
                    <span>{element.title}</span>
                  </SidebarListItem>
                </SidebarLink>
              ))
            )}
          </ul>



        </SidebarWrapper>
      </SidebarContainer>
      {/* Render the children */}
      <Children displaySidebar={displaySidebar}></Children>
    </>
  );
};

export default SideBarEnseignant;
