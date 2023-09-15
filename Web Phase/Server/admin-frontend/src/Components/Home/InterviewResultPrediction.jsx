import React from 'react'
import VideoUpload from './VideoUpload'
import UploadedList from './UploadedList'
import { useState } from 'react'

function InterviewResultPrediction() {
    let [refresh, updateRefresh] = useState(1)
    function updateRefreshValue(object) {
        updateRefresh(object)
    }
    return (
        <>
            <VideoUpload updateRefresh={updateRefreshValue} />
            <UploadedList update={refresh} />
        </>
    )
}

export default InterviewResultPrediction