# 🚀 Algorithm Visualizer - Complete Setup Guide

## 📋 Quick Start

### Prerequisites
Make sure you have the following installed:
- **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
- **npm** or **yarn** package manager
- Modern web browser (Chrome, Firefox, Safari, Edge)

### 🎯 Installation Steps

1. **Navigate to the project directory**
   ```bash
   cd algorithm-visualizer
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   - Navigate to `http://localhost:3000`
   - The app should load automatically! 🎉

### 🔧 Optional Backend Setup (For Data Persistence)

If you want to save performance data:

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install backend dependencies**
   ```bash
   npm install
   ```

3. **Create environment file**
   ```bash
   cp .env.example .env
   ```

4. **Start the backend server**
   ```bash
   npm run dev
   ```

Backend will run on `http://localhost:5000`

## 🎮 How to Use

### 🔄 Sorting Visualizer
1. Go to "Sorting" tab
2. Select algorithm (Bubble, Merge, Quick, etc.)
3. Adjust array size and speed
4. Click "Start Sorting"
5. Watch the magic happen! ✨

### 🗺️ Pathfinding Visualizer
1. Go to "Pathfinding" tab
2. Select algorithm (Dijkstra's, A*, BFS, DFS)
3. Draw walls by clicking and dragging
4. Move start/end points
5. Click "Find Path"
6. See the algorithm explore! 🧭

### 🕸️ Graph Visualizer
1. Go to "Graphs" tab
2. Define nodes: `A,B,C,D,E`
3. Define edges: `A-B-5,B-C-3,C-D-7`
4. Select algorithm and start node
5. Click "Start Visualization"
6. Watch traversal/MST algorithms! 🌐

### 📊 Complexity Analyzer
1. Go to "Complexity" tab
2. Select algorithms to compare
3. Run single test or full analysis
4. Compare performance charts! 📈

## 🛠️ Development

### Available Scripts

```bash
# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test

# Eject (⚠️ one-way operation)
npm run eject
```

### Project Structure
```
algorithm-visualizer/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── Header.js
│   │   ├── Home.js
│   │   ├── SortingVisualizer.js
│   │   ├── PathfindingVisualizer.js
│   │   ├── GraphVisualizer.js
│   │   └── ComplexityAnalyzer.js
│   ├── utils/
│   │   └── algorithms.js
│   ├── styles/
│   │   └── theme.js
│   ├── App.js
│   ├── index.js
│   └── index.css
├── backend/ (optional)
│   ├── server.js
│   └── package.json
├── package.json
└── README.md
```

## 🎨 Customization

### Adding New Algorithms

1. **Open the appropriate component**
   - Sorting: `SortingVisualizer.js`
   - Pathfinding: `PathfindingVisualizer.js`
   - Graph: `GraphVisualizer.js`

2. **Add algorithm to the algorithms object**
   ```javascript
   'your-algorithm': {
     name: 'Your Algorithm',
     timeComplexity: 'O(n log n)',
     spaceComplexity: 'O(1)',
     description: 'Your algorithm description'
   }
   ```

3. **Implement the algorithm function**
   ```javascript
   const yourAlgorithm = async (array) => {
     // Your implementation here
     // Use await sleep(speed) for visualization
     // Update state for visual feedback
   };
   ```

4. **Add to the switch statement**
   ```javascript
   case 'your-algorithm':
     await yourAlgorithm(arrCopy);
     break;
   ```

### Customizing Colors and Themes

Edit `src/styles/theme.js`:

```javascript
export const theme = {
  colors: {
    primary: {
      start: '#your-color',
      end: '#your-other-color'
    }
    // ... more colors
  }
};
```

## 🐛 Troubleshooting

### Common Issues

**1. Port 3000 already in use**
```bash
# Kill process on port 3000
npx kill-port 3000
# Or use different port
PORT=3001 npm start
```

**2. Node modules issues**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

**3. Browser compatibility**
- Use modern browsers (Chrome 70+, Firefox 65+, Safari 12+)
- Enable JavaScript
- Clear browser cache

**4. Slow animations**
- Reduce array size
- Increase speed value
- Close other browser tabs

## 🚀 Deployment

### Deploy to Netlify (Recommended)

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

3. **Deploy**
   ```bash
   netlify deploy --prod --dir=build
   ```

### Deploy to Vercel

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

### Deploy to GitHub Pages

1. **Install gh-pages**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Add to package.json**
   ```json
   "homepage": "https://yourusername.github.io/algorithm-visualizer",
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d build"
   }
   ```

3. **Deploy**
   ```bash
   npm run deploy
   ```

## 📝 Contributing

1. **Fork the repository**
2. **Create feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
4. **Push to branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open Pull Request**

## 📞 Support

If you encounter any issues:

1. Check this guide first
2. Search existing [GitHub issues](https://github.com/yourusername/algorithm-visualizer/issues)
3. Create a new issue with:
   - Steps to reproduce
   - Expected behavior
   - Screenshots (if applicable)
   - Browser and OS information

## 🎉 You're Ready!

Congratulations! You now have a fully functional Algorithm Visualizer. Start exploring algorithms and enjoy learning! 

**Happy coding!** 🚀✨