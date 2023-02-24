import express from "express";
import data from "./data.js";
//test
const app = express();
app.get("/api/products", (req, res) => {
  res.send(data.products);
});
app.get("/api/products/display/:display", (req, res) => {
  const product = data.products.find((x) => x.display === req.params.display);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "Product Not Found" });
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`serve at http://localhost:${port}`);
});
