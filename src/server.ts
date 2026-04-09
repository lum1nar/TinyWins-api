import "./env.js";
import express from "express";
import userRoute from "./user/index.js";
import authRoute from "./auth/index.js";
import { errorHanlder } from "./middleware/errorHandler.js";
import { authMiddleware } from "./middleware/authMiddleware.js";
import cookieParser from "cookie-parser";
import todoRouter from "./todo/index.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.get("/", (_req, res) => res.send("Server alive"));
app.use("/auth", authRoute);
app.use("/user", authMiddleware, userRoute);
app.use("/todo", authMiddleware, todoRouter);
app.use(errorHanlder);

app.listen(3000, () => console.log(`Server Running on PORT 3000`));
