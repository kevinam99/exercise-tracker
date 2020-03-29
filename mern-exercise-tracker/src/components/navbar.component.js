import React, { Component } from 'react';
import { Link } from 'react-router-dom'; // linking to different routes 

export default class Navbar extends Component{ // all Components need to render something
    render() { // The whole thing below is the navbar
        return(
            <nav className = "navbar navbar-dark bg-dark navbar-expand-lg">
            <Link to = "/" className = "navbar-brand">Exercise Tracker</Link>
            <div className = "collapse navbar-collapse">
                <ul className = "navbar-nav mr-auto">
                    <li className = "navbar-item">
                        <Link to = "/" className = "nav-link">Exercises</Link>
                    </li>
                    <li className = "navbar-item">
                        <Link to = "/create" className = "nav-link">Create exercise log</Link>
                    </li>
                    <li className = "navbar-item">
                        <Link to = "/user" className = "nav-link">Create user</Link>
                    </li>
                </ul>
            </div>
        </nav>
        )
    }
}