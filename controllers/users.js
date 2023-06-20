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
  
module.exports = { getUsers };
