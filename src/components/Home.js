import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

// Advanced animations
const pulseGlow = keyframes`
  0%, 100% { 
    filter: drop-shadow(0 0 20px #00D2FF) drop-shadow(0 0 40px #FF0080) drop-shadow(0 0 60px #00D2FF);
    transform: scale(1);
  }
  50% { 
    filter: drop-shadow(0 0 30px #FF0080) drop-shadow(0 0 60px #00D2FF) drop-shadow(0 0 80px #FF0080);
    transform: scale(1.02);
  }
`;

const neonFlow = keyframes`
  0% { 
    background-position: 0% 0%;
    box-shadow: 
      0 0 20px rgba(0, 210, 255, 0.8),
      0 0 40px rgba(255, 0, 128, 0.6),
      0 0 60px rgba(0, 210, 255, 0.4);
  }
  25% {
    background-position: 100% 0%;
    box-shadow: 
      0 0 30px rgba(255, 0, 128, 0.8),
      0 0 50px rgba(0, 210, 255, 0.6),
      0 0 70px rgba(255, 0, 128, 0.4);
  }
  50% {
    background-position: 100% 100%;
    box-shadow: 
      0 0 25px rgba(138, 43, 226, 0.8),
      0 0 45px rgba(0, 210, 255, 0.6),
      0 0 65px rgba(138, 43, 226, 0.4);
  }
  75% {
    background-position: 0% 100%;
    box-shadow: 
      0 0 35px rgba(0, 210, 255, 0.8),
      0 0 55px rgba(255, 0, 128, 0.6),
      0 0 75px rgba(0, 210, 255, 0.4);
  }
  100% { 
    background-position: 0% 0%;
    box-shadow: 
      0 0 20px rgba(0, 210, 255, 0.8),
      0 0 40px rgba(255, 0, 128, 0.6),
      0 0 60px rgba(0, 210, 255, 0.4);
  }
`;

const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const floatAnimation = keyframes`
  0%, 100% { transform: translateY(0px) rotateZ(0deg); }
  25% { transform: translateY(-10px) rotateZ(1deg); }
  50% { transform: translateY(-5px) rotateZ(0deg); }
  75% { transform: translateY(-15px) rotateZ(-1deg); }
`;

const matrixRain = keyframes`
  0% { transform: translateY(-100vh); opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { transform: translateY(100vh); opacity: 0; }
`;

// Dark cyberpunk container
const HomeContainer = styled.div`
  padding: 0;
  min-height: 100vh;
  background: 
    radial-gradient(ellipse at top, #0a0a0a 0%, #000000 100%),
    linear-gradient(135deg, #0a0a0a 0%, #1a0033 25%, #000000 50%, #001133 75%, #000000 100%);
  position: relative;
  overflow: hidden;
  color: #FFFFFF;

  &::before {
    content: '';
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background: 
      radial-gradient(circle at 20% 20%, rgba(0, 210, 255, 0.15) 0%, transparent 50%),
      radial-gradient(circle at 80% 80%, rgba(255, 0, 128, 0.15) 0%, transparent 50%),
      radial-gradient(circle at 60% 20%, rgba(138, 43, 226, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 40% 80%, rgba(0, 255, 127, 0.1) 0%, transparent 50%);
    pointer-events: none;
    z-index: 1;
  }

  &::after {
    content: '';
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background-image: 
      repeating-linear-gradient(
        0deg,
        transparent,
        transparent 98px,
        rgba(0, 210, 255, 0.03) 100px
      );
    pointer-events: none;
    z-index: 2;
  }
`;

// Matrix effect background
const MatrixBg = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  z-index: 1;
  pointer-events: none;
  opacity: 0.4;

  &::before, &::after {
    content: '01001010 01110101 01110011 01110100 01000001 01101100 01100111 01101111';
    position: absolute;
    font-family: 'Courier New', monospace;
    font-size: 12px;
    color: #00D2FF;
    white-space: nowrap;
    animation: ${matrixRain} 20s linear infinite;
  }

  &::before {
    left: 10%;
    animation-delay: -5s;
  }

  &::after {
    left: 80%;
    animation-delay: -15s;
  }
`;

// Hero section with cyberpunk styling
const Hero = styled.section`
  padding: 8rem 2rem 4rem 2rem;
  text-align: center;
  position: relative;
  z-index: 10;
  max-width: 1200px;
  margin: 0 auto;
  perspective: 1000px;
`;

// Futuristic title with neon effects
const Title = styled.h1`
  font-size: clamp(3rem, 8vw, 6.5rem);
  font-weight: 900;
  margin-bottom: 2rem;
  font-family: 'Orbitron', 'Arial Black', sans-serif;
  letter-spacing: -3px;
  text-transform: uppercase;
  
  background: linear-gradient(
    45deg,
    #00D2FF 0%,
    #FF0080 25%, 
    #8A2BE2 50%, 
    #00FF7F 75%, 
    #00D2FF 100%
  );
  background-size: 400% 400%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  
  animation: ${gradientShift} 3s ease-in-out infinite;
  
  filter: 
    drop-shadow(0 0 20px rgba(0, 210, 255, 0.8))
    drop-shadow(0 0 40px rgba(255, 0, 128, 0.6))
    drop-shadow(0 0 60px rgba(0, 210, 255, 0.4));

  position: relative;
  
  &::before {
    content: attr(data-text);
    position: absolute;
    top: 0; left: 0;
    width: 100%; height: 100%;
    background: linear-gradient(45deg, #FF0080, #00D2FF);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    z-index: -1;
    filter: blur(3px);
    opacity: 0.7;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 300px;
    height: 4px;
    background: linear-gradient(90deg, transparent, #00D2FF, #FF0080, #00D2FF, transparent);
    border-radius: 2px;
    animation: ${neonFlow} 2s ease-in-out infinite;
  }
`;

// Cyberpunk subtitle
const Subtitle = styled.p`
  font-size: clamp(1.1rem, 2.5vw, 1.6rem);
  margin-bottom: 3rem;
  opacity: 0.9;
  line-height: 1.8;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  font-weight: 300;
  color: #E0E0E0;
  text-shadow: 0 0 20px rgba(0, 210, 255, 0.3);
  
  span {
    background: linear-gradient(45deg, #00D2FF, #FF0080);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    font-weight: 600;
  }
`;

// Modern feature grid
const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
  margin: 4rem auto;
  max-width: 1200px;
  padding: 0 2rem;
  z-index: 10;
  position: relative;
`;

// High-tech feature cards
const FeatureCard = styled.div`
  background: 
    linear-gradient(135deg, 
      rgba(0, 210, 255, 0.1) 0%, 
      rgba(0, 0, 0, 0.8) 50%, 
      rgba(255, 0, 128, 0.1) 100%
    );
  
  border: 1px solid rgba(0, 210, 255, 0.3);
  border-radius: 20px;
  padding: 2.5rem;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  
  backdrop-filter: blur(20px);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  
  &::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background: linear-gradient(45deg, 
      rgba(0, 210, 255, 0.1), 
      rgba(255, 0, 128, 0.1), 
      rgba(138, 43, 226, 0.1)
    );
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0; left: -100%;
    width: 100%; height: 100%;
    background: linear-gradient(90deg, 
      transparent, 
      rgba(0, 210, 255, 0.4), 
      transparent
    );
    transition: left 0.5s ease;
  }

  &:hover {
    transform: translateY(-15px) scale(1.03);
    border-color: rgba(0, 210, 255, 0.8);
    box-shadow: 
      0 20px 60px rgba(0, 210, 255, 0.2),
      0 10px 30px rgba(255, 0, 128, 0.1),
      inset 0 1px 0 rgba(255, 255, 255, 0.2);
    
    &::before { opacity: 1; }
    &::after { left: 100%; }
  }
`;

// Neon icons
const FeatureIcon = styled.div`
  font-size: 3.5rem;
  margin-bottom: 1.5rem;
  background: linear-gradient(45deg, #00D2FF, #FF0080, #8A2BE2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  
  filter: drop-shadow(0 0 20px rgba(0, 210, 255, 0.8));
  transition: all 0.3s ease;
  
  ${FeatureCard}:hover & {
    transform: scale(1.2) rotateY(180deg);
    filter: 
      drop-shadow(0 0 30px rgba(0, 210, 255, 1))
      drop-shadow(0 0 50px rgba(255, 0, 128, 0.8));
  }
`;

// Modern feature titles
const FeatureTitle = styled.h3`
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 1rem;
  font-family: 'Orbitron', sans-serif;
  
  background: linear-gradient(45deg, #FFFFFF, #00D2FF);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  
  text-shadow: 0 0 20px rgba(0, 210, 255, 0.5);
`;

// Clean descriptions
const FeatureDescription = styled.p`
  color: #B0B0B0;
  line-height: 1.7;
  margin-bottom: 2rem;
  font-size: 1.1rem;
  font-weight: 300;
`;

// Cyberpunk buttons
const FeatureLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  
  background: linear-gradient(45deg, 
    rgba(0, 210, 255, 0.2), 
    rgba(255, 0, 128, 0.2)
  );
  
  border: 1px solid #00D2FF;
  border-radius: 50px;
  color: #FFFFFF;
  text-decoration: none;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 0.9rem;
  
  position: relative;
  overflow: hidden;
  
  transition: all 0.3s ease;
  
  &::before {
    content: '';
    position: absolute;
    top: 0; left: -100%;
    width: 100%; height: 100%;
    background: linear-gradient(90deg, 
      transparent, 
      rgba(0, 210, 255, 0.4), 
      transparent
    );
    transition: left 0.5s ease;
  }

  &:hover {
    transform: scale(1.05);
    border-color: #FF0080;
    box-shadow: 
      0 0 30px rgba(0, 210, 255, 0.5),
      0 0 50px rgba(255, 0, 128, 0.3);
    
    &::before { left: 100%; }
  }
`;

// Futuristic stats
const Stats = styled.div`
  display: flex;
  justify-content: center;
  gap: 4rem;
  margin: 4rem 0;
  flex-wrap: wrap;
`;

const StatItem = styled.div`
  text-align: center;
  padding: 1.5rem;
  border-radius: 15px;
  background: rgba(0, 210, 255, 0.05);
  border: 1px solid rgba(0, 210, 255, 0.2);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.1);
    border-color: rgba(0, 210, 255, 0.5);
    box-shadow: 0 10px 30px rgba(0, 210, 255, 0.2);
  }
`;

const StatNumber = styled.div`
  font-size: 3rem;
  font-weight: 900;
  font-family: 'Orbitron', sans-serif;
  
  background: linear-gradient(45deg, #00D2FF, #FF0080);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  
  filter: drop-shadow(0 0 20px rgba(0, 210, 255, 0.6));
  animation: ${pulseGlow} 3s ease-in-out infinite;
`;

const StatLabel = styled.div`
  color: #B0B0B0;
  margin-top: 0.5rem;
  font-size: 1rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

// Floating particles
const ParticleContainer = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  pointer-events: none;
  z-index: 3;
  overflow: hidden;
`;

const Particle = styled.div`
  position: absolute;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  background: ${props => props.color};
  border-radius: 50%;
  opacity: 0.6;
  animation: ${floatAnimation} ${props => props.duration}s ease-in-out infinite;
  animation-delay: ${props => props.delay}s;
  filter: blur(1px);
  box-shadow: 0 0 20px ${props => props.color};
`;

const Home = () => {
  const [particles, setParticles] = useState([]);

  const features = [
    {
      icon: '⚡',
      title: 'Sorting Algorithms',
      description: 'Experience lightning-fast visualizations of bubble sort, merge sort, quick sort, and advanced algorithms with real-time performance metrics.',
      link: '/sorting'
    },
    {
      icon: '🎯',
      title: 'Pathfinding',
      description: 'Navigate through intelligent pathfinding with A*, Dijkstra, and advanced search algorithms in dynamic, interactive environments.',
      link: '/pathfinding'
    },
    {
      icon: '🕸️',
      title: 'Graph Theory',
      description: 'Explore complex network relationships, spanning trees, and graph traversal algorithms with cutting-edge 3D visualizations.',
      link: '/graphs'
    },
    {
      icon: '📈',
      title: 'Performance Analysis',
      description: 'Deep-dive into algorithmic complexity with live performance charts, Big O analysis, and comparative benchmarking tools.',
      link: '/complexity'
    }
  ];

  const stats = [
    { number: '15+', label: 'Algorithms' },
    { number: '4K+', label: 'Operations/sec' },
    { number: '∞', label: 'Possibilities' }
  ];

  // Generate floating particles
  useEffect(() => {
    const colors = ['rgba(0, 210, 255, 0.8)', 'rgba(255, 0, 128, 0.8)', 'rgba(138, 43, 226, 0.8)'];
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      size: Math.random() * 4 + 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      left: Math.random() * 100 + '%',
      top: Math.random() * 100 + '%',
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 5
    }));
    setParticles(newParticles);
  }, []);

  // Advanced parallax effect
  const heroRef = useRef();
  useEffect(() => {
    const handleMouseMove = e => {
      if (!heroRef.current) return;
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 2;
      const y = (e.clientY / innerHeight - 0.5) * 2;
      heroRef.current.style.transform = `
        perspective(1000px) 
        rotateY(${x * 5}deg) 
        rotateX(${-y * 5}deg) 
        translateZ(0)
      `;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <HomeContainer>
      <MatrixBg />
      <ParticleContainer>
        {particles.map(particle => (
          <Particle
            key={particle.id}
            size={particle.size}
            color={particle.color}
            duration={particle.duration}
            delay={particle.delay}
            style={{
              left: particle.left,
              top: particle.top
            }}
          />
        ))}
      </ParticleContainer>
      
      <Hero ref={heroRef}>
        <Title data-text="Algorithm Visualizer">
          Algorithm Visualizer
        </Title>
        <Subtitle>
          Master <span>Computer Science fundamentals</span> through next-generation interactive visualizations.<br />
          Experience algorithms in <span>real-time</span> with cutting-edge performance analysis.
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
              Launch Experience →
            </FeatureLink>
          </FeatureCard>
        ))}
      </FeatureGrid>
    </HomeContainer>
  );
};

export default Home;