import cv2

class VideoFactorizer:
    def __init__(self) -> None:
        print("Video Factorizer is initialized")
    def getFramesArray(self,video_path,number_of_frames=5):
        video=cv2.VideoCapture(video_path)
        frame_per_seconds=video.get(cv2.CAP_PROP_FPS)
        print(f"video have {frame_per_seconds} Hz Frame Per seconds")
        frame_count=0
        final_array=[]
        while video.isOpened():
            return_value,frame=video.read()
            if return_value:
                frame_count+=1
                if frame_count%(number_of_frames*frame_per_seconds)==0:
                    final_array.append(frame)
            else:
                break
        video.release()
        cv2.destroyAllWindows()
        return final_array
    def getFramesIntoFiles(self,video_path,saving_path,number_of_frames=5):
        video=cv2.VideoCapture(video_path)
        frame_per_seconds=video.get(cv2.CAP_PROP_FPS)
        print(f"video have {frame_per_seconds} Hz Frame Per seconds")
        frame_count=0
        final_array=[]
        while video.isOpened():
            return_value,frame=video.read()
            if return_value:
                frame_count+=1
                final_array.append(frame)
                if frame_count%(number_of_frames*frame_per_seconds)==0:
                    cv2.imwrite(f"{saving_path}/image_{frame_count}.jpg",frame)
            else:
                break
        video.release()
        cv2.destroyAllWindows()
        return final_array


