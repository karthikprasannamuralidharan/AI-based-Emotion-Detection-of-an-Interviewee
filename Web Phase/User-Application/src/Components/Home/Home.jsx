import React from 'react';
import Footer from '../Templates/Footer';
import Header from '../Templates/Header';
import { NavLink } from 'react-router-dom';
function Home() {
    return (
        <>
        
            <div id="homePageContainer">
                <Header />
                <section id="landingPageImage">
                    <h1>Welcome To Multimodal Emotion Detection System</h1>
                    <p>Here, We try to predict the emotions of person using image of facial images, transcripts and audios in fine-grained classes</p>
                    <button><NavLink to="/dashboard">Try Now</NavLink></button>
                </section>
                <h1 className='centeredMainHeading' style={{ color: "#FF8300", textAlign: "center" }}>Process flow of Site</h1>
                <section id="processFlow">
                    <div className='processFlow-card'>
                        <div className="processItem">
                            1. Upload Video
                        </div>
                    </div>
                    <div className='processFlow-card'>
                        <div className="processItem">
                            2. Analysis By Our System
                        </div>
                    </div>
                    <div className='processFlow-card'>
                        <div className="processItem">
                            3. Emotion Analysis Report
                        </div>
                    </div>
                </section>
                <h1 className='centeredMainHeading' style={{ color: "#FF8300", textAlign: "center" }}>Multimodal Analysis Types</h1>
                <section id="dataTypes">
                    <div className="dataType">
                        <img src="https://images.unsplash.com/photo-1543769657-fcf1236421bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80" alt="" />
                        <h2>Text Based Analysis</h2>
                    </div>
                    <div className="dataType">
                        <img src="https://images.unsplash.com/photo-1500051638674-ff996a0ec29e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1218&q=80" alt="" />
                        <h2>Image Based Analysis</h2>
                    </div>
                    <div className="dataType">
                        <img src="https://images.unsplash.com/photo-1507838153414-b4b713384a76?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="" />
                        <h2>Audio Based Analysis</h2>
                    </div>
                    <div className="dataType">
                        <img src="https://images.unsplash.com/photo-1599240211563-17590b1af857?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="" />
                        <h2>Video Based Analysis</h2>
                    </div>
                </section>
                <Footer />
            </div>
        </>
    )
}

export default Home