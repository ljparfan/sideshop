import {
  AppFile,
  isAuthenticated,
  deleteFiles,
  getFileUrl,
  logger,
  NotFoundError,
  uploadFile,
  uploadHandler,
  validateRequest,
  paginate,
} from "@sideshop/common";
import express, { NextFunction, Request, Response } from "express";
import {
  CreateProductDto,
  createProductSchema,
} from "../dtos/create-product-dto.js";
import { Brand } from "../entities/brand.js";
import { Category } from "../entities/category.js";
import { Product } from "../entities/product.js";

const productRouter = express.Router();

const productExists = async (
  req: Request & { existingProduct?: Product },
  _: Response,
  next: NextFunction
) => {
  const id = +req.params.id;

  const product = await Product.findOneBy({ id });

  if (!product) {
    throw new NotFoundError();
  }

  req.existingProduct = product;

  return next();
};

const productNumberPropsMapper = (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  req.body = {
    ...req.body,
    price: +req.body.price,
    quantityInStock: +req.body.quantityInStock,
  };

  next();
};

const updateProductPhotos = (
  req: CustomRequest,
  _: Response,
  next: NextFunction
) => {
  if (req.query.updatePhotos) {
    logger.info("update photos set to true");
    req.updatePhotos = true;
  } else {
    logger.info("photos will not be updated");
  }

  return next();
};

type CustomRequest = Request & {
  existingProduct?: Product;
  updatePhotos?: boolean;
};

productRouter.post(
  "/",
  isAuthenticated,
  uploadHandler().array("photos", 5),
  productNumberPropsMapper,
  validateRequest<CreateProductDto>(createProductSchema),
  async (req: Request, res: Response) => {
    const files = (req.files! as Express.Multer.File[]).map((file) => {
      file.originalname = `${crypto.randomUUID()}.${file.originalname
        .split(".")
        .pop()}`;

      return file;
    });
    try {
      await Promise.all([...files].map((file) => uploadFile(file)));
      logger.info("successfully saved photos in s3");

      const body = req.body as CreateProductDto;

      const product = new Product();
      product.name = body.name;
      product.price = body.price;
      product.quantityInStock = body.quantityInStock;
      product.description = body.description;
      product.createdBy = req.user!.id;
      product.photos = files.map((file) => file.originalname);

      const category = await Category.findOneBy({
        name: body.categoryName.toLowerCase().trim(),
      });
      if (category) {
        logger.info("category found from body");
        product.category = category;
      } else {
        product.category = new Category();
        logger.info("category not from body");
        product.category.name = body.categoryName;
        product.category.createdBy = req.user!.id;
      }

      const brand = await Brand.findOneBy({
        name: body.brandName.toLowerCase().trim(),
      });
      if (brand) {
        logger.info("brand found from body");
        product.brand = brand;
      } else {
        product.brand = new Brand();
        logger.info("brand not found from body");
        product.brand.name = body.brandName;
        product.brand.createdBy = req.user!.id;
      }

      await product.save();
      logger.info("successfully saved product ,returning response");

      product.photos = await Promise.all(
        product.photos.map((fileName) => getFileUrl(fileName))
      );

      res.send(product);
    } catch (error) {
      console.log(error);

      logger.error(JSON.stringify(error));
      throw error;
    }
  }
);

productRouter.get(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    let {
      searchKeyword = "",
      pageNumber = 1,
      pageSize = 10,
      categoryId,
      brandId,
    } = req.query;
    pageNumber = +pageNumber;
    pageSize = +pageSize;

    let initialQuery = Product.createQueryBuilder("product").where(
      "product.name ILIKE :search",
      { search: `%${searchKeyword}%` }
    );

    if (categoryId) {
      initialQuery = initialQuery.andWhere("product.categoryId = :categoryId", {
        search: categoryId,
      });
    }

    if (brandId) {
      initialQuery = initialQuery.andWhere("product.brandId = :brandId", {
        search: brandId,
      });
    }

    let {
      result: { totalCount, totalPages, items: products },
    } = await paginate<Product>(
      Product,
      { pageNumber, pageSize },
      initialQuery
    );

    const items = products.map(
      (p) =>
        new Promise(async (resolve) => {
          p.photos = p.photos.length > 0 ? [await getFileUrl(p.photos[0])] : [];

          resolve(p);
        })
    );

    res.send({
      pageNumber,
      pageSize,
      totalCount,
      totalPages,
      products: await Promise.all(items),
    });
  }
);

productRouter.get(
  "/:id",
  productExists,
  async (req: CustomRequest, res: Response) => {
    const product = req.existingProduct!;

    product.photos = await Promise.all(
      product.photos.map((fileName) => getFileUrl(fileName))
    );

    res.send(product);
  }
);

productRouter.put(
  "/:id",
  isAuthenticated,
  productExists,
  uploadHandler().array("photos", 5),
  updateProductPhotos,
  productNumberPropsMapper,
  validateRequest<CreateProductDto>(createProductSchema),
  async (req: CustomRequest, res: Response) => {
    const product = req.existingProduct!;

    try {
      if (req.updatePhotos) {
        logger.info("photos will be updated");
        if (req.files!.length) {
          logger.info("new photos are uploaded");
          const files = (req.files as AppFile[]).map((file) => {
            file.originalname = `${crypto.randomUUID()}.${file.originalname
              .split(".")
              .pop()}`;

            return file;
          });
          await Promise.all([...files].map((file) => uploadFile(file)));
          logger.info("successfully saved photos in s3");
          await deleteFiles(product.photos);
          logger.info("successfully deleted old photos of product");

          product.photos = files.map((file) => file.originalname);
        }
      }

      const body = req.body as CreateProductDto;

      product.name = body.name;
      product.price = body.price;
      product.quantityInStock = body.quantityInStock;
      product.description = body.description;
      product.updatedBy = req.user!.id;

      const category = await Category.findOneBy({
        name: body.categoryName.toLowerCase().trim(),
      });
      if (category) {
        logger.info("category found from body");
        product.category = category;
      } else {
        product.category = new Category();
        logger.info("category not from body");
        product.category.name = body.categoryName;
        product.category.createdBy = req.user!.id;
      }

      const brand = await Brand.findOneBy({
        name: body.brandName.toLowerCase().trim(),
      });
      if (brand) {
        logger.info("brand found from body");
        product.brand = brand;
      } else {
        product.brand = new Brand();
        logger.info("brand not found from body");
        product.brand.name = body.brandName;
        product.brand.createdBy = req.user!.id;
      }

      await product.save();
      logger.info("successfully updated product ,returning response");

      product.photos = await Promise.all(
        product.photos.map((fileName) => getFileUrl(fileName))
      );

      res.send(product);
    } catch (error) {
      logger.error(JSON.stringify(error));
      throw error;
    }
  }
);

productRouter.delete(
  "/:id",
  isAuthenticated,
  productExists,
  async (req: CustomRequest, res: Response) => {
    const product = req.existingProduct!;
    await Product.softRemove(product);
    await deleteFiles(product.photos);

    product.deletedBy = req.user!.id;

    res.send(product);
  }
);

export default productRouter;
