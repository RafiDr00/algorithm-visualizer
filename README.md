# Algorithm Visualizer 🚀

A comprehensive web application that brings computer science algorithms to life through interactive visualizations and real-time performance analysis.

![Algorithm Visualizer Demo](https://img.shields.io/badge/Demo-Live-brightgreen)
![React](https://img.shields.io/badge/React-18.2.0-blue)
![Styled Components](https://img.shields.io/badge/Styled--Components-5.3.5-pink)
![Framer Motion](https://img.shields.io/badge/Framer--Motion-7.2.1-purple)

## 🌟 Features

### 🔄 Sorting Algorithms Visualizer
- **5 Different Algorithms**: Bubble Sort, Selection Sort, Insertion Sort, Merge Sort, Quick Sort
- **Step-by-Step Animation**: Color-coded bars showing comparisons, swaps, and sorted elements
- **Real-time Statistics**: Live tracking of comparisons, swaps, and execution time
- **Customizable Parameters**: Adjustable array size and animation speed
- **Interactive Controls**: Generate new arrays, pause/resume animations

### 🗺️ Pathfinding Visualizer
- **4 Pathfinding Algorithms**: Dijkstra's Algorithm, A*, Breadth-First Search, Depth-First Search
- **Interactive Grid**: 25x50 grid with drag-to-draw walls
- **Multiple Modes**: Switch between drawing walls, moving start point, and moving end point
- **Visual Feedback**: Different colors for start, end, walls, exploring, visited, and final path
- **Performance Metrics**: Nodes visited, path length, and execution time tracking

### 🕸️ Graph Algorithms Visualizer
- **Graph Algorithms**: DFS, BFS, Kruskal's MST, Prim's MST, Topological Sort
- **Interactive Graph Builder**: Define custom graphs with nodes and weighted edges
- **SVG Visualization**: Smooth animations with labeled nodes and weighted edges
- **Random Graph Generation**: Create random graphs for testing
- **Algorithm Comparison**: Visual comparison of traversal and MST algorithms

### 📊 Complexity Analyzer
- **Performance Comparison**: Side-by-side algorithm performance analysis
- **Live Charts**: Real-time execution time vs. input size visualization
- **Multiple Algorithms**: Compare up to 4 algorithms simultaneously  
- **Detailed Metrics**: Time complexity, space complexity, and actual performance data
- **Interactive Testing**: Run single tests or full complexity analysis

## 🛠️ Tech Stack

- **Frontend**: React 18.2.0 with Hooks and Context
- **Styling**: Styled Components with glassmorphism design
- **Animations**: Framer Motion for smooth transitions
- **Charts**: Recharts for performance visualization
- **Routing**: React Router DOM for navigation
- **Design**: Modern glassmorphism UI with gradient backgrounds

## 🚀 Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/algorithm-visualizer.git
   cd algorithm-visualizer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` to see the application

### Building for Production

```bash
npm run build
```

This creates a `build` folder with optimized production files.

## 📱 Usage Guide

### Sorting Visualizer
1. Select an algorithm from the dropdown
2. Adjust array size (5-100 elements)
3. Set animation speed (10-1000ms)
4. Click "Start Sorting" to begin visualization
5. Watch the color-coded animation:
   - **Blue**: Unsorted elements
   - **Red**: Elements being compared
   - **Cyan**: Elements being swapped
   - **Green**: Sorted elements

### Pathfinding Visualizer
1. Select a pathfinding algorithm
2. Choose interaction mode (Draw Walls, Move Start, Move End)
3. Click and drag to modify the grid
4. Click "Find Path" to start the algorithm
5. Observe the visualization:
   - **Green**: Start node
   - **Red**: End node
   - **Dark**: Walls
   - **Cyan**: Currently exploring
   - **Purple**: Visited nodes
   - **Yellow**: Final path

### Graph Visualizer
1. Define nodes (comma-separated): `A,B,C,D,E`
2. Define edges (format: `A-B-5` for A to B with weight 5)
3. Select algorithm and start node
4. Click "Start Visualization"
5. Generate random graphs for quick testing

### Complexity Analyzer
1. Select algorithms to compare (hold Ctrl for multiple)
2. Set input size for single tests
3. Set maximum size for complexity analysis
4. Run single test for specific size performance
5. Run full analysis for complexity comparison charts

## 🎨 Design Philosophy

### Visual Design
- **Glassmorphism**: Modern frosted glass effect with blur and transparency
- **Color Scheme**: Purple-blue gradients with accent colors for different states
- **Responsive**: Works on desktop, tablet, and mobile devices
- **Accessibility**: High contrast colors and clear visual indicators

### User Experience
- **Intuitive Controls**: Clear labels and logical grouping of options
- **Real-time Feedback**: Immediate visual response to user interactions
- **Educational Focus**: Detailed information about each algorithm's complexity
- **Progressive Disclosure**: Advanced features available without overwhelming beginners

## 🧮 Algorithm Details

### Sorting Algorithms

| Algorithm | Best Case | Average Case | Worst Case | Space | Stable |
|-----------|-----------|--------------|------------|-------|--------|
| Bubble Sort | O(n) | O(n²) | O(n²) | O(1) | ✅ |
| Selection Sort | O(n²) | O(n²) | O(n²) | O(1) | ❌ |
| Insertion Sort | O(n) | O(n²) | O(n²) | O(1) | ✅ |
| Merge Sort | O(n log n) | O(n log n) | O(n log n) | O(n) | ✅ |
| Quick Sort | O(n log n) | O(n log n) | O(n²) | O(log n) | ❌ |

### Pathfinding Algorithms

| Algorithm | Type | Optimal | Time Complexity | Space Complexity |
|-----------|------|---------|-----------------|------------------|
| Dijkstra's | Weighted | ✅ | O((V + E) log V) | O(V) |
| A* | Weighted + Heuristic | ✅ | O(E) | O(V) |
| BFS | Unweighted | ✅ | O(V + E) | O(V) |
| DFS | Unweighted | ❌ | O(V + E) | O(V) |

### Graph Algorithms

| Algorithm | Purpose | Time Complexity | Space Complexity |
|-----------|---------|-----------------|------------------|
| DFS | Traversal | O(V + E) | O(V) |
| BFS | Traversal | O(V + E) | O(V) |
| Kruskal's MST | Minimum Spanning Tree | O(E log E) | O(V) |
| Prim's MST | Minimum Spanning Tree | O(E log V) | O(V) |

## 🎯 Educational Value

### Learning Objectives
- **Algorithm Understanding**: Visualize how algorithms work step-by-step
- **Complexity Analysis**: Compare theoretical vs. actual performance
- **Problem Solving**: Understand when to use which algorithm
- **Data Structures**: Learn about graphs, trees, and arrays through visualization

### Target Audience
- **Computer Science Students**: Visual learning aid for algorithm courses
- **Coding Interview Preparation**: Practice with commonly asked algorithms
- **Educators**: Teaching tool for algorithm concepts
- **Developers**: Refresh knowledge and compare algorithm performance

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### Adding New Algorithms
1. Create algorithm implementation in the appropriate component
2. Add complexity information to the algorithms object
3. Implement visualization logic
4. Add tests and documentation

### Improving Visualizations
1. Enhance animations with Framer Motion
2. Add new color schemes or themes
3. Improve responsive design
4. Add accessibility features

### Bug Reports
1. Use the GitHub issue tracker
2. Include steps to reproduce
3. Specify browser and OS
4. Add screenshots if applicable

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **React Team**: For the amazing React framework
- **Framer Motion**: For smooth animations
- **Recharts**: For beautiful chart visualizations
- **Styled Components**: For component-based styling
- **Computer Science Community**: For algorithm knowledge and inspiration

## 🔗 Links

- **Live Demo**: [Coming Soon]
- **GitHub Repository**: [https://github.com/yourusername/algorithm-visualizer]
- **Documentation**: [Wiki](https://github.com/yourusername/algorithm-visualizer/wiki)
- **Issues**: [Bug Reports & Feature Requests](https://github.com/yourusername/algorithm-visualizer/issues)

---

**Made with ❤️ for the CS community**

*Transform abstract algorithmic concepts into interactive, visual learning experiences!*