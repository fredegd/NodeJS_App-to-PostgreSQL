const express = require("express");

const {
    getOrders,
    getOrder,
    createOrder,
    updateOrder,
    deleteOrder,
  } = require("../controllers/orders");


  const ordersRouter = express.Router();

ordersRouter.get("/", getOrders);

ordersRouter.get("/:id", getOrder);

ordersRouter.post("/", createOrder);

ordersRouter.put("/:id", updateOrder);

ordersRouter.delete("/:id", deleteOrder);

module.exports = ordersRouter;
