const express = require("express");
const cors = require("cors");
const { connection } = require("./config");
const { auth } = require("./Middlewares/auth.user");
const { userRouter } = require("./Routes/user.router");
const app = express();
app.use(express.json());
app.use(cors());
require("dotenv").config();

app.use("/", userRouter);
app.use(auth);

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("Conneted to DB");
  } catch (err) {
    console.log("Something went wrong");
    console.log(err.message);
  }
  console.log(`port is running at ${process.env.port}`);
});
