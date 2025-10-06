import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: linear-gradient(135deg, #0F051D 0%, #1A0B3D 30%, #2D1B69 100%);
    color: #FFFFFF;
    overflow-x: hidden;
    min-height: 100vh;
  }

  /* Enhanced keyframe animations */
  @keyframes animatedGradient {
    0% {
      background-position: 0% 50%;
      transform: scale(1);
    }
    25% {
      background-position: 100% 50%;
      transform: scale(1.02);
    }
    50% {
      background-position: 100% 100%;
      transform: scale(1);
    }
    75% {
      background-position: 0% 100%;
      transform: scale(1.01);
    }
    100% {
      background-position: 0% 50%;
      transform: scale(1);
    }
  }

  /* Vibrant gradient classes */
  .gradient1 {
    background: linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 25%, #45B7D1 50%, #A29BFE 75%, #FD79A8 100%);
    animation: animatedGradient 8s ease-in-out infinite;
    background-size: 400% 400%;
  }

  .gradient2 {
    background: linear-gradient(135deg, #E17055 0%, #00B894 50%, #0984E3 100%);
    animation: animatedGradient 10s ease-in-out infinite;
    background-size: 300% 300%;
  }

  .gradient3 {
    background: linear-gradient(135deg, #6C5CE7 0%, #A29BFE 50%, #74B9FF 100%);
    animation: animatedGradient 12s ease-in-out infinite;
    background-size: 350% 350%;
  }

  /* Enhanced glassmorphism effect */
  .glassmorphism {
    background: rgba(255, 255, 255, 0.22);
    backdrop-filter: blur(16px);
    border-radius: 16px;
    border: 1.5px solid rgba(255, 255, 255, 0.3);
    box-shadow: 0 12px 40px 0 rgba(31, 38, 135, 0.4), 0 0 30px rgba(162, 155, 254, 0.2);
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }

  /* Enhanced glassmorphism styles */
  .glass {
    background: rgba(255, 255, 255, 0.18);
    backdrop-filter: blur(16px);
    border: 1.5px solid rgba(255, 255, 255, 0.25);
    border-radius: 18px;
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2), 0 0 30px rgba(162, 155, 254, 0.15);
  }

  /* Enhanced gradient definitions */
  .gradient-active {
    background: linear-gradient(135deg, #FF6B6B 0%, #E17055 100%);
  }

  .gradient-comparison {
    background: linear-gradient(135deg, #4ECDC4 0%, #00B894 100%);
  }

  .gradient-visited {
    background: linear-gradient(135deg, #FFEAA7 0%, #FDCB6E 100%);
  }

  .gradient-path {
    background: linear-gradient(135deg, #A29BFE 0%, #6C5CE7 100%);
  }

  /* Smooth transitions for all elements */
  * {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  /* Enhanced premium button styles */
  .btn-premium {
    background: linear-gradient(135deg, #4ECDC4 0%, #45B7D1 100%);
    border: none;
    border-radius: 14px;
    color: white;
    cursor: pointer;
    font-weight: 700;
    padding: 1rem 2rem;
    font-size: 1.05rem;
    box-shadow: 0 6px 25px rgba(78, 205, 196, 0.4);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  }

  .btn-premium:hover {
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 12px 40px rgba(69, 183, 209, 0.5);
    background: linear-gradient(135deg, #45B7D1 0%, #A29BFE 100%);
  }

  .btn-premium:active {
    transform: translateY(-1px) scale(1.02);
  }

  .btn-premium:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }

  /* Success button variant */
  .btn-success {
    background: linear-gradient(135deg, #00B894 0%, #00CEC9 100%);
    box-shadow: 0 6px 25px rgba(0, 184, 148, 0.4);
  }

  .btn-success:hover {
    background: linear-gradient(135deg, #00CEC9 0%, #74B9FF 100%);
    box-shadow: 0 12px 40px rgba(0, 206, 201, 0.5);
  }

  /* Warning button variant */
  .btn-warning {
    background: linear-gradient(135deg, #FDCB6E 0%, #E17055 100%);
    box-shadow: 0 6px 25px rgba(253, 203, 110, 0.4);
  }

  .btn-warning:hover {
    background: linear-gradient(135deg, #E17055 0%, #D63031 100%);
    box-shadow: 0 12px 40px rgba(225, 112, 85, 0.5);
  }

  /* Danger button variant */
  .btn-danger {
    background: linear-gradient(135deg, #FF6B6B 0%, #D63031 100%);
    box-shadow: 0 6px 25px rgba(255, 107, 107, 0.4);
  }

  .btn-danger:hover {
    background: linear-gradient(135deg, #D63031 0%, #E84393 100%);
    box-shadow: 0 12px 40px rgba(214, 48, 49, 0.5);
  }

  /* Premium input styles */
  .input-premium {
    background: rgba(255, 255, 255, 0.12);
    border: 1.5px solid rgba(255, 255, 255, 0.25);
    border-radius: 10px;
    padding: 0.85rem 1.2rem;
    color: white;
    font-size: 1rem;
    backdrop-filter: blur(12px);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .input-premium:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.2);
    background: rgba(255, 255, 255, 0.18);
  }

  .input-premium:hover {
    border-color: rgba(255, 255, 255, 0.4);
  }

  /* Premium select styles */
  .select-premium {
    background: rgba(255, 255, 255, 0.12);
    border: 1.5px solid rgba(255, 255, 255, 0.25);
    border-radius: 10px;
    padding: 0.85rem 1.2rem;
    color: white;
    font-size: 1rem;
    backdrop-filter: blur(12px);
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    appearance: none;
    background-image: url("data:image/svg+xml;charset=US-ASCII,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'><path fill='white' d='M2 0L0 2h4zm0 5L0 3h4z'/></svg>");
    background-repeat: no-repeat;
    background-position: right 1rem center;
    background-size: 12px;
    padding-right: 3rem;
  }

  .select-premium:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.2);
    background-color: rgba(255, 255, 255, 0.18);
  }

  .select-premium:hover {
    border-color: rgba(255, 255, 255, 0.4);
  }

  .select-premium option {
    background: #2a2a3e;
    color: white;
  }

  /* Enhanced scrollbar styling */
  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 5px;
  }

  ::-webkit-scrollbar-thumb {
    background: linear-gradient(135deg, #4ECDC4, #45B7D1);
    border-radius: 5px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(135deg, #45B7D1, #A29BFE);
  }

  /* Pulse animation */
  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 rgba(255, 140, 66, 0.7);
    }
    70% {
      box-shadow: 0 0 0 15px rgba(255, 140, 66, 0);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(255, 140, 66, 0);
    }
  }

  .pulse {
    animation: pulse 2s infinite;
  }

  /* Enhanced glow effect */
  .glow {
    box-shadow: 0 0 30px rgba(78, 205, 196, 0.5), 0 0 60px rgba(162, 155, 254, 0.3);
  }

  /* Selection styling */
  ::selection {
    background: rgba(78, 205, 196, 0.3);
    color: #FFFFFF;
  }

  ::-moz-selection {
    background: rgba(78, 205, 196, 0.3);
    color: #FFFFFF;
  }

  /* Focus styles */
  *:focus {
    outline: 2px solid rgba(78, 205, 196, 0.6);
    outline-offset: 2px;
  }

  /* Flowing gradient animation */
  @keyframes flowingGradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  .flowing-gradient {
    background-size: 200% 200%;
    animation: flowingGradient 3s ease infinite;
  }

  /* Bounce effect */
  @keyframes bounce {
    0%, 20%, 53%, 80%, 100% {
      transform: translate3d(0, 0, 0);
    }
    40%, 43% {
      transform: translate3d(0, -8px, 0);
    }
    70% {
      transform: translate3d(0, -4px, 0);
    }
    90% {
      transform: translate3d(0, -2px, 0);
    }
  }

  .bounce {
    animation: bounce 1s ease-in-out;
  }

  /* Particle effect */
  @keyframes sparkle {
    0% {
      opacity: 0;
      transform: scale(0) rotate(0deg);
    }
    50% {
      opacity: 1;
      transform: scale(1) rotate(180deg);
    }
    100% {
      opacity: 0;
      transform: scale(0) rotate(360deg);
    }
  }

  .sparkle {
    animation: sparkle 0.8s ease-in-out;
  }

  /* Slide in animation for tooltips */
  @keyframes slideInRight {
    from {
      opacity: 0;
      transform: translateX(20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  .slide-in-right {
    animation: slideInRight 0.3s ease-out;
  }

  /* Fade in animation */
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .fade-in {
    animation: fadeIn 0.5s ease-in;
  }
`;

export default GlobalStyles;