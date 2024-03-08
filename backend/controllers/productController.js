import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";
//@desc fetch all products
//@route Get /api/products

const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 10;

  const page = Number(req.query.pageNumber) || 1;
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  const count = await Product.countDocuments({ ...keyword });
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

// const getProducts = asyncHandler(async (req, res) => {
//     const products = await Product.find({});
//     res.json(products);
// })

// @desc Add a new Product
// @route POST /api/products
// @access Public

const addProduct = asyncHandler(async (req, res) => {
  const {
    name,
    image,
    brand,
    category,
    description,
    prices,
    countInStock,
    rating,
    numReviews,
  } = req.body;
  const product = await Product.create({
    name,
    image,
    brand,
    category,
    description,
    prices,
    countInStock,
    rating,
    numReviews,
  });
  if (product) {
    res.status(201).json({
      _id: product._id,
      name: product.name,
      image: product.image,
      brand: product.brand,
      category: product.category,
      description: product.description,
      price: product.prices,
      countInStock: product.countInStock,
      rating: product.rating,
      numReviews: product.numReviews,
    });
  } else {
    res.status(400);
    throw new Error("Invalid product data");
  }
});

// @desc Fetch single product
// @route Get /api/product

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not Found");
  }
});

// @desc    Delete a Product
// @route   DELETE /api/products/:id
// @access  Private/Admin

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.remove();
    res.json({ message: "Product removed" });
  } else {
    res.status(404);
    throw new Error("product not found");
  }
});

// @desc    Update a Product
// @route   PUT /api/products/:id
// @access  Private/Admin

const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name || product.name;
    product.price = price || product.price;
    product.description = description || product.description;
    product.image = image || product.image;
    product.brand = brand || product.brand;
    product.category = category || product.category;
    product.countInStock = countInStock || product.countInStock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error({ message: "Product not found" });
  }
});

// @desc    Create a new Review
// @route   POST /api/products/:id/reviews
// @access  Private

const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Product already reviewed");
    } else {
      const review = {
        name: req.user.name,
        rating: Number(rating),
        comment,
        user: req.user._id,
      };
      product.reviews.push(review);

      product.numReviews = product.reviews.length;

      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length;

      await product.save();
      res.status(200).json({ message: "Review added" });
    }
  } else {
    res.status(404);
    throw new Error({ message: "Product not found" });
  }
});

// @desc    GET top rated products
// @route   POST /api/products/top
// @access  Public

const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3);

  res.json(products);
});

export {
  getProducts,
  getProductById,
  addProduct,
  getTopProducts,
  updateProduct,
  deleteProduct,
  createProductReview,
};
