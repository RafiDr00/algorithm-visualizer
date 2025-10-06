import React from 'react';
import styled, { keyframes, css } from 'styled-components';

const progressAnimation = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

const shimmer = keyframes`
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
`;

const ProgressContainer = styled.div`
  width: 100%;
  height: 8px;
  background: rgba(18, 18, 18, 0.6);
  border-radius: 10px;
  overflow: hidden;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.3);
  position: relative;
`;

const ProgressBar = styled.div`
  height: 100%;
  background: linear-gradient(135deg, #4DB6AC 0%, #FFD166 100%);
  background-size: 200% 200%;
  border-radius: 10px;
  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  
  ${props => props.animated && css`
    animation: ${progressAnimation} 2s ease infinite;
  `}
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(90deg, 
      transparent, 
      rgba(255, 255, 255, 0.3), 
      transparent
    );
    animation: ${shimmer} 1.5s ease-in-out infinite;
  }
`;

const ProgressLabel = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
  color: #E0E0E0;
  margin-bottom: 0.5rem;
`;

const ProgressValue = styled.span`
  font-weight: 600;
  color: #4DB6AC;
`;

const ProfessionalProgressBar = ({ 
  progress = 0, 
  label = "Progress", 
  showValue = true, 
  animated = false,
  maxValue = 100 
}) => {
  const percentage = Math.min((progress / maxValue) * 100, 100);
  
  return (
    <div>
      <ProgressLabel>
        <span>{label}</span>
        {showValue && (
          <ProgressValue>
            {progress} / {maxValue} ({percentage.toFixed(1)}%)
          </ProgressValue>
        )}
      </ProgressLabel>
      <ProgressContainer>
        <ProgressBar 
          style={{ width: `${percentage}%` }}
          animated={animated}
        />
      </ProgressContainer>
    </div>
  );
};

export default ProfessionalProgressBar;