import React, { useContext } from 'react'
import { useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { userContext } from '../../App'
import Footer from '../Templates/Footer';
import Header from '../Templates/Header';
import InterviewResultPrediction from './InterviewResultPrediction';
function Dashboard() {
    let { login } = useContext(userContext)
    let navigate = useNavigate()
    useEffect(() => {
        if (login.user === false) {
            navigate('/logout')
        }
    })
    return (
        <>
            <div id="DashboardPageContainer">
                <Header />
                <section className="landingPageImage">
                    <h1>Welcome To InterView Result Predictor</h1>
                    <p>Here, We try to predict the result of the interview using emotion analysis of video in fine-grained classes</p>
                    <button><NavLink to="/videoreport"> Upload Video</NavLink></button>
                </section>
                <InterviewResultPrediction />
            </div>
            <Footer />
        </>
    )
}

export default Dashboard