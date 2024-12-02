const express = require('express');
const Order = require('../models/orderModel');

const router = express.Router();

// Place an order
router.post('/', async (req, res) => {
    try {
        const order = new Order(req.body);
        await order.save();
        res.status(201).send(order);
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
});

// Get order details
router.get('/:id', async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) return res.status(404).send({ error: 'Order not found' });
        res.status(200).send(order);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

module.exports = router;
