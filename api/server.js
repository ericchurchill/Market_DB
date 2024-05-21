const fs = require('fs');
const path = require('path');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const jsonServer = require('json-server');

// Change the path to a writable directory
const dbFilePath = path.join('/tmp', 'db.json');
const adapter = new FileSync(dbFilePath);
const db = low(adapter);

// Initialize LowDB database with default values if it doesn't exist
db.defaults({}).write();

// Create a JSON Server instance
const server = jsonServer.create();
const router = jsonServer.router(dbFilePath); // Use the same db.json file
const middlewares = jsonServer.defaults();

// Set middlewares
server.use(middlewares);

// Add custom rewrites before JSON Server router
server.use(jsonServer.rewriter({
    '/api/*': '/$1',
    '/blog/:resource/:id/show': '/:resource/:id'
}));

// Use the JSON Server router
server.use(router);

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`JSON Server is running on port ${PORT}`);
});

// Export the Server API if needed
module.exports = server;
