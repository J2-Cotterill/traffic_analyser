const express = require('express');
const WebSocket = require('ws');
const { format } = require('date-fns');

const app = express();
const port = 3000;

// Create WebSocket server
const wss = new WebSocket.Server({ noServer: true });

// Store traffic data
let trafficData = [];

// Serve static files
app.use(express.static('public'));
app.use(express.json());

// Middleware to log traffic
app.use((req, res, next) => {
  const timestamp = new Date();
  const traffic = {
    timestamp,
    method: req.method,
    path: req.path,
    size: parseInt(req.headers['content-length'] || '0'),
    ip: req.ip,
    userAgent: req.headers['user-agent']
  };
  
  trafficData.push(traffic);
  
  // Keep only last 1000 requests
  if (trafficData.length > 1000) {
    trafficData.shift();
  }

  // Broadcast to all connected clients
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(traffic));
    }
  });

  next();
});

// API endpoints
app.get('/api/traffic', (req, res) => {
  res.json(trafficData);
});

const server = app.listen(port, () => {
  console.log(`Traffic analyzer running on port ${port}`);
});

// Handle WebSocket upgrade
server.on('upgrade', (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, ws => {
    wss.emit('connection', ws, request);
  });
});