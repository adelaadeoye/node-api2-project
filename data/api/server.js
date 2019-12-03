const express = require("express");

const dbRouter = require("../router/data-router.js");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.send(`
    <h2>Server is running</h2>
    `);
});


server.use('/api/posts',dbRouter);

module.exports=server;