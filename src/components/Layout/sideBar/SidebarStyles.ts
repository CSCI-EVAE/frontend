import styled from "styled-components";

// Children Component
interface ChildrenProps {
  displaySidebar: boolean;
}

export const Children = styled.div<ChildrenProps>`
  width: 100%;
  height: 100%;
  margin-left: ${({ displaySidebar }) => (displaySidebar ? "15rem" : "5rem")};
  @media (max-width: 468px) {
    margin-left: 5rem;
  }
`;

interface SidebarLogoWrapperProps {
  displaySidebar: boolean;
}


// export const AppBrandLogo = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   max-width: 100%;

//   img {
//     width: 100%; /* Ajustez la taille de l'image */
//     height: auto;
//     transition: all 0.3s ease; /* Ajoutez une transition pour une animation fluide */
//   }

//   &:hover img {
//     width: 90%; /* Ajustez la taille de l'image au survol */
//   }
// `;


export const SidebarLink = styled.a`
text-decoration: none;
color: inherit;
transition: color 0.3s ease, transform 0.2s ease; /* Ajout de la transition pour la transformation */

&:hover {
  color: #5f97ef;
}
`;

export const SidebarListItem = styled.li`
  transition: transform 0.2s ease; /* Ajout de la transition pour la transformation */

  &:hover {
    transform: scale(1.1); /* Augmentation de la taille au survol */
  }
`;

export const SidebarWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  font-size: 0.9rem;
`;

export const SidebarLogoWrapper = styled.div<SidebarLogoWrapperProps>`
  padding: 0.5rem 1rem;
  margin-bottom: 1rem;
  display: flex;
  justify-content: ${({ displaySidebar }) =>
    displaySidebar ? "space-between" : "center"};
  align-items: center;
  @media (max-width: 468px) {
    justify-content: center;
  }
`;

export const SidebarLogo = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 468px) {
    display: none;
  }
`;

interface SidebarBrandProps {
  displaySidebar: boolean;
}

export const SidebarBrand = styled.span<SidebarBrandProps>`
  display: ${({ displaySidebar }) => (displaySidebar ? "block" : "none")};
`;


interface SidebarTogglerProps {
  displaySidebar: boolean;
}

export const SidebarToggler = styled.button<SidebarTogglerProps>`
  cursor: pointer;
  display: ${({ displaySidebar }) => (displaySidebar ? "block" : "none")};
  @media (max-width: 468px) {
    display: block;
  }
`;

// SidebarItem styles
export const ItemsList = styled.ul`
  list-style: none;
`;

export const ItemContainer = styled.li`
  margin-top: 0.5rem;
  width: 100%;
  padding: 0.5rem 0.25rem;
  border-radius: 0.2rem;
  cursor: pointer;
  &:hover {
    background: #eaeced;
  }
  &.active {
    background-color: #dbe4f3;
  }
`;

interface ItemWrapperProps {
  displaySidebar: boolean;
}

export const ItemWrapper = styled.div<ItemWrapperProps>`
  display: flex;
  align-items: center;
  color: #7c7788;
`;

interface ItemNameProps {
  displaySidebar: boolean;
}

export const ItemName = styled.span<ItemNameProps>`
  margin-left: ${({ displaySidebar }) => (displaySidebar ? "0.5rem" : "0")};
  display: ${({ displaySidebar }) => (displaySidebar ? "block" : "none")};
  text-transform: capitalize;
`;

// Sidebar Container
interface SidebarContainerProps {
  displaySidebar: boolean;
}



export const SidebarContainer = styled.div<SidebarContainerProps>`
position: fixed;
top: 0;
left: 0;
width: 100%;
z-index: 9999;
border-bottom: 1px solid #d4d8dd;
overflow-y: hidden;
  width: ${({ displaySidebar }) => (displaySidebar ? "15rem" : "5rem")};
  height: 100vh;
  padding: 0.75rem;
  background: #f3f4f4;
  transition: width 350ms ease;
  border-right: 1imgpx solid #d4d8dd;
  overflow-x: hidden;
  ${({ displaySidebar }) =>
    displaySidebar && "box-shadow: 8px 0px 12px 0px rgba(0,0,0,0.1)"};
  ${ItemWrapper} {
    justify-content: ${({ displaySidebar }) => !displaySidebar && "center"};
  }
  &:hover {
    ${({ displaySidebar }) =>
      !displaySidebar && "box-shadow: 8px 0px 12px 0px rgba(0,0,0,0.1)"};
    @media (min-width: 468px) {
      width: ${({ displaySidebar }) => !displaySidebar && "15rem"};
      ${SidebarLogoWrapper} {
        justify-content: ${({ displaySidebar }) =>
          !displaySidebar && "space-between"};
      }
      ${SidebarBrand} {
        display: ${({ displaySidebar }) => !displaySidebar && "block"};
      }
      ${SidebarToggler} {
        display: ${({ displaySidebar }) => !displaySidebar && "block"};
      }
      ${ItemWrapper} {
        justify-content: ${({ displaySidebar }) =>
          !displaySidebar && "flex-start"};
      }
      ${ItemName} {
        display: ${({ displaySidebar }) => !displaySidebar && "block"};
        margin-left: ${({ displaySidebar }) => !displaySidebar && "0.5rem"};
      }
    }
  }
  ::-webkit-scrollbar {
    width: 4px;
    height: 3px;
  }
  ::-webkit-scrollbar-track {
    border-radius: 10px;
    background-color: transparent;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: #eaeced;
    &:hover {
      background: #d5e0f3;
    }
  }
  @media (max-width: 468px) {
    width: 5rem;
  }
`;
