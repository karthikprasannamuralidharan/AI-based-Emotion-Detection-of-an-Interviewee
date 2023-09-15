from App import *
Logged_in_Admin={
    "isLogin":True,
    "username":"Tarun",
    "id":""
}

@App.route("/admin")
def hello():
    global value
    value+=1
    return f"Admin API {value}"

@App.route('/getuserlist',methods=['POST','GET'])
def getUserList():
    global Logged_in_Admin
    if Logged_in_Admin["isLogin"]==False:
        return "error"
    if request.method=='POST':
        Database_Connection,queryExecuter=connectToDatabase()
        print("Post Method")
        SQL_Query="SELECT * FROM users"
        queryExecuter.execute(SQL_Query)
        list_of_users=queryExecuter.fetchall()
        print(list_of_users)
        queryExecuter.close()
        Database_Connection.close()
        return jsonify({"users_list":list_of_users})
    else:
        return "False"

@App.route('/getvideolist',methods=['POST','GET'])
def getVideoList():
    global Logged_in_Admin
    if Logged_in_Admin["isLogin"]==False:
        return "error"
    if request.method=='POST':
        Database_Connection,queryExecuter=connectToDatabase()
        print("Post Method")
        SQL_Query="SELECT * FROM files"
        queryExecuter.execute(SQL_Query)
        list_of_files=queryExecuter.fetchall()
        print(list_of_files)
        queryExecuter.close()
        Database_Connection.close()
        return jsonify({"files_list":list_of_files})
    else:
        return "False"

@App.route('/getreportlist',methods=['POST','GET'])
def getReportList():
    global Logged_in_Admin
    if Logged_in_Admin["isLogin"]==False:
        return "error"
    if request.method=='POST':
        Database_Connection,queryExecuter=connectToDatabase()
        print("Post Method")
        SQL_Query="SELECT * FROM files WHERE is_report_is_ready='Yes';"
        queryExecuter.execute(SQL_Query)
        report_list=queryExecuter.fetchall()
        print(report_list)
        queryExecuter.close()
        Database_Connection.close()
        return jsonify({"report_list":report_list})
    else:
        return "False"

@App.route('/registeradmin',methods=['POST','GET'])
def registerAdmin():
    global Logged_in_Admin
    if request.method=='POST':
        Database_Connection,queryExecuter=connectToDatabase()
        print("Post Method")
        admin_data=request.json
        print(admin_data)
        SQL_Query=f"SELECT * FROM admins WHERE username='{admin_data['username']}' OR email='{admin_data['email']}'"
        queryExecuter.execute(SQL_Query)
        list_of_users=queryExecuter.fetchall()
        if len(list_of_users)>0:
            print("user already exists")
            queryExecuter.close()
            Database_Connection.close()
            return jsonify({"data":"admin already exists with same username or email or phone"})
        else:
            id=hashlib.md5(admin_data['email'].encode('utf-8'))
            id=id.hexdigest()
            password=hashlib.sha1(admin_data['password'].encode('utf-8'))
            password=password.hexdigest()
            INSERT_Query=f"INSERT INTO admins(id,name,email,password,username) VALUES('{id}','{admin_data['name']}','{admin_data['email']}','{password}','{admin_data['username']}')"
            queryExecuter.execute(INSERT_Query)
            Database_Connection.commit()
            queryExecuter.close()
            Database_Connection.close()
            return "True"
    else:
        return "False"
@App.route('/loginadmin',methods=['POST','GET'])
def loginAdmin():
    global Logged_in_Admin
    if request.method=='POST':
        Database_Connection,queryExecuter=connectToDatabase()
        print("Post Method")
        user_data=request.json
        print(user_data)
        password=hashlib.sha1(user_data['password'].encode('utf-8'))
        password=password.hexdigest()
        SQL_Query=f"SELECT * FROM admins WHERE username='{user_data['username']}' AND password='{password}'"
        queryExecuter.execute(SQL_Query)
        list_of_admins=queryExecuter.fetchall()
        queryExecuter.close()
        Database_Connection.close()
        if len(list_of_admins)>0:
            print("admin found")
            Logged_in_Admin["id"]=list_of_admins[0][0]
            Logged_in_Admin["isLogin"]=True
            Logged_in_Admin["username"]=list_of_admins[0][-1]
            return jsonify({"username":list_of_admins[0][-1]})
        else:
            return jsonify({"response":"admin Not Found"}),404
    else:
        return "False"

@App.route('/uploadadminfile',methods=['POST','GET'])
def uploadAdminFile():
    global Logged_in_Admin
    if Logged_in_Admin["isLogin"]==False:
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
        file_name=f"{Logged_in_Admin['id']}{file_name_hash}.{extension}"
        print(file_name)
        file.filename=file_name
        Pre_SQL_Query=f"SELECT * FROM files WHERE storage_name='{file_name}';"
        queryExecuter.execute(Pre_SQL_Query)
        result=queryExecuter.fetchall()
        if len(result)==0:
            SQL_Query=f"INSERT INTO files(file_name,storage_name,uploaded_by) VALUES('{old_file_name}','{file_name}','{Logged_in_Admin['id']}');"
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




@App.route("/getuploadedfilelistofadmin",methods=['POST','GET'])
def getUploadedFilesList():
    global Logged_in_Admin
    if Logged_in_Admin["isLogin"]==False:
        return "error"
    if request.method=='POST':
        Database_Connection,queryExecuter=connectToDatabase()
        SQL_Query=f"SELECT * FROM files WHERE uploaded_by='{Logged_in_Admin['id']}';"
        queryExecuter.execute(SQL_Query)
        list_of_files=queryExecuter.fetchall()
        print(list_of_files)
        queryExecuter.close()
        Database_Connection.close()
        return jsonify({"data":list_of_files})
    else:
        return "error"



@App.route("/deleteuser",methods=['POST','GET'])
def deleteUser():
    global Logged_in_Admin
    if Logged_in_Admin["isLogin"]==False:
        return "error"
    if request.method=='POST':
        Database_Connection,queryExecuter=connectToDatabase()
        SQL_Query=f"DELETE FROM users WHERE id='{request.json['id']}'"
        queryExecuter.execute(SQL_Query)
        Database_Connection.commit()
        queryExecuter.close()
        Database_Connection.close()
        return jsonify({"data":"Deleted Successfully"})
    else:
        return "error"




















