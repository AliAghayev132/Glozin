const express = require("express");
const router = express.Router();
const productRoutes = require("./features/productRoutes");


router.use("/product", productRoutes);

module.exports = router;
