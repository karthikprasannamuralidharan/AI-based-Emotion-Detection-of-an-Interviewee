import React, { useContext, useState } from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { userContext } from '../../App'
import Footer from '../Templates/Footer';
import Header from '../Templates/Header';
import UploadedList from './UploadedList';
import AudioUpload from './AudioUpload';
function AudioReport() {
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
                    <AudioUpload updateRefresh={updateRefreshValue} />
                </div>

                <UploadedList update={refresh} text="Recently Uploaded Audios" url='getuploadedaudiolistofuser' />
            </div>
            <Footer />
        </>
    )
}

export default AudioReport