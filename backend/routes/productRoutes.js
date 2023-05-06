import express from "express";
import expressAsyncHandler from "express-async-handler";
import Product from "../models/productModel.js";
import Brand from "../models/brandModel.js";
import Category from "../models/categoryModel.js";
import { isAuth, isAdmin } from "../utils.js";

const productRouter = express.Router();

productRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const products = await Product.find({})
      .sort({ createdAt: -1 })
      .populate({ path: "brand", model: Brand })
      .populate({ path: "category", model: Category });

    res.send(products);
  })
);

productRouter.post(
  "/",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    // Create a new Product instance with the provided data
    const newProduct = new Product({
      name: req.body.name,
      display: req.body.display,
      image: req.body.image,
      price: req.body.price,
      category: req.body.category,
      brand: req.body.brand,
      counInStock: 0,
      rating: 0,
      numReviews: 0,
      description: req.body.description,
    });

    // Save the new product in the database
    const product = await newProduct.save();

    // Send the response back to the client
    res.status(201).send({
      _id: product._id,
      name: product.name,
      display: product.display,
      image: product.image,
      price: product.price,
      category: product.category,
      brand: product.brand,
      counInStock: product.counInStock,
      rating: product.rating,
      numReviews: product.numReviews,
      description: product.description,
    });
  })
);

productRouter.put(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (product) {
      product.name = req.body.name;
      product.display = req.body.display;
      product.price = req.body.price;
      product.image = req.body.image;
      product.category = req.body.category;
      product.brand = req.body.brand;
      product.counInStock = req.body.counInStock;
      product.description = req.body.description;
      await product.save();
      res.send({ message: "Product Created" });
    } else {
      res.status(404).send({ message: "Product Not Found" });
    }
  })
);
productRouter.delete(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    // Find the product by ID
    const product = await Product.findById(req.params.id);

    if (product) {
      // Delete the product from the database
      await product.deleteOne();

      // Send the response back to the client
      res.send({ message: "Product Deleted" });
    } else {
      // If the product is not found, send a 404 status code and an error message
      res.status(404).send({ message: "Product Not Found" });
    }
  })
);
const PAGE_SIZE = 10;
productRouter.get(
  "/admin",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const { query } = req;
    const page = query.page || 1;
    const pageSize = query.pageSize || PAGE_SIZE;

    const products = await Product.find()
      .skip(pageSize * (page - 1))
      .limit(pageSize)
      .populate("brand")
      .populate({
        path: "category",
        select: "name", // Only select the 'name' field of the category
      });
    const countProducts = await Product.countDocuments();
    res.send({
      products,
      countProducts,
      page,
      pages: Math.ceil(countProducts / pageSize),
    });
  })
);
productRouter.post(
  "/:id/reviews",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (product) {
      if (product.reviews.find((x) => x.name === req.user.name)) {
        return res
          .status(400)
          .send({ message: "You already submitted a review" });
      }

      const review = {
        name: req.user.name,
        rating: Number(req.body.rating),
        comment: req.body.comment,
      };
      product.reviews.push(review);
      product.numReviews = product.reviews.length;
      product.rating =
        product.reviews.reduce((a, c) => c.rating + a, 0) /
        product.reviews.length;
      const updatedProduct = await product.save();
      res.status(201).send({
        message: "Review Created",
        review: updatedProduct.reviews[updatedProduct.reviews.length - 1],
        numReviews: product.numReviews,
        rating: product.rating,
      });
    } else {
      res.status(404).send({ message: "Product Not Found" });
    }
  })
);

productRouter.get(
  "/search",
  expressAsyncHandler(async (req, res) => {
    const pageSize = req.query.pageSize || PAGE_SIZE;
    const page = req.query.page || 1;
    const category = req.query.category || "";
    const price = req.query.price || "";
    const rating = req.query.rating || "";
    const order = req.query.order || "";
    const searchQuery = req.query.query || "";

    const queryFilter =
      searchQuery && searchQuery !== "all"
        ? {
            name: {
              $regex: searchQuery,
              $options: "i",
            },
          }
        : {};
    const categoryFilter =
      category && category !== "all" ? { category: { $in: [category] } } : {};
    const ratingFilter =
      rating && rating !== "all"
        ? {
            rating: {
              $gte: Number(rating),
            },
          }
        : {};
    const priceFilter =
      price && price !== "all"
        ? {
            // 1-50
            price: {
              $gte: Number(price.split("-")[0]),
              $lte: Number(price.split("-")[1]),
            },
          }
        : {};
    const sortOrder =
      order === "featured"
        ? { featured: -1 }
        : order === "lowest"
        ? { price: 1 }
        : order === "highest"
        ? { price: -1 }
        : order === "toprated"
        ? { rating: -1 }
        : order === "newest"
        ? { createdAt: -1 }
        : { _id: -1 };

    const products = await Product.find({
      ...queryFilter,
      ...categoryFilter,
      ...priceFilter,
      ...ratingFilter,
    })
      .sort(sortOrder)
      .skip(pageSize * (page - 1))
      .limit(pageSize);

    const countProducts = await Product.countDocuments({
      ...queryFilter,
      ...categoryFilter,
      ...priceFilter,
      ...ratingFilter,
    });
    res.send({
      products,
      countProducts,
      page,
      pages: Math.ceil(countProducts / pageSize),
    });
  })
);
productRouter.get(
  "/categories",
  expressAsyncHandler(async (req, res) => {
    const categories = await Category.find({}, "name");
    res.send(categories);
  })
);

productRouter.get("/display/:display", async (req, res) => {
  const product = await Product.findOne({ display: req.params.display })
    .populate({ path: "brand", model: Brand })
    .populate({ path: "category", model: Category });
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "Product Not Found" });
  }
});

productRouter.get("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id)
    .populate({ path: "brand", model: Brand })
    .populate({ path: "category", model: Category });
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "Product Not Found" });
  }
});

export default productRouter;
