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
    let [toggleOptions, updateToggleOptions] = useState(false);
    return (
        <>
            <header>
                <div className="header">
                    <h1>
                        <NavLink to="/">Emotion Detection of Interviewee</NavLink>
                    </h1>
                    <p style={{ color: "white", fontSize: "0.9em" }}>Using Machine Learning, Deep Learning, Computer Vision and Natural Language Processing</p>
                </div>
                <nav className={`DesktopNav ${window_width > 786 ? "display_flex" : "display_none"}`}>
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/dashboard">Dashboard</NavLink>
                    {
                        login.user ? (
                            <>
                                <NavLink to="/textreport">Text Analysis</NavLink>
                                <NavLink to="/audioreport">Audio Analysis</NavLink>
                                <NavLink to="/videoreport">Video Analysis</NavLink>

                            </>
                        ) : (
                            <>
                            </>
                        )
                    }
                </nav>
                {
                    login.user ? (
                        <>
                            <div className="user">
                                <div className="name" onClick={() => { updateToggleOptions(!toggleOptions) }}>
                                    Hello {login.username}
                                </div>
                                {
                                    toggleOptions ? (<>
                                        <div className="options">
                                            <NavLink to="/logout">Logout</NavLink>
                                        </div>
                                    </>) : (
                                        <></>
                                    )
                                }
                            </div>
                        </>
                    ) : (
                        <>
                            <button> <NavLink to="/login">Login</NavLink></button>
                        </>
                    )
                }
            </header>
        </>
    )
}

export default Header