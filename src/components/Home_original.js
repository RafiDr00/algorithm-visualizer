
import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';


const animatedGradient = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const HomeContainer = styled.div`
  padding: 2rem;
  text-align: center;
  color: #FFFFFF;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #0F051D 0%, #1A0B3D 30%, #2D1B69 100%);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(120deg, #FF6B6B 0%, #4ECDC4 25%, #45B7D1 50%, #96CEB4 75%, #FFEAA7 100%);
    opacity: 0.25;
    z-index: 1;
    pointer-events: none;
    animation: ${animatedGradient} 15s ease-in-out infinite;
    background-size: 400% 400%;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 15% 85%, #E17055 0%, transparent 50%),
                radial-gradient(circle at 85% 15%, #00B894 0%, transparent 50%),
                radial-gradient(circle at 50% 50%, #0984E3 0%, transparent 60%),
                radial-gradient(circle at 25% 25%, #A29BFE 0%, transparent 45%);
    opacity: 0.3;
    z-index: 2;
    pointer-events: none;
  }
`;


const Hero = styled.section`
  padding: 7rem 0 4rem 0;
  max-width: 900px;
  margin: 0 auto;
  position: relative;
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  perspective: 1200px;
`;


const Title = styled.h1`
  font-size: 4.8rem;
  font-weight: 900;
  margin-bottom: 2rem;
  background: linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 25%, #45B7D1 50%, #A29BFE 75%, #FD79A8 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  background-size: 400% 400%;
  animation: ${animatedGradient} 8s ease-in-out infinite;
  line-height: 1.2;
  position: relative;
  filter: drop-shadow(0 6px 40px #A29BFEaa) drop-shadow(0 0 20px #4ECDC4aa);
  letter-spacing: -2px;
  text-shadow: 0 4px 32px #45B7D144;

  &::after {
    content: '';
    position: absolute;
    bottom: -20px;
    left: 50%;
    transform: translateX(-50%);
    width: 220px;
    height: 6px;
    background: linear-gradient(135deg, #FF6B6B, #4ECDC4, #45B7D1);
    border-radius: 3px;
    box-shadow: 0 4px 20px rgba(255, 107, 107, 0.6), 0 0 30px rgba(78, 205, 196, 0.4);
    opacity: 0.9;
  }

  @media (max-width: 600px) {
    font-size: 2.5rem;
    &::after { width: 90px; }
  }
`;


const Subtitle = styled.p`
  font-size: 1.4rem;
  margin-bottom: 3rem;
  opacity: 0.95;
  line-height: 1.7;
  max-width: 650px;
  margin-left: auto;
  margin-right: auto;
  text-shadow: 0 3px 12px rgba(0, 0, 0, 0.7);
  color: #F8F9FA;
  font-weight: 400;
`;


const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2.5rem;
  margin-top: 4rem;
  max-width: 1100px;
  margin-left: auto;
  margin-right: auto;
  z-index: 3;
`;


const FeatureCard = styled.div`
  background: rgba(255, 255, 255, 0.18);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  padding: 2.8rem 2.2rem 2.5rem 2.2rem;
  text-align: left;
  box-shadow: 0 12px 40px 0 rgba(31, 38, 135, 0.25), 0 4px 16px rgba(162, 155, 254, 0.3);
  transition: all 0.4s cubic-bezier(0.4,0,0.2,1);
  position: relative;
  overflow: hidden;
  cursor: pointer;
  will-change: transform, box-shadow;
  border-image: linear-gradient(135deg, #FF6B6B, #4ECDC4, #A29BFE, #FFEAA7) 1;

  &:hover {
    transform: translateY(-12px) scale(1.04) rotateX(8deg) rotateY(-5deg);
    box-shadow: 0 30px 80px 0 rgba(162, 155, 254, 0.4), 0 6px 24px rgba(255, 107, 107, 0.3);
    background: rgba(255,255,255,0.25);
    border: 2px solid rgba(255, 234, 167, 0.6);
    z-index: 4;
  }

  &::before {
    content: '';
    position: absolute;
    top: -50px; left: -50px; width: 140px; height: 140px;
    background: radial-gradient(circle, rgba(255, 234, 167, 0.4) 0%, transparent 70%);
    opacity: 0.8;
    z-index: 0;
    pointer-events: none;
    transition: all 0.4s ease;
  }

  &:hover::before {
    opacity: 1;
    transform: scale(1.2);
  }

  @media (max-width: 600px) {
    padding: 1.5rem 1rem 1.5rem 1rem;
  }
`;


const FeatureIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1.5rem;
  filter: drop-shadow(0 4px 12px rgba(255, 234, 167, 0.6)) drop-shadow(0 0 20px rgba(78, 205, 196, 0.4));
  transition: all 0.4s cubic-bezier(0.4,0,0.2,1);
  ${FeatureCard}:hover & {
    transform: scale(1.25) rotate(-10deg);
    filter: drop-shadow(0 6px 20px rgba(255, 234, 167, 0.8)) drop-shadow(0 0 30px rgba(162, 155, 254, 0.6));
  }
`;


const FeatureTitle = styled.h3`
  font-size: 1.6rem;
  font-weight: 800;
  margin-bottom: 1.2rem;
  color: #FFFFFF;
  letter-spacing: -1px;
  text-shadow: 0 3px 12px rgba(0, 0, 0, 0.6);
  background: linear-gradient(135deg, #FFFFFF 0%, #F8F9FA 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;


const FeatureDescription = styled.p`
  opacity: 0.92;
  line-height: 1.7;
  margin-bottom: 1.8rem;
  font-size: 1.1rem;
  color: #F1F3F4;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
`;


const FeatureLink = styled(Link)`
  display: inline-block;
  padding: 0.9rem 1.8rem;
  background: linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 50%, #45B7D1 100%);
  color: white;
  text-decoration: none;
  border-radius: 12px;
  font-weight: 700;
  font-size: 1.1rem;
  letter-spacing: 0.02em;
  box-shadow: 0 4px 20px rgba(255, 107, 107, 0.4), 0 0 30px rgba(78, 205, 196, 0.2);
  transition: all 0.3s cubic-bezier(0.4,0,0.2,1);
  position: relative;
  overflow: hidden;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);

  &:hover {
    transform: scale(1.1) translateY(-3px);
    box-shadow: 0 12px 40px rgba(69, 183, 209, 0.5), 0 4px 16px rgba(255, 107, 107, 0.4);
    background: linear-gradient(135deg, #4ECDC4 0%, #45B7D1 50%, #A29BFE 100%);
  }
`;


const Stats = styled.div`
  display: flex;
  justify-content: center;
  gap: 3rem;
  margin: 3rem 0;
  flex-wrap: wrap;
  z-index: 3;
`;


const StatItem = styled.div`
  text-align: center;
  min-width: 90px;
`;


const StatNumber = styled.div`
  font-size: 2.8rem;
  font-weight: 800;
  background: linear-gradient(135deg, #4ECDC4 0%, #45B7D1 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 4px 20px rgba(78, 205, 196, 0.6);
  filter: drop-shadow(0 0 20px rgba(69, 183, 209, 0.4));
`;


const StatLabel = styled.div`
  opacity: 0.9;
  margin-top: 0.8rem;
  font-size: 1.1rem;
  color: #F1F3F4;
  font-weight: 500;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
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

  // Parallax effect for hero section
  const heroRef = useRef();
  useEffect(() => {
    const handleMouseMove = e => {
      if (!heroRef.current) return;
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 2;
      const y = (e.clientY / innerHeight - 0.5) * 2;
      heroRef.current.style.transform = `rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <HomeContainer>
      <Hero ref={heroRef}>
        <Title>
          Algorithm Visualizer
        </Title>
        <Subtitle>
          Master Computer Science fundamentals through interactive visualizations.<br />
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