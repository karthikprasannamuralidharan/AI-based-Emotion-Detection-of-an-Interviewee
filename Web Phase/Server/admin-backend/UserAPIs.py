from App import *

Logged_in_User={
    "isLogin":False,
    "name":"Tarun",
    "id":""
}
def checkLogin():
    global Logged_in_User
    if Logged_in_User["isLogin"]==False:
        return "error"

@App.route("/")
def main():
    global Logged_in_User
    return f"Admin API {Logged_in_User['isLogin']}"

@App.route('/registeruser',methods=['POST','GET'])
def registerUser():
    global Logged_in_User
    if request.method=='POST':
        Database_Connection,queryExecuter=connectToDatabase()
        print("Post Method")
        user_data=request.json
        print(user_data)
        SQL_Query=f"SELECT * FROM users WHERE email='{user_data['email'].lower()}' OR phone='{user_data['phone']}'"
        queryExecuter.execute(SQL_Query)
        list_of_users=queryExecuter.fetchall()
        if len(list_of_users)>0:
            print("user already exists")
            queryExecuter.close()
            Database_Connection.close()
            return jsonify({"error":"true"})
        else:
            id=hashlib.md5(user_data['email'].lower().encode('utf-8'))
            id=id.hexdigest()
            password=hashlib.sha1(user_data['password'].encode('utf-8'))
            password=password.hexdigest()
            INSERT_Query=f"INSERT INTO users(id,name,email,password,phone) VALUES('{id}','{user_data['name']}','{user_data['email'].lower()}','{password}','{user_data['phone']}')"
            queryExecuter.execute(INSERT_Query)
            Database_Connection.commit()
            queryExecuter.close()
            Database_Connection.close()
            Logged_in_User["isLogin"]=True
            Logged_in_User["id"]=id
            Logged_in_User["name"]=user_data['name'].split()[0]
            return jsonify({"username":user_data['name'].split()[0]})
    else:
        return "False"

@App.route('/loginuser',methods=['POST','GET'])
def loginUser():
    global Logged_in_User
    if request.method=='POST':
        Database_Connection,queryExecuter=connectToDatabase()
        print("Post Method")
        user_data=request.json
        print(user_data)
        password=hashlib.sha1(user_data['password'].encode('utf-8'))
        password=password.hexdigest()
        SQL_Query=f"SELECT * FROM users WHERE email='{user_data['email'].lower()}' AND password='{password}'"
        queryExecuter.execute(SQL_Query)
        user=queryExecuter.fetchall()
        queryExecuter.close()
        Database_Connection.close()
        if len(user)>0:
            user=user[0]
            print("user found")
            Logged_in_User["isLogin"]=True
            Logged_in_User["id"]=user[0]
            Logged_in_User["name"]=user[1]
            return jsonify({"username":user[1].split()[0]})
        else:
            return jsonify({"error":"true"})
    else:
        return "False"

@App.route('/uploaduserfile',methods=['POST','GET'])
def uploadUserFile():
    global Logged_in_User
    if Logged_in_User["isLogin"]==False:
        return "error"
    if request.method=='POST':
        Database_Connection,queryExecuter=connectToDatabase()
        print(request.files['file'])
        file=request.files['file']
        file_name=file.filename
        file_name=file_name.replace("\"","_")
        file_name=file_name.replace("\'","_")
        old_file_name=file_name
        extension=file_name.split(".")[-1]
        print(extension)
        file_name_hash=hashlib.sha1(file_name.encode('utf-8'))
        file_name_hash=file_name_hash.hexdigest()
        file_name=f"{Logged_in_User['id']}{file_name_hash}.{extension}"
        print(file_name)
        file.filename=file_name
        Pre_SQL_Query=f"SELECT * FROM files WHERE storage_name='{file_name}';"
        queryExecuter.execute(Pre_SQL_Query)
        result=queryExecuter.fetchall()
        if len(result)==0:
            SQL_Query=f"INSERT INTO files(file_name,storage_name,uploaded_by) VALUES('{old_file_name}','{file_name}','{Logged_in_User['id']}');"
            queryExecuter.execute(SQL_Query)
            Database_Connection.commit()
            print("upload file is running")
            print(file)
            file.save(os.path.dirname(__file__)+f"\\Data\\files\\{file_name}")
            queryExecuter.close()
            Database_Connection.close()
            return jsonify({'data':"File is uploaded successfully"})
        else:
            queryExecuter.close()
            Database_Connection.close()
            return jsonify({'data':"File is already present, Please Choose Another file"})
    else:
        return "error"

@App.route('/uploadaudiofile',methods=['POST','GET'])
def uploadAudioFile():
    global Logged_in_User
    if Logged_in_User["isLogin"]==False:
        return "error"
    if request.method=='POST':
        Database_Connection,queryExecuter=connectToDatabase()
        print(request.files['file'])
        file=request.files['file']
        file_name=file.filename
        file_name=file_name.replace("\"","_")
        file_name=file_name.replace("\'","_")
        old_file_name=file_name
        extension=file_name.split(".")[-1]
        print(extension)
        file_name_hash=hashlib.sha1(file_name.encode('utf-8'))
        file_name_hash=file_name_hash.hexdigest()
        file_name=f"{Logged_in_User['id']}{file_name_hash}.{extension}"
        print(file_name)
        file.filename=file_name
        Pre_SQL_Query=f"SELECT * FROM files WHERE storage_name='{file_name}';"
        queryExecuter.execute(Pre_SQL_Query)
        result=queryExecuter.fetchall()
        if len(result)==0:
            SQL_Query=f"INSERT INTO files(file_name,storage_name,uploaded_by,type) VALUES('{old_file_name}','{file_name}','{Logged_in_User['id']}','audio');"
            queryExecuter.execute(SQL_Query)
            Database_Connection.commit()
            print("upload file is running")
            print(file)
            file.save(os.path.dirname(__file__)+f"\\Data\\files\\{file_name}")
            queryExecuter.close()
            Database_Connection.close()
            return jsonify({'data':"File is uploaded successfully"})
        else:
            queryExecuter.close()
            Database_Connection.close()
            return jsonify({'data':"File is already present, Please Choose Another file"})
    else:
        return "error"

@App.route("/getuserreport",methods=['POST','GET'])
def getUserReport():
    global Logged_in_User
    if Logged_in_User["isLogin"]==False:
        return "error"
    if request.method=='POST':
        Database_Connection,queryExecuter=connectToDatabase()
        SQL_Query=f"SELECT * FROM files WHERE id={request.json['id']} and uploaded_by='{Logged_in_User['id']}'"
        queryExecuter.execute(SQL_Query)
        details=queryExecuter.fetchall()
        queryExecuter.close()
        Database_Connection.close()
        print(details)
        if len(details)>0:
            report_file_name=details[0][-2]
            with open("./Data/Reports/"+report_file_name,"r") as file:
                report=json.load(file)
                return jsonify({"report":report,"file_name":details[0][1]})
        else:
            return "error"
    else:
        return "error"

@App.route("/getuploadedfilelistofuser",methods=['POST','GET'])
def getUploadedFilesListofUser():
    global Logged_in_User
    if Logged_in_User["isLogin"]==False:
        return "error"
    if request.method=='POST':
        Database_Connection,queryExecuter=connectToDatabase()
        SQL_Query=f"SELECT * FROM files WHERE uploaded_by='{Logged_in_User['id']}';"
        queryExecuter.execute(SQL_Query)
        list_of_files=queryExecuter.fetchall()
        print(list_of_files)
        queryExecuter.close()
        Database_Connection.close()
        return jsonify({"data":list_of_files})
    else:
        return "error"
    
@App.route("/getuploadedvideolistofuser",methods=['POST','GET'])
def getUploadedVideosListofUser():
    global Logged_in_User
    if Logged_in_User["isLogin"]==False:
        return "error"
    if request.method=='POST':
        Database_Connection,queryExecuter=connectToDatabase()
        SQL_Query=f"SELECT * FROM files WHERE uploaded_by='{Logged_in_User['id']}' and type='video';"
        queryExecuter.execute(SQL_Query)
        list_of_files=queryExecuter.fetchall()
        print(list_of_files)
        queryExecuter.close()
        Database_Connection.close()
        return jsonify({"data":list_of_files})
    else:
        return "error"
@App.route("/getuploadedaudiolistofuser",methods=['POST','GET'])
def getUploadedAudiosListofUser():
    global Logged_in_User
    if Logged_in_User["isLogin"]==False:
        return "error"
    if request.method=='POST':
        Database_Connection,queryExecuter=connectToDatabase()
        SQL_Query=f"SELECT * FROM files WHERE uploaded_by='{Logged_in_User['id']}' and type='audio';"
        queryExecuter.execute(SQL_Query)
        list_of_files=queryExecuter.fetchall()
        print(list_of_files)
        queryExecuter.close()
        Database_Connection.close()
        return jsonify({"data":list_of_files})
    else:
        return "error"

@App.route("/recordvideo",methods=["POST"])
def recordVideo():
    global Logged_in_User
    if Logged_in_User["isLogin"]==False:
        return "error"
    if request.method=='POST':
        audio=pyaudio.PyAudio()
        stream=audio.open(
            format=pyaudio.paInt16,channels=1,rate=44100, input=True,frames_per_buffer=1024
        )
        frames=[]
        video=cv2.VideoCapture(0)
        video_file_name=f'Data/Temporary_Storage/{round(time.time()*1000)}.mp4'
        audio_file_name=f'Data/Temporary_Storage/{round(time.time()*1000)}.wav'
        videoWriter=None
        is_recording_started=False
        while True:
            ret,frame= video.read()
            if is_recording_started:
                data=stream.read(1024)
                frames.append(data)
                videoWriter.write(frame)
                cv2.putText(frame, "Recording is in progress", (80,30),color=(255,0,0),fontFace=cv2.FONT_ITALIC,fontScale=1,thickness=2)
            else:
                cv2.putText(frame, "Recording is not yet started", (100,30),color=(0,0,255),fontFace=cv2.FONT_ITALIC,fontScale=1,thickness=2)
            cv2.imshow('frame', frame)
            if cv2.waitKey(1)==32:
                is_recording_started=True
                video.release()
                video=cv2.VideoCapture(0)
                videoWriter=cv2.VideoWriter(video_file_name, cv2.VideoWriter_fourcc(*'DIVX'), 20, (640,480))
            if cv2.waitKey(2)==ord('q'):
                break
        stream.start_stream()
        stream.close()
        audio.terminate()
        file=wave.open(audio_file_name,'wb')
        file.setnchannels(1)
        file.setsampwidth(
            audio.get_sample_size(pyaudio.paInt16)
        )
        file.setframerate(44100)
        file.writeframes(b''.join(frames))
        video.release()
        videoWriter.release()
        cv2.destroyAllWindows()
        video_clip = VideoFileClip(video_file_name)
        audio_clip = AudioFileClip(audio_file_name)
        final_clip = video_clip.set_audio(audio_clip)
        file_name="recording"+str(round(time.time()*1000))+".mp4"
        old_file_name=file_name
        file_name_hash=hashlib.sha1(file_name.encode('utf-8'))
        file_name_hash=file_name_hash.hexdigest()
        file_name=f"{Logged_in_User['id']}{file_name_hash}.mp4"
        print(file_name)
        final_clip.write_videofile(f"./Data/files/"+file_name)
        file.filename=file_name
        Pre_SQL_Query=f"SELECT * FROM files WHERE storage_name='{file_name}';"
        Database_Connection,queryExecuter=connectToDatabase()
        queryExecuter.execute(Pre_SQL_Query)
        result=queryExecuter.fetchall()
        if len(result)==0:
            SQL_Query=f"INSERT INTO files(file_name,storage_name,uploaded_by,type) VALUES('{old_file_name}','{file_name}','{Logged_in_User['id']}','video');"
            queryExecuter.execute(SQL_Query)
            Database_Connection.commit()
            print("upload file is running")
            return jsonify({"isDone":"Yes"})
        queryExecuter.close()
        Database_Connection.close()
    else:
        return "error"




@App.route("/checkauthentication",methods=['POST','GET'])
def checkAuthentication():
    if Logged_in_User["isLogin"]==True:
        return jsonify({
            "response":{
            "name":Logged_in_User["name"]
            }
        })
    else:
        return jsonify({
            "response":"error"
        }),404
