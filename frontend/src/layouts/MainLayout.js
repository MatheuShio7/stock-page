import React from 'react';
import styled from 'styled-components';
import Sidebar from '../components/Sidebar/Sidebar';
import Header from '../components/Header/Header';

const LayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #0D0F14;
`;

const MainContent = styled.div`
  flex: 1;
  margin-left: 240px; /* largura da sidebar */
  display: flex;
  flex-direction: column;
`;

const ContentContainer = styled.div`
  padding: 20px 30px;
  flex: 1;
`;

const MainLayout = ({ children }) =>
{
  return (
    <LayoutContainer>
      <Sidebar />
      <MainContent>
        <Header />
        <ContentContainer>
          {children}
        </ContentContainer>
      </MainContent>
    </LayoutContainer>
  );
};

export default MainLayout; 