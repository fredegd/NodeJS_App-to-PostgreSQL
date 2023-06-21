import React from 'react'
import {Link } from "react-router-dom";
import '../App.css'

export default function Usercard({user}) {
  return (
    <>
    <Link to={`/users/${user.id}`} >
    <div className="user-card">
      <div >
        <h3>
          {user.first_name}&nbsp;{user.last_name}
        </h3>
        <p>age: {user.age}</p>
      </div>
    </div>
    </Link>
   
  </>
  )
}
