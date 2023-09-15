import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

function ReportsList() {
    let [reportList, updatereportList] = useState([])
    async function getListOfReports() {
        try {
            let response = await fetch("/getreportlist", {
                method: "POST"
            })
            let result = await response.json()
            console.log(result);
            updatereportList(result.report_list)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getListOfReports()
    }, [])
    return (
        <>
            <div className="ListContainer">
                <h1>Report List</h1>
                <div className="List">
                    <div className="element">
                        <div className="id2">
                            <strong>Video Id</strong>
                        </div>
                        <div className="name">
                            <strong>File Name</strong>
                        </div>
                        <div className="unique">
                            <strong>Unique Identifier</strong>
                        </div>
                        <div className="time">
                            <strong>Storage Name</strong>
                        </div>
                        <div className="removeBtn">
                            <strong>Action</strong>
                        </div>
                    </div>
                    {
                        reportList && reportList.length > 0 ? (
                            <>
                                {
                                    reportList.map((value, index) => {
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
                                                    {value[7]}
                                                </div>
                                                <div className="removeBtn">
                                                    <button><NavLink to={`/report/${value[0]}`} >View Report</NavLink></button>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </>
                        ) : (<>
                            <div className="MessageContainer">
                                <h1>No reports</h1>
                                <p>(●'◡'●)</p>
                            </div>
                        </>)
                    }
                </div>
            </div>
        </>
    )
}

export default ReportsList