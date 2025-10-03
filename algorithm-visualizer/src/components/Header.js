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
  backdrop-filter: blur(15px);
  border-bottom: 1px solid rgba(224, 224, 224, 0.1);
  padding: 1rem 0;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, #FF8C42, #4DB6AC, #9B5DE5, #FFD166);
    background-size: 200% 200%;
    animation: flowingGradient 3s ease infinite;
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
  font-size: 1.8rem;
  font-weight: 800;
  color: #E0E0E0;
  text-decoration: none;
  background: linear-gradient(135deg, #FF8C42, #4DB6AC);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  position: relative;
  
  &:hover {
    transform: scale(1.05);
    filter: drop-shadow(0 0 10px rgba(255, 140, 66, 0.3));
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
  padding: 0.75rem 1.5rem;
  border-radius: 12px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  border: 1px solid transparent;

  &:hover {
    background: linear-gradient(135deg, #4DB6AC, #2E8B57);
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(77, 182, 172, 0.3);
    border: 1px solid rgba(77, 182, 172, 0.3);
  }

  ${props => props.$active && css`
    background: linear-gradient(135deg, #FF8C42, #FF5E62);
    box-shadow: 0 8px 25px rgba(255, 140, 66, 0.4);
    border: 1px solid rgba(255, 140, 66, 0.3);
    
    &::after {
      content: '';
      position: absolute;
      bottom: -12px;
      left: 50%;
      transform: translateX(-50%);
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: linear-gradient(135deg, #FF8C42, #FF5E62);
      box-shadow: 0 2px 8px rgba(255, 140, 66, 0.5);
    }
    
    &:hover {
      background: linear-gradient(135deg, #FF8C42, #FF5E62);
      transform: translateY(-2px) scale(1.05);
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