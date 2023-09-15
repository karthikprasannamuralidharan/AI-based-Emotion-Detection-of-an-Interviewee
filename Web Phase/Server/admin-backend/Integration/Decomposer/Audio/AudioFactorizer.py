import moviepy.editor


class VideoTOAudioConverter:
    def __init__(self):
        print("Video To Audio Converter is Initialized")
    def convertVideoToWAVFile(self,video_path,to_audio_path="audio.wav"):
        video =moviepy.editor.VideoFileClip(video_path)
        video.audio.write_audiofile(to_audio_path)
    def convertVideoToMP3File(self,video_path,to_audio_path="audio.mp3"):
        video =moviepy.editor.VideoFileClip(video_path)
        video.audio.write_audiofile(to_audio_path)

