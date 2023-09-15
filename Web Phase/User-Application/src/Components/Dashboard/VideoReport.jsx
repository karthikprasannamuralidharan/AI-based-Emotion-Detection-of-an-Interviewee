import React, { useContext, useState } from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { userContext } from '../../App'
import Footer from '../Templates/Footer';
import Header from '../Templates/Header';
import VideoUpload from './VideoUpload';
import UploadedList from './UploadedList';
function VideoReport() {
    let { login } = useContext(userContext)
    let navigate = useNavigate()
    let [refresh, updateRefresh] = useState(1)
    function updateRefreshValue(object) {
        updateRefresh(object)
    }
    useEffect(() => {
        if (login.user === false) {
            navigate('/logout')
        }
    })
    return (
        <>
            <div id="DashboardPageContainer">
                <Header />
                <div className='formsContainer'>
                    <VideoUpload updateRefresh={updateRefreshValue} />
                </div>
                <UploadedList update={refresh} text="Recently Uploaded Videos" url="/getuploadedvideolistofuser" />
            </div>
            <Footer />
        </>
    )
}

export default VideoReport