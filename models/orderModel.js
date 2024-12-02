const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Menu' }],
    status: { type: String, enum: ['Preparing', 'Out for Delivery', 'Delivered'], default: 'Preparing' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
