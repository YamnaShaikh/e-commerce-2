import express from 'express'
import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js';
const router =express.Router()
import {
    getProducts,
    getProductById,
    addProduct,
    getTopProducts,
    createProductReview,
    updateProduct,
    deleteProduct
} from '../controllers/productController.js'
import { protect, admin } from "../middleware/authMiddleware.js";


// @desc Fetch all products
// @rout GET/api/products
// @acess Public

// router.route is a method that takes in a path and a callback function. The callback function is the actual route handler. The route handler is the function that is called when a request is made to the path. The route handler is responsible for handling the request and sending the response.
router.route("/").get(getProducts).post(protect, admin, addProduct);
router.route("/:id/reviews").post(protect, createProductReview);
router.get("/top", getTopProducts);

router
  .route("/:id")
  .get(getProductById)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct);

// another simplified method to get all products
// router.get("/", getProducts);

// method to get a single product
// router.get("/:id", getProductById);




// router.get('/', asyncHandler(async(req, res) => {
//     const products = await Product.find({})
//     res.send(products);
//  })
// )

// router.get('/:id', asyncHandler(async(req, res) =>{
//     const product = await Product.findById(req.params.id)
//     if(product){
//     res.json(product);
//     }
//     else{
//         res.status(404)
//         throw new Error('Product not Found');
//     }
// })
// )
export default router