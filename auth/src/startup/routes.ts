import { errorHandler, NotFoundError } from "@sideshop/common";
import { Express, json } from "express";
import authRouter from "../routes/auth.js";
import userRouter from "../routes/users.js";

export default function registerRoutes(app: Express) {
  app.use(json());
  app.use("/api/users", userRouter);
  app.use("/api/auth", authRouter);
  app.all("*", async (req, res) => {
    throw new NotFoundError();
  });
  app.use(errorHandler);
}
