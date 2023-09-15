import React, { useEffect, useState } from 'react'

function UserList() {
    let [userList, updateuserList] = useState([])
    async function getListOfUsers() {
        try {
            let response = await fetch("/getuserlist", {
                method: "POST"
            })
            let result = await response.json()
            console.log(result);
            updateuserList(result.users_list)
        } catch (error) {
            console.log(error);
        }
    }
    async function deleteUser(id) {
        try {
            let response = await fetch("/deleteuser", {
                method: "POST",
                headers: {
                    "Content-Type": "Application/json"
                },
                body: JSON.stringify({ id })
            })
            let result = await response.json()
            console.log(result);
            getListOfUsers()
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getListOfUsers()
    }, [])
    return (
        <>
            <div className="ListContainer">
                <h1>User List</h1>
                <div className="List">
                    <div className="element">
                        <div className="id">
                            <strong>ID</strong>
                        </div>
                        <div className="name">
                            <strong>Name</strong>
                        </div>
                        <div className="email">
                            <strong>Email</strong>
                        </div>
                        <div className="phone">
                            <strong>Phone</strong>
                        </div>
                        <div className="removeBtn">
                            <strong>Action</strong>
                        </div>
                    </div>
                    {
                        userList && userList.length > 0 ? (
                            <>
                                {
                                    userList.map((value, index) => {
                                        return (
                                            <div key={index} className="element">
                                                <div className="id">
                                                    {value[0]}
                                                </div>
                                                <div className="name">
                                                    {value[1]}
                                                </div>
                                                <div className="email">
                                                    {value[2]}
                                                </div>
                                                <div className="phone">
                                                    {value[4]}
                                                </div>
                                                <div className="removeBtn">
                                                    <button onClick={() => deleteUser(value[0])}>Remove</button>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </>
                        ) : (<>

                            <div className="MessageContainer">
                                <h1>No users</h1>
                                <p>(●'◡'●)</p>
                            </div>
                        </>)
                    }

                </div>
            </div>
        </>
    )
}

export default UserList