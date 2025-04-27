import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  background-color: #FFF;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
  font-size: 16px;
  font-weight: bold;
  color: #0A1929;
  cursor: pointer;
  padding: 8px 12px;

  &:hover {
    background-color: #f0f0f0;
    border-radius: 4px;
  }

  span {
    margin-left: 8px;
  }
`;

const UserSection = styled.div`
  display: flex;
  align-items: center;
`;

const UserAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #0A1929;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  margin-left: 15px;
`;

const Header = () =>
{
    return (
        <HeaderContainer>
            <BackButton>
                ← <span>Voltar para Carteira</span>
            </BackButton>
            <UserSection>
                <UserAvatar>JD</UserAvatar>
            </UserSection>
        </HeaderContainer>
    );
};

export default Header; 