<h1 align="center" style="text-align: center;font-size: 50px;">AI Based Emotion Detection System of Interview</h1>

# Version 1.5.0

## This Project is Being Created Using Machine Learning, Image Processing, Natural Language Processing and Deep Learning Approach
### Final Year Major Project

<hr>
<h3>Created by :</h3>
<ul>
    <li>RUSHIKESH A. GHODAKE</li>
    <li>AADITYA JADHAV</li>
    <li>KARTHIK MURALIDHARAN</li>
    <li>G. TARUN VARMA</li>
</ul>
<hr>

## Types of Systems is get Developed
<ol>
        <li>Transcript Emotion Detection System</li>
        <li>Image Emotion Detection System</li>
        <li>Audio Emotion Detection System</li>
        <li>Video Emotion Detection System</li>
</ol>
All above systems will be developed independently and final integrated system will be used for Interview Result Prediction
<hr/>

## Requirements
<ul>
        <li>Python <=3.10.8</li>
        <li>Node.JS <=18.12.1</li>
        <li>Mysql >=8.0</li>
        <li>Data Folders Must be placed correctly in there respective folders available in Google Drive</li>
        <li>All .env files must be created for correct execution of project</li>
</ul>

## How to setup
here . (dot) represents root folder of this project
<ol>
        <li>First Clone this repository</li>
        <li>And The Traverse to root Folder</li>
        <li>Now install all the modules written in requirement.txt or from root folder run <button>pip install -r requirements.txt</button></li>
        <li>Open Terminal and Now Go to ./Server/admin-frontend and run <button>npm install</button></li>
        <li>Open Terminal and Now Go to ./User-Application" and run <button>npm install</button></li>
        <li>Setup Database (all SQL queries are available in ./Utils Folder)</li>
        <li>Now in Utils Folder create a fine named <button>database_config.env</button> and write your configuration of database in following format
        <div><button>username password server port database</button></div>
        </li>
        <li>All Modules have one Data folder in it, paste respected folders in there respected Data Folders available in Google Drive of owner of this Project </li>
</ol>
<hr>

## How to Run
<ul>
        <li>1-> ./Audio Based Emotion Analysis
                <ul>
                        <li>Goto ./Audio Based Emotion Analysis/App/ and run <button>Python index.py</button></li>
                </ul>
        </li>
        <li>2-> ./Image Based Emotion Analysis
                <ul>
                        <li>Goto ./Image Based Emotion Analysis/App/ and run <button>Python index.py</button></li>
                </ul>
        </li>
        <li>3-> ./Text Based Emotion Analysis
                <ul>
                        <li>Goto ./Text Based Emotion Analysis/App/ and run <button>Python index.py</button></li>
                </ul>
        </li>
        <li>4-> ./Video Based Emotion Analysis
                <ul>
                        <li>Goto ./Video Based Emotion Analysis/App/ and run <button>Python index.py</button></li>
                </ul>
        </li>
        <li>5-> ./Server
                <ul>
                        <li>Goto ./Server/admin-backend/ and run <button>Python index.py</button></li>
                </ul>
                <ul>
                        <li>Goto ./Server/admin-frontend/ and run <button>npm start</button></li>
                </ul>
        </li>
        <li>6-> ./Server
                <ul>
                        <li>Goto ./User-Application/ and run <button>npm start</button></li>
                </ul>
        </li>
        <li>NOTE: <strong>For only Report Generation Purpose, only run 5th and 6th points from above(Others are exception)</strong></li>
        <li>But to run all above commands from 1 to 6 is excepted for better performance </li>
</ul>


<hr/>





## Current Folder Structure
<pre style="line-height: 20px;">
                │_________.gitignore
                │_________README.md
                │_________requirements.txt
                │_________TODO.do
Module-4├───Audio Based Emotion Analysis
                │_________├───App
                │_________│_________│_________App.py
                │_________│_________│_________index.py
                │_________│_________│
                │_________│_________├───Processor
                │_________│_________│_________│_________AudioProcessor.py
                │_________│_________│_________│_________Variables.py
                │_________│_________│_________│___________init__.py
                │_________│_________│_________│
                │_________│_________│_________└───__pycache__
                │_________│_________│_________  AudioProcessor.cpython-310.pyc
                │_________│_________│_________  ModelProcessor.cpython-310.pyc
                │_________│_________│_________  Variables.cpython-310.pyc
                │_________│_________│_________  __init__.cpython-310.pyc
                │_________│_________│
                │_________│_________├───static
                │_________│_________│_________├───css
                │_________│_________│_________│_________ index.css
                │_________│_________│_________│_________ main.css
                │_________│_________│_________│
                │_________│_________│_________├───Files
                │_________│_________│_________└───js
                │_________│_________│_________  index.js
                │_________│_________│
                │_________│_________├───Templates
                │_________│_________│_________ index.html
                │_________│_________│
                │_________│_________└───__pycache__
                │_________│_________  App.cpython-310.pyc
                │_________│
                │_________|______├───Data
                |_________|______|_______Main_Data
                |_________|______|_______├───angry
                |_________|______|_______├───disgust
                |_________|______|_______├───fear
                |_________|______|_______├───happy
                |_________|______|_______├───sad
                |_________|______|_______└───surprise
                |_________|______|_______Preprocessed_Data
                │_________├───Model
                │_________│_________ DefinedModel.h5
                │_________│
                │_________├───Model_Implementation
                │_________│_________│_________defined_model_plot.png
                │_________│_________│_________Model_Implementation.ipynb
                │_________│_________│
                │_________│_________├───.ipynb_checkpoints
                │_________│_________│_________ Model_Implementation-checkpoint.ipynb
                │_________│_________│
                │_________│_________└───Models
                │_________│_________|__________DefinedModel.h5
                │_________│
                │_________├───Preprocessing
                |_________|_________│_________audio.wav
                |_________|_________│_________Hai-Apna-Dil-To-Awara-_-Dev-Anand-_-Waheeda-Rehman-_-Hemant-Kumar-_-Solva-Saal-_-OldisGold.mp3
                |_________|_________│_________Pre_Processing.ipynb
                |_________|_________│_________Speech_Fluency.ipynb
                |_________|_________│
                |_________|_________└───.ipynb_checkpoints
                |_________|_________|_________Pre_Processing-checkpoint.ipynb
                |_________|_________|_________Speech_Fluency-checkpoint.ipynb
                │_________│
                │_________└───Testing_Inputs
                │_________  Fear_Testing_Audio.wav
Module2├───Image Based Emotion Analysis
                │_________├───App
                │_________│_________│_________App.py
                │_________│_________│_________haarcascade_frontalcatface.xml
                │_________│_________│_________index.py
                │_________│_________│
                │_________│_________├───Processor
                │_________│_________│_________│_________LiveVideoProcessor.py
                │_________│_________│_________│_________ModelProcessor.py
                │_________│_________│_________│_________Variables.py
                │_________│_________│_________│___________init__.py
                │_________│_________│_________│
                │_________│_________│_________└───__pycache__
                │_________│_________│_________  LiveVideoProcessor.cpython-310.pyc
                │_________│_________│_________  ModelProcessor.cpython-310.pyc
                │_________│_________│_________  Variables.cpython-310.pyc
                │_________│_________│_________  __init__.cpython-310.pyc
                │_________│_________│
                │_________│_________├───static
                │_________│_________│_________├───css
                │_________│_________│_________│_________ index.css
                │_________│_________│_________│_________ main.css
                │_________│_________│_________│
                │_________│_________│_________├───Files
                │_________│_________│_________│_________ input_image.jpg
                │_________│_________│_________│_________ input_image.PNG
                │_________│_________│_________│
                │_________│_________│_________└───js
                │_________│_________│_________  index.js
                │_________│_________│
                │_________│_________├───Templates
                │_________│_________│_________ index.html
                │_________│_________│_________ live_emotion.html
                │_________│_________│_________ prediction.html
                │_________│_________│
                │_________│_________└───__pycache__
                │_________│_________  App.cpython-310.pyc
                │_________│
                │_________├───Data
                │_________├───Model
                │_________│_________TransferLearningModel.h5
                |_________|_________TransferLearningModelEfficientNetB7.h5
                │_________│
                │_________├───Model_Implementation
                │_________│_________│_________defined_model_plot.png
                │_________│_________│_________haarcascade_frontalcatface.xml
                │_________│_________│_________Model_Implementation_(By_self_Definition) .ipynb
                │_________│_________│_________Model_Implementation_(by_Transfer_Learning).ipynb
                │_________│_________│_________Model_Implementation.ipynb
                │_________│_________│
                │_________│_________├───.ipynb_checkpoints
                │_________│_________│_________ Model_Implementation_(By_self_Definition) -checkpoint.ipynb
                │_________│_________│_________ Model_Implementation_(by_Transfer_Learning)-checkpoint.ipynb
                │_________│_________│
                │_________│_________└───Models
                │_________│_________  DefinedModel.h5
                │_________│_________  TransferLearningModel.h5
                │_________│
                │_________├───Preprocessing
                │_________│_________│_________Pre_Processing.ipynb
                │_________│_________│_________Pre_Processing_for_Transfer_Learning.ipynb
                │_________│_________│
                │_________│_________└───.ipynb_checkpoints
                │_________│_________  Pre_Processing-checkpoint.ipynb
                │_________│_________  Pre_Processing_for_Transfer_Learning-checkpoint.ipynb
                │_________│
                │_________└───Testing_Inputs
                │_________  IMG-20221203-WA0000.jpg
                │_________  IMG-20221203-WA0001.jpg
                │_________  IMG-20221203-WA0002.jpg
                │_________  IMG-20221203-WA0003.jpg
                │_________  IMG20221102161911.jpg
                │_________  IMG20221102161911_01.jpg
Module3├───Server
                │_________AdminAPI.py
                │_________App.py
                │_________haarcascade_frontalcatface.xml
                │_________index.py
                │_________UserAPIs.py
                │
                ├───Data
                │_________├───files
                │_________│_________    03db54f6898051868d7d6c540d4e81f13644e7f2eca3424194d4f1f7267ffabdb3c61cbb.wav
                │_________│_________    03db54f6898051868d7d6c540d4e81f172b5085626623c147abef3152b40f2bad1afb184.wav
                │_________│_________    03db54f6898051868d7d6c540d4e81f18a5441e1e33db7b867ac5819c9c452d9fa5a96c4.mp4
                │_________│_________    03db54f6898051868d7d6c540d4e81f1cc2fe6828e051e19f2963345ee7245edda57e686.wav
                │_________│_________    03db54f6898051868d7d6c540d4e81f1df15edcc74fa22d929912a4189872694d3c1554d.avi
                │_________│_________    9e49767130418c2f84274331135a6906df15edcc74fa22d929912a4189872694d3c1554d.avi
                │_________│_________    recording1677641158039.mp4
                │_________│
                │_________├───Reports
                │_________│_________    1673184963466.json
                │_________│_________    1673368757834.json
                │_________│_________    1677027707585.json
                │_________│_________    1677633508451.json
                │_________│_________    1677634516293.json
                │_________│_________    1677635059146.json
                │_________│_________    1677784152008.json
                │_________│
                │_________├───Segmented_Outputs
                │_________│_________├───Audio
                │_________│_________│_________    audio.wav
                │_________│_________│_________    mono_sound.wav
                │_________│_________│
                │_________│_________└───Text
                │_________│_________        transcript.json
                │_________│
                │_________└───Temporary_Storage
                │_________        1677640855793.mp4
                │_________        1677640855793.wav
                │_________        1677641140345.mp4
                │_________        1677641140345.wav
                │_________        1677641391505.mp4
                │_________        1677641391505.wav
                │
                ├───Integration
                │_________│_________Integrator.py
                │_________│_________Variables.py
                │_________│___________init__.py
                │_________│
                │_________├───Decomposer
                │_________│_________│_________Decomposer.py
                │_________│_________│___________init__.py
                │_________│_________│
                │_________│_________├───Audio
                │_________│_________│_________│_________AudioFactorizer.py
                │_________│_________│_________│___________init__.py
                │_________│_________│_________│
                │_________│_________│_________└───__pycache__
                │_________│_________│_________        AudioFactorizer.cpython-310.pyc
                │_________│_________│_________        __init__.cpython-310.pyc
                │_________│_________│
                │_________│_________├───Text
                │_________│_________│_________│_________TextFactorizer.py
                │_________│_________│_________│___________init__.py
                │_________│_________│_________│
                │_________│_________│_________└───__pycache__
                │_________│_________│_________        TextFactorizer.cpython-310.pyc
                │_________│_________│_________        __init__.cpython-310.pyc
                │_________│_________│
                │_________│_________├───Video
                │_________│_________│_________│_________VideoFactorizer.py
                │_________│_________│_________│___________init__.py
                │_________│_________│_________│
                │_________│_________│_________└───__pycache__
                │_________│_________│_________        VideoFactorizer.cpython-310.pyc
                │_________│_________│_________        __init__.cpython-310.pyc
                │_________│_________│
                │_________│_________└───__pycache__
                │_________│_________        Decomposer.cpython-310.pyc
                │_________│_________        __init__.cpython-310.pyc
                │_________│
                │_________├───Ensembler
                │_________│_________│_________ModelProcessor.py
                │_________│_________│_________Variables.py
                │_________│_________│___________init__.py
                │_________│_________│
                │_________│_________├───AudioProcessor
                │_________│_________│_________│_________AudioProcessor.py
                │_________│_________│_________│_________Variables.py
                │_________│_________│_________│___________init__.py
                │_________│_________│_________│
                │_________│_________│_________└───__pycache__
                │_________│_________│_________        AudioProcessor.cpython-310.pyc
                │_________│_________│_________        ModelProcessor.cpython-310.pyc
                │_________│_________│_________        Variables.cpython-310.pyc
                │_________│_________│_________        __init__.cpython-310.pyc
                │_________│_________│
                │_________│_________├───ImageProcessor
                │_________│_________│_________│_________ImageProcessor.py
                │_________│_________│_________│_________Variables.py
                │_________│_________│_________│___________init__.py
                │_________│_________│_________│
                │_________│_________│_________└───__pycache__
                │_________│_________│_________        ImageProcessor.cpython-310.pyc
                │_________│_________│_________        LiveVideoProcessor.cpython-310.pyc
                │_________│_________│_________        ModelProcessor.cpython-310.pyc
                │_________│_________│_________        Variables.cpython-310.pyc
                │_________│_________│_________        __init__.cpython-310.pyc
                │_________│_________│
                │_________│_________├───TextProcessor
                │_________│_________│_________│_________TextProcessor.py
                │_________│_________│_________│_________Variables.py
                │_________│_________│_________│___________init__.py
                │_________│_________│_________│
                │_________│_________│_________└───__pycache__
                │_________│_________│_________        TextProcessor.cpython-310.pyc
                │_________│_________│_________        Variables.cpython-310.pyc
                │_________│_________│_________        __init__.cpython-310.pyc
                │_________│_________│
                │_________│_________└───__pycache__
                │_________│_________        ModelProcessor.cpython-310.pyc
                │_________│_________        Variables.cpython-310.pyc
                │_________│_________        __init__.cpython-310.pyc
                │_________│
                │_________└───__pycache__
                │_________        Integrator.cpython-310.pyc
                │_________        Variables.cpython-310.pyc
                │_________        __init__.cpython-310.pyc
                │
                └───__pycache__
                        AdminAPI.cpython-310.pyc
                        App.cpython-310.pyc
                        Processing.cpython-310.pyc
                        UserAPIs.cpython-310.pyc
                │_________└───admin-frontend
                │_________ │_________.env
                │_________ │_________.gitignore
                │_________ │_________package-lock.json
                │_________ │_________package.json
                │_________ │_________README.md
                │_________ │_________yarn.lock
                │_________ │
                │_________ ├───public
                │_________ │_________ index.html
                │_________ │
                │_________ └───src
                │_________  │_________App.css
                │_________  │_________App.jsx
                │_________  │_________index.js
                │_________  │
                │_________  ├───Assets
                │_________  │_________ Variables.json
                │_________  │
                │_________  ├───Components
                │_________  │_________├───Home
                │_________  │_________│_________ Home.jsx
                │_________  │_________│_________ InterviewResultPrediction.jsx
                │_________  │_________│_________ ReportsList.jsx
                │_________  │_________│_________ UploadedList.jsx
                │_________  │_________│_________ UserList.jsx
                │_________  │_________│_________ VideosList.jsx
                │_________  │_________│_________ VideoUpload.jsx
                │_________  │_________│
                │_________  │_________├───Login
                │_________  │_________│_________ Login.jsx
                │_________  │_________│_________ SignIn.jsx
                │_________  │_________│
                │_________  │_________├───Report
                │_________  │_________│_________ Report.jsx
                │_________  │_________│
                │_________  │_________└───Templates
                │_________  │_________  Footer.jsx
                │_________  │_________  Header.jsx
                │_________  │_________  Logout.jsx
                │_________  │
                │_________  ├───Contexts
                │_________  │_________ UserContext.jsx
                │_________  │
                │_________  └───Styles
                │_________│_________imports.scss
                │_________│_________index.scss
                │_________│
                │_________└───Components
                │_________ ├───Home
                │_________ │_________ Analytics.scss
                │_________ │_________ Home.scss
                │_________ │_________ ReportsList.scss
                │_________ │_________ UserList.scss
                │_________ │_________ VideoForm.scss
                │_________ │_________ VideosList.scss
                │_________ │
                │_________ ├───Login
                │_________ │_________ Login.scss
                │_________ │_________ Register.scss
                │_________ │_________ SignIn.scss
                │_________ │
                │_________ ├───Report
                │_________ │_________ Report.scss
                │_________ │
                │_________ └───Templates
                │_________Footer.scss
                │_________Header.scss
Module1├───Text Based Emotion Analysis
                │_________├───App
                │_________│_________│_________App.py
                │_________│_________│_________Functions.py
                │_________│_________│_________index.py
                │_________│_________│
                │_________│_________├───Processor
                │_________│_________│_________│_________TextProcessor.py
                │_________│_________│_________│_________Variables.py
                │_________│_________│_________│___________init__.py
                │_________│_________│_________│
                │_________│_________│_________└───__pycache__
                │_________│_________│_________  TextProcessor.cpython-310.pyc
                │_________│_________│_________  Variables.cpython-310.pyc
                │_________│_________│_________  __init__.cpython-310.pyc
                │_________│_________│
                │_________│_________├───static
                │_________│_________│_________├───data
                │_________│_________│_________│_________├───files
                │_________│_________│_________│_________│_________ input.txt
                │_________│_________│_________│_________│
                │_________│_________│_________│_________└───images
                │_________│_________│_________├───scripts
                │_________│_________│_________│_________ index.js
                │_________│_________│_________│_________ Main.js
                │_________│_________│_________│
                │_________│_________│_________└───styles
                │_________│_________│_________  Home.css
                │_________│_________│_________  Main.css
                │_________│_________│
                │_________│_________├───templates
                │_________│_________│_________ index.html
                │_________│_________│
                │_________│_________└───__pycache__
                │_________│_________  App.cpython-310.pyc
                │_________│_________  Functions.cpython-310.pyc
                │_________│_________  index.cpython-310.pyc
                │_________│
                │_________├───Data
                │_________│_________├───Main_Data
                │_________│_________│_________ Grouped_Emotions
                │_________│_________│_________ Testing.csv
                │_________│_________│_________ Training.csv
                │_________│_________│
                │_________│_________└───Preprocessed_Data
                │_________│_________  Preprocessed_Testing.csv
                │_________│_________  Preprocessed_Training.csv
                │_________│
                │_________├───Model
                │_________│_________ Model.joblib
                │_________│_________ Vectorizer.pickle
                │_________│
                │_________├───Model_Implementation
                │_________│_________│_________Model_Implementation.ipynb
                │_________│_________│
                │_________│_________├───.ipynb_checkpoints
                │_________│_________│_________ Model_Implementation-checkpoint.ipynb
                │_________│_________│
                │_________│_________└───Models
                │_________│_________  LogisticModel.joblib
                │_________│_________  multinomialNBModel.joblib
                │_________│_________  svmModel.joblib
                │_________│
                │_________├───Preprocessing
                │_________│_________│_________Pre_Processing.ipynb
                │_________│_________│
                │_________│_________└───.ipynb_checkpoints
                │_________│_________  Pre_Processing-checkpoint.ipynb
                │_________│
                │_________└───Testing_Inputs
                │_________  input1.txt
                │_________  input2.txt
Module6├───User-Application
                │_________│_________.env
                │_________│_________.gitignore
                │_________│_________package-lock.json
                │_________│_________package.json
                │_________│_________README.md
                │_________│_________yarn.lock
                │_________│
                │_________├───public
                │_________│_________ index.html
                │_________│
                │_________└───src
                |_________|________|   App.css
                |_________|________|   App.jsx
                |_________|________|   index.js
                |_________|________|
                |_________|________|───Assets
                |_________|________|       Variables.json
                |_________|________|
                |_________|________|───Components
                |_________|________|   ├───Dashboard
                |_________|________|   │       AudioReport.jsx
                |_________|________|   │       AudioUpload.jsx
                |_________|________|   │       Dashboard.jsx
                |_________|________|   │       InterviewResultPrediction.jsx
                |_________|________|   │       UploadedList.jsx
                |_________|________|   │       VideoReport.jsx
                |_________|________|   │       VideoUpload.jsx
                |_________|________|   │
                |_________|________|   ├───Home
                |_________|________|   │       Home.jsx
                |_________|________|   │
                |_________|________|   ├───Login
                |_________|________|   │       Login.jsx
                |_________|________|   │       Register.jsx
                |_________|________|   │       SignIn.jsx
                |_________|________|   │
                |_________|________|   ├───Report
                |_________|________|   │       AudioReport.jsx
                |_________|________|   │       Report.jsx
                |_________|________|   │       TextReport.jsx
                |_________|________|   │
                |_________|________|   └───Templates
                |_________|________|           Footer.jsx
                |_________|________|           Header.jsx
                |_________|________|           Logout.jsx
                |_________|________|
                |_________|________|───Contexts
                |_________|________|       UserContext.jsx
                |_________|________|
                |_________|________|───Styles
                |_________|________|   │   imports.scss
                |_________|________|   │   index.scss
                |_________|________|   │
                |_________|________|   └───Components
                |_________|________|       ├───Dashboard
                |_________|________|       │       AudioForm.scss
                |_________|________|       │       Dashboard.scss
                |_________|________|       │       VideoForm.scss
                |_________|________|       │
                |_________|________|       ├───Home
                |_________|________|       │       Home.scss
                |_________|________|       │
                |_________|________|       ├───Login
                |_________|________|       │       Login.scss
                |_________|________|       │       Register.scss
                |_________|________|       │       SignIn.scss
                |_________|________|       │
                |_________|________|       ├───Report
                |_________|________|       │       Report.scss
                |_________|________|       │       TextReport.scss
                |_________|________|       │
                |_________|________|       └───Templates
                |_________|________|               Footer.scss
                |_________|________|               Header.scss
Resource├───Utils
                │_________│_________database_config.env
                │_________│_________haarcascade_frontalcatface.xml
                │_________│
                │_________├───Audio_Recognizer_Model
                │_________│_________│_________README
                │_________│_________│
                │_________│_________├───am
                │_________│_________│_________ final.mdl
                │_________│_________│_________ tree
                │_________│_________│
                │_________│_________├───conf
                │_________│_________│_________ mfcc.conf
                │_________│_________│_________ model.conf
                │_________│_________│
                │_________│_________├───graph
                │_________│_________│_________│_________disambig_tid.int
                │_________│_________│_________│_________Gr.fst
                │_________│_________│_________│_________HCLr.fst
                │_________│_________│_________│_________phones.txt
                │_________│_________│_________│_________words.txt
                │_________│_________│_________│
                │_________│_________│_________└───phones
                │_________│_________│_________  word_boundary.int
                │_________│_________│
                │_________│_________└───ivector
                │_________│_________  final.dubm
                │_________│_________  final.ie
                │_________│_________  final.mat
                │_________│_________  global_cmvn.stats
                │_________│_________  online_cmvn.conf
                │_________│_________  splice.conf
                │_________│
                │_________├───Result_Images
                │_________│_________ Screenshot (553).png
                │_________│_________ Screenshot (554).png
                │_________│_________ Screenshot (556).png
                │_________│_________ Screenshot (557).png
                │_________│_________ Screenshot (558).png
                │_________│_________ Screenshot (559).png
                │_________│_________ Screenshot (560).png
                │_________│_________ Screenshot (561).png
                │_________│_________ Screenshot (562).png
                │_________│_________ Screenshot (563).png
                │_________│
                │_________└───SQL
                │_________  admins.sql
                │_________  users.sql
                │_________  videos.sql
Module5|───Video Based Emotion Analysis
                          │_________App.py
                          │_________haarcascade_frontalcatface.xml
                          │_________index.py
                          │_________Tester.py
                          │
                          ├───Decomposer
                          │_________│_________Decomposer.py
                          │_________│___________init__.py
                          │_________│
                          │_________├───Audio
                          │_________│_________│_________AudioFactorizer.py
                          │_________│_________│___________init__.py
                          │_________│_________│
                          │_________│_________└───__pycache__
                          │_________│_________  AudioFactorizer.cpython-310.pyc
                          │_________│_________  __init__.cpython-310.pyc
                          │_________│
                          │_________├───Text
                          │_________│_________│_________TextFactorizer.py
                          │_________│_________│___________init__.py
                          │_________│_________│
                          │_________│_________└───__pycache__
                          │_________│_________  TextFactorizer.cpython-310.pyc
                          │_________│_________  __init__.cpython-310.pyc
                          │_________│
                          │_________├───Video
                          │_________│_________│_________VideoFactorizer.py
                          │_________│_________│___________init__.py
                          │_________│_________│
                          │_________│_________└───__pycache__
                          │_________│_________  VideoFactorizer.cpython-310.pyc
                          │_________│_________  __init__.cpython-310.pyc
                          │_________│
                          │_________└───__pycache__
                          │_________  Decomposer.cpython-310.pyc
                          │_________  __init__.cpython-310.pyc
                          │
                          ├───Ensembler
                          │_________│_________ModelProcessor.py
                          │_________│_________Variables.py
                          │_________│___________init__.py
                          │_________│
                          │_________├───AudioProcessor
                          │_________│_________│_________AudioProcessor.py
                          │_________│_________│_________Variables.py
                          │_________│_________│___________init__.py
                          │_________│_________│
                          │_________│_________└───__pycache__
                          │_________│_________  AudioProcessor.cpython-310.pyc
                          │_________│_________  ModelProcessor.cpython-310.pyc
                          │_________│_________  Variables.cpython-310.pyc
                          │_________│_________  __init__.cpython-310.pyc
                          │_________│
                          │_________├───ImageProcessor
                          │_________│_________│_________ImageProcessor.py
                          │_________│_________│_________Variables.py
                          │_________│_________│___________init__.py
                          │_________│_________│
                          │_________│_________└───__pycache__
                          │_________│_________  ImageProcessor.cpython-310.pyc
                          │_________│_________  LiveVideoProcessor.cpython-310.pyc
                          │_________│_________  ModelProcessor.cpython-310.pyc
                          │_________│_________  Variables.cpython-310.pyc
                          │_________│_________  __init__.cpython-310.pyc
                          │_________│
                          │_________├───TextProcessor
                          │_________│_________│_________TextProcessor.py
                          │_________│_________│_________Variables.py
                          │_________│_________│___________init__.py
                          │_________│_________│
                          │_________│_________└───__pycache__
                          │_________│_________  TextProcessor.cpython-310.pyc
                          │_________│_________  Variables.cpython-310.pyc
                          │_________│_________  __init__.cpython-310.pyc
                          │_________│
                          │_________└───__pycache__
                          │_________  ModelProcessor.cpython-310.pyc
                          │_________  Variables.cpython-310.pyc
                          │_________  __init__.cpython-310.pyc
                          │
                          ├───Segmented_Outputs
                          │_________├───Audio
                          │_________│_________ audio.wav
                          │_________│_________ mono_sound.wav
                          │_________│
                          │_________├───Images
                          │_________└───Text
                          │_________  timestamp.json
                          │_________  transcript.json
                          │
                          ├───static
                          │_________├───css
                          │_________│_________ index.css
                          │_________│_________ main.css
                          │_________│
                          │_________├───Files
                          │_________│_________ input_video.avi
                          │_________│
                          │_________└───js
                          │_________  index.js
                          │
                          ├───Templates
                          │_________ index.html
                          │
                          ├───Testing_Inputs
                          │_________ Sample_Video.avi
                          │
                          └───__pycache__
                                App.cpython-310.pyc
</pre>
<hr>

<br/>

## Reference Images Gallery
<table>
    <tr >
        <td colspan="2" rowspan="2">
            <img src="./Utils/Result_Images/Screenshot (554).png" alt="">
        </td>
        <td colspan="2" rowspan="2">
            <img src="./Utils/Result_Images/Screenshot (556).png" alt="">
        </td>
    </tr>
    <tr>
    </tr>
    <tr>
        <td>
            <img src="./Utils/Result_Images/Screenshot (557).png" alt="">
        </td>
        <td>
            <img src="./Utils/Result_Images/Screenshot (558).png" alt="">
        </td>
        <td>
            <img src="./Utils/Result_Images/Screenshot (560).png" alt="">
        </td>
        <td>
            <img src="./Utils/Result_Images/Screenshot (561).png" alt="">
        </td>
    </tr>
    <tr>
        <td>
            <img src="./Utils/Result_Images/Screenshot (553).png" alt="">
        </td>
        <td>
            <img src="./Utils/Result_Images/Screenshot (562).png" alt="">
        </td>
        <td>
            <img src="./Utils/Result_Images/Screenshot (563).png" alt="">
        </td>
        <td>
            <img src="./Utils/Result_Images/Screenshot (559).png" alt="">
        </td>
    </tr>
</table>



# Dataset References
### Text data Reference
<img src="./Utils/Reference_Images/text reference.jpg" alt="">

### Image Data Reference
<img src="./Utils/Reference_Images/image Reference.jpg" alt="">

### Voice Data Reference
<img src="./Utils/Reference_Images/voice referemce.jpg" alt="">



