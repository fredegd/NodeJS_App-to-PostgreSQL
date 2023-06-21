import { useState, useEffect, useParams } from 'react'
import axios from "axios";


export default function Userdetails() {

    const [user, setUser] = useState();
    const { id } = useParams();

    
    useEffect(() => {
      axios
        .get(`http://localhost:3000/api/users/${id}`)
        .then((response) => {
          setUser(response.data);
          console.log("user is here")
        })
        .catch((err) => console.error(err, "url not found"));
    }, []);
  

  return (
    <div>Userdetails</div>
  )
}
