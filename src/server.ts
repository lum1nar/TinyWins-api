import express from "express";
import userRoute from "./user/index.js";

const app = express();

app.use(express.json());

app.use("/user", userRoute);

app.listen(3000, () => console.log(`Server Running on PORT 3000`));
