const express = require('express');
const Menu = require('../models/menuModel');

const router = express.Router();

// Add a menu item
router.post('/', async (req, res) => {
    try {
        const menuItem = new Menu(req.body);
        await menuItem.save();
        res.status(201).send(menuItem);
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
});

// Get all menu items
router.get('/', async (req, res) => {
    try {
        const menuItems = await Menu.find();
        res.status(200).send(menuItems);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

module.exports = router;
