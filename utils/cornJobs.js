const cron = require('node-cron');
const Order = require('../models/orderModel');

const updateOrderStatus = () => {
    cron.schedule('*/5 * * * *', async () => { // Runs every 5 minutes
        try {
            const orders = await Order.find({ status: { $ne: 'Delivered' } });
            for (let order of orders) {
                if (order.status === 'Preparing') order.status = 'Out for Delivery';
                else if (order.status === 'Out for Delivery') order.status = 'Delivered';
                await order.save();
            }
            console.log('Order statuses updated');
        } catch (error) {
            console.error('Error updating order statuses:', error.message);
        }
    });
};

module.exports = updateOrderStatus;
