# Network Traffic Analyzer

## Setup Instructions

1. Create a new directory and navigate to it:
```bash
mkdir network-analyzer
cd network-analyzer
```

2. Create the following directory structure:
```
network-analyzer/
├── public/
│   └── index.html
├── server.js
├── test-traffic.js
└── package.json
```

3. Install dependencies:
```bash
npm install
```

## Running the Application

1. Start the server:
```bash
npm start
```

2. Open a new terminal and run the traffic generator:
```bash
npm run test
```

3. Open your browser and visit:
```
http://localhost:3000
```

## Features
- Real-time traffic monitoring
- Visual analytics with charts
- Request method distribution
- Traffic log with timestamps