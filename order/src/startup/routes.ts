import { errorHandler, logger, NotFoundError } from "@sideshop/common";
import { Express, json } from "express";
import orderRouter from "../routes/orders.js";

export default function registerRoutes(app: Express) {
  app.use(json());
  app.use("/api/orders", orderRouter);
  app.all("*", async (req, res) => {
    logger.info(req.url);
    logger.info(req.method);
    throw new NotFoundError();
  });
  app.use(errorHandler);
}
