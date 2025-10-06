import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled, { css } from 'styled-components';

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(18, 18, 18, 0.95);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(224, 224, 224, 0.15);
  padding: 1.2rem 0;
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.4);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, #FF8C42 0%, #4DB6AC 25%, #9B5DE5 50%, #FFD166 75%, #FF8C42 100%);
    background-size: 300% 100%;
    animation: flowingGradient 6s ease infinite;
    opacity: 0.9;
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
  color: #E0E0E0;
  text-decoration: none;
  background: linear-gradient(135deg, #FF8C42 0%, #4DB6AC 50%, #9B5DE5 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  background-size: 200% 200%;
  animation: flowingGradient 4s ease infinite;
  position: relative;
  letter-spacing: -1px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  &:hover {
    transform: scale(1.08);
    filter: drop-shadow(0 0 15px rgba(255, 140, 66, 0.4));
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const NavLink = styled(Link)`
  color: #E0E0E0;
  text-decoration: none;
  font-weight: 600;
  font-size: 1rem;
  padding: 0.85rem 1.8rem;
  border-radius: 14px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  border: 1.5px solid transparent;
  backdrop-filter: blur(10px);
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
    transition: left 0.5s;
  }

  &:hover {
    background: linear-gradient(135deg, #4DB6AC 0%, #26A69A 50%, #2E8B57 100%);
    transform: translateY(-3px) scale(1.02);
    box-shadow: 0 12px 30px rgba(77, 182, 172, 0.4);
    border: 1.5px solid rgba(77, 182, 172, 0.4);
    
    &::before {
      left: 100%;
    }
  }

  ${props => props.$active && css`
    background: linear-gradient(135deg, #FF8C42 0%, #FF7043 50%, #FF5E62 100%);
    box-shadow: 0 10px 30px rgba(255, 140, 66, 0.45);
    border: 1.5px solid rgba(255, 140, 66, 0.4);
    
    &::after {
      content: '';
      position: absolute;
      bottom: -14px;
      left: 50%;
      transform: translateX(-50%);
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: linear-gradient(135deg, #FF8C42, #FF5E62);
      box-shadow: 0 3px 12px rgba(255, 140, 66, 0.6);
    }
    
    &:hover {
      background: linear-gradient(135deg, #FF8C42 0%, #FF7043 50%, #FF5E62 100%);
      transform: translateY(-3px) scale(1.05);
      box-shadow: 0 15px 35px rgba(255, 140, 66, 0.5);
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
          {navItems.map((item, index) => (
            <div key={item.path}>
              <NavLink
                to={item.path}
                $active={location.pathname === item.path}
              >
                {item.label}
              </NavLink>
            </div>
          ))}
        </NavLinks>
      </Nav>
    </HeaderContainer>
  );
};

export default Header;