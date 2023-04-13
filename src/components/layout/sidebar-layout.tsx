import React from 'react';
import tw from 'tailwind-styled-components';

type SidebarLayoutProps = {
  sidebarContent: React.ReactNode;
  mainContent: React.ReactNode;
};

export const SidebarLayout: React.FC<SidebarLayoutProps> = (props) => {
  const { sidebarContent, mainContent } = props;
  return (
    <Container>
      <SidebarContainer>{sidebarContent}</SidebarContainer>
      <MainContentContainer>
        <FlexGrowContainer>{mainContent}</FlexGrowContainer>
      </MainContentContainer>
    </Container>
  );
};

export default SidebarLayout;

const Container = tw.div`flex h-screen flex-row overflow-hidden`;
const SidebarContainer = tw.div` z-20 flex w-72 flex-shrink-0 flex-col bg-slate-800 transition-all duration-300 ease-in-out`;
const MainContentContainer = tw.div`main-content flex flex-grow flex-col bg-slate-900`;
const FlexGrowContainer = tw.div`flex-grow`;
