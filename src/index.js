const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('MCP Server is running!');
});

const server = app.listen(port, () => {
  console.log(`MCP Server listening at http://localhost:${port}`);
});

server.on('listening', () => {
  console.log('Server is listening!');
});

module.exports = app;
