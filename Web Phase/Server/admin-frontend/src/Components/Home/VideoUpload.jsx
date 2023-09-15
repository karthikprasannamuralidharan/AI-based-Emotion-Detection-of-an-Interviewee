import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

function VideoUpload({ updateRefresh }) {
    let [file, updateFile] = useState(null)
    let [filename, updateFileName] = useState("Select File")
    useEffect(() => {
        console.log(file);
    }, [file])
    async function submitTheFile(event) {
        event.preventDefault()
        console.log(file);
        if (!!file && filename != "") {
            console.log(file.name);
            let extension = file.name.split(".")[file.name.split(".").length - 1];
            console.log(extension);
            if (
                extension.toLowerCase() == "wmv" ||
                extension.toLowerCase() == "mp4" ||
                extension.toLowerCase() == "avi"
            ) {
                console.log("extension accepted");
                if (file.size < 100000000) {
                    try {
                        let formData = new FormData();
                        formData.append("file", file ? file : "");
                        let response = await fetch("/uploadadminfile", {
                            method: "POST",
                            body: formData,
                        });
                        console.log(response);
                        let data = await response.json();
                        console.log(data.data)
                        window.alert(data.data)
                        updateRefresh(filename)
                        updateFileName("")
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
        <div className='VideoFormContainer'>
            <form onSubmit={submitTheFile}>
                <h1>Select File To Upload</h1>
                <label htmlFor="file">{filename == "" ? "Select File" : filename}</label>
                <input type="file" onChange={(event) => {
                    updateFile(event.target.files[0])
                    console.log(event.target.files[0]);
                    updateFileName(event.target.files[0]?.name ? event.target.files[0].name : "")
                }} name="file" id="file" required />
                <button type="submit">Submit File</button>
            </form>
        </div>
    )
}

export default VideoUpload