import './App.css';
import './Styles/index.scss';
import { Routes, Route } from "react-router-dom";
import Home from './Components/Home/Home';
import { createContext, useEffect, useReducer } from 'react';
import { userInitialState, updateUser } from './Contexts/UserContext';
import Logout from './Components/Templates/Logout';
import Login from './Components/Login/Login';
import { AnimatePresence, checkTargetForNewValues } from "framer-motion"
import Dashboard from './Components/Dashboard/Dashboard';
import Report from './Components/Report/Report';
import AudioReportPage from './Components/Report/AudioReport';
import AudioReport from './Components/Dashboard/AudioReport';
import TextReport from './Components/Report/TextReport';
import VideoReport from './Components/Dashboard/VideoReport';

let userContext = createContext()
function App() {
    let [login, updateLoginState] = useReducer(updateUser, userInitialState);
    async function CheckUthentication() {
        try {
            let response=await fetch("/checkauthentication",{
                method:"POST",
                headers:{
                    "Content-Type":"Application/json"
                }
            })
            if(response.status===200){
                let result=await response.json();
                updateLoginState({ type: "LOGIN", user: true, username: result?.response?.name })
            }else{
                updateLoginState({ type: "LOGOUT", user: false, username: null })
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(()=>{
        CheckUthentication()
    },[])
    return (
        <AnimatePresence>
            <userContext.Provider value={{ login, updateLoginState }}>
                <Routes>
                    <Route path="/" element={<Home />}></Route>
                    <Route path="/login" element={<Login />}></Route>
                    <Route path="/dashboard" element={<Dashboard />}></Route>
                    <Route path="/report/:id" element={<Report />}></Route>
                    <Route path="/audioreport/:id" element={<AudioReportPage />}></Route>
                    <Route path="/videoreport" element={<VideoReport />}></Route>
                    <Route path="/audioreport" element={<AudioReport />}></Route>
                    <Route path="/textreport" element={<TextReport />}></Route>
                    <Route path="/logout" element={<Logout />}></Route>
                </Routes>
            </userContext.Provider>
        </AnimatePresence>
    );
}

export default App;
export { userContext }
