const app = require("./app");
const http = require("http");

const server = http.createServer(app);

server.listen(process.env.RIDE_PORT, () => {
    console.log(`User Service running on port ${process.env.USER_PORT}`);
});