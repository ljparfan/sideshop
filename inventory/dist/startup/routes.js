import { errorHandler, logger, NotFoundError } from "@sideshop/common";
import { json } from "express";
import productRouter from "../routes/products.js";
export default function registerRoutes(app) {
    app.use(json());
    app.use("/api/products", productRouter);
    app.all("*", async (req, res) => {
        logger.info(req.url);
        logger.info(req.method);
        throw new NotFoundError();
    });
    app.use(errorHandler);
}
//# sourceMappingURL=routes.js.map