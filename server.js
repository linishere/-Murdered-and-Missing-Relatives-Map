const express = require('express');
const path = require('path');
const app = express();

// Serve static files (updated safe approach)
app.use(express.static(__dirname, {
  dotfiles: 'ignore',
  index: 'index.html'
}));

// Explicit static routes
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/js', express.static(path.join(__dirname, 'js')));
app.use('/pages', express.static(path.join(__dirname, 'pages')));

// API endpoint (simplified)
app.get('/api/cases', (req, res) => {
  res.sendFile(path.join(__dirname, 'data/missingPersons.json'));
});

// Fallback route (safe pattern)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server safely running on http://localhost:${PORT}`);
});