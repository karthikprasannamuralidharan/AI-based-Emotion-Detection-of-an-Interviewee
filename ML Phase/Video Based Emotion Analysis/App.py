from flask import Flask,render_template,redirect,request,jsonify
from Ensembler.ModelProcessor import *
from Decomposer.Decomposer import *
import os
import json

decomposer=Decomposer()
preProcessor=PreProcessor()
emotionPredictor=VideoEmotionPrediction()
face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')

App=Flask(__name__)

file_name=""

@App.route("/")
def prediction():
    return render_template("index.html")


@App.route('/upload_file',methods=['POST','GET'])
def upload():
    global file_name
    if request.method=='POST':
        print(request.files['file'])
        file=request.files['file']
        file_name=file.filename
        extension=file_name.split(".")[-1]
        print(extension)
        file_name=f"input_video.{extension}"
        print(file_name)
        file_path=f"/static/Files/{file_name}"
        file.filename=file_name
        print(file)
        file.save(os.path.dirname(__file__)+f"\\static\\Files\\{file_name}")
        return jsonify({'video_path':file_path})
    else:
        return "error"


@App.route('/get_video_prediction',methods=['POST','GET'])
def getVideoPrediction():
    global file_name
    if request.method=='POST':
        print("Post Method")
        if file_name!="":
            print("File Found")
            decomposer.setVideoFile(f"./static/Files/{file_name}")
            images_array=decomposer.getImageArrayOfIntervals()
            decomposer.convertVideoToAudio("./Segmented_Outputs/Audio/audio.wav")
            decomposer.convertAudioToText(model_path="../Utils/Audio_Recognizer_Model",mono_sound_path="./Segmented_Outputs/Audio/mono_sound.wav",output_transcript_file_path="./Segmented_Outputs/Text/transcript.json",output_timestamp_json_path="./Segmented_Outputs/Text/timestamp.json"
            )
            array_of_image_array=preProcessor.imageArrayPreprocessor(images_array,face_cascade)
            mfcc_values=preProcessor.audioArrayProcessor("./Segmented_Outputs/Audio/audio.wav")
            with open("./Segmented_Outputs/Text/transcript.json") as file:
                text_array=json.load(file)
            text_vector=preProcessor.textArrayProcessor("../Text Based Emotion Analysis/Model/Vectorizer.pickle",text_array)
            images_predictions=emotionPredictor.getImagepredictions("../Image Based Emotion Analysis/Model/TransferLearningModel.h5",array_of_image_array)
            audio_predictions=emotionPredictor.getAudioPredictions("../Audio Based Emotion Analysis/Model/DefinedModel.h5",mfcc_values)
            text_predictions=emotionPredictor.getTextualPredictions("../Text Based Emotion Analysis/Model/Model.joblib",text_vector)
            final_prediction=emotionPredictor.getCumulativePredictions()
            print(final_prediction)
            return jsonify({'error':False,"emotion":final_prediction})
        else:
            return "ERROR"
    else:
        return "ERROR"
