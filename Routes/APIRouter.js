const express = require('express');
const productController = require('../controllers/productController');
const orderController = require('../controllers/orderController'); // Import the orderController
const userController = require('../controllers/userController');
const paymentController = require('../controllers/paymentController');

const router = express.Router();

// Product Routes
router.get('/api/products', productController.getProducts);   // Get all products
router.get('/api/products', productController.getProducts);
router.get('/api/products/:id', productController.addProduct);   // Add a new product
router.get('/products/category/:category', productController.getProductsByCategory); // Fetch products by category

// Order Routes
router.get('/orders/:userId', orderController.getOrders); // Get orders for a user
router.post('/orders', orderController.createOrder); // Create a new order
router.get('/orders/:id/details', orderController.getOrderDetails); // Get details of a specific order
router.post('/order-now', orderController.handleOrderNow); // Place an order immediately

// User Routes
router.post('/api/register', userController.registerUser);    // User registration
router.post('/api/login', userController.loginUser);          // User login

// Payment Routes
router.post('/api/verify-payment', paymentController.verifyPayment); // Verify payment signature

router.delete('/api/delete-user', userController.deleteUserByEmail); // Delete user by email

module.exports = router;
