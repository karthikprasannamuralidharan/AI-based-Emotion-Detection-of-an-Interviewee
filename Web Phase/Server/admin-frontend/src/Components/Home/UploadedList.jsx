import React, { useEffect } from 'react'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'
function UploadedList({ update }) {
    let [videoList, updateVideoList] = useState([])
    async function getListOfVideos() {
        try {
            let response = await fetch("/getuploadedfilelistofadmin", {
                method: "POST"
            })
            let result = await response.json()
            console.log(result);
            updateVideoList(result.data)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getListOfVideos()
    }, [update])
    async function deteteFile(id) {
        try {
            let response = await fetch("/deletefile", {
                method: "POST",
                headers: {
                    "Content-Type": "Application/json"
                },
                body: JSON.stringify({ id })
            })
            let result = await response.json()
            console.log(result.data);
            window.alert(result.data)
            getListOfVideos()
        } catch (error) {
            console.log(error);
        }
    }
    async function generateReport(id) {
        try {
            fetch("/generatereport", {
                method: "POST",
                headers: {
                    "Content-Type": "Application/json"
                },
                body: JSON.stringify({ id })
            })
            window.alert("We have send the request for generating the Report")
            getListOfVideos()
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className='UploadedFilesList'>
            <h1>Recently Uploaded Videos</h1>
            {
                !!videoList && videoList.length > 0 ? (
                    <>
                        {
                            videoList.map((value, index) => {
                                return (
                                    <div key={index} className="UploadedFile">
                                        <div className="description">
                                            <h3><i className="fas fa-video"></i> {value[1]}</h3>
                                            <p>Uploaded At: {value[4]}</p>
                                        </div>
                                        <div className="options">
                                            {
                                                value[3] == "Working" ? (
                                                    <>
                                                        <button className="waitingButton">
                                                            Generating Reports
                                                        </button>
                                                    </>
                                                ) : (
                                                    <>
                                                        <button className="deleteButton" onClick={() => deteteFile(value[0])}>
                                                            Delete File
                                                        </button>
                                                        {
                                                            value[3] == "No" ? (
                                                                <>
                                                                    <button className="generateButton" onClick={() => generateReport(value[0])}>
                                                                        Generate Report
                                                                    </button>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <button className="viewReport">
                                                                        <NavLink to={`/report/${value[0]}`} >View Report</NavLink>
                                                                    </button>
                                                                </>
                                                            )
                                                        }
                                                    </>
                                                )
                                            }
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </>
                ) : (
                    <>
                        <div className="MessageContainer">
                            <h1>You have Not uploaded any videos</h1>
                            <p>(●'◡'●)</p>
                        </div>
                    </>
                )
            }


        </div>
    )
}

export default UploadedList