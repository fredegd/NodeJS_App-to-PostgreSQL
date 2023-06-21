const express = require("express");
const{body, validationResult, query}= require("express-validator")


const {
  getUsers,
  getUser,
  getUserOrders,
  createUser,
  updateUser,
  checkInactive,
  deleteUser,
} = require("../controllers/users");

const usersRouter = express.Router();

usersRouter.get("/", getUsers);

usersRouter.get("/:id", query('id').exists(), getUser);

usersRouter.get("/:id/orders", getUserOrders);

usersRouter.post("/", body('first_name').isString().trim().notEmpty(),
                      body('last_name').isString().notEmpty().trim(),
                      body('age').notEmpty(),
                      createUser);

usersRouter.put("/:id", updateUser);

usersRouter.put("/:id/check-inactive", checkInactive);

usersRouter.delete("/:id", deleteUser);

module.exports = usersRouter;
