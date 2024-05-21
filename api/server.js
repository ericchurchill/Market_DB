const jsonServer = require('json-server');
const path = require('path');
const fs = require('fs');

const server = jsonServer.create();

// Define the file path for the database
const filePath = path.join( 'db.json');

// Initialize data with some default values
const data = {
    "Primarybids": [
      {
        "id": "13a8",
        "SlotNumber": "1",
        "BusNumber": "1",
        "Power": "300",
        "Price": "30"
      }
    ],
    "MCP": [
      {
        "SlotNumber": 40,
        "MCP": 37,
        "MP": 597,
        "Bus1": 300,
        "Bus2": 297,
        "Bus3": 97,
        "Bus4": 350,
        "Bus5": 150,
        "id": "84c7"
      },
      {
        "SlotNumber": 41,
        "MCP": 35,
        "MP": 698,
        "Bus1": 300,
        "Bus2": 398,
        "Bus3": 98,
        "Bus4": 350,
        "Bus5": 250,
        "id": "4dd9"
      }
    ],
    "Secondarybids": [
      {
        "id": "1886",
        "SlotNumber": "1",
        "BusNumber": "1",
        "incPower": "50",
        "incPrice": "15",
        "decPower": "50"
      }
    ]
  }

// Write the initial data to the file if it doesn't exist
if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify(data));
}

// Create a JSON Server router using the file path
const router = jsonServer.router(filePath);

const middlewares = jsonServer.defaults();

server.use(middlewares);

// Add rewriting rules
server.use(jsonServer.rewriter({
    '/api/*': '/$1',
    '/blog/:resource/:id/show': '/:resource/:id'
}));

server.use(router);

const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log('JSON Server is running on port ${port}');
});

// Export the Server API
module.exports = server;