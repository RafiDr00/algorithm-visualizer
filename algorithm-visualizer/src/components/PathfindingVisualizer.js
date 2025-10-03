import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
// Animation library removed for lighter build

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

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 14px;
  
  ${props => props.$primary ? `
    background: linear-gradient(45deg, #667eea, #764ba2);
    color: white;
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
  ` : props.$danger ? `
    background: linear-gradient(45deg, #ff6b6b, #ee5a52);
    color: white;
    box-shadow: 0 4px 15px rgba(238, 90, 82, 0.3);
  ` : `
    background: rgba(255, 255, 255, 0.2);
    color: white;
    border: 1px solid rgba(255, 255, 255, 0.3);
  `}
  
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

const GridContainer = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  padding: 2rem;
  margin-bottom: 2rem;
  overflow: auto;
  display: flex;
  justify-content: center;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(${props => props.$cols}, 20px);
  grid-template-rows: repeat(${props => props.$rows}, 20px);
  gap: 1px;
  background: rgba(255, 255, 255, 0.1);
  padding: 10px;
  border-radius: 8px;
`;

const Cell = styled.div`
  width: 20px;
  height: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  cursor: pointer;
  position: relative;
  
  ${props => {
    if (props.$isStart) return 'background: linear-gradient(45deg, #4ade80, #22c55e);';
    if (props.$isEnd) return 'background: linear-gradient(45deg, #f87171, #ef4444);';
    if (props.$isWall) return 'background: linear-gradient(45deg, #374151, #1f2937);';
    if (props.$isPath) return 'background: linear-gradient(45deg, #fbbf24, #f59e0b);';
    if (props.$isVisited) return 'background: linear-gradient(45deg, #8b5cf6, #7c3aed);';
    if (props.$isExploring) return 'background: linear-gradient(45deg, #06b6d4, #0891b2);';
    return 'background: rgba(255, 255, 255, 0.1);';
  }}
  
  &:hover {
    opacity: 0.8;
  }
`;

const InfoPanel = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
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