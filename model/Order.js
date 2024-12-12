const mongoose = require('mongoose');

// Define the order schema
const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to User model
    required: true
  },
  orderItems: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', // Reference to Product model
        required: true
      },
      quantity: {
        type: Number,
        required: true
      },
    },
  ],
  totalPrice: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    default: 'Pending' // Default order status is 'Pending'
  },
});

// Create the Order model
const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
