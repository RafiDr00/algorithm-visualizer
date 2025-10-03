const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());

// Algorithm Performance Data Storage (In-memory for demo)
let performanceData = [];

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Algorithm Visualizer API is running' });
});

// Get all performance records
app.get('/api/performance', (req, res) => {
  res.json(performanceData);
});

// Save performance data
app.post('/api/performance', (req, res) => {
  const { algorithm, inputSize, executionTime, comparisons, swaps, timestamp } = req.body;
  
  const record = {
    id: Date.now(),
    algorithm,
    inputSize,
    executionTime,
    comparisons,
    swaps,
    timestamp: timestamp || new Date().toISOString()
  };
  
  performanceData.push(record);
  
  // Keep only last 1000 records
  if (performanceData.length > 1000) {
    performanceData = performanceData.slice(-1000);
  }
  
  res.status(201).json(record);
});

// Get performance statistics
app.get('/api/performance/stats', (req, res) => {
  const stats = {};
  
  performanceData.forEach(record => {
    if (!stats[record.algorithm]) {
      stats[record.algorithm] = {
        count: 0,
        totalTime: 0,
        avgTime: 0,
        minTime: Infinity,
        maxTime: 0,
        totalComparisons: 0,
        totalSwaps: 0
      };
    }
    
    const algo = stats[record.algorithm];
    algo.count++;
    algo.totalTime += record.executionTime;
    algo.avgTime = algo.totalTime / algo.count;
    algo.minTime = Math.min(algo.minTime, record.executionTime);
    algo.maxTime = Math.max(algo.maxTime, record.executionTime);
    algo.totalComparisons += record.comparisons || 0;
    algo.totalSwaps += record.swaps || 0;
  });
  
  res.json(stats);
});

// Algorithm information endpoint
app.get('/api/algorithms', (req, res) => {
  const algorithms = {
    sorting: [
      {
        id: 'bubble-sort',
        name: 'Bubble Sort',
        timeComplexity: { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)' },
        spaceComplexity: 'O(1)',
        stable: true,
        description: 'Compares adjacent elements and swaps them if they are in wrong order'
      },
      {
        id: 'merge-sort',
        name: 'Merge Sort',
        timeComplexity: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)' },
        spaceComplexity: 'O(n)',
        stable: true,
        description: 'Divide and conquer algorithm that merges sorted subarrays'
      },
      {
        id: 'quick-sort',
        name: 'Quick Sort',
        timeComplexity: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n²)' },
        spaceComplexity: 'O(log n)',
        stable: false,
        description: 'Partitions array around pivot and recursively sorts'
      }
    ],
    pathfinding: [
      {
        id: 'dijkstra',
        name: "Dijkstra's Algorithm",
        timeComplexity: 'O((V + E) log V)',
        spaceComplexity: 'O(V)',
        optimal: true,
        description: 'Finds shortest path using weighted edges'
      },
      {
        id: 'astar',
        name: 'A* Algorithm',
        timeComplexity: 'O(E)',
        spaceComplexity: 'O(V)',
        optimal: true,
        description: 'Uses heuristic to find optimal path faster'
      }
    ],
    graph: [
      {
        id: 'dfs',
        name: 'Depth-First Search',
        timeComplexity: 'O(V + E)',
        spaceComplexity: 'O(V)',
        description: 'Traverses as far as possible before backtracking'
      },
      {
        id: 'bfs',
        name: 'Breadth-First Search',
        timeComplexity: 'O(V + E)',
        spaceComplexity: 'O(V)',
        description: 'Visits all neighbors before going to next level'
      }
    ]
  };
  
  res.json(algorithms);
});

// Clear performance data
app.delete('/api/performance', (req, res) => {
  performanceData = [];
  res.json({ message: 'Performance data cleared' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`🚀 Algorithm Visualizer API running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
});