import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { userContext } from '../../App'
import { useContext } from 'react';
function SignIn() {
    let { updateLoginState } = useContext(userContext)
    let navigate = useNavigate()
    function submitTheForm(event) {
        event.preventDefault()
    }
    let [loginDetails, updateLoginDetails] = useState({
        "username": "",
        "password": ""
    })
    function updateDetails(event) {
        updateLoginDetails((preValue) => {
            return ({
                ...preValue,
                [event.target.name]: event.target.value
            })
        })
    }
    async function submitTheForm(event) {
        event.preventDefault()
        if (loginDetails.email != "" && loginDetails.name != "" && loginDetails.password != "" && loginDetails.phone != "") {
            try {
                let response = await fetch("/loginadmin", {
                    method: "POST",
                    headers: {
                        "Content-Type": "Application/json"
                    },
                    body: JSON.stringify(loginDetails)
                })
                let result = await response.json()
                console.log(result);
                if (!!result.username) {
                    updateLoginState({ type: "LOGIN", user: true, username: result.username })
                    navigate("/")
                } else {
                    window.alert("Invalid Credentials")
                }
            } catch (error) {

            }
        } else {
            window.alert("Please Fill all details")
        }
    }
    return (
        <>
            <div className='SignIn_Container'>
                <form onSubmit={submitTheForm} id='Login_Form'>
                    <h1>
                        Login Here
                    </h1>
                    <input type="text" value={loginDetails.username} onChange={updateDetails} name="username" id="username" placeholder='Enter Your Username' required />
                    <input type="password" value={loginDetails.password} onChange={updateDetails} name="password" id="password" placeholder='Enter Your Password' required />
                    <button type='submit'>Submit</button>
                </form>
            </div>
        </>
    )
}

export default SignIn