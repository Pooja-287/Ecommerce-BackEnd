const Product = require('../model/Product');

// Fetch all products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find(); // Fetch all products from the database
    res.status(200).json(products); // Send the products as a JSON response
  } catch (err) {
    res.status(500).json({ error: err.message }); // Handle errors gracefully
  }
};

// Add a new product
exports.addProduct = async (req, res) => {
  const { name, description, price, category, image } = req.body; // Ensure the data is passed correctly

  try {
    // Create a new product object and save it to the database
    const product = new Product({ name, description, price, category, image });
    const savedProduct = await product.save();
    
    // Respond with a success message and the saved product data
    res.status(201).json({ message: 'Product added successfully', product: savedProduct });
  } catch (err) {
    res.status(400).json({ error: err.message }); // Handle errors if product cannot be added
  }
};

// Fetch products by category
exports.getProductsByCategory = async (req, res) => {
  try {
    const category = req.params.category; // Get the category from the URL parameter
    const products = await Product.find({ category: category }); // Query the database to find products by category
    res.status(200).json(products); // Send the products as a JSON response
  } catch (err) {
    res.status(500).json({ error: err.message }); // Handle errors gracefully
  }
};
