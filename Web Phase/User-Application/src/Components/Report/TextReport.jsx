import React, { useContext } from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { userContext } from '../../App'
import Footer from '../Templates/Footer';
import Header from '../Templates/Header';
import Chart from "react-apexcharts";
import { useState } from 'react';
import ClassList from '../../Assets/Variables.json'

function TextReport() {
    let { login } = useContext(userContext)
    let navigate = useNavigate()
    let [reportData, updateReportData] = useState(null)
    let [transcript, updateTranscript] = useState("")
    async function getReportData(event) {
        if (transcript !== "") {


            event.preventDefault();
            try {
                let response = await fetch("/gettextreport", {
                    method: "POST",
                    headers: {
                        "Content-Type": "Application/json"
                    },
                    body: JSON.stringify({ transcript })
                })
                let result = await response.json()
                if (!!result.report) {
                    console.log(result.report);
                    updateReportData(result.report)
                } else {
                    navigate("/dashboard")
                }
            } catch (error) {
                console.log(error);
            }
        } else {

        }
    }
    function getIndexValues(array) {
        console.log(array);
        let returning_array = []
        array.forEach(element => {
            returning_array.push(ClassList.indexOf(element))
        });
        console.log(returning_array);
        return returning_array
    }
    useEffect(() => {
        if (login.user === false) {
            navigate('/logout')
        }
    }, [])
    return (
        <>
            <Header />
            <div className="TranscriptFormContainer">
                <h1>Enter Your Transcript here</h1>
                <form onSubmit={getReportData}>
                    <textarea name="transcript" id="transcript" value={transcript} onChange={(event) => {
                        updateTranscript(event.target.value)
                    }} cols="30" rows="10" placeholder='Enter Your Text'>
                    </textarea>
                    <p>We will generate report based on sentences.</p>
                    <button type="submit">Generate Report</button>
                </form>
            </div>
            {
                reportData ? (
                    <>
                        <div id="ReportPageContainer">
                            <h2>Report For Given Text</h2>
                            <section className="ReportContainer">
                                <div className="initialDetails">
                                    <div className="Details">
                                        <h5>Transcript Based Analysis</h5>
                                        <div className='final_output'>
                                            Final Emotion: <strong className='centeredMainHeading'>{reportData.text_data.final_prediction}</strong>
                                        </div>
                                        <div className="value red_color">
                                            Anger %: <strong>{parseInt(100 * reportData.text_data.counts.anger / reportData.text_data.total_predicted_values)}%</strong>
                                        </div>
                                        <div className="value coral_color">
                                            Disgust %: <strong>{parseInt(100 * reportData.text_data.counts.disgust / reportData.text_data.total_predicted_values)}%</strong>
                                        </div>
                                        <div className="value darkblue_color">
                                            Sad %: <strong>{parseInt(100 * reportData.text_data.counts.sad / reportData.text_data.total_predicted_values)}%</strong>
                                        </div>
                                        <div className="value green_color">
                                            Happy %: <strong>{parseInt(100 * reportData.text_data.counts.happy / reportData.text_data.total_predicted_values)}%</strong>
                                        </div>
                                        <div className="value blue_color">
                                            Surprise %: <strong>{parseInt(100 * reportData.text_data.counts.surprise / reportData.text_data.total_predicted_values)}%</strong>
                                        </div>
                                        <div className="value gray_color">
                                            Fear %: <strong>{parseInt(100 * reportData.text_data.counts.fear / reportData.text_data.total_predicted_values)}%</strong>
                                        </div>
                                        <div className="counts gray_color">
                                            Minimum Predicted Emotion: <strong>{reportData.text_data.min_prediction}</strong>
                                        </div>
                                        <div className="counts darkblue_color">
                                            Neutrality %: <strong>{parseInt(100 * reportData.text_data.neutrality_value / reportData.text_data.total_predicted_values)}%</strong>
                                        </div>
                                        <h4>Graph of counts</h4>
                                        <div className="barchart">
                                            <Chart
                                                options={{
                                                    xaxis: {
                                                        categories: Object.keys(reportData.text_data.counts)
                                                    }
                                                }}
                                                series={[
                                                    {
                                                        name: "Emotion Counts",
                                                        data: Object.values(reportData.text_data.counts)
                                                    }
                                                ]}
                                                type="bar"
                                                width="280"
                                                height="300"
                                            />
                                        </div>
                                    </div>

                                </div>
                                <h1 className="centeredMainHeading">
                                    Sentence Wise Emotions
                                </h1>
                                <div className="mainGraphs">
                                    <Chart
                                        options={{
                                            xaxis: {
                                                categories: Array(reportData.text_data.predictions.length).keys()
                                            }
                                        }}
                                        series={[
                                            {
                                                name: "Emotion Value",
                                                data: getIndexValues(reportData.text_data.predictions)
                                            }
                                        ]}
                                        type="line"
                                        width="1200"
                                        height="500"
                                    />
                                </div>
                            </section>
                            <div className="printButton">
                                <button onClick={() => { window.print() }}>Print Report</button>
                                <p>Please Set Paper size as 3A, Scale as Custom and it's Value as 70</p>
                                <div className="classLists">
                                    <span><strong> Indexing Information</strong></span>
                                    <span>0 for 😡Anger</span><span>1 for 😞Disgust</span><span>2 for 😨Fear</span><span>3 for 😀Happy</span><span>4 for 😔Sad</span><span>5 for 😱Surprise</span>
                                </div>
                            </div>
                        </div >
                    </>
                ) : (
                    <></>
                )
            }
            <Footer />
        </>
    )
}

export default TextReport