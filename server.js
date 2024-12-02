const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Initialize app
const app = express();

// Middleware
app.use(bodyParser.json());

// MongoDB connection
const DB_URI = 'mongodb://localhost:27017/food_delivery_backend'; // Replace with your MongoDB URI
mongoose.connect(DB_URI)
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log('Database connection error:', err));

// Define a simple schema and model
const OrderSchema = new mongoose.Schema({
  name: String,
  status: String
});
const Order = mongoose.model('Order', OrderSchema);

// Routes
app.get('/orders', async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    res.status(400).send('Error fetching orders');
  }
});

app.post('/orders', async (req, res) => {
  const { name, status } = req.body;
  const newOrder = new Order({ name, status });
  try {
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(400).send('Error saving order');
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
