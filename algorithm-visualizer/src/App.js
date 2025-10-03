import React from 'react';
import { Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import Header from './components/Header';
import Home from './components/Home';
import SortingVisualizer from './components/SortingVisualizer';
import PathfindingVisualizer from './components/PathfindingVisualizer';
import GraphVisualizer from './components/GraphVisualizer';
import ComplexityAnalyzer from './components/ComplexityAnalyzer';
import GlobalStyles from './styles/GlobalStyles';

const AppContainer = styled.div`
  min-height: 100vh;
  background: #121212;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 20% 80%, rgba(155, 93, 229, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(77, 182, 172, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 40% 40%, rgba(255, 140, 66, 0.05) 0%, transparent 50%);
    z-index: 0;
  }
`;

const MainContent = styled.main`
  padding-top: 80px;
  min-height: calc(100vh - 80px);
  position: relative;
  z-index: 1;
`;

function App() {
  return (
    <>
      <GlobalStyles />
      <AppContainer>
        <Header />
        <MainContent>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sorting" element={<SortingVisualizer />} />
            <Route path="/pathfinding" element={<PathfindingVisualizer />} />
            <Route path="/graphs" element={<GraphVisualizer />} />
            <Route path="/complexity" element={<ComplexityAnalyzer />} />
          </Routes>
        </MainContent>
      </AppContainer>
    </>
  );
}

export default App;