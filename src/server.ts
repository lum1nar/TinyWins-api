import express from "express";
import userRoute from "./user/index.js";
import authRoute from "./auth/index.js";
import { errorHanlder } from "./middleware/errorHandler.js";

const app = express();

app.use(express.json());

app.get("/", (_req, res) => res.send("Server alive"));
app.use("/user", userRoute);
app.use("/auth", authRoute);
app.use(errorHanlder);

app.listen(3000, () => console.log(`Server Running on PORT 3000`));
