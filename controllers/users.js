const pool = require("../db");

const getUsers = async (req, res) => {
    try {
      const { rows } = await pool.query("SELECT * FROM users;");
      res.json(rows);
    } catch (error) {
      console.error(error);
      res.status(500).send("Something went wrong");
    }
  };
  


const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { rows } = await pool.query("SELECT * FROM users WHERE id=$1;", [id]);

    res.status(500).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong");
  }
};


const createUser = async (req, res) => {
  try {
    const { first_name, last_name, age } = req.body;
    const { rows } = await pool.query(
      "INSERT INTO users (first_name, last_name, age) VALUES ($1,$2, $3);",
      [first_name, last_name, age]
    );
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong");
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, age } = req.body;

    const { rows } = await pool.query(
      "UPDATE users SET first_name=$1, last_name=$2, age=$3 WHERE id=$4 RETURNING *;",
      [firstName, lastName, age, id]
    );

    res.status(200).json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong");
  }
};


const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query("DELETE FROM users where id=$1;", [id]);
    if (result.rowCount > 0) {
      res.status(200).json("success");
    } else {
      {
        res.status(400).json("not found");
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong");
  }
};


  module.exports = { getUsers, getUser, createUser, updateUser, deleteUser };
