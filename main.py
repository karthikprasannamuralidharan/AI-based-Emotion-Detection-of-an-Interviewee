def getWordCountStats(text_array,time):
    total_sentences=len(text_array)
    total_words=len(" ".join(text_array).split(" "))
    speed_per_minute=total_words/time
    return [total_sentences,total_words,speed_per_minute]
    
print(
    getWordCountStats(
        [
    "the",
    ""
],
        5
    )
)