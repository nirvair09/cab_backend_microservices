const express = require("express");
const expressProxy = require("express-http-proxy");
const dontenv = require("dotenv");

dontenv.config();


const app = express();


app.use("/cab/user", expressProxy(process.env.USER_ENDPOINT));
app.use("/cab/driver", expressProxy(process.env.DRIVER_ENDPOINT));
app.use("/cab/ride", expressProxy(process.env.RIDE_ENDPOINT));



app.listen(process.env.PORT, () => {
    console.log("Cab Backend Gateway at port 3000");
})
