import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled, { css, keyframes } from 'styled-components';

const neonFlow = keyframes`
  0% { 
    background-position: 0% 50%;
    box-shadow: 
      0 0 20px rgba(0, 210, 255, 0.6),
      0 0 40px rgba(255, 0, 128, 0.4);
  }
  50% {
    background-position: 100% 50%;
    box-shadow: 
      0 0 30px rgba(255, 0, 128, 0.6),
      0 0 50px rgba(138, 43, 226, 0.4);
  }
  100% { 
    background-position: 0% 50%;
    box-shadow: 
      0 0 20px rgba(0, 210, 255, 0.6),
      0 0 40px rgba(255, 0, 128, 0.4);
  }
`;

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.95);
  backdrop-filter: blur(25px);
  border-bottom: 1px solid rgba(0, 210, 255, 0.3);
  padding: 1rem 0;
  box-shadow: 
    0 8px 40px rgba(0, 0, 0, 0.6),
    0 0 50px rgba(0, 210, 255, 0.1);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, #00D2FF 0%, #FF0080 25%, #8A2BE2 50%, #00FF7F 75%, #00D2FF 100%);
    background-size: 400% 100%;
    animation: ${neonFlow} 8s ease infinite;
    opacity: 1;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(0, 210, 255, 0.5), transparent);
    opacity: 0.7;
  }
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const Logo = styled(Link)`
  font-size: 2rem;
  font-weight: 900;
  font-family: 'Orbitron', sans-serif;
  text-decoration: none;
  position: relative;
  letter-spacing: -1px;
  text-transform: uppercase;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  padding: 0.6rem 1.2rem;
  border-radius: 12px;
  
  background: linear-gradient(45deg, #00D2FF 0%, #FF0080 50%, #8A2BE2 100%);
  background-size: 300% 300%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: ${neonFlow} 8s ease infinite;
  
  border: 1px solid rgba(0, 210, 255, 0.4);
  backdrop-filter: blur(10px);
  box-shadow: 
    0 0 20px rgba(0, 210, 255, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  
  &:hover {
    transform: scale(1.05) translateY(-1px);
    border-color: rgba(0, 210, 255, 0.8);
    box-shadow: 
      0 0 30px rgba(0, 210, 255, 0.5),
      0 0 50px rgba(255, 0, 128, 0.3);
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const NavLink = styled(Link)`
  color: #FFFFFF;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9rem;
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  border: 1px solid rgba(0, 210, 255, 0.3);
  background: rgba(0, 210, 255, 0.05);
  backdrop-filter: blur(15px);
  overflow: hidden;
  will-change: transform, box-shadow;
  display: block;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(0, 210, 255, 0.3), transparent);
    transition: left 0.5s ease;
    pointer-events: none;
  }

  &:hover {
    background: linear-gradient(135deg, rgba(0, 210, 255, 0.2) 0%, rgba(255, 0, 128, 0.2) 100%);
    transform: translateY(-2px) scale(1.05);
    box-shadow: 
      0 10px 30px rgba(0, 210, 255, 0.3),
      0 0 40px rgba(255, 0, 128, 0.2);
    border: 1px solid rgba(0, 210, 255, 0.8);
    
    &::before {
      left: 100%;
    }
  }

  ${props => props.$active && css`
    background: linear-gradient(135deg, #FF0080 0%, #8A2BE2 50%, #00D2FF 100%);
    box-shadow: 
      0 10px 30px rgba(255, 0, 128, 0.5),
      0 0 40px rgba(138, 43, 226, 0.4);
    border: 1px solid rgba(255, 0, 128, 0.8);
    transform: translateY(-2px) scale(1.05);
    
    &::after {
      content: '';
      position: absolute;
      bottom: -12px;
      left: 50%;
      transform: translateX(-50%);
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: linear-gradient(135deg, #FF0080, #00D2FF);
      box-shadow: 0 3px 12px rgba(255, 0, 128, 0.8);
    }
    
    &:hover {
      background: linear-gradient(135deg, #FF0080 0%, #8A2BE2 50%, #00D2FF 100%);
      transform: translateY(-3px) scale(1.08);
      box-shadow: 
        0 15px 40px rgba(255, 0, 128, 0.6),
        0 0 50px rgba(0, 210, 255, 0.4);
    }
  `}
`;const Header = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/sorting', label: 'Sorting' },
    { path: '/pathfinding', label: 'Pathfinding' },
    { path: '/graphs', label: 'Graphs' },
    { path: '/complexity', label: 'Complexity' },
  ];

  return (
    <HeaderContainer>
      <Nav>
        <div>
          <Logo to="/">AlgoViz</Logo>
        </div>
        
        <NavLinks>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              $active={location.pathname === item.path}
            >
              {item.label}
            </NavLink>
          ))}
        </NavLinks>
      </Nav>
    </HeaderContainer>
  );
};

export default Header;