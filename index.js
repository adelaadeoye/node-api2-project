// console.log("Initial setup")

const server = require("./data/api/server.js");
const port = 4001;
server.listen(port, () => {
  console.log("\n*** Server Running on http://localhost:4001 ***\n");
});
