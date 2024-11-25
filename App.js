import 'dotenv/config'
import express from "express"
import userRouter from "./Routes/UserRoutes.js";
import taskRouter from "./Routes/TaskRoutes.js";
import cors from "cors"
import mongoose from "mongoose";

const App = express(); 

App.use(express.json())
App.use(cors())
App.use("/api/v1/users", userRouter);
App.use("/api/v1/tasks", taskRouter)


mongoose
  .connect(process.env.DBConnection, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB has connected Successfully"))
  .catch((err) => console.log(`error encountered ${err}`));


App.use((req,res)=> res.status(200).json({
  status:200,
  message: "Welcome to Task Master"
}))

App.use((err, req,res) => {
  res.status(500).json({
    status:500,
    message:err
  });
})

export default App;