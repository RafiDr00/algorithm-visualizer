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
  
  ${props => props.$primary ? `
    background: linear-gradient(45deg, #667eea, #764ba2);
    color: white;
    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
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

const GraphContainer = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 15px;
  padding: 2rem;
  margin-bottom: 2rem;
  min-height: 500px;
  position: relative;
  overflow: hidden;
`;

const SVG = styled.svg`
  width: 100%;
  height: 500px;
  background: transparent;
`;

const Node = styled.circle`
  cursor: pointer;
  stroke: rgba(255, 255, 255, 0.3);
  stroke-width: 2;
  
  ${props => {
    if (props.$isStart) return 'fill: #4ade80;';
    if (props.$isVisited) return 'fill: #8b5cf6;';
    if (props.$isCurrent) return 'fill: #f59e0b;';
    if (props.$isInMST) return 'fill: #22c55e;';
    return 'fill: #667eea;';
  }}
`;

const Edge = styled.line`
  stroke: rgba(255, 255, 255, 0.4);
  stroke-width: 2;
  
  ${props => {
    if (props.$isInMST) return 'stroke: #22c55e; stroke-width: 3;';
    if (props.$isExploring) return 'stroke: #f59e0b; stroke-width: 3;';
    return '';
  }}
`;

const EdgeWeight = styled.text`
  fill: white;
  font-size: 12px;
  text-anchor: middle;
  alignment-baseline: middle;
  font-weight: 500;
`;

const NodeLabel = styled.text`
  fill: white;
  font-size: 14px;
  text-anchor: middle;
  alignment-baseline: middle;
  font-weight: 600;
  pointer-events: none;
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

const InputSection = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 2rem;
  margin-bottom: 2rem;
`;

const InputGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const InputTitle = styled.h3`
  color: #667eea;
  margin-bottom: 1rem;
`;

const TextArea = styled.textarea`
  padding: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 14px;
  backdrop-filter: blur(10px);
  resize: vertical;
  min-height: 120px;
  font-family: 'Courier New', monospace;
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }
`;

const algorithms = {
  dfs: {
    name: 'Depth-First Search',
    description: 'Traverses as far as possible before backtracking',
    type: 'traversal'
  },
  bfs: {
    name: 'Breadth-First Search',
    description: 'Visits all neighbors before going to next level',
    type: 'traversal'
  },
  kruskal: {
    name: "Kruskal's MST",
    description: 'Finds minimum spanning tree using edge sorting',
    type: 'mst'
  },
  prim: {
    name: "Prim's MST",
    description: 'Grows MST by adding minimum weight edges',
    type: 'mst'
  },
  topological: {
    name: 'Topological Sort',
    description: 'Orders vertices in directed acyclic graph',
    type: 'sort'
  }
};

const GraphVisualizer = () => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [algorithm, setAlgorithm] = useState('dfs');
  const [isRunning, setIsRunning] = useState(false);
  const [currentNode, setCurrentNode] = useState(null);
  const [visitedNodes, setVisitedNodes] = useState(new Set());
  const [exploringEdges, setExploringEdges] = useState(new Set());
  const [mstEdges, setMstEdges] = useState(new Set());
  const [startNode, setStartNode] = useState(0);
  const [graphType, setGraphType] = useState('undirected');
  const [nodesInput, setNodesInput] = useState('A,B,C,D,E');
  const [edgesInput, setEdgesInput] = useState('A-B-5,B-C-3,C-D-7,D-E-2,E-A-4,B-D-6');
  const [stats, setStats] = useState({
    visited: 0,
    totalWeight: 0,
    executionTime: 0
  });

  const parseGraph = useCallback(() => {
    try {
      // Parse nodes
      const nodeNames = nodesInput.split(',').map(n => n.trim()).filter(n => n);
      const newNodes = nodeNames.map((name, index) => ({
        id: index,
        name,
        x: 300 + 200 * Math.cos((2 * Math.PI * index) / nodeNames.length),
        y: 250 + 150 * Math.sin((2 * Math.PI * index) / nodeNames.length)
      }));

      // Parse edges
      const edgeStrings = edgesInput.split(',').map(e => e.trim()).filter(e => e);
      const newEdges = [];
      
      edgeStrings.forEach(edgeStr => {
        const parts = edgeStr.split('-');
        if (parts.length >= 2) {
          const from = nodeNames.indexOf(parts[0].trim());
          const to = nodeNames.indexOf(parts[1].trim());
          const weight = parts.length > 2 ? parseInt(parts[2]) || 1 : 1;
          
          if (from !== -1 && to !== -1) {
            newEdges.push({
              id: `${from}-${to}`,
              from,
              to,
              weight
            });
          }
        }
      });

      setNodes(newNodes);
      setEdges(newEdges);
      resetVisualization();
    } catch (error) {
      console.error('Error parsing graph:', error);
    }
  }, [nodesInput, edgesInput]);

  useEffect(() => {
    parseGraph();
  }, [parseGraph]);

  const resetVisualization = () => {
    setCurrentNode(null);
    setVisitedNodes(new Set());
    setExploringEdges(new Set());
    setMstEdges(new Set());
    setStats({ visited: 0, totalWeight: 0, executionTime: 0 });
  };

  const generateRandomGraph = () => {
    const nodeCount = 6;
    const nodeNames = Array.from({ length: nodeCount }, (_, i) => String.fromCharCode(65 + i));
    const edgeList = [];
    
    // Generate random edges
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        if (Math.random() > 0.4) { // 60% chance of edge
          const weight = Math.floor(Math.random() * 10) + 1;
          edgeList.push(`${nodeNames[i]}-${nodeNames[j]}-${weight}`);
        }
      }
    }
    
    setNodesInput(nodeNames.join(','));
    setEdgesInput(edgeList.join(','));
  };

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const dfs = async () => {
    const startTime = Date.now();
    const visited = new Set();
    const stack = [startNode];
    let visitedCount = 0;

    while (stack.length > 0) {
      const currentId = stack.pop();
      
      if (visited.has(currentId)) continue;
      
      visited.add(currentId);
      visitedCount++;
      setCurrentNode(currentId);
      setVisitedNodes(new Set(visited));
      
      await sleep(800);
      
      // Find neighbors
      const neighbors = edges
        .filter(edge => edge.from === currentId || edge.to === currentId)
        .map(edge => edge.from === currentId ? edge.to : edge.from)
        .filter(neighbor => !visited.has(neighbor));
      
      // Add neighbors to stack in reverse order for consistent traversal
      neighbors.reverse().forEach(neighbor => {
        if (!visited.has(neighbor)) {
          stack.push(neighbor);
        }
      });
    }
    
    const endTime = Date.now();
    setStats({
      visited: visitedCount,
      totalWeight: 0,
      executionTime: endTime - startTime
    });
  };

  const bfs = async () => {
    const startTime = Date.now();
    const visited = new Set();
    const queue = [startNode];
    let visitedCount = 0;

    visited.add(startNode);
    
    while (queue.length > 0) {
      const currentId = queue.shift();
      visitedCount++;
      setCurrentNode(currentId);
      setVisitedNodes(new Set(visited));
      
      await sleep(800);
      
      // Find neighbors
      const neighbors = edges
        .filter(edge => edge.from === currentId || edge.to === currentId)
        .map(edge => edge.from === currentId ? edge.to : edge.from)
        .filter(neighbor => !visited.has(neighbor));
      
      neighbors.forEach(neighbor => {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
        }
      });
    }
    
    const endTime = Date.now();
    setStats({
      visited: visitedCount,
      totalWeight: 0,
      executionTime: endTime - startTime
    });
  };

  const kruskal = async () => {
    const startTime = Date.now();
    const sortedEdges = [...edges].sort((a, b) => a.weight - b.weight);
    const parent = {};
    const rank = {};
    const mst = new Set();
    let totalWeight = 0;

    // Initialize union-find
    nodes.forEach(node => {
      parent[node.id] = node.id;
      rank[node.id] = 0;
    });

    const find = (x) => {
      if (parent[x] !== x) {
        parent[x] = find(parent[x]);
      }
      return parent[x];
    };

    const union = (x, y) => {
      const rootX = find(x);
      const rootY = find(y);
      
      if (rootX !== rootY) {
        if (rank[rootX] < rank[rootY]) {
          parent[rootX] = rootY;
        } else if (rank[rootX] > rank[rootY]) {
          parent[rootY] = rootX;
        } else {
          parent[rootY] = rootX;
          rank[rootX]++;
        }
        return true;
      }
      return false;
    };

    for (const edge of sortedEdges) {
      setExploringEdges(new Set([edge.id]));
      await sleep(1000);
      
      if (union(edge.from, edge.to)) {
        mst.add(edge.id);
        totalWeight += edge.weight;
        setMstEdges(new Set(mst));
        await sleep(500);
      }
      
      setExploringEdges(new Set());
      
      if (mst.size === nodes.length - 1) break;
    }
    
    const endTime = Date.now();
    setStats({
      visited: nodes.length,
      totalWeight,
      executionTime: endTime - startTime
    });
  };

  const prim = async () => {
    const startTime = Date.now();
    const visited = new Set([startNode]);
    const mst = new Set();
    let totalWeight = 0;

    while (visited.size < nodes.length) {
      let minEdge = null;
      let minWeight = Infinity;

      // Find minimum weight edge from visited to unvisited nodes
      for (const edge of edges) {
        const fromVisited = visited.has(edge.from);
        const toVisited = visited.has(edge.to);
        
        if (fromVisited !== toVisited && edge.weight < minWeight) {
          minEdge = edge;
          minWeight = edge.weight;
        }
      }

      if (minEdge) {
        setExploringEdges(new Set([minEdge.id]));
        await sleep(1000);

        mst.add(minEdge.id);
        totalWeight += minEdge.weight;
        visited.add(minEdge.from);
        visited.add(minEdge.to);
        
        setVisitedNodes(new Set(visited));
        setMstEdges(new Set(mst));
        setExploringEdges(new Set());
        
        await sleep(500);
      } else {
        break;
      }
    }
    
    const endTime = Date.now();
    setStats({
      visited: visited.size,
      totalWeight,
      executionTime: endTime - startTime
    });
  };

  const startVisualization = async () => {
    if (isRunning || nodes.length === 0) return;

    setIsRunning(true);
    resetVisualization();

    try {
      switch (algorithm) {
        case 'dfs':
          await dfs();
          break;
        case 'bfs':
          await bfs();
          break;
        case 'kruskal':
          await kruskal();
          break;
        case 'prim':
          await prim();
          break;
        default:
          break;
      }
    } catch (error) {
      console.error('Visualization interrupted:', error);
    }

    setIsRunning(false);
  };

  const getEdgePosition = (edge) => {
    const fromNode = nodes.find(n => n.id === edge.from);
    const toNode = nodes.find(n => n.id === edge.to);
    
    if (!fromNode || !toNode) return null;
    
    return {
      x1: fromNode.x,
      y1: fromNode.y,
      x2: toNode.x,
      y2: toNode.y,
      midX: (fromNode.x + toNode.x) / 2,
      midY: (fromNode.y + toNode.y) / 2
    };
  };

  return (
    <Container>
      <Title>Graph Algorithms Visualizer</Title>

      <InputSection>
        <InputGrid>
          <InputGroup>
            <InputTitle>Graph Definition</InputTitle>
            <Label>Nodes (comma-separated)</Label>
            <Input
              value={nodesInput}
              onChange={(e) => setNodesInput(e.target.value)}
              placeholder="A,B,C,D,E"
              disabled={isRunning}
            />
            <Label>Edges (format: A-B-weight)</Label>
            <TextArea
              value={edgesInput}
              onChange={(e) => setEdgesInput(e.target.value)}
              placeholder="A-B-5,B-C-3,C-D-7"
              disabled={isRunning}
            />
            <Button onClick={generateRandomGraph} disabled={isRunning}>
              Generate Random Graph
            </Button>
          </InputGroup>
          
          <InputGroup>
            <InputTitle>Algorithm Settings</InputTitle>
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
              <Label>Start Node</Label>
              <Select
                value={startNode}
                onChange={(e) => setStartNode(parseInt(e.target.value))}
                disabled={isRunning}
              >
                {nodes.map(node => (
                  <option key={node.id} value={node.id}>{node.name}</option>
                ))}
              </Select>
            </ControlGroup>
            
            <Button $primary onClick={startVisualization} disabled={isRunning || nodes.length === 0}>
              {isRunning ? 'Running...' : 'Start Visualization'}
            </Button>
            
            <Button onClick={resetVisualization} disabled={isRunning}>
              Reset
            </Button>
          </InputGroup>
        </InputGrid>
      </InputSection>

      <GraphContainer>
        <SVG>
          {/* Render edges */}
          {edges.map(edge => {
            const pos = getEdgePosition(edge);
            if (!pos) return null;
            
            return (
              <g key={edge.id}>
                <Edge
                  x1={pos.x1}
                  y1={pos.y1}
                  x2={pos.x2}
                  y2={pos.y2}
                  $isInMST={mstEdges.has(edge.id)}
                  $isExploring={exploringEdges.has(edge.id)}

                />
                <EdgeWeight x={pos.midX} y={pos.midY - 5}>
                  {edge.weight}
                </EdgeWeight>
              </g>
            );
          })}
          
          {/* Render nodes */}
          {nodes.map(node => (
            <g key={node.id}>
              <Node
                cx={node.x}
                cy={node.y}
                r={20}
                $isStart={node.id === startNode}
                $isCurrent={currentNode === node.id}
                $isVisited={visitedNodes.has(node.id)}
                $isInMST={algorithms[algorithm].type === 'mst'}

              />
              <NodeLabel x={node.x} y={node.y}>
                {node.name}
              </NodeLabel>
            </g>
          ))}
        </SVG>
      </GraphContainer>

      <InfoPanel>
        <InfoCard>
          <InfoTitle>Algorithm</InfoTitle>
          <InfoValue style={{ fontSize: '1.2rem' }}>{algorithms[algorithm].name}</InfoValue>
          <InfoDescription>{algorithms[algorithm].description}</InfoDescription>
        </InfoCard>
        
        <InfoCard>
          <InfoTitle>Nodes Processed</InfoTitle>
          <InfoValue>{stats.visited}</InfoValue>
          <InfoDescription>Vertices visited</InfoDescription>
        </InfoCard>
        
        <InfoCard>
          <InfoTitle>Total Weight</InfoTitle>
          <InfoValue>{stats.totalWeight}</InfoValue>
          <InfoDescription>MST total weight</InfoDescription>
        </InfoCard>
        
        <InfoCard>
          <InfoTitle>Execution Time</InfoTitle>
          <InfoValue>{stats.executionTime}ms</InfoValue>
          <InfoDescription>Algorithm runtime</InfoDescription>
        </InfoCard>
        
        <InfoCard>
          <InfoTitle>Graph Info</InfoTitle>
          <InfoValue>{nodes.length}V, {edges.length}E</InfoValue>
          <InfoDescription>Vertices and edges</InfoDescription>
        </InfoCard>
      </InfoPanel>
    </Container>
  );
};

export default GraphVisualizer;