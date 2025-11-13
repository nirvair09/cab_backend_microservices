const app = require("./app");
const http = require("http");

const server = http.createServer(app);

server.listen(process.env.DRIVER_PORT, () => {
    console.log(`Driver Service running on port ${process.env.DRIVER_PORT}`);
});