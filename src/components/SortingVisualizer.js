import React, { useState, useEffect, useCallback, useRef } from 'react';
import styled, { css, keyframes } from 'styled-components';
import ProfessionalProgressBar from './shared/ProgressBar';

const shimmer = keyframes`
  0% { background-position: -200px 0; }
  100% { background-position: calc(200px + 100%) 0; }
`;

const Container = styled.div`
  padding: 2rem;
  color: #FFFFFF;
  max-width: 1200px;
  margin: 0 auto;
  min-height: 100vh;
  position: relative;
  background: 
    radial-gradient(ellipse at top, #0a0a0a 0%, #000000 100%),
    linear-gradient(135deg, #0a0a0a 0%, #1a0033 25%, #000000 50%, #001133 75%, #000000 100%);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 20% 20%, rgba(0, 210, 255, 0.15) 0%, transparent 50%),
      radial-gradient(circle at 80% 80%, rgba(255, 0, 128, 0.15) 0%, transparent 50%),
      radial-gradient(circle at 60% 20%, rgba(138, 43, 226, 0.1) 0%, transparent 50%);
    z-index: -1;
    pointer-events: none;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
      repeating-linear-gradient(
        0deg,
        transparent,
        transparent 98px,
        rgba(0, 210, 255, 0.03) 100px
      );
    pointer-events: none;
    z-index: -1;
  }
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 3rem;
  font-size: 3.5rem;
  font-weight: 900;
  font-family: 'Orbitron', sans-serif;
  background: linear-gradient(45deg, #00D2FF 0%, #FF0080 25%, #8A2BE2 50%, #00FF7F 75%, #00D2FF 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  background-size: 400% 400%;
  animation: ${shimmer} 6s ease-in-out infinite;
  position: relative;
  letter-spacing: -2px;
  text-transform: uppercase;
  filter: 
    drop-shadow(0 0 20px rgba(0, 210, 255, 0.8))
    drop-shadow(0 0 40px rgba(255, 0, 128, 0.6));
  
  &::after {
    content: '';
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 200px;
    height: 6px;
    background: linear-gradient(135deg, #00D2FF, #FF0080, #8A2BE2);
    border-radius: 3px;
    box-shadow: 
      0 4px 20px rgba(0, 210, 255, 0.6),
      0 0 30px rgba(255, 0, 128, 0.4);
  }
  
  @media (max-width: 768px) {
    font-size: 2.4rem;
  }
`;

const Controls = styled.div`
  background: 
    linear-gradient(135deg, 
      rgba(0, 210, 255, 0.1) 0%, 
      rgba(0, 0, 0, 0.8) 50%, 
      rgba(255, 0, 128, 0.1) 100%
    );
  backdrop-filter: blur(20px);
  border-radius: 25px;
  border: 1px solid rgba(0, 210, 255, 0.3);
  padding: 2.5rem 2rem;
  margin-bottom: 3rem;
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  align-items: center;
  justify-content: center;
  box-shadow: 
    0 12px 40px rgba(0, 0, 0, 0.4),
    0 0 60px rgba(0, 210, 255, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, 
      rgba(0, 210, 255, 0.05), 
      rgba(255, 0, 128, 0.05), 
      rgba(138, 43, 226, 0.05)
    );
    border-radius: 25px;
    z-index: -1;
    opacity: 0.8;
  }
  
  @media (max-width: 768px) {
    padding: 1.5rem 1rem;
    gap: 1rem;
  }
`;

const ControlGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
`;

const Label = styled.label`
  font-size: 0.9rem;
  font-weight: 600;
  color: #B0B0B0;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 0.5rem;
`;

const Select = styled.select`
  padding: 1rem 1.5rem;
  border: 1px solid rgba(0, 210, 255, 0.3);
  border-radius: 15px;
  background: rgba(0, 210, 255, 0.05);
  color: #FFFFFF;
  font-size: 14px;
  font-weight: 600;
  backdrop-filter: blur(15px);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  appearance: none;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  background-image: url("data:image/svg+xml;charset=US-ASCII,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'><path fill='white' d='M2 0L0 2h4zm0 5L0 3h4z'/></svg>");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 12px;
  padding-right: 3rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  
  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.25);
    background: rgba(255, 255, 255, 0.18);
  }
  
  &:hover {
    border-color: rgba(255, 255, 255, 0.4);
    transform: translateY(-1px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  }
  
  option {
    background: #2a2a3e;
    color: white;
    padding: 0.5rem;
  }
`;

const Input = styled.input`
  padding: 0.85rem 1.2rem;
  border: 1.5px solid rgba(255, 255, 255, 0.25);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.12);
  color: white;
  font-size: 15px;
  font-weight: 500;
  backdrop-filter: blur(14px);
  width: 120px;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.65);
    font-weight: 400;
  }
  
  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.25);
    background: rgba(255, 255, 255, 0.18);
  }
  
  &:hover {
    border-color: rgba(255, 255, 255, 0.4);
    transform: translateY(-1px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  }
`;

const Button = styled.button`
  padding: 1rem 2rem;
  border: none;
  border-radius: 25px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-size: 14px;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(10px);
  
  ${props => props.$primary ? css`
    background: linear-gradient(135deg, #00D2FF 0%, #0984E3 100%);
    color: white;
    border: 1px solid rgba(0, 210, 255, 0.5);
    box-shadow: 
      0 8px 25px rgba(0, 210, 255, 0.4),
      0 0 40px rgba(0, 210, 255, 0.2);
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
    text-transform: uppercase;
    letter-spacing: 1px;
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(0, 210, 255, 0.4), transparent);
      transition: left 0.5s;
    }
    
    &:hover {
      background: linear-gradient(135deg, #0984E3 0%, #74B9FF 100%);
      transform: translateY(-3px) scale(1.05);
      box-shadow: 
        0 12px 40px rgba(0, 210, 255, 0.5),
        0 0 60px rgba(116, 185, 255, 0.3);
    }
    
    &:hover::before {
      left: 100%;
    }
  ` : props.$success ? css`
    background: linear-gradient(135deg, #00B894 0%, #00CEC9 100%);
    color: white;
    border: 1px solid rgba(0, 184, 148, 0.5);
    box-shadow: 
      0 8px 25px rgba(0, 184, 148, 0.4),
      0 0 40px rgba(0, 206, 201, 0.2);
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
    text-transform: uppercase;
    letter-spacing: 1px;
    
    &:hover {
      background: linear-gradient(135deg, #00CEC9 0%, #74B9FF 100%);
      transform: translateY(-3px) scale(1.05);
      box-shadow: 
        0 12px 40px rgba(0, 206, 201, 0.5),
        0 0 60px rgba(116, 185, 255, 0.3);
    }
  ` : props.$warning ? css`
    background: linear-gradient(135deg, #FDCB6E 0%, #E17055 100%);
    color: #FFFFFF;
    border: 1px solid rgba(253, 203, 110, 0.5);
    box-shadow: 
      0 8px 25px rgba(253, 203, 110, 0.4),
      0 0 40px rgba(225, 112, 85, 0.2);
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: 700;
    
    &:hover {
      background: linear-gradient(135deg, #E17055 0%, #D63031 100%);
      transform: translateY(-3px) scale(1.05);
      box-shadow: 
        0 12px 40px rgba(225, 112, 85, 0.5),
        0 0 60px rgba(214, 48, 49, 0.3);
    }
  ` : props.$danger ? css`
    background: linear-gradient(135deg, #FF6B6B 0%, #D63031 100%);
    color: white;
    border: 1px solid rgba(255, 107, 107, 0.5);
    box-shadow: 
      0 8px 25px rgba(255, 107, 107, 0.4),
      0 0 40px rgba(214, 48, 49, 0.2);
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
    text-transform: uppercase;
    letter-spacing: 1px;
    
    &:hover {
      background: linear-gradient(135deg, #D63031 0%, #E84393 100%);
      transform: translateY(-3px) scale(1.05);
      box-shadow: 
        0 12px 40px rgba(214, 48, 49, 0.5),
        0 0 60px rgba(232, 67, 147, 0.3);
    }
  ` : css`
    background: rgba(255, 255, 255, 0.12);
    color: white;
    border: 1.5px solid rgba(255, 255, 255, 0.25);
    backdrop-filter: blur(14px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  `}
  
  &:hover {
    transform: translateY(-2px) scale(1.02);
    ${props => !props.$success && !props.$warning && !props.$danger && (props.$primary ? css`
      box-shadow: 0 8px 30px rgba(102, 126, 234, 0.45);
      background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
    ` : css`
      box-shadow: 0 6px 20px rgba(255, 255, 255, 0.15);
      background: rgba(255, 255, 255, 0.18);
    `)}
  }
  
  &:active {
    transform: translateY(0) scale(0.98);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const VisualizationArea = styled.div`
  background: rgba(18, 18, 18, 0.7);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  border: 2px solid rgba(255, 255, 255, 0.12);
  padding: 3.5rem 2.5rem;
  margin-bottom: 3rem;
  min-height: 480px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: 6px;
  overflow-x: auto;
  box-shadow: 
    0 20px 60px rgba(0, 0, 0, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.15);
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    height: 4px;
    background: linear-gradient(90deg, 
      #FF8C42 0%, #4DB6AC 25%, #9B5DE5 50%, 
      #FFD166 75%, #FF8C42 100%);
    border-radius: 24px 24px 0 0;
    background-size: 300% 100%;
    animation: flowingGradient 6s ease infinite;
    z-index: 1;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 24px;
    left: 24px;
    right: 24px;
    bottom: 24px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 18px;
    pointer-events: none;
  }
  
  @media (max-width: 768px) {
    padding: 2rem 1.5rem;
    min-height: 360px;
    gap: 3px;
  }
`;

const Bar = styled.div`
  background: ${props => {
    if (props.$comparing) return 'linear-gradient(135deg, #4DB6AC 0%, #26A69A 50%, #2E8B57 100%)';
    if (props.$swapping) return 'linear-gradient(135deg, #FF8C42 0%, #FF7043 50%, #FF5E62 100%)';
    if (props.$sorted) return 'linear-gradient(135deg, #FFD166 0%, #FFCC02 50%, #FFE066 100%)';
    return 'linear-gradient(135deg, #9B5DE5 0%, #7C3AED 50%, #F15BB5 100%)';
  }};
  color: white;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  font-size: 0.85rem;
  font-weight: 700;
  border-radius: 10px 10px 0 0;
  min-width: 38px;
  position: relative;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.35);
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  transform-origin: bottom center;
  will-change: transform, box-shadow;
  
  &::before {
    content: '';
    position: absolute;
    top: 2px;
    left: 2px;
    right: 2px;
    height: 20%;
    background: linear-gradient(135deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.1) 100%);
    border-radius: 8px 8px 0 0;
    pointer-events: none;
  }
  
  ${props => props.$comparing && css`
    animation: pulse 1.2s infinite;
    transform: scale(1.08) rotateX(5deg);
    z-index: 10;
    box-shadow: 0 12px 35px rgba(77, 182, 172, 0.5);
  `}
  
  ${props => props.$swapping && css`
    animation: bounce 0.6s ease-in-out;
    transform: scale(1.12) rotateY(8deg);
    z-index: 20;
    box-shadow: 0 15px 40px rgba(255, 140, 66, 0.6);
  `}
  
  ${props => props.$sorted && css`
    animation: sparkle 0.8s ease-in-out;
    box-shadow: 0 12px 30px rgba(255, 209, 102, 0.5);
    transform: scale(1.05) rotateZ(2deg);
  `}

  &:hover {
    transform: scale(1.12) translateY(-3px);
    z-index: 5;
    box-shadow: 0 15px 35px rgba(155, 93, 229, 0.5);
  }
  
  @media (max-width: 768px) {
    min-width: 28px;
    font-size: 0.75rem;
    
    &:hover {
      transform: scale(1.05);
    }
  }
`;

const BarValue = styled.div`
  position: absolute;
  top: -28px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.75rem;
  font-weight: 600;
  color: white;
  opacity: 0.9;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`;

const InfoPanel = styled.div`
  background: rgba(255, 255, 255, 0.13);
  backdrop-filter: blur(16px);
  border: 1.5px solid rgba(255, 255, 255, 0.18);
  border-radius: 20px;
  padding: 2.5rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2.5rem;
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.2);
  
  @media (max-width: 768px) {
    padding: 1.5rem;
    gap: 1.5rem;
    grid-template-columns: 1fr;
  }
`;

const InfoCard = styled.div`
  text-align: center;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  &:hover {
    transform: translateY(-4px);
    background: rgba(255, 255, 255, 0.08);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
  }
`;

const InfoTitle = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 1.2rem;
  color: #667eea;
  font-weight: 700;
  text-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
`;

const InfoValue = styled.div`
  font-size: 1.6rem;
  font-weight: 700;
  margin-bottom: 0.8rem;
  background: linear-gradient(135deg, #FFD166, #FF8C42);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const InfoDescription = styled.div`
  font-size: 1rem;
  opacity: 0.85;
  line-height: 1.5;
`;

const algorithms = {
  bubble: {
    name: 'Bubble Sort',
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1)',
    description: 'Compares adjacent elements and swaps them if they are in wrong order'
  },
  selection: {
    name: 'Selection Sort',
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1)',
    description: 'Finds minimum element and places it at the beginning'
  },
  insertion: {
    name: 'Insertion Sort',
    timeComplexity: 'O(n²)',
    spaceComplexity: 'O(1)',
    description: 'Builds sorted array one element at a time'
  },
  merge: {
    name: 'Merge Sort',
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(n)',
    description: 'Divide and conquer algorithm that merges sorted subarrays'
  },
  quick: {
    name: 'Quick Sort',
    timeComplexity: 'O(n log n)',
    spaceComplexity: 'O(log n)',
    description: 'Partitions array around pivot and recursively sorts'
  }
};

const SortingVisualizer = () => {
  const [array, setArray] = useState([]);
  const [algorithm, setAlgorithm] = useState('bubble');
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(100);
  const [arraySize, setArraySize] = useState(20);
  const [comparisons, setComparisons] = useState(0);
  const [swaps, setSwaps] = useState(0);
  const [currentStep, setCurrentStep] = useState('');
  const [comparingIndices, setComparingIndices] = useState([]);
  const [swappingIndices, setSwappingIndices] = useState([]);
  const [sortedIndices, setSortedIndices] = useState([]);
  const [shouldStop, setShouldStop] = useState(false);
  
  // Ref to track if component is mounted
  const mountedRef = useRef(true);

  const generateArray = useCallback(() => {
    const newArray = Array.from({ length: arraySize }, () => 
      Math.floor(Math.random() * 300) + 10
    );
    setArray(newArray);
    setComparisons(0);
    setSwaps(0);
    setCurrentStep('Array generated');
    setComparingIndices([]);
    setSwappingIndices([]);
    setSortedIndices([]);
    setShouldStop(false);
  }, [arraySize]);

  useEffect(() => {
    generateArray();
  }, [generateArray]);
  
  // Cleanup effect
  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const sleep = (ms) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (shouldStop) {
          reject(new Error('Sorting stopped'));
        } else {
          resolve();
        }
      }, ms);
    });
  };

  const bubbleSort = async (arr) => {
    const n = arr.length;
    let tempComparisons = 0;
    let tempSwaps = 0;

    for (let i = 0; i < n - 1; i++) {
      if (shouldStop) return;
      
      for (let j = 0; j < n - i - 1; j++) {
        if (shouldStop) return;
        
        setComparingIndices([j, j + 1]);
        setCurrentStep(`Comparing ${arr[j]} and ${arr[j + 1]}`);
        tempComparisons++;
        setComparisons(tempComparisons);
        
        await sleep(speed);

        if (arr[j] > arr[j + 1]) {
          setSwappingIndices([j, j + 1]);
          setCurrentStep(`Swapping ${arr[j]} and ${arr[j + 1]}`);
          
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          setArray([...arr]);
          tempSwaps++;
          setSwaps(tempSwaps);
          
          await sleep(speed);
          setSwappingIndices([]);
        }
      }
      setSortedIndices(prev => [...prev, n - 1 - i]);
    }
    setSortedIndices(prev => [...prev, 0]);
    setComparingIndices([]);
    setCurrentStep('Sorting complete!');
  };

  const selectionSort = async (arr) => {
    const n = arr.length;
    let tempComparisons = 0;
    let tempSwaps = 0;

    for (let i = 0; i < n - 1; i++) {
      if (shouldStop) return;
      
      let minIdx = i;
      setCurrentStep(`Finding minimum from position ${i}`);
      
      for (let j = i + 1; j < n; j++) {
        if (shouldStop) return;
        
        setComparingIndices([minIdx, j]);
        tempComparisons++;
        setComparisons(tempComparisons);
        
        await sleep(speed);
        
        if (arr[j] < arr[minIdx]) {
          minIdx = j;
          setCurrentStep(`New minimum found: ${arr[j]}`);
        }
      }
      
      if (minIdx !== i) {
        setSwappingIndices([i, minIdx]);
        setCurrentStep(`Swapping ${arr[i]} with ${arr[minIdx]}`);
        
        [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
        setArray([...arr]);
        tempSwaps++;
        setSwaps(tempSwaps);
        
        await sleep(speed);
        setSwappingIndices([]);
      }
      setSortedIndices(prev => [...prev, i]);
    }
    setSortedIndices(prev => [...prev, n - 1]);
    setComparingIndices([]);
    setCurrentStep('Sorting complete!');
  };

  const insertionSort = async (arr) => {
    const n = arr.length;
    let tempComparisons = 0;
    let tempSwaps = 0;

    setSortedIndices([0]);
    
    for (let i = 1; i < n; i++) {
      if (shouldStop || !mountedRef.current) return;
      
      let key = arr[i];
      let j = i - 1;
      setCurrentStep(`Inserting ${key} into sorted portion`);
      
      while (j >= 0) {
        if (shouldStop || !mountedRef.current) return;
        
        setComparingIndices([j, i]);
        tempComparisons++;
        setComparisons(tempComparisons);
        
        await sleep(speed);
        
        if (arr[j] <= key) break;
        
        setSwappingIndices([j, j + 1]);
        arr[j + 1] = arr[j];
        setArray([...arr]);
        tempSwaps++;
        setSwaps(tempSwaps);
        
        await sleep(speed);
        setSwappingIndices([]);
        j--;
      }
      
      arr[j + 1] = key;
      setArray([...arr]);
      setSortedIndices(prev => [...prev, i]);
    }
    
    setComparingIndices([]);
    setCurrentStep('Sorting complete!');
  };

  const mergeSort = async (arr, left = 0, right = arr.length - 1) => {
    if (shouldStop || !mountedRef.current) return;
    if (left >= right) return;
    
    const mid = Math.floor((left + right) / 2);
    setCurrentStep(`Dividing array: [${left}...${mid}] and [${mid + 1}...${right}]`);
    
    await mergeSort(arr, left, mid);
    if (shouldStop || !mountedRef.current) return;
    await mergeSort(arr, mid + 1, right);
    if (shouldStop || !mountedRef.current) return;
    await merge(arr, left, mid, right);
  };

  const merge = async (arr, left, mid, right) => {
    if (shouldStop || !mountedRef.current) return;
    
    const leftArr = arr.slice(left, mid + 1);
    const rightArr = arr.slice(mid + 1, right + 1);
    
    let i = 0, j = 0, k = left;
    
    while (i < leftArr.length && j < rightArr.length) {
      if (shouldStop || !mountedRef.current) return;
      
      setComparingIndices([left + i, mid + 1 + j]);
      setCurrentStep(`Merging: comparing ${leftArr[i]} and ${rightArr[j]}`);
      setComparisons(prev => prev + 1);
      
      await sleep(speed);
      
      if (leftArr[i] <= rightArr[j]) {
        arr[k] = leftArr[i];
        i++;
      } else {
        arr[k] = rightArr[j];
        j++;
      }
      
      setArray([...arr]);
      setSwaps(prev => prev + 1);
      k++;
      
      await sleep(speed);
    }
    
    while (i < leftArr.length) {
      arr[k] = leftArr[i];
      setArray([...arr]);
      i++;
      k++;
      await sleep(speed / 2);
    }
    
    while (j < rightArr.length) {
      arr[k] = rightArr[j];
      setArray([...arr]);
      j++;
      k++;
      await sleep(speed / 2);
    }
    
    setComparingIndices([]);
  };

  const quickSort = async (arr, low = 0, high = arr.length - 1) => {
    if (shouldStop || !mountedRef.current) return;
    if (low < high) {
      const pi = await partition(arr, low, high);
      if (shouldStop || !mountedRef.current) return;
      await quickSort(arr, low, pi - 1);
      if (shouldStop || !mountedRef.current) return;
      await quickSort(arr, pi + 1, high);
    }
  };

  const partition = async (arr, low, high) => {
    if (shouldStop || !mountedRef.current) return -1;
    
    const pivot = arr[high];
    setCurrentStep(`Partitioning with pivot: ${pivot}`);
    let i = low - 1;
    
    for (let j = low; j < high; j++) {
      if (shouldStop || !mountedRef.current) return i + 1;
      
      setComparingIndices([j, high]);
      setCurrentStep(`Comparing ${arr[j]} with pivot ${pivot}`);
      setComparisons(prev => prev + 1);
      
      await sleep(speed);
      
      if (arr[j] < pivot) {
        i++;
        if (i !== j) {
          setSwappingIndices([i, j]);
          [arr[i], arr[j]] = [arr[j], arr[i]];
          setArray([...arr]);
          setSwaps(prev => prev + 1);
          
          await sleep(speed);
          setSwappingIndices([]);
        }
      }
    }
    
    setSwappingIndices([i + 1, high]);
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    setArray([...arr]);
    setSwaps(prev => prev + 1);
    
    await sleep(speed);
    setSwappingIndices([]);
    setComparingIndices([]);
    
    return i + 1;
  };

  const startSorting = async () => {
    if (isRunning) return;
    
    setIsRunning(true);
    setShouldStop(false);
    setComparisons(0);
    setSwaps(0);
    setSortedIndices([]);
    
    const arrCopy = [...array];
    
    try {
      switch (algorithm) {
        case 'bubble':
          await bubbleSort(arrCopy);
          break;
        case 'selection':
          await selectionSort(arrCopy);
          break;
        case 'insertion':
          await insertionSort(arrCopy);
          break;
        case 'merge':
          await mergeSort(arrCopy);
          if (!shouldStop && mountedRef.current) {
            setSortedIndices(Array.from({ length: arrCopy.length }, (_, i) => i));
          }
          break;
        case 'quick':
          await quickSort(arrCopy);
          if (!shouldStop && mountedRef.current) {
            setSortedIndices(Array.from({ length: arrCopy.length }, (_, i) => i));
          }
          break;
        default:
          break;
      }
    } catch (error) {
      if (error.message !== 'Sorting stopped') {
        console.error('Sorting error:', error);
      }
    }
    
    if (mountedRef.current) {
      setIsRunning(false);
      setComparingIndices([]);
      setSwappingIndices([]);
      if (!shouldStop) {
        setCurrentStep('Sorting complete!');
      } else {
        setCurrentStep('Sorting stopped');
      }
    }
  };
  
  const stopSorting = () => {
    setShouldStop(true);
    setCurrentStep('Stopping...');
  };

  const resetArray = () => {
    setShouldStop(true);
    setIsRunning(false);
    setTimeout(() => {
      if (mountedRef.current) {
        generateArray();
        setShouldStop(false);
      }
    }, 100);
  };

  return (
    <Container>
      <Title>Sorting Algorithms Visualizer</Title>
      
      <Controls>
        <ControlGroup>
          <Label>Algorithm</Label>
          <Select
            value={algorithm}
            onChange={(e) => setAlgorithm(e.target.value)}
            disabled={isRunning}
          >
            {Object.entries(algorithms).map(([key, algo]) => (
              <option key={key} value={key}>{algo.name}</option>
            ))}
          </Select>
        </ControlGroup>
        
        <ControlGroup>
          <Label>Array Size</Label>
          <Input
            type="number"
            min="5"
            max="100"
            value={arraySize}
            onChange={(e) => setArraySize(parseInt(e.target.value))}
            disabled={isRunning}
          />
        </ControlGroup>
        
        <ControlGroup>
          <Label>Speed (ms)</Label>
          <Input
            type="number"
            min="10"
            max="1000"
            step="10"
            value={speed}
            onChange={(e) => setSpeed(parseInt(e.target.value))}
            disabled={isRunning}
          />
        </ControlGroup>
        
        <Button $success onClick={generateArray} disabled={isRunning}>
          Generate New Array
        </Button>

        {!isRunning ? (
          <Button $primary onClick={startSorting} data-sort-button>
            Start Sorting
          </Button>
        ) : (
          <Button $danger onClick={stopSorting}>
            Stop Sorting
          </Button>
        )}

        <Button $warning onClick={resetArray}>
          Reset
        </Button>
      </Controls>
      
      <VisualizationArea>
        {array.map((value, index) => (
          <Bar
            key={`${index}-${value}`}
            style={{ height: `${value}px` }}
            $comparing={comparingIndices.includes(index)}
            $swapping={swappingIndices.includes(index)}
            $sorted={sortedIndices.includes(index)}
          >
            <BarValue>{value}</BarValue>
          </Bar>
        ))}
      </VisualizationArea>
      
      <InfoPanel>
        <InfoCard>
          <InfoTitle>Algorithm</InfoTitle>
          <InfoValue>{algorithms[algorithm].name}</InfoValue>
          <InfoDescription>{algorithms[algorithm].description}</InfoDescription>
        </InfoCard>
        
          <InfoCard>
            <InfoTitle>Time Complexity</InfoTitle>
            <InfoValue>{algorithms[algorithm].timeComplexity}</InfoValue>
            <InfoDescription>Worst case performance</InfoDescription>
          </InfoCard>

          <InfoCard>
            <InfoTitle>Progress & Statistics</InfoTitle>
            <div style={{ marginBottom: '1rem' }}>
              <ProfessionalProgressBar 
                progress={sortedIndices.length} 
                maxValue={array.length}
                label="Sorted Elements"
                animated={isRunning}
              />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <ProfessionalProgressBar 
                progress={comparisons} 
                maxValue={Math.max(array.length * 2, 50)}
                label="Comparisons"
                showValue={true}
              />
            </div>
            <div>
              <ProfessionalProgressBar 
                progress={swaps} 
                maxValue={Math.max(array.length, 20)}
                label="Swaps"
                showValue={true}
              />
            </div>
          </InfoCard>        <InfoCard>
          <InfoTitle>Space Complexity</InfoTitle>
          <InfoValue>{algorithms[algorithm].spaceComplexity}</InfoValue>
          <InfoDescription>Additional memory used</InfoDescription>
        </InfoCard>
        
        <InfoCard>
          <InfoTitle>Comparisons</InfoTitle>
          <InfoValue>{comparisons}</InfoValue>
          <InfoDescription>Elements compared</InfoDescription>
        </InfoCard>
        
        <InfoCard>
          <InfoTitle>Swaps</InfoTitle>
          <InfoValue>{swaps}</InfoValue>
          <InfoDescription>Elements swapped</InfoDescription>
        </InfoCard>
        
        <InfoCard>
          <InfoTitle>Current Step</InfoTitle>
          <InfoValue style={{ fontSize: '1rem' }}>{currentStep}</InfoValue>
          <InfoDescription>What's happening now</InfoDescription>
        </InfoCard>
      </InfoPanel>
    </Container>
  );
};

export default SortingVisualizer;