import { logger, validateRequest, } from "@sideshop/common";
import express from "express";
import multer from "multer";
import { createProductSchema, } from "../dtos/create-product-dto.js";
import Brand from "../entities/brand.js";
import Category from "../entities/category.js";
import Product from "../entities/product.js";
import inventoryConfig from "../models/inventory-config.js";
import uploadFile from "../utils/upload.js";
const productRouter = express.Router();
const upload = multer({ dest: "temp/" });
productRouter.post("/", upload.array("photos", 5), (req, res, next) => {
    req.body = {
        ...req.body,
        price: +req.body.price,
        quantityInStock: +req.body.quantityInStock,
    };
    next();
}, validateRequest(createProductSchema), async (req, res) => {
    const files = req.files.map((file) => {
        file.originalname = `${crypto.randomUUID()}.${file.originalname
            .split(".")
            .pop()}`;
        return file;
    });
    try {
        await Promise.all([...files].map((file) => uploadFile(file)));
        logger.info("successfully saved photos in s3");
        const body = req.body;
        const product = new Product();
        product.name = body.name;
        product.price = body.price;
        product.quantityInStock = body.quantityInStock;
        product.description = body.description;
        product.photos = files.map((file) => `https://s3.${inventoryConfig.awsRegion}.amazonaws.com/${inventoryConfig.awsS3BucketName}/${file.originalname}`);
        const category = await Category.findOneBy({ name: body.categoryName });
        if (category) {
            logger.info("category found from body");
            product.category = category;
        }
        else {
            product.category = new Category();
            logger.info("category not from body");
            product.category.name = body.categoryName;
        }
        const brand = await Brand.findOneBy({ name: body.brandName });
        if (brand) {
            logger.info("brand found from body");
            product.brand = brand;
        }
        else {
            product.brand = new Brand();
            logger.info("brand not found from body");
            product.brand.name = body.brandName;
        }
        await product.save();
        logger.info("successfully saved product ,returning response");
        res.send(product);
    }
    catch (error) {
        console.log({ error });
        logger.error(error);
        throw error;
    }
});
export default productRouter;
//# sourceMappingURL=products.js.map