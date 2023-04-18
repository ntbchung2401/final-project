import express from "express";
import Category from "../models/categoryModel.js";
import Product from "../models/productModel.js";
import expressAsyncHandler from "express-async-handler";
import { isAdmin, isAuth } from "../utils.js";

const categoryRouter = express.Router();

categoryRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const categories = await Category.find({});
    res.send(categories);
  })
);
categoryRouter.post(
  "/create",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const newCategory = new Category({
      name: req.body.name,
      description: req.body.description,
    });
    const category = await newCategory.save();
    res.send({
      _id: category._id,
      name: category.name,
      description: category.description,
    });
  })
);

categoryRouter.delete(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const products = await Product.find({ category: req.params.id });
    if (products.length === 0) {
      const category = await Category.findById(req.params.id);
      if (category) {
        await category.deleteOne();
        res.send({ message: "Category Deleted" });
      } else {
        res.status(404).send({ message: "Category Not Found" });
      }
    } else {
      res.status(404).send({ message: "This category can be deleted" });
    }
  })
);

categoryRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const category = await Category.findById(req.params.id);
    if (category) {
      res.send(category);
    } else {
      res.status(404).send({ message: "Category Not Found" });
    }
  })
);

categoryRouter.put(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const category = await Category.findById(req.params.id);
    if (category) {
      category.name = req.body.name || category.name;
      category.description = req.body.description || category.description;
      const updatedCategory = await category.save();
      res.send({ message: "Category Updated", category: updatedCategory });
    } else {
      res.status(404).send({ message: "Category Not Found" });
    }
  })
);

export default categoryRouter;
