import { useState, useEffect } from "react";
import axios from "axios";
import Usercard from "./Usercard"

export default function AllUsers() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/users")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((err) => console.error(err, "url not found"));
  }, []);

  return (
    <>
      {users.map((user) => {
        return (
          <Usercard user={user} key={user.id}/>
        );
      })}
    </>
  );
}
