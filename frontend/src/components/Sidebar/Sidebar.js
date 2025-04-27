import React from 'react';
import styled from 'styled-components';

const SidebarContainer = styled.div`
  width: 240px;
  height: 100vh;
  background-color: #0A1929;
  color: white;
  position: fixed;
  left: 0;
  top: 0;
  padding-top: 20px;
  display: flex;
  flex-direction: column;
`;

const Logo = styled.div`
  font-size: 24px;
  font-weight: bold;
  padding: 0 20px 30px;
  margin-bottom: 20px;
  border-bottom: 1px solid #1E3A5F;
`;

const NavItem = styled.div`
  padding: 12px 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  font-weight: ${props => props.$active ? 'bold' : 'normal'};
  background-color: ${props => props.$active ? '#1E3A5F' : 'transparent'};
  border-left: ${props => props.$active ? '4px solid #4CAEEF' : 'none'};
  padding-left: ${props => props.$active ? '16px' : '20px'};
  
  &:hover {
    background-color: #1E3A5F;
  }
`;

const Icon = styled.span`
  margin-right: 12px;
  font-size: 18px;
`;

const Sidebar = () =>
{
  return (
    <SidebarContainer>
      <Logo>Stock App</Logo>
      <NavItem>
        <Icon>📊</Icon>
        Dashboard
      </NavItem>
      <NavItem $active>
        <Icon>📈</Icon>
        Ações
      </NavItem>
      <NavItem>
        <Icon>💼</Icon>
        Carteira
      </NavItem>
      <NavItem>
        <Icon>🔍</Icon>
        Explorar
      </NavItem>
      <NavItem>
        <Icon>⚙️</Icon>
        Configurações
      </NavItem>
    </SidebarContainer>
  );
};

export default Sidebar; 