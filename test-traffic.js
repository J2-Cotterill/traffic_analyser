const http = require('http');

// Generate test traffic
function generateTraffic() {
  const methods = ['GET', 'POST', 'PUT', 'DELETE'];
  const paths = ['/api/users', '/api/products', '/api/orders', '/api/auth'];
  
  setInterval(() => {
    const method = methods[Math.floor(Math.random() * methods.length)];
    const path = paths[Math.floor(Math.random() * paths.length)];
    
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: path,
      method: method
    };

    const req = http.request(options, res => {
      console.log(`Generated ${method} request to ${path}`);
    });

    req.on('error', error => {
      console.error('Error generating traffic:', error);
    });

    req.end();
  }, 1000); // Generate request every second
}

generateTraffic();