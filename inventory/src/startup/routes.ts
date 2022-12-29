import { errorHandler, logger, NotFoundError } from "@sideshop/common";
import { Express, json } from "express";
import brandsRouter from "../routes/brands.js";
import categoriesRouter from "../routes/categories.js";
import productRouter from "../routes/products.js";

export default function registerRoutes(app: Express) {
  app.use(json());
  app.use("/api/products", productRouter);
  app.use("/api/categories", categoriesRouter);
  app.use("/api/brands", brandsRouter);
  app.all("*", async (req, res) => {
    logger.info(req.url);
    logger.info(req.method);
    throw new NotFoundError();
  });
  app.use(errorHandler);
}
