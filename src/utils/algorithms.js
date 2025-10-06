// Algorithm implementations and utilities
export const generateRandomArray = (size, min = 10, max = 500) => {
  return Array.from({ length: size }, () => 
    Math.floor(Math.random() * (max - min + 1)) + min
  );
};

export const generateSortedArray = (size, ascending = true) => {
  const array = Array.from({ length: size }, (_, i) => i + 1);
  return ascending ? array : array.reverse();
};

export const generateReverseSortedArray = (size) => {
  return generateSortedArray(size, false);
};

export const shuffle = (array) => {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
};

export const isSorted = (array) => {
  for (let i = 1; i < array.length; i++) {
    if (array[i] < array[i - 1]) {
      return false;
    }
  }
  return true;
};

// Color utilities for visualizations
export const getAlgorithmColor = (algorithm) => {
  const colors = {
    'bubble-sort': '#ff6b6b',
    'selection-sort': '#4ecdc4',
    'insertion-sort': '#45b7d1',
    'merge-sort': '#96ceb4',
    'quick-sort': '#ffeaa7',
    'heap-sort': '#dda0dd',
    'dijkstra': '#667eea',
    'astar': '#764ba2',
    'bfs': '#f093fb',
    'dfs': '#f5576c'
  };
  return colors[algorithm] || '#667eea';
};

// Performance measurement utilities
export const measureExecutionTime = (fn) => {
  const start = performance.now();
  const result = fn();
  const end = performance.now();
  return {
    result,
    executionTime: end - start
  };
};

export const formatExecutionTime = (time) => {
  if (time < 1) return `${(time * 1000).toFixed(2)}μs`;
  if (time < 1000) return `${time.toFixed(2)}ms`;
  return `${(time / 1000).toFixed(2)}s`;
};

// Complexity analysis utilities
export const getComplexityInfo = (algorithm) => {
  const complexities = {
    'bubble-sort': {
      time: { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)' },
      space: 'O(1)',
      stable: true
    },
    'selection-sort': {
      time: { best: 'O(n²)', average: 'O(n²)', worst: 'O(n²)' },
      space: 'O(1)',
      stable: false
    },
    'insertion-sort': {
      time: { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)' },
      space: 'O(1)',
      stable: true
    },
    'merge-sort': {
      time: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)' },
      space: 'O(n)',
      stable: true
    },
    'quick-sort': {
      time: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n²)' },
      space: 'O(log n)',
      stable: false
    }
  };
  return complexities[algorithm] || null;
};

// Graph utilities
export const generateRandomGraph = (nodeCount, edgeProbability = 0.3) => {
  const nodes = Array.from({ length: nodeCount }, (_, i) => ({
    id: i,
    name: String.fromCharCode(65 + i),
    x: 300 + 200 * Math.cos((2 * Math.PI * i) / nodeCount),
    y: 250 + 150 * Math.sin((2 * Math.PI * i) / nodeCount)
  }));

  const edges = [];
  for (let i = 0; i < nodeCount; i++) {
    for (let j = i + 1; j < nodeCount; j++) {
      if (Math.random() < edgeProbability) {
        edges.push({
          id: `${i}-${j}`,
          from: i,
          to: j,
          weight: Math.floor(Math.random() * 10) + 1
        });
      }
    }
  }

  return { nodes, edges };
};

// Local storage utilities
export const saveToStorage = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

export const loadFromStorage = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error('Error loading from localStorage:', error);
    return defaultValue;
  }
};

// Animation utilities
export const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const easeInOut = (t) => {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
};

// Validation utilities
export const validateArrayInput = (input, maxSize = 100) => {
  const numbers = input.split(',').map(s => s.trim()).filter(s => s);
  const parsed = numbers.map(n => parseInt(n, 10));
  
  if (parsed.some(isNaN)) {
    throw new Error('All values must be numbers');
  }
  
  if (parsed.length > maxSize) {
    throw new Error(`Array size cannot exceed ${maxSize}`);
  }
  
  return parsed;
};

export const validateGraphInput = (nodesInput, edgesInput) => {
  const nodes = nodesInput.split(',').map(s => s.trim()).filter(s => s);
  const edges = edgesInput.split(',').map(s => s.trim()).filter(s => s);
  
  if (nodes.length === 0) {
    throw new Error('At least one node is required');
  }
  
  const edgePattern = /^[A-Za-z]+-[A-Za-z]+(-\d+)?$/;
  const invalidEdges = edges.filter(edge => !edgePattern.test(edge));
  
  if (invalidEdges.length > 0) {
    throw new Error(`Invalid edge format: ${invalidEdges[0]}. Use format: A-B or A-B-5`);
  }
  
  return { nodes, edges };
};