
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
  color: #E0E0E0;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  overflow: hidden;
  background: linear-gradient(120deg, #1a1a2e 0%, #232946 100%);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(120deg, #667eea 0%, #764ba2 100%);
    opacity: 0.12;
    z-index: 1;
    pointer-events: none;
    animation: ${animatedGradient} 12s ease-in-out infinite;
    background-size: 200% 200%;
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 20% 80%, #9B5DE5 0%, transparent 60%),
                radial-gradient(circle at 80% 20%, #4DB6AC 0%, transparent 60%),
                radial-gradient(circle at 50% 50%, #FF8C42 0%, transparent 70%);
    opacity: 0.18;
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
  font-size: 4.5rem;
  font-weight: 900;
  margin-bottom: 2rem;
  background: linear-gradient(120deg, #FF8C42 0%, #4DB6AC 40%, #9B5DE5 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  background-size: 300% 300%;
  animation: ${animatedGradient} 6s ease-in-out infinite;
  line-height: 1.2;
  position: relative;
  filter: drop-shadow(0 4px 32px #9B5DE5aa);
  letter-spacing: -2px;
  text-shadow: 0 2px 24px #4DB6AC33;

  &::after {
    content: '';
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 180px;
    height: 4px;
    background: linear-gradient(135deg, #FF8C42, #4DB6AC);
    border-radius: 2px;
    box-shadow: 0 2px 10px rgba(255, 140, 66, 0.4);
    opacity: 0.7;
  }

  @media (max-width: 600px) {
    font-size: 2.5rem;
    &::after { width: 90px; }
  }
`;


const Subtitle = styled.p`
  font-size: 1.35rem;
  margin-bottom: 3rem;
  opacity: 0.92;
  line-height: 1.6;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  text-shadow: 0 2px 8px #23294644;
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
  background: rgba(255, 255, 255, 0.13);
  backdrop-filter: blur(14px);
  border-radius: 18px;
  border: 1.5px solid rgba(255, 255, 255, 0.22);
  padding: 2.5rem 2rem 2rem 2rem;
  text-align: left;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.18), 0 1.5px 8px #9B5DE522;
  transition: transform 0.35s cubic-bezier(0.4,0,0.2,1), box-shadow 0.35s cubic-bezier(0.4,0,0.2,1), background 0.35s cubic-bezier(0.4,0,0.2,1);
  position: relative;
  overflow: hidden;
  cursor: pointer;
  will-change: transform, box-shadow;
  border-image: linear-gradient(135deg, #FF8C42, #4DB6AC, #9B5DE5, #FFD166) 1;

  &:hover {
    transform: translateY(-10px) scale(1.035) rotateX(6deg) rotateY(-4deg);
    box-shadow: 0 24px 60px 0 #9B5DE555, 0 2px 16px #FF8C4233;
    background: rgba(255,255,255,0.18);
    border: 2px solid #FFD16688;
    z-index: 4;
  }

  &::before {
    content: '';
    position: absolute;
    top: -40px; left: -40px; width: 120px; height: 120px;
    background: radial-gradient(circle, #FFD16655 0%, transparent 80%);
    opacity: 0.7;
    z-index: 0;
    pointer-events: none;
    transition: opacity 0.3s;
  }

  &:hover::before {
    opacity: 1;
  }

  @media (max-width: 600px) {
    padding: 1.2rem 0.7rem 1.2rem 0.7rem;
  }
`;


const FeatureIcon = styled.div`
  font-size: 2.7rem;
  margin-bottom: 1.2rem;
  filter: drop-shadow(0 2px 8px #FFD16688);
  transition: transform 0.3s cubic-bezier(0.4,0,0.2,1);
  ${FeatureCard}:hover & {
    transform: scale(1.18) rotate(-8deg);
    filter: drop-shadow(0 4px 16px #FFD166cc);
  }
`;


const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #fff;
  letter-spacing: -1px;
  text-shadow: 0 2px 8px #23294633;
`;


const FeatureDescription = styled.p`
  opacity: 0.85;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  font-size: 1.08rem;
`;


const FeatureLink = styled(Link)`
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background: linear-gradient(90deg, #667eea, #764ba2, #f093fb);
  color: white;
  text-decoration: none;
  border-radius: 10px;
  font-weight: 600;
  font-size: 1.08rem;
  letter-spacing: 0.01em;
  box-shadow: 0 2px 12px #667eea33;
  transition: transform 0.25s cubic-bezier(0.4,0,0.2,1), box-shadow 0.25s cubic-bezier(0.4,0,0.2,1);
  position: relative;
  overflow: hidden;

  &:hover {
    transform: scale(1.07) translateY(-2px);
    box-shadow: 0 8px 32px #764ba244, 0 2px 8px #f093fb33;
    background: linear-gradient(90deg, #f093fb, #667eea, #764ba2);
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
  font-size: 2.5rem;
  font-weight: 700;
  color: #667eea;
  text-shadow: 0 2px 12px #667eea44;
`;


const StatLabel = styled.div`
  opacity: 0.8;
  margin-top: 0.5rem;
  font-size: 1.01rem;
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