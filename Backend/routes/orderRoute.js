import express from "express";
import {
  placeOrder,
  placeOrderBkash,
  placeOrderNagad,
  allOrders,
  userOrders,
  updateStatus,
} from "../controllers/orderController.js";
import adminAuth from "../middleware/adminAuth.js"
import authUser from "../middleware/CartAuth.js";

const orderRouter = express.Router();

// Admin features
orderRouter.get('/orderlist', adminAuth, allOrders)
orderRouter.patch('/status', adminAuth, updateStatus)

// Payment features
orderRouter.post('/place-order', authUser, placeOrder)
orderRouter.post('/place-order/bkash', authUser, placeOrderBkash)
orderRouter.post('/place-order/nagad', authUser, placeOrderNagad)

//user features
orderRouter.get('/user-orders',authUser, userOrders)


export default orderRouter;
