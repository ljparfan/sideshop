import { errorHandler, logger, NotFoundError } from "@sideshop/common";
import { Express, json } from "express";
import cartItemRouter from "../routes/cart-items.js";

export default function registerRoutes(app: Express) {
  app.use(json());
  app.use("/api/cart-items", cartItemRouter);
  app.all("*", async (req, res) => {
    logger.info(req.url);
    logger.info(req.method);
    throw new NotFoundError();
  });
  app.use(errorHandler);
}
