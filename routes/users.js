const express = require("express");

const {
    getUsers,
  } = require("../controllers/users");


  const usersRouter = express.Router();

usersRouter.get("/", getUsers);

// usersRouter.get("/:id", getUser);

// usersRouter.post("/", createUser);

// usersRouter.put("/:id", updateUser);

// usersRouter.delete("/:id", deleteUser);

module.exports = usersRouter;
