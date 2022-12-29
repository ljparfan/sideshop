import { Router } from "express";
import { Brand } from "../entities/brand.js";

const brandsRouter = Router();

brandsRouter.get("/", async (req, res) => {
  res.send(await Brand.find());
});

export default brandsRouter;
