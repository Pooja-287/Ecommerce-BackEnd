const Order = require('../model/Order');
const Product = require('../model/Product'); // Import the Product model

// Fetch orders for a user
exports.getOrders = async (req, res) => {
  try {
    const { userId } = req.params; // Destructure userId from the route params
    console.log('Fetching orders for user:', userId); // Log the userId

    // Find orders based on the userId
    const orders = await Order.find({ userId })
      .populate('orderItems.productId'); // Populate the productId in orderItems

    if (orders.length === 0) {
      console.log('No orders found for this user.');
      return res.status(200).json({ message: 'No orders found' });
    }

    console.log('Orders fetched:', orders); // Log the fetched orders
    res.status(200).json(orders);
  } catch (err) {
    console.error('Error fetching orders:', err); // Log any errors
    res.status(500).json({ error: err.message });
  }
};

// Create a new order
exports.createOrder = async (req, res) => {
  const { userId, orderItems, totalPrice } = req.body;

  try {
    const order = new Order({ userId, orderItems, totalPrice });
    const savedOrder = await order.save();
    res.status(201).json({ message: 'Order placed successfully', order: savedOrder });
  } catch (err) {
    console.error('Error placing order:', err); // Log errors while placing the order
    res.status(400).json({ error: err.message });
  }
};

// Order details endpoint
exports.getOrderDetails = async (req, res) => {
  try {
    const { id } = req.params; // Extract order ID from URL
    const order = await Order.findById(id).populate('orderItems.productId'); // Populate productId in orderItems

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json(order);
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ error: error.message });
  }
};

// Handle order immediately
exports.handleOrderNow = async (req, res) => {
  const { userId, productId, quantity } = req.body;

  try {
    // Fetch the product price from the database
    const product = await Product.findById(productId); // Ensure the Product model is available

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Calculate the total price
    const calculatedTotalPrice = product.price * quantity;

    // Create the order
    const order = new Order({
      userId,
      orderItems: [{ productId, quantity }],
      totalPrice: calculatedTotalPrice, // Now using the calculated total price
    });

    const savedOrder = await order.save();
    res.status(201).json({ message: 'Order placed successfully', order: savedOrder });
  } catch (err) {
    console.error('Error placing order:', err);
    res.status(400).json({ error: err.message });
  }
};
