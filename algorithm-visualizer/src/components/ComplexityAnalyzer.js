import React, { useState } from 'react';
import styled from 'styled-components';
// Charts library removed for lighter build

const Container = styled.div`
  padding: 2rem;
  color: white;
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2.5rem;
  font-weight: 700;
`;

const Controls = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 2rem;
  margin-bottom: 2rem;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
  justify-content: center;
`;

const ControlGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
`;

const Label = styled.label`
  font-size: 0.9rem;
  opacity: 0.8;
`;

const Select = styled.select`
  padding: 0.75rem 1rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 14px;
  backdrop-filter: blur(10px);
  cursor: pointer;
  
  option {
    background: #2a2a3e;
    color: white;
  }
`;

const Input = styled.input`
  padding: 0.75rem 1rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 14px;
  backdrop-filter: blur(10px);
  width: 100px;
  text-align: center;
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 14px;
  background: linear-gradient(45deg, #667eea, #764ba2);
  color: white;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const ChartContainer = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  padding: 2rem;
  margin-bottom: 2rem;
  height: 400px;
`;

const ChartTitle = styled.h3`
  text-align: center;
  margin-bottom: 1rem;
  color: #667eea;
`;

const ComparisonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
`;

const ComparisonCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const AlgorithmName = styled.h3`
  color: #667eea;
  margin-bottom: 1rem;
  text-align: center;
`;

const ComplexityInfo = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const ComplexityItem = styled.div`
  text-align: center;
`;

const ComplexityLabel = styled.div`
  font-size: 0.9rem;
  opacity: 0.8;
  margin-bottom: 0.5rem;
`;

const ComplexityValue = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  color: ${props => {
    if (props.$complexity.includes('n²') || props.$complexity.includes('2^n')) return '#ff6b6b';
    if (props.$complexity.includes('n log n')) return '#ffa726';
    if (props.$complexity.includes('n')) return '#66bb6a';
    return '#42a5f5';
  }};
`;

const PerformanceMetrics = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-top: 1rem;
`;

const MetricItem = styled.div`
  text-align: center;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
`;

const MetricLabel = styled.div`
  font-size: 0.8rem;
  opacity: 0.8;
  margin-bottom: 0.5rem;
`;

const MetricValue = styled.div`
  font-size: 1.1rem;
  font-weight: 600;
`;

const algorithms = {
  // Sorting Algorithms
  'bubble-sort': {
    name: 'Bubble Sort',
    timeComplexity: {
      best: 'O(n)',
      average: 'O(n²)',
      worst: 'O(n²)'
    },
    spaceComplexity: 'O(1)',
    category: 'sorting',
    implementation: (arr) => {
      const result = [...arr];
      let comparisons = 0;
      let swaps = 0;
      const steps = [];
      
      for (let i = 0; i < result.length - 1; i++) {
        for (let j = 0; j < result.length - i - 1; j++) {
          comparisons++;
          if (result[j] > result[j + 1]) {
            [result[j], result[j + 1]] = [result[j + 1], result[j]];
            swaps++;
          }
        }
      }
      
      return { comparisons, swaps, steps };
    }
  },
  'merge-sort': {
    name: 'Merge Sort',
    timeComplexity: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n log n)'
    },
    spaceComplexity: 'O(n)',
    category: 'sorting',
    implementation: (arr) => {
      let comparisons = 0;
      let merges = 0;
      
      const mergeSort = (array) => {
        if (array.length <= 1) return array;
        
        const mid = Math.floor(array.length / 2);
        const left = mergeSort(array.slice(0, mid));
        const right = mergeSort(array.slice(mid));
        
        return merge(left, right);
      };
      
      const merge = (left, right) => {
        const result = [];
        let i = 0, j = 0;
        
        while (i < left.length && j < right.length) {
          comparisons++;
          if (left[i] <= right[j]) {
            result.push(left[i]);
            i++;
          } else {
            result.push(right[j]);
            j++;
          }
          merges++;
        }
        
        return result.concat(left.slice(i)).concat(right.slice(j));
      };
      
      mergeSort([...arr]);
      return { comparisons, swaps: merges };
    }
  },
  'quick-sort': {
    name: 'Quick Sort',
    timeComplexity: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n²)'
    },
    spaceComplexity: 'O(log n)',
    category: 'sorting',
    implementation: (arr) => {
      let comparisons = 0;
      let swaps = 0;
      
      const quickSort = (array, low = 0, high = array.length - 1) => {
        if (low < high) {
          const pi = partition(array, low, high);
          quickSort(array, low, pi - 1);
          quickSort(array, pi + 1, high);
        }
      };
      
      const partition = (array, low, high) => {
        const pivot = array[high];
        let i = low - 1;
        
        for (let j = low; j < high; j++) {
          comparisons++;
          if (array[j] < pivot) {
            i++;
            [array[i], array[j]] = [array[j], array[i]];
            swaps++;
          }
        }
        
        [array[i + 1], array[high]] = [array[high], array[i + 1]];
        swaps++;
        return i + 1;
      };
      
      const result = [...arr];
      quickSort(result);
      return { comparisons, swaps };
    }
  },
  // Search Algorithms
  'linear-search': {
    name: 'Linear Search',
    timeComplexity: {
      best: 'O(1)',
      average: 'O(n)',
      worst: 'O(n)'
    },
    spaceComplexity: 'O(1)',
    category: 'search',
    implementation: (arr, target = arr[Math.floor(arr.length / 2)]) => {
      let comparisons = 0;
      
      for (let i = 0; i < arr.length; i++) {
        comparisons++;
        if (arr[i] === target) {
          return { comparisons, found: true, index: i };
        }
      }
      
      return { comparisons, found: false, index: -1 };
    }
  },
  'binary-search': {
    name: 'Binary Search',
    timeComplexity: {
      best: 'O(1)',
      average: 'O(log n)',
      worst: 'O(log n)'
    },
    spaceComplexity: 'O(1)',
    category: 'search',
    implementation: (arr, target = arr[Math.floor(arr.length / 2)]) => {
      const sortedArr = [...arr].sort((a, b) => a - b);
      let comparisons = 0;
      let left = 0;
      let right = sortedArr.length - 1;
      
      while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        comparisons++;
        
        if (sortedArr[mid] === target) {
          return { comparisons, found: true, index: mid };
        } else if (sortedArr[mid] < target) {
          left = mid + 1;
        } else {
          right = mid - 1;
        }
      }
      
      return { comparisons, found: false, index: -1 };
    }
  }
};

const ComplexityAnalyzer = () => {
  const [selectedAlgorithms, setSelectedAlgorithms] = useState(['bubble-sort', 'merge-sort']);
  const [inputSize, setInputSize] = useState(1000);
  const [maxSize, setMaxSize] = useState(5000);
  const [chartData, setChartData] = useState([]);
  const [performanceData, setPerformanceData] = useState({});
  const [isRunning, setIsRunning] = useState(false);

  const generateRandomArray = (size) => {
    return Array.from({ length: size }, () => Math.floor(Math.random() * 1000));
  };

  const measurePerformance = (algorithm, array) => {
    const startTime = performance.now();
    const result = algorithms[algorithm].implementation(array);
    const endTime = performance.now();
    
    return {
      ...result,
      executionTime: endTime - startTime,
      arraySize: array.length
    };
  };

  const runComplexityAnalysis = async () => {
    setIsRunning(true);
    const data = [];
    const perfData = {};
    
    const sizes = [];
    for (let size = 100; size <= maxSize; size += Math.max(100, Math.floor(maxSize / 20))) {
      sizes.push(size);
    }
    
    for (const size of sizes) {
      const array = generateRandomArray(size);
      const dataPoint = { size };
      
      for (const algorithmKey of selectedAlgorithms) {
        if (algorithms[algorithmKey]) {
          const result = measurePerformance(algorithmKey, array);
          dataPoint[algorithmKey] = result.executionTime;
          
          if (!perfData[algorithmKey]) {
            perfData[algorithmKey] = [];
          }
          perfData[algorithmKey].push(result);
        }
      }
      
      data.push(dataPoint);
      
      // Update chart incrementally
      setChartData([...data]);
      await new Promise(resolve => setTimeout(resolve, 50));
    }
    
    setPerformanceData(perfData);
    setIsRunning(false);
  };

  const runSingleTest = () => {
    const array = generateRandomArray(inputSize);
    const results = {};
    
    selectedAlgorithms.forEach(algorithmKey => {
      if (algorithms[algorithmKey]) {
        results[algorithmKey] = measurePerformance(algorithmKey, array);
      }
    });
    
    setPerformanceData(results);
  };

  const getComplexityColor = (complexity) => {
    if (complexity.includes('n²') || complexity.includes('2^n')) return '#ff6b6b';
    if (complexity.includes('n log n')) return '#ffa726';
    if (complexity.includes('n')) return '#66bb6a';
    return '#42a5f5';
  };

  const algorithmOptions = Object.keys(algorithms);
  const colors = ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe', '#00f2fe'];

  return (
    <Container>
      <Title>Algorithm Complexity Analyzer</Title>
      
      <Controls>
        <ControlGroup>
          <Label>Algorithms to Compare</Label>
          <Select
            multiple
            value={selectedAlgorithms}
            onChange={(e) => {
              const values = Array.from(e.target.selectedOptions, option => option.value);
              setSelectedAlgorithms(values.slice(0, 4)); // Limit to 4 algorithms
            }}
            disabled={isRunning}
            style={{ height: '120px' }}
          >
            {algorithmOptions.map(key => (
              <option key={key} value={key}>
                {algorithms[key].name}
              </option>
            ))}
          </Select>
        </ControlGroup>
        
        <ControlGroup>
          <Label>Single Test Size</Label>
          <Input
            type="number"
            min="10"
            max="10000"
            value={inputSize}
            onChange={(e) => setInputSize(parseInt(e.target.value))}
            disabled={isRunning}
          />
        </ControlGroup>
        
        <ControlGroup>
          <Label>Max Size (Analysis)</Label>
          <Input
            type="number"
            min="1000"
            max="20000"
            value={maxSize}
            onChange={(e) => setMaxSize(parseInt(e.target.value))}
            disabled={isRunning}
          />
        </ControlGroup>
        
        <Button onClick={runSingleTest} disabled={isRunning || selectedAlgorithms.length === 0}>
          Run Single Test
        </Button>
        
        <Button onClick={runComplexityAnalysis} disabled={isRunning || selectedAlgorithms.length === 0}>
          {isRunning ? 'Analyzing...' : 'Run Complexity Analysis'}
        </Button>
      </Controls>

      {chartData.length > 0 && (
        <ChartContainer>
          <ChartTitle>Performance Comparison</ChartTitle>
          <div style={{color: 'white', textAlign: 'center', padding: '50px'}}>
            <p>Chart visualization would appear here</p>
            <p>Data points collected: {chartData.length}</p>
            <p>Algorithms tested: {selectedAlgorithms.join(', ')}</p>
          </div>
        </ChartContainer>
      )}

      <ComparisonGrid>
        {selectedAlgorithms.map((algorithmKey, index) => {
          const algorithm = algorithms[algorithmKey];
          const perfData = performanceData[algorithmKey];
          
          if (!algorithm) return null;
          
          return (
            <ComparisonCard key={algorithmKey}>
              <AlgorithmName>{algorithm.name}</AlgorithmName>
              
              <ComplexityInfo>
                <ComplexityItem>
                  <ComplexityLabel>Time Complexity</ComplexityLabel>
                  <ComplexityValue $complexity={algorithm.timeComplexity.average}>
                    {algorithm.timeComplexity.average}
                  </ComplexityValue>
                </ComplexityItem>
                
                <ComplexityItem>
                  <ComplexityLabel>Space Complexity</ComplexityLabel>
                  <ComplexityValue $complexity={algorithm.spaceComplexity}>
                    {algorithm.spaceComplexity}
                  </ComplexityValue>
                </ComplexityItem>
              </ComplexityInfo>
              
              {perfData && perfData.length > 0 && (
                <PerformanceMetrics>
                  <MetricItem>
                    <MetricLabel>Execution Time</MetricLabel>
                    <MetricValue>
                      {perfData[perfData.length - 1].executionTime.toFixed(2)}ms
                    </MetricValue>
                  </MetricItem>
                  
                  <MetricItem>
                    <MetricLabel>Comparisons</MetricLabel>
                    <MetricValue>
                      {perfData[perfData.length - 1].comparisons || 'N/A'}
                    </MetricValue>
                  </MetricItem>
                  
                  <MetricItem>
                    <MetricLabel>Array Size</MetricLabel>
                    <MetricValue>
                      {perfData[perfData.length - 1].arraySize}
                    </MetricValue>
                  </MetricItem>
                </PerformanceMetrics>
              )}
            </ComparisonCard>
          );
        })}
      </ComparisonGrid>
    </Container>
  );
};

export default ComplexityAnalyzer;