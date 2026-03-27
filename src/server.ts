import express from "express";
import userRoute from "./user/index.js";
import authRoute from "./auth/index.js";

const app = express();

app.use(express.json());

app.get("/", (_req, res) => res.send("Server alive"));
app.use("/user", userRoute);
app.use("/auth", authRoute);

app.listen(3000, () => console.log(`Server Running on PORT 3000`));
