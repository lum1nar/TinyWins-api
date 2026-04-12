import cookieParser from "cookie-parser";
import express from "express";
import authRoute from "./auth/index.js";
import "./env.js";
import { authMiddleware } from "./middleware/authMiddleware.js";
import { errorHanlder } from "./middleware/errorHandler.js";
import todoRouter from "./todo/index.js";
import userRoute from "./user/index.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.get("/", (_req, res) => res.send("Server alive"));
app.use("/auth", authRoute);
app.use("/user", authMiddleware, userRoute);
app.use("/todo", authMiddleware, todoRouter);
app.use(errorHanlder);

app.listen(3000, () => console.log(`Server Running on PORT 3000`));
