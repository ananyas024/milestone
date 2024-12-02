const Order = require('../models/orderModel');

exports.placeOrder = async (req, res) => {
    try {
        const order = new Order({ items: req.body.items });
        await order.save();
        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ error: 'Failed to place order' });
    }
};

exports.getOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('items');
        if (!order) return res.status(404).json({ error: 'Order not found' });
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve order' });
    }
};
