const pool = require("../db");

const{ validationResult}= require("express-validator")


const getUsers = async (req, res) => {
  const {orderBy} = req.query
  console.log(orderBy, typeof orderBy)
    try {
      const { rows } = await pool.query(`SELECT * FROM users ORDER BY $1 DESC;`,[orderBy]);
      res.json(rows);
    } catch (error) {
      console.error(error);
      res.status(500).send("Something went wrong");
    }
  };
  


const getUser = async (req, res) => {
  try {
    const errors = validationResult(req)

    const { id } = req.params;
    const { rows } = await pool.query("SELECT * FROM users WHERE id=$1;", [id]);

    res.status(500).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong");
  }
};



const getUserOrders = async (req, res) => {
  try {
    const { id } = req.params;
    const { rows } = await pool.query(`SELECT * 
    FROM orders
    INNER JOIN users
    ON orders.user_id = users.id
    WHERE users.id = $1;`, [id]);

    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong");
  }
};


const createUser = async (req, res) => {
  try {
    const errors = validationResult(req)
 
    if(!errors.isEmpty()){
      return res.send(errors).status(400);
    }else{
      const { first_name, last_name, age } = req.body;
      const { rows } = await pool.query(
        "INSERT INTO users (first_name, last_name, age) VALUES ($1,$2, $3);",
        [first_name, last_name, age]
      );
      res.status(200).json({first_name, last_name, age});
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong, please read the instructions");
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { first_name, last_name, age } = req.body;

    const { rows } = await pool.query(
      "UPDATE users SET first_name=$1, last_name=$2, age=$3 WHERE id=$4 RETURNING *;",
      [first_name, last_name, age, id]
    );

    res.status(200).json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong");
  }
};


const checkInactive = async (req, res) => {
  try {
    const { id } = req.params;
    // Check if the user exists
    const userExists = await pool.query(
      "SELECT * FROM users WHERE id = $1;",
      [id]
    );
    if(userExists.rowCount!==0){
      
    // Check if the user has any orders
    const orderQuery = await pool.query(
      "SELECT * FROM orders WHERE user_id = $1;",
      [id]
    );
    const orderCount = +orderQuery.rowCount;
      console.log(orderCount)
    if (orderCount === 0) {
      // If the user has no orders, set active to false
      const { rows } = await pool.query(
        "UPDATE users SET active = $1 WHERE id = $2 RETURNING first_name, active;",
        [false, id]
      );
      res.status(200).json(rows);
    } else {
      // If the user has orders, return their current status
      const { rows } = await pool.query("SELECT first_name, active FROM users WHERE id = $1;", [
        id,
      ]);
      res.status(200).json(rows);
    }

    }else{
      res.status(400).send("User does´t exist");
      console.log("noway")
    }
   
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


  module.exports = { getUsers, getUser,getUserOrders, createUser, updateUser, checkInactive, deleteUser };
