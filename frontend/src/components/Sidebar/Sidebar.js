import React from 'react';
import styled from 'styled-components';

const SidebarContainer = styled.div`
  width: 240px;
  height: 100vh;
  background-color: #0D0F14;
  color: white;
  position: fixed;
  left: 0;
  top: 0;
  padding-top: 20px;
  display: flex;
  flex-direction: column;
`;

const LogoSection = styled.div`
  margin-bottom: 80px;
`;

const Logo = styled.div`
  font-size: 24px;
  font-weight: bold;
  padding: 0 20px 15px;
  display: flex;
  align-items: center;
`;

const LogoIcon = styled.div`
  background: linear-gradient(to top, #000000, #FF5722);
  color: white;
  width: 32px;
  height: 32px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  font-size: 16px;
`;

const LogoBootstrapIcon = styled.i`
  margin-right: 0;
  font-size: 20px;
`;

const NavSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const NavItem = styled.div`
  padding: 12px 25px;
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  font-size: 16px;
  font-weight: ${props => props.$active ? 'bold' : 'normal'};
  background-color: ${props => props.$active ? '#232631' : 'transparent'};
  border-left: ${props => props.$active ? '4px solid #FF5722' : 'none'};
  padding-left: ${props => props.$active ? '21px' : '25px'};
  
  &:hover {
    background-color: #232631;
  }
`;

const Icon = styled.span`
  margin-right: 12px;
  font-size: 20px;
`;

const BootstrapIcon = styled.i`
  margin-right: 12px;
  font-size: 20px;
`;

const Spacer = styled.div`
  flex: 1;
`;

const Footer = styled.div`
  margin-bottom: 30px;
`;

const Sidebar = () =>
{
  return (
    <SidebarContainer>
      <LogoSection>
        <Logo>
          <LogoIcon>
            <LogoBootstrapIcon className="bi bi-graph-up-arrow"></LogoBootstrapIcon>
          </LogoIcon>
          FinTracker
        </Logo>
      </LogoSection>

      <NavSection>
        <NavItem>
          <BootstrapIcon className="bi bi-wallet"></BootstrapIcon>
          Carteira
        </NavItem>
        <NavItem>
          <BootstrapIcon className="bi bi-search"></BootstrapIcon>
          Explorar
        </NavItem>
        <NavItem>
          <BootstrapIcon className="bi bi-gear"></BootstrapIcon>
          Configurações
        </NavItem>
      </NavSection>

      <Spacer />
      <Footer>
        <NavItem>
          <BootstrapIcon className="bi bi-box-arrow-left"></BootstrapIcon>
          Logout
        </NavItem>
      </Footer>
    </SidebarContainer>
  );
};

export default Sidebar; 