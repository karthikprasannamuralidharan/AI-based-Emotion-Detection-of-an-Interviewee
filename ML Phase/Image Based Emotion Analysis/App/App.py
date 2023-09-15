from flask import Flask,render_template,redirect,request,jsonify
import os
import time
from Processor.ModelProcessor import *
from Processor.LiveVideoProcessor import *
from Processor.Variables import *
face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
inputProcessor=PreprocessInput(face_cascade)
modelProcessor=ModelProcessor()
modelProcessor.setModel("../Model/TransferLearningModel.h5")

App=Flask(__name__)

file_name=""
live_data=[0]
current_index=0

@App.route("/")
def index():
    return render_template("index.html")

@App.route("/live_prediction")
def live_prediction():
    return render_template("live_emotion.html")

@App.route("/prediction")
def prediction():
    return render_template("prediction.html")


@App.route('/upload_file',methods=['POST','GET'])
def upload():
    global file_name
    if request.method=='POST':
        print(request.files['file'])
        file=request.files['file']
        file_name=file.filename
        extension=file_name.split(".")[-1]
        print(extension)
        file_name=f"input_image.{extension}"
        print(file_name)
        file_path=f"/static/Files/{file_name}"
        file.filename=file_name
        print(file)
        file.save(os.path.dirname(__file__)+f"\\static\\Files\\{file_name}")
        return jsonify({'image_path':file_path})
    else:
        return "error"


@App.route('/get_mage_prediction',methods=['POST','GET'])
def getImagePrediction():
    global file_name
    if request.method=='POST':
        print("Post Method")
        if file_name!="":
            print("File Found")
            image_array=inputProcessor.preprocessTransferLearningInput(f"./static/Files/{file_name}")
            try:
                print(image_array.shape)
                prediction=modelProcessor.predictClass(image_array)
                print(prediction)
                return jsonify({'error':False,"emotion":prediction})
            except:
                return jsonify({'error':True,"emotion":"Image is Not Recognized"})
        else:
            return "ERROR"
    else:
        return "ERROR"


@App.route("/start_live_prediction",methods=['POST','GET'])
def startLivePrediction():
    global live_data
    if request.method=='POST':
        print("Post Method")
        vid = cv2.VideoCapture(0)
        print("Recording is started")
        print("PRESS q TO STOP THE RECORDING")
        while True:
            ret, frame = vid.read()
            faces_rect = face_cascade.detectMultiScale(frame)
            for (x, y, w, h) in faces_rect:
                cv2.rectangle(frame, (x, y), (x+w, y+h), (0, 255, 0), 2)
                image_array=frame[y:y+h,x:x+w]
                image_array=cv2.resize(image_array,(224,224))
                print(image_array.shape)
                image_array=numpy.array([image_array])
                print(image_array.shape)
                prediction=modelProcessor.predictClass(image_array)
                print(prediction)
                live_data.append(class_list.index(prediction))
                cv2.putText(frame, prediction, (y,x),color=(255,0,255),fontFace=cv2.FONT_ITALIC,fontScale=1)
                break
            frame=cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            cv2.imshow(f"Capturing Frame",frame)
            if cv2.waitKey(2)==ord('q'):
                break
        vid.release()
        cv2.destroyAllWindows()
        return "Success"
    else:
        return "ERROR"

@App.route("/get_live_prediction",methods=['POST','GET'])
def getLivePrediction():
    global live_data,current_index
    if request.method=='POST':
        print("live data is fetched")
        data=live_data[current_index:]
        range_=list(range(current_index,len(live_data)))
        current_index=len(live_data)
        return jsonify({"live_data1":data,"live_data2":range_})
    else:
        return "ERROR"


