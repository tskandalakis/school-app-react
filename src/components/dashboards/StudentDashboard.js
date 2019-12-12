import React from 'react'
import { Link } from 'react-router-dom'

export default function StudentDashboard() {
  return (
    <div className="container">
      <h1>Home Page</h1>
      <p>
        <Link to="/user/1">User 1</Link>
      </p>
    </div>
  )
}