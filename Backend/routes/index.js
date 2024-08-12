const express = require('express');
const router = express.Router();

// User authentication
const userSignUp = require('../controllers/user/userSignUp');
const userSignIn = require('../controllers/user/userSignin');
const userDetails = require('../controllers/user/userDetails');
const authToken = require('../middleware/authToken');
const userLogout = require('../controllers/user/userLogout');
const allUsers = require('../controllers/user/allUsers');
const updateUser = require('../controllers/user/updateUser');
const uploadProduct = require('../controllers/product/uploadProduct');
const getProduct = require('../controllers/product/getProduct');
const updateProduct = require('../controllers/product/updateProduct');
const getProductCategory = require('../controllers/product/getProductSingleCategory');
const getCategoryWiseProduct = require('../controllers/product/getCategoryWiseProduct');
const getProductDetails = require('../controllers/product/getProductDetails');
const addToCart = require('../controllers/user/addToCart');
const countAddToCart = require('../controllers/user/CountAddToCart');
const cartView = require('../controllers/user/cartView');
const updateCart = require('../controllers/user/updateCart');
const deleteAddToCart = require('../controllers/user/deleteAddToCart');
const searchProduct = require('../controllers/product/searchProduct');
const filterProduct = require('../controllers/product/filterProduct');
const paymentController = require('../controllers/order/paymentController');
const webhooks = require('../controllers/order/webhook');
const orderController = require('../controllers/order/order.controller');

// User Auth
router.post("/signup",userSignUp)
router.post("/signin",userSignIn)
router.get("/user-details",authToken,userDetails)
router.get("/userLogout",userLogout)

// Admin Panel
router.get("/all-user",authToken,allUsers)
router.post("/update-user",authToken,updateUser)

// product
router.post('/upload-product',authToken,uploadProduct)
router.get('/get-product',getProduct)
router.post("/update-product",authToken,updateProduct)
router.get("/get-productCategory",getProductCategory);
router.post("/category-product",getCategoryWiseProduct);
router.post("/product-details",getProductDetails);
router.get("/search",searchProduct);
router.post("/filter-product",filterProduct);

// User add to cart
router.post("/addtocart",authToken, addToCart)
router.get("/countAddToCart",authToken,countAddToCart)
router.get("/viewCart",authToken,cartView)
router.post("/update-cart",authToken,updateCart)
router.post("/delete-cart-product",authToken,deleteAddToCart)

// Payment and order
router.post('/checkout', authToken,paymentController);
router.post('/webhook',webhooks) //api/webhook
router.get("/order-list" , authToken,orderController);


module.exports = router;