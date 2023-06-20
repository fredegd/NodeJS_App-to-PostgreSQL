const pool = require("../db");

const getOrders = async (req, res) => {
    try {
      const { rows } = await pool.query("SELECT * FROM orders;");
      res.json(rows);
    } catch (error) {
      console.error(error);
      res.status(500).send("Something went wrong");
    }
  };
  


const getOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { rows } = await pool.query("SELECT * FROM orders WHERE id=$1;", [id]);

    res.status(500).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong");
  }
};


const createOrder = async (req, res) => {
  try {
    const { price, date, user_id } = req.body;
    const { rows } = await pool.query(
      "INSERT INTO orders (price, date, user_id) VALUES ($1,$2, $3);",
      [price, date, user_id]
    );
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong");
  }
};

const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { price,date, user_id} = req.body;

    const { rows } = await pool.query(
      "UPDATE orders SET price=$1, date=$2, user_id=$3 WHERE id=$4 RETURNING *;",
      [price,date, user_id, id]
    );

    res.status(200).json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong");
  }
};


const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query("DELETE FROM users where id=$1;", [id]);
    if (result.rowCount > 0) {
      res.status(200).json("User Successfully deleted");
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


  module.exports = { getOrders, getOrder, createOrder, updateOrder, deleteOrder };
