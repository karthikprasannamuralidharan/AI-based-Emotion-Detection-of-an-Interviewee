import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

function AudioUpload({ updateRefresh }) {
    let [audiofile, updateaudiofile] = useState(null)
    let [audiofilename, updateaudiofileName] = useState("Select file")
    useEffect(() => {
        console.log(audiofile);
    }, [audiofile])
    async function submitTheaudiofile(event) {
        event.preventDefault()
        console.log(audiofile);
        if (!!audiofile && audiofilename != "") {
            console.log(audiofile.name);
            let extension = audiofile.name.split(".")[audiofile.name.split(".").length - 1];
            console.log(extension);
            if (
                extension.toLowerCase() === "wav" ||
                extension.toLowerCase() === "mp3"
            ) {
                console.log("extension accepted");
                if (audiofile.size < 100000000) {
                    try {
                        let formData = new FormData();
                        formData.append("file", audiofile ? audiofile : "");
                        let response = await fetch("/uploadaudiofile", {
                            method: "POST",
                            body: formData,
                        });
                        console.log(response);
                        let data = await response.json();
                        console.log(data.data)
                        window.alert(data.data)
                        updateRefresh(audiofilename)
                        updateaudiofileName("")
                    } catch (error) {
                        console.log(error);
                    }
                } else {
                    window.alert("more than 10 mb is mot allowed");
                }
            } else {
                window.alert("extension not allowed");
            }
        }
    }
    return (
        <div className='AudioFormContainer' id='AudioFormContainer'>
            <form onSubmit={submitTheaudiofile}>
                <h1>Select Audio file To Upload</h1>
                <label htmlFor="audiofile">{audiofilename === "" ? "Select file" : audiofilename}</label>
                <input type="file" onChange={(event) => {
                    updateaudiofile(event.target.files[0])
                    console.log(event.target.files[0]);
                    updateaudiofileName(event.target.files[0]?.name ? event.target.files[0].name : "")
                }} name="file" id="audiofile" required />
                <button type="submit">Submit file</button>
            </form>
        </div>
    )
}

export default AudioUpload