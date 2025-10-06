import React, { useState, useEffect, useCallback } from 'react';
import styled, { keyframes } from 'styled-components';

const shimmer = keyframes`
  0% { background-position: -200px 0; }
  100% { background-position: calc(200px + 100%) 0; }
`;

const Container = styled.div`
  padding: 2rem;
  color: white;
  max-width: 1200px;
  margin: 0 auto;
  min-height: 100vh;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 25% 75%, rgba(255, 140, 66, 0.08) 0%, transparent 50%),
                radial-gradient(circle at 75% 25%, rgba(77, 182, 172, 0.08) 0%, transparent 50%);
    z-index: -1;
    pointer-events: none;
  }
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 3rem;
  font-size: 3.2rem;
  font-weight: 900;
  background: linear-gradient(135deg, #FF8C42 0%, #4DB6AC 50%, #9B5DE5 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  background-size: 200% 200%;
  animation: ${shimmer} 3s ease-in-out infinite alternate;
  position: relative;
  letter-spacing: -1px;
  text-shadow: 0 4px 20px rgba(155, 93, 229, 0.3);
  
  &::after {
    content: '';
    position: absolute;
    bottom: -12px;
    left: 50%;
    transform: translateX(-50%);
    width: 140px;
    height: 4px;
    background: linear-gradient(135deg, #FF8C42, #4DB6AC);
    border-radius: 2px;
    box-shadow: 0 2px 15px rgba(255, 140, 66, 0.4);
  }
  
  @media (max-width: 768px) {
    font-size: 2.4rem;
  }
`;

const Controls = styled.div`
  background: rgba(255, 255, 255, 0.13);
  backdrop-filter: blur(16px);
  border-radius: 20px;
  border: 1.5px solid rgba(255, 255, 255, 0.18);
  padding: 2.5rem 2rem;
  margin-bottom: 2rem;
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.2),
              inset 0 1px 0 rgba(255, 255, 255, 0.15);
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: -1px;
    left: -1px;
    right: -1px;
    bottom: -1px;
    background: linear-gradient(135deg, #667eea, #764ba2, #f093fb);
    border-radius: 20px;
    z-index: -1;
    opacity: 0.6;
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
  opacity: 0.8;
`;

const Select = styled.select`
  padding: 0.85rem 1.2rem;
  border: 1.5px solid rgba(255, 255, 255, 0.25);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.12);
  color: white;
  font-size: 15px;
  font-weight: 500;
  backdrop-filter: blur(14px);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  appearance: none;
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

const Button = styled.button`
  padding: 0.85rem 1.8rem;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-size: 15px;
  position: relative;
  overflow: hidden;
  
  ${props => props.$primary ? `
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.35);
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
      transition: left 0.5s;
    }
    
    &:hover::before {
      left: 100%;
    }
  ` : props.$danger ? `
    background: linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%);
    color: white;
    box-shadow: 0 6px 20px rgba(238, 90, 82, 0.35);
  ` : `
    background: rgba(255, 255, 255, 0.12);
    color: white;
    border: 1.5px solid rgba(255, 255, 255, 0.25);
    backdrop-filter: blur(14px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  `}
  
  &:hover {
    transform: translateY(-2px) scale(1.02);
    ${props => props.$primary ? `
      box-shadow: 0 8px 30px rgba(102, 126, 234, 0.45);
    ` : props.$danger ? `
      box-shadow: 0 8px 30px rgba(238, 90, 82, 0.45);
    ` : `
      box-shadow: 0 6px 20px rgba(255, 255, 255, 0.15);
      background: rgba(255, 255, 255, 0.18);
    `}
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

const GridContainer = styled.div`
  background: rgba(18, 18, 18, 0.7);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  border: 2px solid rgba(255, 255, 255, 0.12);
  padding: 3rem 2rem;
  margin-bottom: 3rem;
  overflow: auto;
  display: flex;
  justify-content: center;
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
  
  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(${props => props.$cols}, 22px);
  grid-template-rows: repeat(${props => props.$rows}, 22px);
  gap: 2px;
  background: rgba(255, 255, 255, 0.05);
  padding: 15px;
  border-radius: 12px;
  box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.2);
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(${props => props.$cols}, 18px);
    grid-template-rows: repeat(${props => props.$rows}, 18px);
    gap: 1px;
    padding: 10px;
  }
`;

const Cell = styled.div`
  width: 22px;
  height: 22px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  cursor: pointer;
  position: relative;
  border-radius: 3px;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  
  @media (max-width: 768px) {
    width: 18px;
    height: 18px;
  }
  
  ${props => {
    if (props.$isStart) return 'background: linear-gradient(135deg, #4ade80 0%, #22c55e 100%); box-shadow: 0 4px 12px rgba(74, 222, 128, 0.4);';
    if (props.$isEnd) return 'background: linear-gradient(135deg, #f87171 0%, #ef4444 100%); box-shadow: 0 4px 12px rgba(248, 113, 113, 0.4);';
    if (props.$isWall) return 'background: linear-gradient(135deg, #374151 0%, #1f2937 100%); box-shadow: inset 0 2px 4px rgba(0,0,0,0.3);';
    if (props.$isPath) return 'background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%); box-shadow: 0 4px 12px rgba(251, 191, 36, 0.5); animation: pulse 1.5s infinite;';
    if (props.$isVisited) return 'background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); box-shadow: 0 2px 8px rgba(139, 92, 246, 0.3);';
    if (props.$isExploring) return 'background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%); box-shadow: 0 4px 12px rgba(6, 182, 212, 0.4); animation: pulse 1s infinite;';
    return 'background: rgba(255, 255, 255, 0.08); border-color: rgba(255, 255, 255, 0.2);';
  }}
  
  &:hover {
    transform: scale(1.1);
    box-shadow: 0 4px 15px rgba(255, 255, 255, 0.2);
  }
`;

const InfoPanel = styled.div`
  background: rgba(255, 255, 255, 0.13);
  backdrop-filter: blur(16px);
  border: 1.5px solid rgba(255, 255, 255, 0.18);
  border-radius: 15px;
  padding: 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
`;

const InfoCard = styled.div`
  text-align: center;
`;

const InfoTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: #667eea;
`;

const InfoValue = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const InfoDescription = styled.div`
  font-size: 0.9rem;
  opacity: 0.8;
`;

const Legend = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 2rem;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.1);
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-size: 0.9rem;
`;

const LegendColor = styled.div`
  width: 16px;
  height: 16px;
  border-radius: 2px;
  ${props => props.$color}
`;

const GRID_ROWS = 25;
const GRID_COLS = 50;

const algorithms = {
  dijkstra: {
    name: "Dijkstra's Algorithm",
    description: "Finds shortest path using weighted edges",
    guaranteesPath: true
  },
  astar: {
    name: "A* Algorithm",
    description: "Uses heuristic to find optimal path faster",
    guaranteesPath: true
  },
  bfs: {
    name: "Breadth-First Search",
    description: "Explores level by level, finds shortest unweighted path",
    guaranteesPath: true
  },
  dfs: {
    name: "Depth-First Search",
    description: "Explores as far as possible before backtracking",
    guaranteesPath: false
  }
};

const PathfindingVisualizer = () => {
  const [grid, setGrid] = useState([]);
  const [algorithm, setAlgorithm] = useState('dijkstra');
  const [isRunning, setIsRunning] = useState(false);
  const [start, setStart] = useState({ row: 12, col: 10 });
  const [end, setEnd] = useState({ row: 12, col: 40 });
  const [isDrawingWalls, setIsDrawingWalls] = useState(false);
  const [mousePressed, setMousePressed] = useState(false);
  const [mode, setMode] = useState('wall'); // wall, start, end
  const [stats, setStats] = useState({
    visited: 0,
    pathLength: 0,
    executionTime: 0
  });

  const initializeGrid = useCallback(() => {
    const newGrid = [];
    for (let row = 0; row < GRID_ROWS; row++) {
      const currentRow = [];
      for (let col = 0; col < GRID_COLS; col++) {
        currentRow.push({
          row,
          col,
          isStart: row === start.row && col === start.col,
          isEnd: row === end.row && col === end.col,
          isWall: false,
          isVisited: false,
          isPath: false,
          isExploring: false,
          distance: Infinity,
          previousNode: null,
          fScore: Infinity,
          gScore: Infinity,
          hScore: 0
        });
      }
      newGrid.push(currentRow);
    }
    return newGrid;
  }, [start, end]);

  useEffect(() => {
    setGrid(initializeGrid());
  }, [initializeGrid]);

  const clearPath = () => {
    const newGrid = grid.map(row =>
      row.map(node => ({
        ...node,
        isVisited: false,
        isPath: false,
        isExploring: false,
        distance: Infinity,
        previousNode: null,
        fScore: Infinity,
        gScore: Infinity,
        hScore: 0
      }))
    );
    setGrid(newGrid);
    setStats({ visited: 0, pathLength: 0, executionTime: 0 });
  };

  const clearWalls = () => {
    const newGrid = grid.map(row =>
      row.map(node => ({
        ...node,
        isWall: false
      }))
    );
    setGrid(newGrid);
  };

  const resetGrid = () => {
    setGrid(initializeGrid());
    setStats({ visited: 0, pathLength: 0, executionTime: 0 });
  };

  const handleCellMouseDown = (row, col) => {
    if (isRunning) return;
    
    setMousePressed(true);
    
    if (mode === 'start') {
      setStart({ row, col });
    } else if (mode === 'end') {
      setEnd({ row, col });
    } else if (mode === 'wall') {
      toggleWall(row, col);
    }
  };

  const handleCellMouseEnter = (row, col) => {
    if (!mousePressed || isRunning) return;
    
    if (mode === 'wall') {
      toggleWall(row, col);
    }
  };

  const handleMouseUp = () => {
    setMousePressed(false);
  };

  const toggleWall = (row, col) => {
    if ((row === start.row && col === start.col) || (row === end.row && col === end.col)) return;
    
    const newGrid = [...grid];
    newGrid[row][col] = {
      ...newGrid[row][col],
      isWall: !newGrid[row][col].isWall
    };
    setGrid(newGrid);
  };

  const getNeighbors = (node, grid) => {
    const neighbors = [];
    const { row, col } = node;
    
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < GRID_ROWS - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < GRID_COLS - 1) neighbors.push(grid[row][col + 1]);
    
    return neighbors.filter(neighbor => !neighbor.isWall);
  };

  const heuristic = (nodeA, nodeB) => {
    return Math.abs(nodeA.row - nodeB.row) + Math.abs(nodeA.col - nodeB.col);
  };

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const animatePath = async (path) => {
    for (let i = path.length - 1; i >= 0; i--) {
      const node = path[i];
      if (!node.isStart && !node.isEnd) {
        const newGrid = [...grid];
        newGrid[node.row][node.col] = { ...newGrid[node.row][node.col], isPath: true };
        setGrid(newGrid);
        await sleep(50);
      }
    }
  };

  const dijkstra = async () => {
    const startTime = Date.now();
    const visitedNodesInOrder = [];
    const unvisitedNodes = getAllNodes(grid);
    const startNode = grid[start.row][start.col];
    const endNode = grid[end.row][end.col];
    
    startNode.distance = 0;
    
    while (unvisitedNodes.length) {
      sortNodesByDistance(unvisitedNodes);
      const closestNode = unvisitedNodes.shift();
      
      if (closestNode.isWall) continue;
      if (closestNode.distance === Infinity) break;
      
      closestNode.isVisited = true;
      visitedNodesInOrder.push(closestNode);
      
      if (!closestNode.isStart && !closestNode.isEnd) {
        const newGrid = [...grid];
        newGrid[closestNode.row][closestNode.col] = { 
          ...newGrid[closestNode.row][closestNode.col], 
          isExploring: true 
        };
        setGrid(newGrid);
        await sleep(20);
      }
      
      if (closestNode === endNode) {
        const path = getPath(endNode);
        await animatePath(path);
        const endTime = Date.now();
        setStats({
          visited: visitedNodesInOrder.length,
          pathLength: path.length,
          executionTime: endTime - startTime
        });
        return;
      }
      
      updateUnvisitedNeighbors(closestNode, grid);
    }
    
    const endTime = Date.now();
    setStats({
      visited: visitedNodesInOrder.length,
      pathLength: 0,
      executionTime: endTime - startTime
    });
  };

  const astar = async () => {
    const startTime = Date.now();
    const openSet = [];
    const closedSet = [];
    const startNode = grid[start.row][start.col];
    const endNode = grid[end.row][end.col];
    
    startNode.gScore = 0;
    startNode.fScore = heuristic(startNode, endNode);
    openSet.push(startNode);
    
    while (openSet.length > 0) {
      openSet.sort((a, b) => a.fScore - b.fScore);
      const current = openSet.shift();
      closedSet.push(current);
      
      if (!current.isStart && !current.isEnd) {
        const newGrid = [...grid];
        newGrid[current.row][current.col] = { 
          ...newGrid[current.row][current.col], 
          isExploring: true 
        };
        setGrid(newGrid);
        await sleep(20);
      }
      
      if (current === endNode) {
        const path = getPath(endNode);
        await animatePath(path);
        const endTime = Date.now();
        setStats({
          visited: closedSet.length,
          pathLength: path.length,
          executionTime: endTime - startTime
        });
        return;
      }
      
      const neighbors = getNeighbors(current, grid);
      
      for (const neighbor of neighbors) {
        if (closedSet.includes(neighbor)) continue;
        
        const tentativeGScore = current.gScore + 1;
        
        if (!openSet.includes(neighbor)) {
          openSet.push(neighbor);
        } else if (tentativeGScore >= neighbor.gScore) {
          continue;
        }
        
        neighbor.previousNode = current;
        neighbor.gScore = tentativeGScore;
        neighbor.fScore = neighbor.gScore + heuristic(neighbor, endNode);
      }
    }
    
    const endTime = Date.now();
    setStats({
      visited: closedSet.length,
      pathLength: 0,
      executionTime: endTime - startTime
    });
  };

  const bfs = async () => {
    const startTime = Date.now();
    const queue = [];
    const visited = [];
    const startNode = grid[start.row][start.col];
    const endNode = grid[end.row][end.col];
    
    queue.push(startNode);
    startNode.isVisited = true;
    
    while (queue.length > 0) {
      const current = queue.shift();
      visited.push(current);
      
      if (!current.isStart && !current.isEnd) {
        const newGrid = [...grid];
        newGrid[current.row][current.col] = { 
          ...newGrid[current.row][current.col], 
          isExploring: true 
        };
        setGrid(newGrid);
        await sleep(20);
      }
      
      if (current === endNode) {
        const path = getPath(endNode);
        await animatePath(path);
        const endTime = Date.now();
        setStats({
          visited: visited.length,
          pathLength: path.length,
          executionTime: endTime - startTime
        });
        return;
      }
      
      const neighbors = getNeighbors(current, grid);
      
      for (const neighbor of neighbors) {
        if (!neighbor.isVisited) {
          neighbor.isVisited = true;
          neighbor.previousNode = current;
          queue.push(neighbor);
        }
      }
    }
    
    const endTime = Date.now();
    setStats({
      visited: visited.length,
      pathLength: 0,
      executionTime: endTime - startTime
    });
  };

  const dfs = async () => {
    const startTime = Date.now();
    const stack = [];
    const visited = [];
    const startNode = grid[start.row][start.col];
    const endNode = grid[end.row][end.col];
    
    stack.push(startNode);
    
    while (stack.length > 0) {
      const current = stack.pop();
      
      if (current.isVisited) continue;
      current.isVisited = true;
      visited.push(current);
      
      if (!current.isStart && !current.isEnd) {
        const newGrid = [...grid];
        newGrid[current.row][current.col] = { 
          ...newGrid[current.row][current.col], 
          isExploring: true 
        };
        setGrid(newGrid);
        await sleep(20);
      }
      
      if (current === endNode) {
        const path = getPath(endNode);
        await animatePath(path);
        const endTime = Date.now();
        setStats({
          visited: visited.length,
          pathLength: path.length,
          executionTime: endTime - startTime
        });
        return;
      }
      
      const neighbors = getNeighbors(current, grid);
      
      for (const neighbor of neighbors) {
        if (!neighbor.isVisited) {
          neighbor.previousNode = current;
          stack.push(neighbor);
        }
      }
    }
    
    const endTime = Date.now();
    setStats({
      visited: visited.length,
      pathLength: 0,
      executionTime: endTime - startTime
    });
  };

  const getAllNodes = (grid) => {
    const nodes = [];
    for (const row of grid) {
      for (const node of row) {
        nodes.push(node);
      }
    }
    return nodes;
  };

  const sortNodesByDistance = (unvisitedNodes) => {
    unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
  };

  const updateUnvisitedNeighbors = (node, grid) => {
    const unvisitedNeighbors = getNeighbors(node, grid);
    for (const neighbor of unvisitedNeighbors) {
      neighbor.distance = node.distance + 1;
      neighbor.previousNode = node;
    }
  };

  const getPath = (finishNode) => {
    const path = [];
    let currentNode = finishNode;
    while (currentNode !== null) {
      path.unshift(currentNode);
      currentNode = currentNode.previousNode;
    }
    return path;
  };

  const startPathfinding = async () => {
    if (isRunning) return;
    
    setIsRunning(true);
    clearPath();
    
    try {
      switch (algorithm) {
        case 'dijkstra':
          await dijkstra();
          break;
        case 'astar':
          await astar();
          break;
        case 'bfs':
          await bfs();
          break;
        case 'dfs':
          await dfs();
          break;
        default:
          break;
      }
    } catch (error) {
      console.error('Pathfinding interrupted:', error);
    }
    
    setIsRunning(false);
  };

  const legendItems = [
    { color: 'background: linear-gradient(45deg, #4ade80, #22c55e);', label: 'Start' },
    { color: 'background: linear-gradient(45deg, #f87171, #ef4444);', label: 'End' },
    { color: 'background: linear-gradient(45deg, #374151, #1f2937);', label: 'Wall' },
    { color: 'background: linear-gradient(45deg, #06b6d4, #0891b2);', label: 'Exploring' },
    { color: 'background: linear-gradient(45deg, #8b5cf6, #7c3aed);', label: 'Visited' },
    { color: 'background: linear-gradient(45deg, #fbbf24, #f59e0b);', label: 'Path' }
  ];

  return (
    <Container onMouseUp={handleMouseUp}>
      <Title>Pathfinding Algorithms Visualizer</Title>
      
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
          <Label>Mode</Label>
          <Select
            value={mode}
            onChange={(e) => setMode(e.target.value)}
            disabled={isRunning}
          >
            <option value="wall">Draw Walls</option>
            <option value="start">Move Start</option>
            <option value="end">Move End</option>
          </Select>
        </ControlGroup>
        
        <Button $primary onClick={startPathfinding} disabled={isRunning}>
          {isRunning ? 'Finding Path...' : 'Find Path'}
        </Button>
        
        <Button onClick={clearPath} disabled={isRunning}>
          Clear Path
        </Button>
        
        <Button onClick={clearWalls} disabled={isRunning}>
          Clear Walls
        </Button>
        
        <Button $danger onClick={resetGrid} disabled={isRunning}>
          Reset Grid
        </Button>
      </Controls>
      
      <Legend>
        {legendItems.map((item, index) => (
          <LegendItem key={index}>
            <LegendColor $color={item.color} />
            {item.label}
          </LegendItem>
        ))}
      </Legend>
      
      <GridContainer>
        <Grid $rows={GRID_ROWS} $cols={GRID_COLS}>
          {grid.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <Cell
                key={`${rowIndex}-${colIndex}`}
                $isStart={cell.isStart}
                $isEnd={cell.isEnd}
                $isWall={cell.isWall}
                $isPath={cell.isPath}
                $isVisited={cell.isVisited}
                $isExploring={cell.isExploring}
                onMouseDown={() => handleCellMouseDown(rowIndex, colIndex)}
                onMouseEnter={() => handleCellMouseEnter(rowIndex, colIndex)}

              />
            ))
          )}
        </Grid>
      </GridContainer>
      
      <InfoPanel>
        <InfoCard>
          <InfoTitle>Algorithm</InfoTitle>
          <InfoValue style={{ fontSize: '1.2rem' }}>{algorithms[algorithm].name}</InfoValue>
          <InfoDescription>{algorithms[algorithm].description}</InfoDescription>
        </InfoCard>
        
        <InfoCard>
          <InfoTitle>Nodes Visited</InfoTitle>
          <InfoValue>{stats.visited}</InfoValue>
          <InfoDescription>Cells explored</InfoDescription>
        </InfoCard>
        
        <InfoCard>
          <InfoTitle>Path Length</InfoTitle>
          <InfoValue>{stats.pathLength}</InfoValue>
          <InfoDescription>Steps to destination</InfoDescription>
        </InfoCard>
        
        <InfoCard>
          <InfoTitle>Execution Time</InfoTitle>
          <InfoValue>{stats.executionTime}ms</InfoValue>
          <InfoDescription>Time to find path</InfoDescription>
        </InfoCard>
        
        <InfoCard>
          <InfoTitle>Guarantees Shortest</InfoTitle>
          <InfoValue>{algorithms[algorithm].guaranteesPath ? 'Yes' : 'No'}</InfoValue>
          <InfoDescription>Optimal path guarantee</InfoDescription>
        </InfoCard>
      </InfoPanel>
    </Container>
  );
};

export default PathfindingVisualizer;