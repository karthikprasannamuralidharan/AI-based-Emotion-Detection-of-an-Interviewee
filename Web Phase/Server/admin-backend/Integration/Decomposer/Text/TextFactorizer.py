import wave
import audioop
from vosk import Model, KaldiRecognizer
import wave
import json

class AudioToTextConverter:
    def __init__(self) -> None:
        print("Audio To Text Converter is initialized")
    def setAudioToTextConverterModel(self,model_path):
        self.model = Model(model_path)

    def convertToMonoSoundBytesFromWavFile(self,audio_path,mono_sound_path="audio_with_mono_sound.wav"):
        try:
            inFile = wave.open(audio_path,'rb')
            outFile = wave.open(mono_sound_path,'wb')
            outFile.setnchannels(1)
            outFile.setsampwidth(inFile.getsampwidth())
            outFile.setframerate(inFile.getframerate())
            soundBytes = inFile.readframes(inFile.getnframes())
            print("frames read: {} length: {}".format(inFile.getnframes(),len(soundBytes)))
            monoSoundBytes = audioop.tomono(soundBytes, inFile.getsampwidth(), 1, 1)
            outFile.writeframes(monoSoundBytes)
            return True
        except Exception as e:
            print(e)
        finally:
            inFile.close()
            outFile.close()
        return False
    def audioToTextConverterFromMonoSound(self,mono_sound_path="audio_with_mono_sound.wav",output_transcript_file_path="transcript.json",output_timestamp_json_path="timestamp.json",is_timestamp=False):
        wf = wave.open(mono_sound_path, "rb")
        recognizer = KaldiRecognizer(self.model, wf.getframerate())
        recognizer.SetWords(True)
        results = []
        textResults = []
        while True:
            data = wf.readframes(4096)
            if len(data) == 0:
                break
            if recognizer.AcceptWaveform(data):
                recognizerResult = recognizer.Result()
                results.append(recognizerResult)
                resultDict = json.loads(recognizerResult)
                textResults.append(resultDict.get("text", ""))
        results.append(recognizer.FinalResult())
        resultDict = json.loads(recognizer.FinalResult())
        textResults.append(resultDict.get("text", ""))
        if is_timestamp:
            with open(output_timestamp_json_path, 'w') as output:
                print(json.dumps(results,indent=4), file=output)
        with open(output_transcript_file_path, 'w') as output:
            print(json.dumps(textResults, indent=4), file=output)