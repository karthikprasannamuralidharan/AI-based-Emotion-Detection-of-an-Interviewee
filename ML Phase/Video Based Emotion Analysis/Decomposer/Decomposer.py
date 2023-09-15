from .Audio.AudioFactorizer import *
from .Text.TextFactorizer import *
from .Video.VideoFactorizer import *
videoFactorizer=VideoFactorizer()
audioToTextConverter=AudioToTextConverter()
videoTOAudioConverter=VideoTOAudioConverter()

class Decomposer:
    def __init__(self) -> None:
        print("Video Decomposer is initialized")
    def setVideoFile(self,file_name):
        self.video_file=file_name
    def getImageArrayOfIntervals(self,number_of_seconds=5):
        Image_Array=videoFactorizer.getFramesArray(self.video_file,number_of_seconds)
        return Image_Array
    def convertFrameWiseImages(self,number_of_seconds=5):
        Image_Array=videoFactorizer.getFramesIntoFiles(self.video_file,number_of_seconds)
        return Image_Array
    def convertVideoToAudio(self,output_audio_path="audio.wav"):
        videoTOAudioConverter.convertVideoToWAVFile(self.video_file,output_audio_path)
        self.audio_file=output_audio_path
    def convertAudioToText(self,model_path,mono_sound_path="audio_with_mono_sound.wav",output_transcript_file_path="transcript.json",output_timestamp_json_path="timestamp.json"):
        audioToTextConverter.setAudioToTextConverterModel(model_path)
        audioToTextConverter.convertToMonoSoundBytesFromWavFile(self.audio_file,mono_sound_path)
        audioToTextConverter.audioToTextConverterFromMonoSound(mono_sound_path,output_transcript_file_path,output_timestamp_json_path)
        print("done Converted to text")
