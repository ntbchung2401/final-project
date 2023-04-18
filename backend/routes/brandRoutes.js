import express from "express";
import Brand from "../models/brandModel.js";
import Product from "../models/productModel.js";
import expressAsyncHandler from "express-async-handler";
import { isAdmin, isAuth } from "../utils.js";

const brandRouter = express.Router();

brandRouter.get(
  "/",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const brands = await Brand.find({});
    res.send(brands);
  })
);
brandRouter.post(
  "/create",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const newBrand = new Brand({
      brand: req.body.brand,
      description: req.body.description,
    });
    const brand = await newBrand.save();
    res.send({
      _id: brand._id,
      brand: brand.brand,
      description: brand.description,
    });
  })
);

brandRouter.delete(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const products = await Product.find({ brand: req.params.id });
    if (products.length === 0) {
      const brand = await Brand.findById(req.params.id);
      if (brand) {
        await brand.deleteOne();
        res.send({ message: "Brand Deleted" });
      } else {
        res.status(404).send({ message: "Brand Not Found" });
      }
    } else {
      res.status(404).send({ message: "This brand can be deleted" });
    }
  })
);

brandRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const brand = await Brand.findById(req.params.id);
    if (brand) {
      res.send(brand);
    } else {
      res.status(404).send({ message: "Brand Not Found" });
    }
  })
);

brandRouter.put(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const brand = await Brand.findById(req.params.id);
    if (brand) {
      brand.brand = req.body.brand || brand.brand;
      brand.description = req.body.description || brand.description;
      const updatedBrand = await brand.save();
      res.send({ message: "Brand Updated", brand: updatedBrand });
    } else {
      res.status(404).send({ message: "Brand Not Found" });
    }
  })
);

export default brandRouter;
