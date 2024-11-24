import http from "http";
import "dotenv/config.js"
import App from "./App.js";

const Server = http.createServer(App);
Server.listen(process.env.PORT, () => {
  console.log("App started on Port " + process.env.PORT);
});
