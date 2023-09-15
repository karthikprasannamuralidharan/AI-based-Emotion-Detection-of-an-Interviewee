import librosa
import numpy
from .Variables import *
import tensorflow

class InputProcessor:
    def __init__(self) -> None:
        print("Audio Processor is initialized")
    def preprocessTheInput(self,file_path):
        audio_time_series,sample_rate=librosa.load(file_path)
        number_of_segments = Number_of_Seconds_limit * sample_rate
        number_of_intervals = int(numpy.ceil(len(audio_time_series) / number_of_segments))
        Array_of_mfcc_sequence = []
        for i in range(number_of_intervals):
            print(audio_time_series[i * sample_rate *
                                    Number_of_Seconds_limit:(i + 1) *
                                    sample_rate *
                    Number_of_Seconds_limit].shape)
            mfcc_sequence = librosa.feature.mfcc(
                y=audio_time_series[i * sample_rate:(i + 1) * sample_rate],
                sr=sample_rate,
                n_mfcc=Number_of_MFCC_Values)
            mfcc_value = numpy.mean(mfcc_sequence.T, axis=0)
            Array_of_mfcc_sequence.append(mfcc_value)
        return numpy.array(Array_of_mfcc_sequence)
    def getSpeechFluencyMeasure(audio_path,no_of_seconds=10):
        audio_data, sampling_rate = librosa.load(audio_path)
        counter=0
        fluent_sums=[]
        while True:
            fluent_sums.append(sum(abs(audio_data[counter:counter+sampling_rate*no_of_seconds])))
            counter=counter+sampling_rate*no_of_seconds
            if counter>=len(audio_data):break
        return fluent_sums

class ModelProcessor:
    def __init__(self):
        print("Model Processor is Initialized")
    def setModel(self,ModelPath):
        self.model=tensorflow.keras.models.load_model(ModelPath)
        print("Model is Connected")
    def predictClass(self,mfcc_array):
        print(mfcc_array.shape)
        prediction=self.model.predict(mfcc_array)
        print(prediction)
        prediction=numpy.argmax(prediction[0])
        print(prediction)
        return class_list[prediction]
    def predictClasses(self,array_of_mfcc_values):
        prediction=self.model.predict(array_of_mfcc_values)
        prediction=[class_list[numpy.argmax(values)] for values in prediction]
        return prediction
    def predictCumulativeClass(self,array_of_mfcc_values):
        prediction=self.model.predict(array_of_mfcc_values)
        prediction=[class_list[numpy.argmax(values)] for values in prediction]
        print(prediction)
        predicted_class_name=prediction[0]
        max_vote=prediction.count(predicted_class_name)
        for class_ in set(prediction):
            print(class_,prediction.count((class_)))
            if prediction.count(class_)>max_vote:
                predicted_class_name=class_
                max_vote=prediction.count((class_))
        print(set(prediction))
        return predicted_class_name