import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
// Animation library removed for lighter build

const HomeContainer = styled.div`
  padding: 2rem;
  text-align: center;
  color: #E0E0E0;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 25% 25%, rgba(255, 140, 66, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 75% 75%, rgba(77, 182, 172, 0.1) 0%, transparent 50%);
    z-index: 1;
  }
`;

const Hero = styled.section`
  padding: 6rem 0;
  max-width: 900px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
`;

const Title = styled.h1`
  font-size: 4.5rem;
  font-weight: 900;
  margin-bottom: 2rem;
  background: linear-gradient(135deg, #FF8C42 0%, #4DB6AC 50%, #9B5DE5 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  background-size: 300% 300%;
  animation: flowingGradient 4s ease infinite;
  line-height: 1.2;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 150px;
    height: 4px;
    background: linear-gradient(135deg, #FF8C42, #4DB6AC);
    border-radius: 2px;
    box-shadow: 0 2px 10px rgba(255, 140, 66, 0.4);
  }
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  margin-bottom: 3rem;
  opacity: 0.9;
  line-height: 1.6;
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 4rem;
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
`;

const FeatureCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 2rem;
  text-align: left;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
    background: rgba(255, 255, 255, 0.15);
  }
`;

const FeatureIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: white;
`;

const FeatureDescription = styled.p`
  opacity: 0.8;
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const FeatureLink = styled(Link)`
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background: linear-gradient(45deg, #667eea, #764ba2);
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
  }
`;

const Stats = styled.div`
  display: flex;
  justify-content: center;
  gap: 3rem;
  margin: 3rem 0;
  flex-wrap: wrap;
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatNumber = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: #667eea;
`;

const StatLabel = styled.div`
  opacity: 0.8;
  margin-top: 0.5rem;
`;

const Home = () => {
  const features = [
    {
      icon: '🔄',
      title: 'Sorting Algorithms',
      description: 'Visualize bubble sort, merge sort, quick sort, and more with step-by-step animations.',
      link: '/sorting'
    },
    {
      icon: '🗺️',
      title: 'Pathfinding',
      description: 'Explore Dijkstra\'s algorithm, A*, and BFS/DFS with interactive grid visualization.',
      link: '/pathfinding'
    },
    {
      icon: '🕸️',
      title: 'Graph Algorithms',
      description: 'Understand spanning trees, topological sorting, and graph traversal algorithms.',
      link: '/graphs'
    },
    {
      icon: '📊',
      title: 'Complexity Analysis',
      description: 'Compare time and space complexities with live performance charts and analysis.',
      link: '/complexity'
    }
  ];

  const stats = [
    { number: '12+', label: 'Algorithms' },
    { number: '4', label: 'Categories' },
    { number: '∞', label: 'Learning' }
  ];

  return (
    <HomeContainer>
      <Hero>
        <Title>
          Algorithm Visualizer
        </Title>
        
        <Subtitle>
          Master Computer Science fundamentals through interactive visualizations.
          See algorithms come to life with step-by-step animations and real-time complexity analysis.
        </Subtitle>
        
        <Stats>
          {stats.map((stat, index) => (
            <StatItem key={index}>
              <StatNumber>{stat.number}</StatNumber>
              <StatLabel>{stat.label}</StatLabel>
            </StatItem>
          ))}
        </Stats>
      </Hero>

      <FeatureGrid>
        {features.map((feature, index) => (
          <FeatureCard key={index}>
            <FeatureIcon>{feature.icon}</FeatureIcon>
            <FeatureTitle>{feature.title}</FeatureTitle>
            <FeatureDescription>{feature.description}</FeatureDescription>
            <FeatureLink to={feature.link}>
              Explore →
            </FeatureLink>
          </FeatureCard>
        ))}
      </FeatureGrid>
    </HomeContainer>
  );
};

export default Home;