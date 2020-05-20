# sentiment analysis threshold
para = 0.55 

# # positive response    
# positive = 'Thank you for the feedback! We work hard to get the best experience and try to hit the mark for you. Hoping to see you in the upcoming events by MSPC!'

# # negative response
# negative = 'Kindly receive our apologies for the inconvenience caused. We are constantly making progress to enhance your experience. We appreciate your valuable feedback.'

#-------------------------------------------------------------------------------------
import pkg_resources
# pkg_resources.require("tensorflow==1.14")
import tensorflow as tf
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences
import joblib
# from pandas import read_csv
# from pandas import DataFrame

try:
    tokenizer = joblib.load('feedback_meta/tokenizer.pkl')
except:
    print("Couldn't load TF-Tokenizer")
else:
    print('Tokenizer')

# def storeCSV(feedback, sentiment):
#     df_new = DataFrame(columns=['feedback', 'classified'])
#     df_new['feedback'] = [feedback]
#     df_new['classified'] = [sentiment]

#     try:
#         read_csv('feedback_meta/feedback_history.csv')
#     except:
#         print('No history found: Creating feedback_history.csv')
#         df_new.to_csv('feedback_meta/feedback_history.csv')
#     else:
#         df_new.to_csv('feedback_meta/feedback_history.csv', mode='a', header=False)

def sentiment_analyse(inp, threshold):
    graph = tf.get_default_graph()
    try:
        model = tf.keras.models.load_model('feedback_meta/imdb_sentiment_model.h5')
    except:
        print("Couldn't load TF-Model")
    else:
        model.summary()

    max_length = 200        
    #word_index = tokenizer.word_index
    sequences = tokenizer.texts_to_sequences(inp)
    padded = pad_sequences(sequences, padding='post', truncating='post', maxlen=max_length)
    with graph.as_default():
     prediction = model.predict(padded)[0][0]
    # prediction = model.predict(padded)[0][0]
    return True if prediction > threshold else False

def aptResponse(input):
    resp = sentiment_analyse([input], para)
    # storeCSV(input, 1 if resp else 0)
    return 1 if resp else 0

#print(aptResponse('the speaker did not have clarity, i couldnt keep up. it was a mess.'))