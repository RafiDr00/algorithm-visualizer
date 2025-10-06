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
  background: linear-gradient(135deg, #0c0c0c 0%, #1a1a2e 50%, #16213e 100%);
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
      radial-gradient(circle at 20% 80%, rgba(155, 93, 229, 0.12) 0%, transparent 60%),
      radial-gradient(circle at 80% 20%, rgba(77, 182, 172, 0.12) 0%, transparent 60%),
      radial-gradient(circle at 50% 50%, rgba(255, 140, 66, 0.08) 0%, transparent 70%);
    z-index: 0;
    animation: flowingGradient 20s ease infinite;
    background-size: 400% 400%;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
      linear-gradient(45deg, rgba(255,255,255,0.01) 25%, transparent 25%),
      linear-gradient(-45deg, rgba(255,255,255,0.01) 25%, transparent 25%),
      linear-gradient(45deg, transparent 75%, rgba(255,255,255,0.01) 75%),
      linear-gradient(-45deg, transparent 75%, rgba(255,255,255,0.01) 75%);
    background-size: 60px 60px;
    background-position: 0 0, 0 30px, 30px -30px, -30px 0px;
    z-index: 1;
    opacity: 0.3;
  }
`;

const MainContent = styled.main`
  padding-top: 90px;
  min-height: calc(100vh - 90px);
  position: relative;
  z-index: 2;
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