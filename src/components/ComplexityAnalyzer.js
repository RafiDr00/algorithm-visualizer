import React, { useState, useCallback } from 'react';
import styled, { keyframes } from 'styled-components';

const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const neonFlow = keyframes`
  0% { 
    box-shadow: 
      0 0 20px rgba(0, 210, 255, 0.8),
      0 0 40px rgba(255, 0, 128, 0.6),
      0 0 60px rgba(0, 210, 255, 0.4);
  }
  50% {
    box-shadow: 
      0 0 30px rgba(255, 0, 128, 0.8),
      0 0 50px rgba(0, 210, 255, 0.6),
      0 0 70px rgba(255, 0, 128, 0.4);
  }
  100% { 
    box-shadow: 
      0 0 20px rgba(0, 210, 255, 0.8),
      0 0 40px rgba(255, 0, 128, 0.6),
      0 0 60px rgba(0, 210, 255, 0.4);
  }
`;

const floatAnimation = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

const Container = styled.div`
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
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="%23ffffff" stroke-width="0.5" opacity="0.1"/></pattern></defs><rect width="100%" height="100%" fill="url(%23grid)"/></svg>');
    opacity: 0.3;
    z-index: 1;
  }
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 10;
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  font-weight: 900;
  margin-bottom: 3rem;
  font-family: 'Orbitron', 'Arial Black', sans-serif;
  letter-spacing: -2px;
  text-transform: uppercase;
  text-align: center;
  
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

const ControlPanel = styled.div`
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  border: 2px solid;
  border-image: linear-gradient(45deg, #00D2FF, #FF0080, #8A2BE2) 1;
  padding: 2.5rem;
  margin-bottom: 2rem;
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  animation: ${floatAnimation} 6s ease-in-out infinite;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: -2px; left: -2px; right: -2px; bottom: -2px;
    background: linear-gradient(45deg, #00D2FF, #FF0080, #8A2BE2, #00FF7F);
    border-radius: 20px;
    z-index: -1;
    opacity: 0.3;
    filter: blur(10px);
  }
`;

const ControlGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
`;

const ControlGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const Label = styled.label`
  font-size: 0.9rem;
  font-weight: 600;
  color: #00D2FF;
  text-transform: uppercase;
  letter-spacing: 1px;
  text-shadow: 0 0 10px rgba(0, 210, 255, 0.5);
`;

const Select = styled.select`
  padding: 1rem;
  border: 2px solid rgba(0, 210, 255, 0.3);
  border-radius: 12px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  font-size: 14px;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  font-family: 'Inter', sans-serif;
  
  &:focus {
    outline: none;
    border-color: #00D2FF;
    box-shadow: 0 0 20px rgba(0, 210, 255, 0.4);
    background: rgba(0, 0, 0, 0.9);
  }
  
  &:hover {
    border-color: #FF0080;
    box-shadow: 0 0 15px rgba(255, 0, 128, 0.3);
  }
  
  option {
    background: #0a0a0a;
    color: white;
    padding: 0.5rem;
  }
`;

const Input = styled.input`
  padding: 1rem;
  border: 2px solid rgba(0, 210, 255, 0.3);
  border-radius: 12px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  font-size: 14px;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  font-family: 'Inter', sans-serif;
  
  &:focus {
    outline: none;
    border-color: #00D2FF;
    box-shadow: 0 0 20px rgba(0, 210, 255, 0.4);
    background: rgba(0, 0, 0, 0.9);
  }
  
  &:hover {
    border-color: #FF0080;
    box-shadow: 0 0 15px rgba(255, 0, 128, 0.3);
  }
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;

const Button = styled.button`
  padding: 1rem 2rem;
  border: none;
  border-radius: 12px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-family: 'Orbitron', sans-serif;
  position: relative;
  overflow: hidden;
  
  background: ${props => props.$primary ? 
    'linear-gradient(45deg, #00D2FF, #FF0080)' : 
    'linear-gradient(45deg, #8A2BE2, #00FF7F)'};
  color: white;
  box-shadow: 0 4px 15px rgba(0, 210, 255, 0.3);
  
  &::before {
    content: '';
    position: absolute;
    top: 0; left: -100%;
    width: 100%; height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s;
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 210, 255, 0.4);
    
    &::before {
      left: 100%;
    }
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
    
    &:hover::before {
      left: -100%;
    }
  }
`;

const ComplexityAnalyzer = () => {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('bubbleSort');
  const [inputSize, setInputSize] = useState(100);
  const [testType, setTestType] = useState('random');
  const [performanceData, setPerformanceData] = useState([]);
  const [isRunningTest, setIsRunningTest] = useState(false);
  const [realTimeMetrics, setRealTimeMetrics] = useState({});
  const [testProgress, setTestProgress] = useState('');

  const generateTestData = useCallback((size, type = 'random') => {
    const data = [];
    switch (type) {
      case 'random':
        for (let i = 0; i < size; i++) {
          data.push(Math.floor(Math.random() * 1000));
        }
        break;
      case 'sorted':
        for (let i = 0; i < size; i++) {
          data.push(i);
        }
        break;
      case 'reverse':
        for (let i = size; i > 0; i--) {
          data.push(i);
        }
        break;
      default:
        break;
    }
    return data;
  }, []);

  const runPerformanceTest = async () => {
    setIsRunningTest(true);
    setTestProgress('Running performance analysis...');
    
    const algorithm = algorithms[selectedAlgorithm];
    if (!algorithm.implementation) return;

    const sizes = [10, 25, 50, 100, 250, 500];
    const results = [];
    
    for (const size of sizes) {
      const testData = generateTestData(size, testType);
      const startTime = performance.now();
      const result = algorithm.implementation(testData);
      const endTime = performance.now();
      
      const executionTime = endTime - startTime;
      results.push({
        size,
        time: executionTime.toFixed(3),
        comparisons: result.comparisons || 0,
        swaps: result.swaps || 0
      });
    }
    
    setPerformanceData(results);
    const lastResult = results[results.length - 1];
    setRealTimeMetrics({
      executionTime: lastResult.time,
      comparisons: lastResult.comparisons,
      swaps: lastResult.swaps,
      inputSize: inputSize
    });
    
    setIsRunningTest(false);
    setTestProgress('Analysis completed!');
    setTimeout(() => setTestProgress(''), 3000);
  };

  const algorithms = {
    bubbleSort: {
      name: 'Bubble Sort',
      timeComplexity: { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)' },
      spaceComplexity: 'O(1)',
      description: 'Simple comparison-based sorting algorithm.',
      implementation: (arr) => {
        const result = [...arr];
        let swaps = 0, comparisons = 0;
        for (let i = 0; i < result.length - 1; i++) {
          for (let j = 0; j < result.length - i - 1; j++) {
            comparisons++;
            if (result[j] > result[j + 1]) {
              [result[j], result[j + 1]] = [result[j + 1], result[j]];
              swaps++;
            }
          }
        }
        return { sorted: result, swaps, comparisons };
      }
    },
    mergeSort: {
      name: 'Merge Sort',
      timeComplexity: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)' },
      spaceComplexity: 'O(n)',
      description: 'Efficient divide-and-conquer sorting algorithm.',
      implementation: (arr) => {
        let comparisons = 0;
        const merge = (left, right) => {
          const result = [];
          let i = 0, j = 0;
          while (i < left.length && j < right.length) {
            comparisons++;
            if (left[i] <= right[j]) {
              result.push(left[i++]);
            } else {
              result.push(right[j++]);
            }
          }
          return result.concat(left.slice(i)).concat(right.slice(j));
        };
        const mergeSort = (array) => {
          if (array.length <= 1) return array;
          const mid = Math.floor(array.length / 2);
          return merge(mergeSort(array.slice(0, mid)), mergeSort(array.slice(mid)));
        };
        return { sorted: mergeSort([...arr]), swaps: 0, comparisons };
      }
    },
    quickSort: {
      name: 'Quick Sort',
      timeComplexity: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n²)' },
      spaceComplexity: 'O(log n)',
      description: 'Fast divide-and-conquer algorithm using pivot partitioning.',
      implementation: (arr) => {
        const result = [...arr];
        let swaps = 0, comparisons = 0;
        const quickSort = (low, high) => {
          if (low < high) {
            const pi = partition(low, high);
            quickSort(low, pi - 1);
            quickSort(pi + 1, high);
          }
        };
        const partition = (low, high) => {
          const pivot = result[high];
          let i = low - 1;
          for (let j = low; j < high; j++) {
            comparisons++;
            if (result[j] < pivot) {
              i++;
              [result[i], result[j]] = [result[j], result[i]];
              swaps++;
            }
          }
          [result[i + 1], result[high]] = [result[high], result[i + 1]];
          swaps++;
          return i + 1;
        };
        quickSort(0, result.length - 1);
        return { sorted: result, swaps, comparisons };
      }
    }
  };

  return (
    <Container>
      <ContentWrapper>
        <Title>Algorithm Complexity Analyzer</Title>
        <ControlPanel>
          <h3 style={{ color: '#00D2FF', textAlign: 'center', marginBottom: '2rem', fontFamily: 'Orbitron', textTransform: 'uppercase', letterSpacing: '2px' }}>
            Algorithm Analysis
          </h3>
          <ControlGrid>
            <ControlGroup>
              <Label>Algorithm</Label>
              <Select 
                value={selectedAlgorithm} 
                onChange={(e) => setSelectedAlgorithm(e.target.value)}
              >
                {Object.entries(algorithms).map(([key, alg]) => (
                  <option key={key} value={key}>
                    {alg.name}
                  </option>
                ))}
              </Select>
            </ControlGroup>
            <ControlGroup>
              <Label>Input Size</Label>
              <Input 
                type="number" 
                value={inputSize} 
                onChange={(e) => setInputSize(Number(e.target.value))}
                min="10"
                max="1000"
                placeholder="Enter array size"
              />
            </ControlGroup>
            <ControlGroup>
              <Label>Test Data Type</Label>
              <Select 
                value={testType} 
                onChange={(e) => setTestType(e.target.value)}
              >
                <option value="random">Random Data</option>
                <option value="sorted">Already Sorted</option>
                <option value="reverse">Reverse Sorted</option>
              </Select>
            </ControlGroup>
            <ControlGroup>
              <Label>Actions</Label>
              <Button 
                $primary
                onClick={runPerformanceTest} 
                disabled={isRunningTest}
              >
                {isRunningTest ? 'Testing...' : 'Run Analysis'}
              </Button>
            </ControlGroup>
          </ControlGrid>
          
          {testProgress && (
            <div style={{ 
              textAlign: 'center', 
              color: '#00D2FF', 
              fontSize: '1.1rem', 
              fontWeight: 'bold',
              marginTop: '1rem',
              textShadow: '0 0 10px rgba(0, 210, 255, 0.5)' 
            }}>
              {testProgress}
            </div>
          )}
        
        {algorithms[selectedAlgorithm] && (
          <div style={{ marginTop: '2rem' }}>
            <h4 style={{ color: '#FF0080', marginBottom: '1rem' }}>
              {algorithms[selectedAlgorithm].name}
            </h4>
            <p style={{ marginBottom: '1rem', opacity: 0.8 }}>
              {algorithms[selectedAlgorithm].description}
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
              <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '1rem', borderRadius: '10px' }}>
                <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>Best Case</div>
                <div style={{ color: '#00FF7F', fontWeight: 'bold', fontFamily: 'Orbitron' }}>
                  {algorithms[selectedAlgorithm].timeComplexity.best}
                </div>
              </div>
              <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '1rem', borderRadius: '10px' }}>
                <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>Average Case</div>
                <div style={{ color: '#FFD700', fontWeight: 'bold', fontFamily: 'Orbitron' }}>
                  {algorithms[selectedAlgorithm].timeComplexity.average}
                </div>
              </div>
              <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '1rem', borderRadius: '10px' }}>
                <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>Worst Case</div>
                <div style={{ color: '#FF0080', fontWeight: 'bold', fontFamily: 'Orbitron' }}>
                  {algorithms[selectedAlgorithm].timeComplexity.worst}
                </div>
              </div>
              <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '1rem', borderRadius: '10px' }}>
                <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>Space Complexity</div>
                <div style={{ color: '#00D2FF', fontWeight: 'bold', fontFamily: 'Orbitron' }}>
                  {algorithms[selectedAlgorithm].spaceComplexity}
                </div>
              </div>
            </div>
          </div>
        )}
        
        {testProgress && (
          <div style={{ 
            textAlign: 'center', 
            color: '#00D2FF', 
            fontSize: '1.1rem', 
            fontWeight: 'bold',
            marginTop: '1rem'
          }}>
            {testProgress}
          </div>
        )}
        </ControlPanel>

      {Object.keys(realTimeMetrics).length > 0 && (
        <div style={{ 
          background: 'rgba(255, 255, 255, 0.1)', 
          borderRadius: '20px', 
          padding: '2rem', 
          marginBottom: '2rem',
          backdropFilter: 'blur(15px)'
        }}>
          <h3 style={{ color: '#00D2FF', textAlign: 'center', marginBottom: '2rem' }}>
            Real-Time Metrics
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
            <div style={{ background: 'rgba(0, 0, 0, 0.4)', padding: '1rem', borderRadius: '10px', textAlign: 'center' }}>
              <div style={{ fontSize: '0.8rem', opacity: 0.7, marginBottom: '0.5rem' }}>Execution Time</div>
              <div style={{ color: '#00D2FF', fontWeight: 'bold', fontFamily: 'Orbitron', fontSize: '1.2rem' }}>
                {realTimeMetrics.executionTime} ms
              </div>
            </div>
            <div style={{ background: 'rgba(0, 0, 0, 0.4)', padding: '1rem', borderRadius: '10px', textAlign: 'center' }}>
              <div style={{ fontSize: '0.8rem', opacity: 0.7, marginBottom: '0.5rem' }}>Comparisons</div>
              <div style={{ color: '#FF0080', fontWeight: 'bold', fontFamily: 'Orbitron', fontSize: '1.2rem' }}>
                {realTimeMetrics.comparisons?.toLocaleString() || 0}
              </div>
            </div>
            <div style={{ background: 'rgba(0, 0, 0, 0.4)', padding: '1rem', borderRadius: '10px', textAlign: 'center' }}>
              <div style={{ fontSize: '0.8rem', opacity: 0.7, marginBottom: '0.5rem' }}>Swaps</div>
              <div style={{ color: '#00FF7F', fontWeight: 'bold', fontFamily: 'Orbitron', fontSize: '1.2rem' }}>
                {realTimeMetrics.swaps?.toLocaleString() || 0}
              </div>
            </div>
            <div style={{ background: 'rgba(0, 0, 0, 0.4)', padding: '1rem', borderRadius: '10px', textAlign: 'center' }}>
              <div style={{ fontSize: '0.8rem', opacity: 0.7, marginBottom: '0.5rem' }}>Input Size</div>
              <div style={{ color: '#FFD700', fontWeight: 'bold', fontFamily: 'Orbitron', fontSize: '1.2rem' }}>
                {realTimeMetrics.inputSize}
              </div>
            </div>
          </div>
        </div>
      )}

      {performanceData.length > 0 && (
        <div style={{ 
          background: 'rgba(255, 255, 255, 0.1)', 
          borderRadius: '20px', 
          padding: '2rem',
          backdropFilter: 'blur(15px)'
        }}>
          <h3 style={{ color: '#00D2FF', textAlign: 'center', marginBottom: '2rem' }}>
            Performance Results
          </h3>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr 1fr 1fr 1fr', 
            gap: '1rem', 
            padding: '1rem', 
            background: 'rgba(0, 210, 255, 0.2)', 
            borderRadius: '10px', 
            marginBottom: '1rem',
            fontWeight: 'bold'
          }}>
            <div>Input Size</div>
            <div>Time (ms)</div>
            <div>Comparisons</div>
            <div>Swaps</div>
          </div>
          {performanceData.map((data, index) => (
            <div key={index} style={{ 
              display: 'grid', 
              gridTemplateColumns: '1fr 1fr 1fr 1fr', 
              gap: '1rem', 
              padding: '1rem', 
              background: 'rgba(0, 0, 0, 0.3)', 
              borderRadius: '8px', 
              marginBottom: '0.5rem',
              transition: 'all 0.3s ease'
            }}>
              <div>{data.size}</div>
              <div>{data.time}</div>
              <div>{data.comparisons.toLocaleString()}</div>
              <div>{data.swaps.toLocaleString()}</div>
            </div>
          ))}
        </div>
      )}
      </ContentWrapper>
    </Container>
  );
};

export default ComplexityAnalyzer;
