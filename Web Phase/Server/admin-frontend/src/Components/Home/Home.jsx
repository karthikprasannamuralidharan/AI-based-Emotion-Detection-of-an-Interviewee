import React, { useContext, useState } from 'react'
import { useEffect } from 'react';
import Footer from '../Templates/Footer';
import Header from '../Templates/Header';
import { useNavigate } from 'react-router-dom';
import { userContext } from '../../App'
import UserList from './UserList';
import VideosList from './VideosList';
import ReportsList from './ReportsList';
import InterviewResultPrediction from './InterviewResultPrediction';
function Home() {
    let { login } = useContext(userContext)
    let navigate = useNavigate()
    useEffect(() => {
        if (login.user === false) {
            navigate('/logout')
        }
    })
    let [toggleNavigation, updateToggleNavigation] = useState(false)
    let [currentDashboardElement, updateCurrentDashboardElement] = useState(0)
    return (
        <>
            <Header />
            <div id="homePageContainer">
                <div id="sideNavigation" style={{ left: toggleNavigation ? "0px" : "-200px" }}>
                    <div className="toggleNavigatorButton" onClick={() => updateToggleNavigation(!toggleNavigation)}>
                        {
                            toggleNavigation ? (<i className="fas fa-angle-double-left"></i>) : (<i className="fas fa-angle-double-right"></i>)
                        }
                    </div>
                    <h1>Dashboard Navigation</h1>
                    <ul>
                        <li onClick={() => {
                            updateCurrentDashboardElement(1)
                        }}><i className="fas fa-users"></i> Users List</li>
                        <li onClick={() => {
                            updateCurrentDashboardElement(2)
                        }}><i className="fas fa-video"></i> Videos List</li>
                        <li onClick={() => {
                            updateCurrentDashboardElement(3)
                        }}><i className="fas fa-file-signature"></i> Reports List</li>
                        <li onClick={() => {
                            updateCurrentDashboardElement(4)
                        }}><i className="fas fa-poll"></i> Interview Result Prediction</li>
                    </ul>
                </div>
                {
                    currentDashboardElement !== 0 ? (
                        GetCurrentDashboardComponent(currentDashboardElement)
                    ) : (<>
                        <section id="landingPageImage">
                            <h1>Welcome To Integrated Emotion Detection System</h1>
                            <p>Here, We try to predict the emotion using image of Human Faces, Transcripts, Audios in fine-grained classes</p>
                            <button onClick={() => updateToggleNavigation(true)}>Open Dashboard Navigation</button>
                        </section>





                    </>)
                }
            </div>
            <Footer />
        </>
    )
}


function GetCurrentDashboardComponent(elementId) {
    if (elementId == 1) {
        return <UserList />
    } else if (elementId == 2) {
        return <VideosList />
    }
    else if (elementId == 3) {
        return <ReportsList />
    }
    else if (elementId == 4) {
        return <InterviewResultPrediction />
    }
}

export default Home