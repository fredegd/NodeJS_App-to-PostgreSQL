const express = require("express");

const {
    getOrders,
    getUser,
    createUser,
    updateUser,
    deleteUser,
  } = require("../controllers/orders");


  const ordersRouter = express.Router();

ordersRouter.get("/", getOrders);

ordersRouter.get("/:id", getOrders);

ordersRouter.post("/", createOrder);

ordersRouter.put("/:id", updateOrder);

ordersRouter.delete("/:id", deleteOrder);

module.exports = ordersRouter;
