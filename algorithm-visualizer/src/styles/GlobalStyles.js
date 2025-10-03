import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: #121212;
    color: #E0E0E0;
    min-height: 100vh;
    overflow-x: hidden;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }

  /* Professional glassmorphism styles */
  .glass {
    background: rgba(18, 18, 18, 0.8);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(224, 224, 224, 0.1);
    border-radius: 15px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  }

  /* Gradient definitions */
  .gradient-active {
    background: linear-gradient(135deg, #FF8C42 0%, #FF5E62 100%);
  }

  .gradient-comparison {
    background: linear-gradient(135deg, #4DB6AC 0%, #2E8B57 100%);
  }

  .gradient-visited {
    background: linear-gradient(135deg, #FFD166 0%, #FFE066 100%);
  }

  .gradient-path {
    background: linear-gradient(135deg, #9B5DE5 0%, #F15BB5 100%);
  }

  /* Smooth transitions for all elements */
  * {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: rgba(224, 224, 224, 0.1);
  }

  ::-webkit-scrollbar-thumb {
    background: linear-gradient(135deg, #4DB6AC 0%, #2E8B57 100%);
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(135deg, #FFD166 0%, #FFE066 100%);
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

  /* Glow effect */
  .glow {
    box-shadow: 0 0 20px rgba(255, 140, 66, 0.5);
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