import React, { useContext } from 'react'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { userContext } from '../../App'

function Header() {
    let { login } = useContext(userContext)
    let [window_width, updateWindowWidth] = useState(window.innerWidth);
    window.addEventListener('resize', () => {
        updateWindowWidth(window.innerWidth);
    })
    return (
        <>
            <header>
                <div className="header">
                    <h1>
                        <NavLink to="/">Emotion Detection System</NavLink>
                    </h1>
                    <p style={{ color: "white", fontSize: "0.8em" }}>Using Machine Learning, Deep Learning, Computer Vision and Natural Language Processing</p>
                </div>
                <nav className={`DesktopNav ${window_width > 786 ? "display_flex" : "display_none"}`}>
                    <a target="_" href="http://localhost:5001/">Audio Dashboard</a>
                    <a target="_" href="http://localhost:5002/">Image Dashboard</a>
                    <a target="_" href="http://localhost:5003/">Text Dashboard</a>
                    <a target="_" href="http://localhost:5004/">Video Dashboard</a>
                </nav>
                <button>Hello {login.username}</button>
            </header>
        </>
    )
}

export default Header