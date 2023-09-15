from .Decomposer import Decomposer
from .Ensembler import ModelProcessor
from .Variables import *
import json
from moviepy.editor import VideoFileClip
from scipy.io import wavfile

class Integrator:
    def __init__(self):
        print("Integrator is initialized")
        self.decomposer=Decomposer.Decomposer()
        self.preProcessor=ModelProcessor.PreProcessor()
        self.emotionPredictor=ModelProcessor.VideoEmotionPrediction()
    def setModelsAndParameters(self,text_model="",text_vectorizer="",audio_model="",audio_recognizer_model_path="",face_cascade="",image_model="",):
        self.face_cascade=face_cascade
        self.audio_recognizer_model_path=audio_recognizer_model_path
        self.image_model=image_model
        self.audio_model=audio_model
        self.text_model=text_model
        self.text_vectorizer=text_vectorizer
    def setFilePaths(self,file_name="",audio_file_path="audio.wav",mono_sound_path="mono_sound.wav",output_transcript_file_path="transcript.json",output_timestamp_json_path="timestamp.json"):
        self.video_file_name=file_name
        self.audio_file_path=audio_file_path
        self.mono_sound_path=mono_sound_path
        self.output_transcript_file_path=output_transcript_file_path
        self.output_timestamp_json_path=output_timestamp_json_path
    
    
    def generateOutputs(self):
        self.decomposer.setVideoFile(self.video_file_name)
        self.images_array=self.decomposer.getImageArrayOfIntervals()
        self.decomposer.convertVideoToAudio(output_audio_path=self.audio_file_path)
        self.decomposer.convertAudioToText(
            model_path=self.audio_recognizer_model_path,
            mono_sound_path=self.mono_sound_path,
            output_transcript_file_path=self.output_transcript_file_path,
            output_timestamp_json_path=self.output_timestamp_json_path
        )
        array_of_image_array=self.preProcessor.imageArrayPreprocessor(self.images_array,self.face_cascade)
        mfcc_values=self.preProcessor.audioArrayProcessor(self.audio_file_path)
        with open(self.output_transcript_file_path) as file:
            text_array=json.load(file)
        text_vector=self.preProcessor.textArrayProcessor(self.text_vectorizer,text_array)
        self.images_predictions=self.emotionPredictor.getImagepredictions(self.image_model,array_of_image_array)
        self.audio_predictions=self.emotionPredictor.getAudioPredictions(self.audio_model,mfcc_values)
        self.text_predictions=self.emotionPredictor.getTextualPredictions(self.text_model,text_vector)
        self.video_predictions=self.emotionPredictor.getArrayOfCumulativePredictions()
        self.final_prediction=self.emotionPredictor.getCumulativePredictions()
        print(self.final_prediction)


    def generateAudioOutputs(self):
        self.decomposer.convertAudioToTextFromGivenFile(
            model_path=self.audio_recognizer_model_path,
            audio_file=self.audio_file_path,
            mono_sound_path=self.mono_sound_path,
            output_transcript_file_path=self.output_transcript_file_path,
            output_timestamp_json_path=self.output_timestamp_json_path
        )
        mfcc_values=self.preProcessor.audioArrayProcessor(self.audio_file_path)
        with open(self.output_transcript_file_path) as file:
            text_array=json.load(file)
        text_vector=self.preProcessor.textArrayProcessor(self.text_vectorizer,text_array)
        self.audio_predictions=self.emotionPredictor.getAudioPredictions(self.audio_model,mfcc_values)
        self.text_predictions=self.emotionPredictor.getTextualPredictions(self.text_model,text_vector)
    def getWordCountStats(self):
        with open(self.output_transcript_file_path) as file:
            text_array=json.load(file)
        total_sentences=len(text_array)
        total_words=len(" ".join(text_array).split(" "))
        if self.video_file_name!="":
            video_clip=VideoFileClip(self.video_file_name)
            total_time=video_clip.duration
            speed_per_minute=total_words/total_time*60
        else:
            sample_rate, data = wavfile.read(self.audio_file_path)
            time= len(data) / sample_rate
            speed_per_minute=total_words/time*60
        return {
            "total_sentences":total_sentences,
            "total_words":total_words,
            "speed_per_minute":speed_per_minute
        }

    @staticmethod
    def getInterviewResult(positives,negatives,neutrals,total,success_factor=0.6):
        if (positives+neutrals/2)/total>success_factor:
            return "Higher Chance of Selection"
        elif (negatives+neutrals/2)/total>=(1-success_factor):
            return "Less Chances of Selection"
        else:
            return "Neutral Result"

    def getTextReport(self,textInput):
        text_array=textInput.split(".")
        text_vector=self.preProcessor.textArrayProcessor(self.text_vectorizer,text_array)
        self.text_predictions=self.emotionPredictor.getTextualPredictions(self.text_model,text_vector)
        text_counts=self.emotionPredictor.getCountsOfTextPredictions()
        total_predicted_values=list(self.emotionPredictor.Text_Predictions)
        behavior_mapping={
            "aggressive_ness":len([x for x in total_predicted_values if x=="anger"])+len([x for x in total_predicted_values if x=="disgust"]),
            "calmness":len([x for x in total_predicted_values if x=="happy"])+len([x for x in total_predicted_values if x=="sad"])+len([x for x in total_predicted_values if x=="surprise"]),
            "confidence":len([x for x in total_predicted_values if x=="happy"])+len([x for x in total_predicted_values if x=="fear"])+len([x for x in total_predicted_values if x=="surprise"])/2,
        }
        final_text_prediction=class_list[list(text_counts.values()).index(max(text_counts.values()))]
        min_text_prediction=class_list[list(text_counts.values()).index(min(text_counts.values()))]
        text_neutral_count=0
        for neutral_class in neutral_classes:
            text_neutral_count+=text_counts[neutral_class]
        self.text_data={
            "final_prediction":final_text_prediction,
            "counts":text_counts,
            "predictions":self.text_predictions,
            "min_prediction":min_text_prediction,
            "neutrality_value":text_neutral_count,
            "total_predicted_values":sum(text_counts.values())
        }
        self.Report={
            "text_data":self.text_data,
            "behavior_mapping":behavior_mapping,
        }
        return self.Report



    def getAudioOutputs(self):
        text_counts=self.emotionPredictor.getCountsOfTextPredictions()
        audio_counts=self.emotionPredictor.getCountsOfAudioPredictions()
        fluency_output=self.preProcessor.getSpeechFluency(self.audio_file_path,number_of_seconds=10)
        final_audio_prediction=class_list[list(audio_counts.values()).index(max(audio_counts.values()))]
        final_text_prediction=class_list[list(text_counts.values()).index(max(text_counts.values()))]
        min_audio_prediction=class_list[list(audio_counts.values()).index(min(audio_counts.values()))]
        min_text_prediction=class_list[list(text_counts.values()).index(min(text_counts.values()))]

        audio_neutral_count=0
        for neutral_class in neutral_classes:
            audio_neutral_count+=audio_counts[neutral_class]
        text_neutral_count=0
        for neutral_class in neutral_classes:
            text_neutral_count+=text_counts[neutral_class]
        total_predicted_values=list(self.emotionPredictor.Text_Predictions)+list(self.emotionPredictor.Audio_Predictions)
        behavior_mapping={
            "aggressive_ness":len([x for x in total_predicted_values if x=="anger"])+len([x for x in total_predicted_values if x=="disgust"]),
            "calmness":len([x for x in total_predicted_values if x=="happy"])+len([x for x in total_predicted_values if x=="sad"])+len([x for x in total_predicted_values if x=="surprise"]),
            "confidence":len([x for x in total_predicted_values if x=="happy"])+len([x for x in total_predicted_values if x=="fear"])+len([x for x in total_predicted_values if x=="surprise"])/2,
        }
        self.audio_data={
            "final_prediction":final_audio_prediction,
            "fluency_output":fluency_output,
            "counts":audio_counts,
            "predictions":self.audio_predictions,
            "min_prediction":min_audio_prediction,
            "neutrality_value":audio_neutral_count,
            "total_predicted_values":sum(audio_counts.values())
        }
        self.text_data={
            "final_prediction":final_text_prediction,
            "counts":text_counts,
            "predictions":self.text_predictions,
            "min_prediction":min_text_prediction,
            "neutrality_value":text_neutral_count,
            "total_predicted_values":sum(text_counts.values())
        }
        self.Report={
            "audio_data":self.audio_data,
            "text_data":self.text_data,
            "behavior_mapping":behavior_mapping,
            "frequency":self.getWordCountStats()
        }
        return self.Report

    def getOutputs(self,success_factor=0.6):
        image_counts=self.emotionPredictor.getCountsOfImagePredictions()
        text_counts=self.emotionPredictor.getCountsOfTextPredictions()
        audio_counts=self.emotionPredictor.getCountsOfAudioPredictions()
        video_counts=self.emotionPredictor.getCountsOfVideoPredictions()
        fluency_output=self.preProcessor.getSpeechFluency(self.audio_file_path,number_of_seconds=10)
        total_predicted_values=list(self.emotionPredictor.Text_Predictions)+list(self.emotionPredictor.Audio_Predictions)+list(self.emotionPredictor.Video_Predictions)+list(self.emotionPredictor.Image_Predictions)
        behavior_mapping={
            "aggressive_ness":len([x for x in total_predicted_values if x=="anger"])+len([x for x in total_predicted_values if x=="disgust"]),
            "calmness":len([x for x in total_predicted_values if x=="happy"])+len([x for x in total_predicted_values if x=="sad"])+len([x for x in total_predicted_values if x=="surprise"]),
            "confidence":len([x for x in total_predicted_values if x=="happy"])+len([x for x in total_predicted_values if x=="fear"])+len([x for x in total_predicted_values if x=="surprise"])/2,
        }
        print(self.images_predictions)
        print(image_counts)
        print(self.text_predictions)
        print(text_counts)
        print(self.audio_predictions)
        print(audio_counts)
        print(self.video_predictions)
        print("video_counts: ",video_counts)
        
        final_images_prediction=class_list[list(image_counts.values()).index(max(image_counts.values()))]
        final_audio_prediction=class_list[list(audio_counts.values()).index(max(audio_counts.values()))]
        final_text_prediction=class_list[list(text_counts.values()).index(max(text_counts.values()))]
        final_video_prediction=class_list[list(video_counts.values()).index(max(video_counts.values()))]
        
        min_images_prediction=class_list[list(image_counts.values()).index(min(image_counts.values()))]
        min_audio_prediction=class_list[list(audio_counts.values()).index(min(audio_counts.values()))]
        min_text_prediction=class_list[list(text_counts.values()).index(min(text_counts.values()))]
        min_video_prediction=class_list[list(video_counts.values()).index(min(video_counts.values()))]

        image_neutral_count=0
        for neutral_class in neutral_classes:
            image_neutral_count+=image_counts[neutral_class]
        audio_neutral_count=0
        for neutral_class in neutral_classes:
            audio_neutral_count+=audio_counts[neutral_class]
        text_neutral_count=0
        for neutral_class in neutral_classes:
            text_neutral_count+=text_counts[neutral_class]
        video_neutral_count=0
        for neutral_class in neutral_classes:
            video_neutral_count+=video_counts[neutral_class]
        print()
        print("Final Prediction for Images: ",final_images_prediction)
        print("Final Prediction for Audio: ",final_audio_prediction)
        print("Final Prediction for Text: ",final_text_prediction)
        print("Final Prediction for Video: ",final_video_prediction)

        print()
        print("Minimum Prediction for Images: ",min_images_prediction)
        print("Minimum Prediction for Audio: ",min_audio_prediction)
        print("Minimum Prediction for Text: ",min_text_prediction)
        print("Minimum Prediction for Video: ",min_video_prediction)

        print()
        print("Neutrality Prediction for Images: ",image_neutral_count)
        print("Neutrality Prediction for Audio: ",audio_neutral_count)
        print("Neutrality Prediction for Text: ",text_neutral_count)
        print("Neutrality Prediction for Video: ",video_neutral_count)
        final_counts={}
        for class_ in class_list:
            final_counts[class_]=image_counts[class_]+audio_counts[class_]+text_counts[class_]+video_counts[class_]
        print(final_counts)
        final_neutral_count=0
        for neutral_class in neutral_classes:
            final_neutral_count+=final_counts[neutral_class]
        final_negative_count=0
        for negative_class in negative_classes:
            final_negative_count+=final_counts[negative_class]
        final_positive_count=0
        for positive_class in positive_classes:
            final_positive_count+=final_counts[positive_class]
        
        final_interview_prediction=Integrator.getInterviewResult(positives=final_positive_count,negatives=final_negative_count,neutrals=final_neutral_count,total=sum(final_counts.values()),success_factor=success_factor)
        min_interview_prediction=class_list[list(final_counts.values()).index(min(final_counts.values()))]
        print("Final Prediction for Interview: ",final_interview_prediction)
        print("Minimum Prediction for Interview: ",min_interview_prediction)
        print("Neutrality Prediction for Interview: ",final_neutral_count)
        print("Negative Prediction for Interview: ",final_negative_count)
        print("Positive Prediction for Interview: ",final_positive_count)
        self.image_data={
            "final_prediction":final_images_prediction,
            "counts":image_counts,
            "predictions":self.images_predictions,
            "min_prediction":min_images_prediction,
            "neutrality_value":image_neutral_count,
            "total_predicted_values":sum(image_counts.values())
        }
        self.audio_data={
            "final_prediction":final_audio_prediction,
            "fluency_output":fluency_output,
            "counts":audio_counts,
            "predictions":self.audio_predictions,
            "min_prediction":min_audio_prediction,
            "neutrality_value":audio_neutral_count,
            "total_predicted_values":sum(audio_counts.values())
        }
        self.text_data={
            "final_prediction":final_text_prediction,
            "counts":text_counts,
            "predictions":self.text_predictions,
            "min_prediction":min_text_prediction,
            "neutrality_value":text_neutral_count,
            "total_predicted_values":sum(text_counts.values())
        }
        self.video_data={
            "final_prediction":final_video_prediction,
            "counts":video_counts,
            "predictions":self.video_predictions,
            "min_prediction":min_video_prediction,
            "neutrality_value":video_neutral_count,
            "total_predicted_values":sum(video_counts.values())
        }
        self.Report={
            "image_data":self.image_data,
            "audio_data":self.audio_data,
            "text_data":self.text_data,
            "video_data":self.video_data,
            "final_data":{
                "final_prediction":final_interview_prediction,
                "counts":final_counts,
                "neutrality_value":final_neutral_count,
                "positivity_value":final_positive_count,
                "negativity_value":final_negative_count,
                "total_predicted_values":sum(final_counts.values())
            },
            "behavior_mapping":behavior_mapping,
            "frequency":self.getWordCountStats()
        }
        return self.Report
    def saveReport(self,file_path="Report.json"):
        with open(file_path,"w") as file:
            json.dump(self.Report,file,indent=4)
            print(f"Saved to {file_path}")