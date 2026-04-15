const http = require("http");
const app = require("./src/config/express.config")
const server = http.createServer(app)


server.listen(9005, "0.0.0.0", (err) => {
    if (!err) {
        console.log("✅ Server is running")
        console.log("✅ ctrl+c to disconnect")
    }
})

//port no. in total 65535