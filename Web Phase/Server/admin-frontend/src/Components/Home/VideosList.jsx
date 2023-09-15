import React, { useEffect, useState } from 'react'

function VideosList() {
    let [videoList, updatevideoList] = useState([])
    async function getListOfvideos() {
        try {
            let response = await fetch("/getvideolist", {
                method: "POST"
            })
            let result = await response.json()
            console.log(result);
            updatevideoList(result.videos_list)
        } catch (error) {
            console.log(error);
        }
    }
    async function deleteVideo(id) {
        try {
            let response = await fetch("/deletefile", {
                method: "POST",
                headers: {
                    "Content-Type": "Application/json"
                },
                body: JSON.stringify({ id })
            })
            let result = await response.json()
            console.log(result);
            getListOfvideos()
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getListOfvideos()
    }, [])
    return (
        <>
            <div className="ListContainer">
                <h1>video List</h1>
                <div className="List">
                    <div className="element">
                        <div className="id2">
                            <strong>ID</strong>
                        </div>
                        <div className="name">
                            <strong>File Name</strong>
                        </div>
                        <div className="unique">
                            <strong>Unique Identifier</strong>
                        </div>
                        <div className="time">
                            <strong>Created at</strong>
                        </div>
                        <div className="removeBtn">
                            <strong>Action</strong>
                        </div>
                    </div>
                    {
                        videoList && videoList.length > 0 ? (
                            <>
                                {
                                    videoList.map((value, index) => {
                                        return (
                                            <div className="element">
                                                <div className="id2">
                                                    {value[0]}
                                                </div>
                                                <div className="name">
                                                    {value[1]}
                                                </div>
                                                <div className="unique">
                                                    {value[2]}
                                                </div>
                                                <div className="time">
                                                    {value[4]}
                                                </div>
                                                <div className="removeBtn">
                                                    <button onClick={() => deleteVideo(value[0])}>Remove</button>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </>
                        ) : (<>
                            <div className="MessageContainer">
                                <h1>No videos</h1>
                                <p>(●'◡'●)</p>
                            </div>
                        </>)
                    }
                </div>
            </div>
        </>
    )
}

export default VideosList