const Menu = require('../models/menuModel');

exports.addMenuItem = async (req, res) => {
    try {
        const newItem = new Menu(req.body);
        await newItem.save();
        res.status(201).json(newItem);
    } catch (error) {
        res.status(500).json({ error: 'Failed to add menu item' });
    }
};

exports.getMenu = async (req, res) => {
    try {
        const menu = await Menu.find();
        res.status(200).json(menu);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve menu' });
    }
};
