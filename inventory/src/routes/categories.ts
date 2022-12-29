import { Router } from "express";
import { Category } from "../entities/category.js";

const categoriesRouter = Router();

categoriesRouter.get("/", async (req, res) => {
  res.send(await Category.find());
});

export default categoriesRouter;
