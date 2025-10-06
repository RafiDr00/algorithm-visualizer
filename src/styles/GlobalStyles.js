import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Inter:wght@300;400;500;600;700&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    background: #000000;
    color: #FFFFFF;
    line-height: 1.6;
    overflow-x: hidden;
    font-weight: 400;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  /* Cyberpunk scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.8);
  }

  ::-webkit-scrollbar-thumb {
    background: linear-gradient(45deg, #00D2FF, #FF0080);
    border-radius: 4px;
    box-shadow: 0 0 10px rgba(0, 210, 255, 0.5);
  }

  ::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(45deg, #FF0080, #8A2BE2);
    box-shadow: 0 0 20px rgba(255, 0, 128, 0.8);
  }

  /* Selection styles */
  ::selection {
    background: rgba(0, 210, 255, 0.3);
    color: #FFFFFF;
  }

  ::-moz-selection {
    background: rgba(0, 210, 255, 0.3);
    color: #FFFFFF;
  }

  /* Focus styles for accessibility */
  *:focus {
    outline: 2px solid #00D2FF;
    outline-offset: 2px;
  }

  /* Button reset and base styles */
  button {
    border: none;
    background: none;
    cursor: pointer;
    font-family: inherit;
    transition: all 0.3s ease;
  }

  /* Link styles */
  a {
    color: inherit;
    text-decoration: none;
    transition: all 0.3s ease;
  }

  /* Form input styles */
  input, select, textarea {
    font-family: inherit;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(0, 210, 255, 0.3);
    border-radius: 8px;
    padding: 0.75rem 1rem;
    color: #FFFFFF;
    transition: all 0.3s ease;
    backdrop-filter: blur(10px);
  }

  input:focus, select:focus, textarea:focus {
    border-color: #00D2FF;
    box-shadow: 
      0 0 0 2px rgba(0, 210, 255, 0.2),
      0 0 20px rgba(0, 210, 255, 0.3);
  }

  input::placeholder {
    color: rgba(255, 255, 255, 0.4);
  }

  /* Utility classes */
  .text-gradient {
    background: linear-gradient(45deg, #00D2FF, #FF0080, #8A2BE2);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .neon-glow {
    filter: drop-shadow(0 0 20px rgba(0, 210, 255, 0.8));
    animation: pulse 2s ease-in-out infinite alternate;
  }

  .glass-effect {
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .cyber-border {
    border: 1px solid;
    border-image: linear-gradient(45deg, #00D2FF, #FF0080, #8A2BE2) 1;
  }

  /* Enhanced premium button styles */
  .btn-premium {
    background: linear-gradient(135deg, #00D2FF 0%, #FF0080 100%);
    border: none;
    border-radius: 50px;
    color: white;
    cursor: pointer;
    font-weight: 700;
    padding: 1rem 2rem;
    font-size: 1.05rem;
    box-shadow: 0 6px 25px rgba(0, 210, 255, 0.4);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .btn-premium:hover {
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 12px 40px rgba(0, 210, 255, 0.5);
    background: linear-gradient(135deg, #FF0080 0%, #8A2BE2 100%);
  }

  .btn-premium:active {
    transform: translateY(-1px) scale(1.02);
  }

  /* Success button variant */
  .btn-success {
    background: linear-gradient(135deg, #00D2FF 0%, #00FF7F 100%);
    box-shadow: 0 6px 25px rgba(0, 210, 255, 0.4);
  }

  .btn-success:hover {
    background: linear-gradient(135deg, #00FF7F 0%, #00D2FF 100%);
    box-shadow: 0 12px 40px rgba(0, 255, 127, 0.5);
  }

  /* Warning button variant */
  .btn-warning {
    background: linear-gradient(135deg, #FFD700 0%, #FF8C00 100%);
    box-shadow: 0 6px 25px rgba(255, 215, 0, 0.4);
  }

  .btn-warning:hover {
    background: linear-gradient(135deg, #FF8C00 0%, #FF4500 100%);
    box-shadow: 0 12px 40px rgba(255, 140, 0, 0.5);
  }

  /* Danger button variant */
  .btn-danger {
    background: linear-gradient(135deg, #FF0080 0%, #DC143C 100%);
    box-shadow: 0 6px 25px rgba(255, 0, 128, 0.4);
  }

  .btn-danger:hover {
    background: linear-gradient(135deg, #DC143C 0%, #B22222 100%);
    box-shadow: 0 12px 40px rgba(220, 20, 60, 0.5);
  }

  /* Animations */
  @keyframes pulse {
    from { 
      filter: drop-shadow(0 0 20px rgba(0, 210, 255, 0.8));
    }
    to { 
      filter: drop-shadow(0 0 40px rgba(255, 0, 128, 1));
    }
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateX(-50px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes glow {
    0%, 100% {
      box-shadow: 0 0 20px rgba(0, 210, 255, 0.3);
    }
    50% {
      box-shadow: 0 0 40px rgba(255, 0, 128, 0.5);
    }
  }

  .glow {
    animation: glow 3s infinite;
  }

  /* Loading animation */
  @keyframes loading {
    0%, 100% {
      opacity: 1;
      transform: scale(1);
    }
    50% {
      opacity: 0.7;
      transform: scale(1.05);
    }
  }

  .loading {
    animation: loading 2s infinite;
  }

  /* Responsive helpers */
  @media (max-width: 768px) {
    body {
      font-size: 14px;
    }
    
    .mobile-hidden {
      display: none;
    }
  }

  @media (min-width: 769px) {
    .mobile-only {
      display: none;
    }
  }

  /* Print styles */
  @media print {
    * {
      background: white !important;
      color: black !important;
    }
  }
`;

export default GlobalStyles;