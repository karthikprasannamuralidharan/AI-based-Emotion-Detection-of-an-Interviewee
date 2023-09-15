import React, { useContext } from 'react'
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { userContext } from '../../App'
import Footer from '../Templates/Footer';
import Header from '../Templates/Header';
import Chart from "react-apexcharts";
import { useState } from 'react';
import ClassList from '../../Assets/Variables.json'

function Report() {
    let { login } = useContext(userContext)
    let navigate = useNavigate()
    let [reportData, updateReportData] = useState(null)
    let [fileName, updatefileName] = useState("")
    let { id } = useParams()
    async function getReportData() {
        try {
            let response = await fetch("/getreport", {
                method: "POST",
                headers: {
                    "Content-Type": "Application/json"
                },
                body: JSON.stringify({ id })
            })
            let result = await response.json()
            if (!!result.report) {
                console.log(result.report);
                updateReportData(result.report)
                updatefileName(result.file_name)
            } else {
                navigate("/dashboard")
            }
        } catch (error) {
            console.log(error);
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
        if (login.user == false) {
            navigate('/logout')
        }
        getReportData()
        if (!!reportData) {
            console.log(Array(reportData.image_data.predictions.length).keys());
            console.log(getIndexValues(reportData.video_data.predictions));
        }
    }, [])
    return (
        <>
            <Header />
            {
                reportData ? (
                    <>
                        <div id="ReportPageContainer">
                            <h2>Report For <span className="green_color">{fileName}</span></h2>
                            <section className="ReportContainer">
                                <div className="initialDetails">
                                    <div className="Details">
                                        <h5>Image Based Analysis</h5>
                                        <div className='final_output'>
                                            Final Emotion: <strong className='centeredMainHeading'>{reportData.image_data.final_prediction}</strong>
                                        </div>
                                        <div className="value red_color">
                                            Anger %: <strong>{parseInt(100 * reportData.image_data.counts.anger / reportData.image_data.total_predicted_values)}%</strong>
                                        </div>
                                        <div className="value coral_color">
                                            Disgust %: <strong>{parseInt(100 * reportData.image_data.counts.disgust / reportData.image_data.total_predicted_values)}%</strong>
                                        </div>
                                        <div className="value darkblue_color">
                                            Sad %: <strong>{parseInt(100 * reportData.image_data.counts.sad / reportData.image_data.total_predicted_values)}%</strong>
                                        </div>
                                        <div className="value green_color">
                                            Happy %: <strong>{parseInt(100 * reportData.image_data.counts.happy / reportData.image_data.total_predicted_values)}%</strong>
                                        </div>
                                        <div className="value blue_color">
                                            Surprise %: <strong>{parseInt(100 * reportData.image_data.counts.surprise / reportData.image_data.total_predicted_values)}%</strong>
                                        </div>
                                        <div className="value gray_color">
                                            Fear %: <strong>{parseInt(100 * reportData.image_data.counts.fear / reportData.image_data.total_predicted_values)}%</strong>
                                        </div>
                                        <div className="counts gray_color">
                                            Minimum Predicted Emotion: <strong>{reportData.image_data.min_prediction}</strong>
                                        </div>
                                        <div className="counts darkblue_color">
                                            Neutrality %: <strong>{parseInt(100 * reportData.image_data.neutrality_value / reportData.image_data.total_predicted_values)}%</strong>
                                        </div>
                                        <h4>Graph of counts</h4>
                                        <div className="barchart">
                                            <Chart
                                                options={{
                                                    xaxis: {
                                                        categories: Object.keys(reportData.image_data.counts)
                                                    }
                                                }}
                                                series={[
                                                    {
                                                        name: "Emotion Counts",
                                                        data: Object.values(reportData.image_data.counts)
                                                    }
                                                ]}
                                                type="bar"
                                                width="280"
                                                height="300"
                                            />
                                        </div>
                                    </div>
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
                                    <div className="Details">
                                        <h5>Audio Based Analysis</h5>
                                        <div className='final_output'>
                                            Final Emotion: <strong className='centeredMainHeading'>{reportData.audio_data.final_prediction}</strong>
                                        </div>
                                        <div className="value red_color">
                                            Anger %: <strong>{parseInt(100 * reportData.audio_data.counts.anger / reportData.audio_data.total_predicted_values)}%</strong>
                                        </div>
                                        <div className="value coral_color">
                                            Disgust %: <strong>{parseInt(100 * reportData.audio_data.counts.disgust / reportData.audio_data.total_predicted_values)}%</strong>
                                        </div>
                                        <div className="value darkblue_color">
                                            Sad %: <strong>{parseInt(100 * reportData.audio_data.counts.sad / reportData.audio_data.total_predicted_values)}%</strong>
                                        </div>
                                        <div className="value green_color">
                                            Happy %: <strong>{parseInt(100 * reportData.audio_data.counts.happy / reportData.audio_data.total_predicted_values)}%</strong>
                                        </div>
                                        <div className="value blue_color">
                                            Surprise %: <strong>{parseInt(100 * reportData.audio_data.counts.surprise / reportData.audio_data.total_predicted_values)}%</strong>
                                        </div>
                                        <div className="value gray_color">
                                            Fear %: <strong>{parseInt(100 * reportData.audio_data.counts.fear / reportData.audio_data.total_predicted_values)}%</strong>
                                        </div>
                                        <div className="counts gray_color">
                                            Minimum Predicted Emotion: <strong>{reportData.audio_data.min_prediction}</strong>
                                        </div>
                                        <div className="counts darkblue_color">
                                            Neutrality %: <strong>{parseInt(100 * reportData.audio_data.neutrality_value / reportData.audio_data.total_predicted_values)}%</strong>
                                        </div>
                                        <h4>Graph of counts</h4>
                                        <div className="barchart">
                                            <Chart
                                                options={{
                                                    xaxis: {
                                                        categories: Object.keys(reportData.audio_data.counts)
                                                    }
                                                }}
                                                series={[
                                                    {
                                                        name: "Emotion Counts",
                                                        data: Object.values(reportData.audio_data.counts)
                                                    }
                                                ]}
                                                type="bar"
                                                width="280"
                                                height="300"
                                            />
                                        </div>
                                    </div>
                                    <div className="Details">
                                        <h5>Whole Video Based Analysis</h5>
                                        <div className='final_output'>
                                            Final Emotion: <strong className='centeredMainHeading'>{reportData.video_data.final_prediction}</strong>
                                        </div>
                                        <div className="value red_color">
                                            Anger %: <strong>{parseInt(100 * reportData.video_data.counts.anger / reportData.video_data.total_predicted_values)}%</strong>
                                        </div>
                                        <div className="value coral_color">
                                            Disgust %: <strong>{parseInt(100 * reportData.video_data.counts.disgust / reportData.video_data.total_predicted_values)}%</strong>
                                        </div>
                                        <div className="value darkblue_color">
                                            Sad %: <strong>{parseInt(100 * reportData.video_data.counts.sad / reportData.video_data.total_predicted_values)}%</strong>
                                        </div>
                                        <div className="value green_color">
                                            Happy %: <strong>{parseInt(100 * reportData.video_data.counts.happy / reportData.video_data.total_predicted_values)}%</strong>
                                        </div>
                                        <div className="value blue_color">
                                            Surprise %: <strong>{parseInt(100 * reportData.video_data.counts.surprise / reportData.video_data.total_predicted_values)}%</strong>
                                        </div>
                                        <div className="value gray_color">
                                            Fear %: <strong>{parseInt(100 * reportData.video_data.counts.fear / reportData.video_data.total_predicted_values)}%</strong>
                                        </div>
                                        <div className="counts gray_color">
                                            Minimum Predicted Emotion: <strong>{reportData.video_data.min_prediction}</strong>
                                        </div>
                                        <div className="counts darkblue_color">
                                            Neutrality %: <strong>{parseInt(100 * reportData.video_data.neutrality_value / reportData.video_data.total_predicted_values)}%</strong>
                                        </div>
                                        <h4>Graph of counts</h4>
                                        <div className="barchart">
                                            <Chart
                                                options={{
                                                    xaxis: {
                                                        categories: Object.keys(reportData.video_data.counts)
                                                    }
                                                }}
                                                series={[
                                                    {
                                                        name: "Emotion Counts",
                                                        data: Object.values(reportData.video_data.counts)
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
                                    Frame Wise Image Emotions
                                </h1>
                                <div className="mainGraphs">
                                    <Chart
                                        options={{
                                            xaxis: {
                                                categories: Array(reportData.image_data.predictions.length).keys()
                                            }
                                        }}
                                        series={[
                                            {
                                                name: "Emotion Value",
                                                data: getIndexValues(reportData.image_data.predictions)
                                            }
                                        ]}
                                        type="line"
                                        width="1200"
                                        height="500"
                                    />
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
                                <h1 className="centeredMainHeading">
                                    Frame Wise Audio Emotions
                                </h1>
                                <div className="mainGraphs">
                                    <Chart
                                        options={{
                                            xaxis: {
                                                categories: Array(reportData.audio_data.predictions.length).keys()
                                            }
                                        }}
                                        series={[
                                            {
                                                name: "Emotion Value",
                                                data: getIndexValues(reportData.audio_data.predictions)
                                            }
                                        ]}
                                        type="line"
                                        width="1200"
                                        height="500"
                                    />
                                </div>
                                <h1 className="centeredMainHeading">
                                    Cumulative Emotions of Video
                                </h1>
                                <div className="mainGraphs">
                                    <Chart
                                        options={{
                                            xaxis: {
                                                categories: Array(reportData.video_data.predictions.length).keys()
                                            }
                                        }}
                                        series={[
                                            {
                                                name: "Emotion Value",
                                                data: getIndexValues(reportData.video_data.predictions)
                                            }
                                        ]}
                                        type="line"
                                        width="1200"
                                        height="500"
                                    />
                                </div>

                                <div className="FinalResults">
                                    <div className="finalResultDetails">
                                        <h2 className="centeredMainHeading">
                                            Interview Emotion Statistics
                                        </h2>
                                        <section className="finalDetails">
                                            <div className="specificEmotions">
                                                <div style={{ background: "red" }}>
                                                    😡Anger: <strong>{reportData.final_data.counts.anger}</strong>
                                                </div>
                                                <div style={{ background: "coral" }}>
                                                    😞Disgust: <strong>{reportData.final_data.counts.disgust}</strong>
                                                </div>
                                                <div style={{ background: "gray" }}>
                                                    😨Fear: <strong>{reportData.final_data.counts.fear}</strong>
                                                </div>
                                            </div>
                                            <div className="specificEmotions">
                                                <div style={{ background: "blue" }}>
                                                    😀Happy: <strong>{reportData.final_data.counts.happy}</strong>
                                                </div>
                                                <div style={{ background: "#1B1464" }}>
                                                    😔Sad: <strong>{reportData.final_data.counts.sad}</strong>
                                                </div>
                                                <div style={{ background: "green" }}>
                                                    😱Surprise: <strong>{reportData.final_data.counts.surprise}</strong>
                                                </div>
                                            </div>
                                            <div className="specificResults1">
                                                <div style={{ background: "rgba(0, 128, 0, 0.551)" }}>
                                                    Positivity Score : {reportData.final_data.positivity_value}
                                                </div>
                                                <div style={{ background: "rgba(255, 0, 0, 0.658)" }}>
                                                    Negativity Score : {reportData.final_data.negativity_value}
                                                </div>
                                            </div>
                                            <div className="specificResults2">
                                                <div style={{ background: "rgba(0, 0, 255, 0.575)" }}>
                                                    Neutrality Score : {reportData.final_data.neutrality_value}
                                                </div>
                                                <div style={{ background: "gray" }}>
                                                    Total Score : {reportData.final_data.total_predicted_values}
                                                </div>
                                            </div>
                                        </section>
                                    </div>
                                    <div className="mainGraphs">
                                        <Chart
                                            options={{
                                                labels: Object.keys(reportData.final_data.counts)
                                            }}
                                            series={
                                                Object.values(reportData.final_data.counts)
                                            }
                                            type="pie"
                                            width="500"
                                            height="350"
                                        />
                                    </div>
                                </div>

                            </section>
                            <h1 className="centeredMainHeading">
                                Final Predicted Result of Video
                            </h1>
                            <div className="result">
                                {
                                    reportData.final_data.final_prediction == "Higher Chance of Selection" ? (
                                        <>
                                            <h1 className='green_color'>There is Higher Chances of Getting Hired</h1>
                                            <img src="https://images.unsplash.com/photo-1485115905815-74a5c9fda2f5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=718&q=80" alt="" />

                                        </>
                                    ) : (
                                        <>
                                            {
                                                reportData.final_data.final_prediction == "Less Chances of Selection" ? (
                                                    <>
                                                        <h1 className='red_color'>Very Less chances to get hired</h1>
                                                        <img src="https://thumbs.dreamstime.com/b/young-businessman-writing-not-good-enough-man-transparent-wall-99390926.jpg" alt="" />
                                                    </>
                                                ) : (
                                                    <>
                                                        <h1 className='gray_color'>Result will be unpredictable</h1>
                                                        <img src="https://media.licdn.com/dms/image/C4E12AQGfOoM0fj-FrA/article-cover_image-shrink_720_1280/0/1621263843416?e=1678320000&v=beta&t=Zw2kEha7jljfV4s1itVIa3e5hCt6Yg2LoOeSIhtpgzw" alt="" />
                                                    </>
                                                )
                                            }

                                        </>
                                    )
                                }
                                <h1>The predicted Percentage of Hiring is <strong className='blue_color'>{parseInt(100 * (reportData.final_data.positivity_value + reportData.final_data.neutrality_value) / reportData.final_data.total_predicted_values)}% </strong></h1>
                            </div>
                            <div className="printButton">
                                <button onClick={() => { window.print() }}>Print Report</button>
                                <p>Please Set Paper size as 3A, Scale as Custom and it's Value as 70 (for better view)</p>
                                <div className="classLists">
                                    <span><strong> Indexing Information</strong></span>
                                    <span>0 for 😡Anger</span><span>1 for 😞Disgust</span><span>2 for 😨Fear</span><span>3 for 😀Happy</span><span>4 for 😔Sad</span><span>5 for 😱Surprise</span>
                                </div>
                            </div>

                        </div >
                    </>
                ) : (
                    <>

                    </>
                )
            }

            <Footer />
        </>
    )
}

export default Report