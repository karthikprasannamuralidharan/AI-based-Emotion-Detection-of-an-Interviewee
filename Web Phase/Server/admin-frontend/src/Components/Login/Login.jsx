import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { userContext } from '../../App'
import SignIn from './SignIn';
function Login() {
    let { login } = useContext(userContext)
    let navigate = useNavigate()
    useEffect(() => {
        if (login.user) {
            navigate("/")
        }
    })
    return (
        <div id="loginPageContainer">
            <div className="intro">
                <h1>AI Based Emotion Detection System🙃</h1>
                <div className="centeredHeading">
                    <h1>Welcome Admin</h1>
                    <p>Please Login using Valid Username and password</p>
                </div>
            </div>

            <div className="loginFormContainer">
                <SignIn />
            </div>
        </div>
    )
}

export default Login