import React from 'react'
import { Link } from 'react-router-dom'
export default function Home(props) {
    return (
        <div style={{ textAlign: "center" }}>
            <h1>Home Page</h1>
            <h2>Name: {props.user.name}</h2>
            <h2>Email: {props.user.email}</h2>
            <Link to='/'>LogOut</Link>
        </div>
    )
}