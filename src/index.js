const express = require("express");
const mongoose = require("mongoose");
const customerRouter=require("./routes/customer")
const cardRouter=require("./routes/card")
const countRouter=require("./routes/counter")

const app = express();

app.use(express.json());

app.use("/api/customer",customerRouter)
app.use("/api/card",cardRouter)
app.use("/api/counter",countRouter)

mongoose
  .connect(
    "mongodb+srv://Debasish904:Nzi5BjnfyWQmSY9m@cluster0.eeozuz6.mongodb.net/jaikishan",
    {
      useNewUrlParser: true,
    }
  )
  .then(() => console.log("MongoDB is connected"))
  .catch((err) => console.log(err));

  app.listen(3000,()=>console.log("Server is connected to 3000"))