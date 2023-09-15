import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { userContext } from '../../App'
import { useContext } from 'react';
import { Vortex } from 'react-loader-spinner'
function SignIn(object) {
    let { updateLoginState } = useContext(userContext)
    let navigate = useNavigate()
    let [loader, updateLoader] = useState(false);
    let [loginDetails, updateLoginDetails] = useState({
        "email": "",
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
        updateLoader(true)
        event.preventDefault()
        if (loginDetails.email !== "" && loginDetails.name !== "" && loginDetails.password !== "" && loginDetails.phone !== "") {
            try {
                let response = await fetch("/loginuser", {
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
                    navigate("/dashboard")
                } else {
                    window.alert("Invalid Credentials")
                }
            } catch (error) {

            }
        } else {
            window.alert("Please Fill all details")
        }
        updateLoader(false);
    }
    return (
        <>
            <div className='SignIn_Container'>
                <form onSubmit={submitTheForm} id='Login_Form'>
                    <h1>
                        Login Here
                    </h1>
                    <Vortex
                        visible={loader}
                        height="80"
                        width="80"
                        ariaLabel="vortex-loading"
                        wrapperStyle={{}}
                        wrapperClass="vortex-wrapper"
                        colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple']}
                    />
                    <input type="email" value={loginDetails.email} onChange={updateDetails} name="email" id="email" placeholder='Enter Your Email' required />
                    <input type="password" value={loginDetails.password} onChange={updateDetails} name="password" id="password" placeholder='Enter Your Password' required />

                    <button type='submit'>Submit</button>
                    <p>Don't have an Account? , <span className="blue_color" onClick={() => {
                        object.changeLoginType(1)
                    }}>Register Here</span></p>
                </form>
            </div>



        </>
    )
}

export default SignIn