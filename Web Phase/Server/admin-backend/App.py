from flask import Flask,request,jsonify
import mysql.connector
import hashlib
import os
import time
from Integration.Integrator import Integrator
import cv2
import json
import cv2
import time
import pyaudio
import wave
from moviepy.editor import VideoFileClip, AudioFileClip, concatenate_videoclips


with open('../../Utils/database_config.env') as file:
    credentials=file.read()
credentials=credentials.split(" ")
def connectToDatabase():
    Database_Connection = mysql.connector.connect(username=credentials[0],password=credentials[1],host=credentials[2],port=int(credentials[3]),database=credentials[4])
    queryExecuter=Database_Connection.cursor()
    print("connected to database")
    return Database_Connection,queryExecuter

App=Flask(__name__)
face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')


@App.route("/generatereport",methods=['POST','GET'])
def generateReport():
    if request.method=='POST':
        Database_Connection,queryExecuter=connectToDatabase()
        print("Report Generator is started")
        Pre_SQL_Query=f"UPDATE files SET is_report_is_ready='Working' WHERE id={request.json['id']}"
        queryExecuter.execute(Pre_SQL_Query)
        Database_Connection.commit()
        SELECT_Query=f"SELECT * FROM files WHERE id={request.json['id']}"
        queryExecuter.execute(SELECT_Query)
        result=queryExecuter.fetchone()
        print(result[2])
        video_file_name=result[2]
        milliseconds_value=round(time.time()*1000)
        print("Generating Report")
        integrator=Integrator()
        integrator.setModelsAndParameters(
            face_cascade=face_cascade,
            audio_recognizer_model_path="../../Utils/Audio_Recognizer_Model",
            image_model="../../Model/Image/TransferLearningModel.h5",
            audio_model="../../Model/Audio/DefinedModel.h5",
            text_model="../../Model/Text/Model.joblib",
            text_vectorizer="../../Model/Text/Vectorizer.pickle"
        )
        integrator.setFilePaths(
            file_name="./Data/files/"+video_file_name,
            audio_file_path="./Data/Segmented_Outputs/Audio/audio.wav",
            mono_sound_path="./Data/Segmented_Outputs/Audio/mono_sound.wav",
            output_transcript_file_path="./Data/Segmented_Outputs/Text/transcript.json",
            output_timestamp_json_path="./Data/Segmented_Outputs/Text/timestamp.json"
        )
        integrator.generateOutputs()
        report= integrator.getOutputs()
        print(integrator.getWordCountStats())
        print(report)
        integrator.saveReport(f"./Data/Reports/{milliseconds_value}.json")
        Pre_SQL_Query=f"UPDATE files SET is_report_is_ready='Yes',report_file_name='{milliseconds_value}.json',report_creation_time=CURRENT_TIMESTAMP WHERE id={request.json['id']}"
        queryExecuter.execute(Pre_SQL_Query)
        Database_Connection.commit()
        queryExecuter.close()
        Database_Connection.close()
        return jsonify({"report":report})
    else:
        return "error"
    
@App.route("/generateaudioreport",methods=['POST','GET'])
def generateAudioReport():
    if request.method=='POST':
        Database_Connection,queryExecuter=connectToDatabase()
        print("Report Generator is started")
        Pre_SQL_Query=f"UPDATE files SET is_report_is_ready='Working' WHERE id={request.json['id']}"
        queryExecuter.execute(Pre_SQL_Query)
        Database_Connection.commit()
        SELECT_Query=f"SELECT * FROM files WHERE id={request.json['id']}"
        queryExecuter.execute(SELECT_Query)
        result=queryExecuter.fetchone()
        print(result[2])
        audio_file_name=result[2]
        milliseconds_value=round(time.time()*1000)
        print("Generating Report......")
        integrator=Integrator()
        integrator.setModelsAndParameters(
            audio_recognizer_model_path="../../Utils/Audio_Recognizer_Model",
            audio_model="../../Model/Audio/DefinedModel.h5",
            text_model="../../Model/Text/Model.joblib",
            text_vectorizer="../../Model/Text/Vectorizer.pickle"
        )
        integrator.setFilePaths(
            audio_file_path="./Data/files/"+audio_file_name,
            mono_sound_path="./Data/Segmented_Outputs/Audio/mono_sound.wav",
            output_transcript_file_path="./Data/Segmented_Outputs/Text/transcript.json",
            output_timestamp_json_path="./Data/Segmented_Outputs/Text/timestamp.json"
        )
        integrator.generateAudioOutputs()
        report= integrator.getAudioOutputs()
        print(report)
        integrator.saveReport(f"./Data/Reports/{milliseconds_value}.json")
        Pre_SQL_Query=f"UPDATE files SET is_report_is_ready='Yes',report_file_name='{milliseconds_value}.json',report_creation_time=CURRENT_TIMESTAMP WHERE id={request.json['id']}"
        queryExecuter.execute(Pre_SQL_Query)
        Database_Connection.commit()
        queryExecuter.close()
        Database_Connection.close()
        return jsonify({"report":report})
    else:
        return "error"    

@App.route("/gettextreport",methods=['POST','GET'])
def generateTextReport():
    if request.method=='POST':
        print("Generating Report")
        integrator=Integrator()
        integrator.setModelsAndParameters(
            text_model="../../Model/Text/Model.joblib",
            text_vectorizer="../../Model/Text/Vectorizer.pickle"
        )
        report= integrator.getTextReport(request.json['transcript'])
        print(report)
        return jsonify({"report":report})
    else:
        return "error"

@App.route("/getreport",methods=['POST','GET'])
def getReport():
    if request.method=='POST':
        Database_Connection,queryExecuter=connectToDatabase()
        SQL_Query=f"SELECT * FROM files WHERE id={request.json['id']}"
        queryExecuter.execute(SQL_Query)
        details=queryExecuter.fetchall()
        queryExecuter.close()
        Database_Connection.close()
        print(details)
        if len(details)>0:
            report_file_name=details[0][-1]
            with open("./Data/Reports/"+report_file_name,"r") as file:
                report=json.load(file)
                return jsonify({"report":report,"file_name":details[0][1]})
        else:
            return "error"
    else:
        return "error"

@App.route("/deletefile",methods=['POST','GET'])
def deleteFile():
    if request.method=='POST':
        Database_Connection,queryExecuter=connectToDatabase()
        SQL_Query=f"SELECT * FROM files WHERE id={request.json['id']}"
        queryExecuter.execute(SQL_Query)
        video=queryExecuter.fetchone()
        print(video)
        os.remove(f"./Data/files/{video[2]}")
        SQL_Query=f"DELETE FROM files WHERE id={request.json['id']}"
        queryExecuter.execute(SQL_Query)
        Database_Connection.commit()
        queryExecuter.close()
        Database_Connection.close()
        return jsonify({"data":"Deleted Successfully"})
    else:
        return "error"
    

def checkPendingReports():
    Database_Connection,queryExecuter=connectToDatabase()
    queryExecuter.execute("SELECT id FROM files WHERE is_report_is_ready='Working'")
    result=queryExecuter.fetchall()
    print(result)
    if len(result)>0:
        print("need to restart pending work")
        queryExecuter.execute(f"UPDATE files SET is_report_is_ready='No' WHERE is_report_is_ready='Working'")
        Database_Connection.commit()
    else:
        print("No pending work")
    Database_Connection.close()


@App.route("/change_working_status/<id>")
def changeWorkingStatus(id):
    Database_Connection,queryExecuter=connectToDatabase()
    queryExecuter.execute(f"UPDATE files SET is_report_is_ready='No' WHERE is_report_is_ready='Working'")
    Database_Connection.close()

