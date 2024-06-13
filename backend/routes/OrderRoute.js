const express = require('express')
const router = express.Router();
const OrderController = require('../controllers/OrderController')

router.route('/order')
.post(OrderController.saveOrder)

router.route('/getSelectOrder')
.post(OrderController.getSelectOrder)

router.route('/getOrder')
.get(OrderController.getOrder)

router.route('/deleteOrder/:id')
.delete(OrderController.deleteOrder)

module.exports =router;