import React from 'react'
import VideoUpload from './VideoUpload'
import UploadedList from './UploadedList'
import { useState } from 'react'
import AudioUpload from './AudioUpload'

function InterviewResultPrediction() {
    let [recordingStatus, updateRecordingStatus] = useState(false)
    let [refresh, updateRefresh] = useState(1)
    function updateRefreshValue(object) {
        updateRefresh(object)
    }
    async function recordVideo() {
        updateRecordingStatus(true)
        try {
            let response = await fetch("/recordvideo", {
                method: "POST",
                headers: {
                    "Content-Type": "Application/json"
                }
            })
            let result = await response.json()
            if (result.isDone === "Yes") {
                window.alert("Recording is Completed")
            } else {
                window.alert("Some Error Occurred")
            }
        } catch (error) {
            console.log(error);
        }
        updateRecordingStatus(false)
    }
    return (
        <>
            <div className="recordVideoContainer">
                <div className="description">
                    <h1>Here You can Also Submit Video by Using our recording Feature</h1>
                    <ul>
                        <li>To start Recording click in "start recording" button, given in right </li>
                        <li>New window will be displayed where you can se your face</li>
                        <li>Actual Recording Get start after you click "Space" button</li>
                        <li>After All process of recording content, To stop recording You need to click "q" Button 2 Times</li>
                        <li>Saved Video Will be shown in following section</li>
                        <li>If video not get listed, then please wait for some time it will get rendered accordingly</li>
                    </ul>
                </div>
                <button onClick={recordVideo}> {!recordingStatus ? "Start Recording" : "Recording is in progress"}</button>
            </div>
            <UploadedList update={refresh} text="Recently Uploaded Files" url="/getuploadedfilelistofuser" />
        </>
    )
}

export default InterviewResultPrediction