const express = require('express');
const path = require('path');
const app = express();

// Middleware to parse JSON requests (if needed)
app.use(express.json());

// Serve static files safely
app.use(express.static(path.join(__dirname, 'public')));  // Best practice: Use 'public' folder

// Explicit static routes (optional, if you need special handling)
app.use('/css', express.static(path.join(__dirname, 'css'), { 
  maxAge: '1d'  }));
app.use('/js', express.static(path.join(__dirname, 'js')));
app.use('/pages', express.static(path.join(__dirname, 'pages')));

// API endpoint
app.get('/api/cases', (req, res) => {
    try {
        const filePath = path.join(__dirname, 'data/missingPersons.json');
        console.log('Resolved file path:', filePath); // Debugging
        res.sendFile(filePath, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (err) {
        console.error('API Error:', err);
        res.status(500).send('Internal Server Error');
    }
});

// Fallback route (must be last)
app.get('*', (req, res) => {
    const filePath = path.join(__dirname, 'index.html');
    console.log('Resolved file path for fallback:', filePath);
    res.sendFile(filePath);
});

// Error handling middleware (catches unhandled errors)
app.use((err, req, res, next) => {
  console.error('Server Error:', err);
  res.status(500).send('Server Error');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});