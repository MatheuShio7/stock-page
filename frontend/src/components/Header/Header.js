import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  background-color: #0D0F14;
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 100;
`;

const BackButton = styled.button`
  background-color: transparent;
  border: none;
  display: flex;
  align-items: center;
  font-size: 18px;
  font-weight: bold;
  color: #FF5722;
  cursor: pointer;
  padding: 8px 12px;

  &:hover {
    background-color: #232631;
    border-radius: 4px;
  }

  i {
    font-size: 20px;
  }

  span {
    margin-left: 8px;
    color: #FF5722;
    font-size: 18px;
  }
`;

const Header = () =>
{
  return (
    <HeaderContainer>
      <BackButton>
        <i className="bi bi-chevron-left"></i> <span>Carteira / Explorar</span>
      </BackButton>
    </HeaderContainer>
  );
};

export default Header; 