const express = require("express");

const {
  getUsers,
  getUser,
  getUserOrders,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/users");

const usersRouter = express.Router();

usersRouter.get("/", getUsers);

usersRouter.get("/:id", getUser);

usersRouter.get("/:id/orders", getUserOrders);

usersRouter.post("/", createUser);

usersRouter.put("/:id", updateUser);

usersRouter.delete("/:id", deleteUser);

module.exports = usersRouter;
