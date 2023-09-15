import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { userContext } from '../../App'
import { useContext } from 'react';
import { Vortex } from 'react-loader-spinner'

function Register(object) {
    let { updateLoginState } = useContext(userContext)
    let [loader, updateLoader] = useState(false);

    let navigate = useNavigate()
    let [loginDetails, updateLoginDetails] = useState({
        "name": "",
        "email": "",
        "phone": "",
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
    async function registerUser(event) {
        updateLoader(true)
        event.preventDefault()
        if (loginDetails.email != "" && loginDetails.name != "" && loginDetails.password != "" && loginDetails.phone != "") {
            try {
                let response = await fetch("/registeruser", {
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
                    window.alert("User Already Exists")
                }
            } catch (error) {

            }
        } else {
            window.alert("Please Fill all details")
        }
        updateLoader(false)
    }
    return (<>
        <div className='Register_Container'>
            <form onSubmit={registerUser} id='Login_Form'>
                <h1>
                    Register Here
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
                <input type="text" value={loginDetails.name} onChange={updateDetails} name="name" id="name" placeholder='Enter Your Name' required />
                <input type="email" value={loginDetails.email} onChange={updateDetails} name="email" id="email" placeholder='Enter Your Email' required />
                <input type="number" value={loginDetails.phone} onChange={updateDetails} name="phone" id="phone" placeholder='Enter Your Phone Number' required />
                <input type="password" value={loginDetails.password} onChange={updateDetails} name="password" id="password" placeholder='Enter Your Password' required />
                <button type='submit'>Submit</button>
                <p>Already have an Account? , <span className="blue_color" onClick={() => {
                    object.changeLoginType(0)
                }}>Login Here</span></p>
            </form>
        </div>
    </>
    )
}

export default Register