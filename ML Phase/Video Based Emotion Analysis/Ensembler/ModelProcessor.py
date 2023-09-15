from .AudioProcessor import AudioProcessor 
from .ImageProcessor import ImageProcessor 
from .TextProcessor import TextProcessor 
from .Variables import *


class PreProcessor:
    def __init__(self):
        print("Video Processor is initialized")
    def imageArrayPreprocessor(self,list_of_image_array,face_cascade):
        imageProcessor=ImageProcessor.PreprocessInput(face_cascade)
        return imageProcessor.preProcessTheInputArrayOfImagesForTransferLearningInput(list_of_image_array)
    def audioArrayProcessor(self,audio_file):
        audioFileProcessor=AudioProcessor.InputProcessor()
        return audioFileProcessor.preprocessTheInput(audio_file)
    def textArrayProcessor(self,vectorizer_path,array_of_text):
        textArrayProcessor=TextProcessor.TextInputProcessor()
        textArrayProcessor.setVecorizer(vectorizer_path)
        return textArrayProcessor.getPreprocessTheArrayTexts(array_of_text)

class VideoEmotionPrediction:
    def __init__(self) -> None:
        print("Video Emotion Detector is initialized")
    def getImagepredictions(self,model_path,array_image_array):
        imageEmotionPredictor=ImageProcessor.ModelProcessor()
        imageEmotionPredictor.setModel(model_path)
        self.Image_Predictions=list(imageEmotionPredictor.predictClasses(array_image_array))
        return self.Image_Predictions
    def getAudioPredictions(self,model_path,array_of_mfcc_values):
        audioEmotionPredictor=AudioProcessor.ModelProcessor()
        audioEmotionPredictor.setModel(model_path)
        self.Audio_Predictions=list(audioEmotionPredictor.predictClasses(array_of_mfcc_values))
        return self.Audio_Predictions
    def getTextualPredictions(self,model_path,input_vector):
        textEmotionPredictor=TextProcessor.TextSentimentAnalyser()
        textEmotionPredictor.setModel(model_path)
        self.Text_Predictions=list(textEmotionPredictor.getArrayofIntermediateEmotions(textEmotionPredictor.predictFormArray(input_vector)))
        return self.Text_Predictions
    def getCountsOfImagePredictions(self,factor=2):
        counts={}
        for class_ in class_list:
            counts[class_]=self.Image_Predictions.count(class_)*factor
        return counts
    def getCountsOfAudioPredictions(self,factor=1):
        counts={}
        for class_ in class_list:
            counts[class_]=self.Audio_Predictions.count(class_)*factor
        return counts
    def getCountsOfTextPredictions(self,factor=3):
        counts={}
        for class_ in class_list:
            counts[class_]=self.Text_Predictions.count(class_)*factor
        return counts
    def getCumulativePredictions(self):
        Image_Counts=self.getCountsOfImagePredictions()
        print(Image_Counts)
        Audio_Counts=self.getCountsOfAudioPredictions()
        print(Audio_Counts)
        Text_Counts=self.getCountsOfTextPredictions()
        print(Text_Counts)
        final_counts=[]
        for class_ in class_list:
            final_counts.append(
                Image_Counts[class_]+Audio_Counts[class_]+Text_Counts[class_]
            )
        for i in range(len(final_counts)):
            print(class_list[i],final_counts[i])
        return class_list[final_counts.index(max(final_counts))]


