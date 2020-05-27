# ----------------------------------------POTENTIAL FEEDBACK SERVICE SCRIPT--------------------------------------------------
# # sentiment analysis threshold
# para = 0.55
# #-------------------------------------------------------------------------------------
# import tensorflow as tf
# from tensorflow.keras.preprocessing.text import Tokenizer
# from tensorflow.keras.preprocessing.sequence import pad_sequences
# import joblib


# # loading trained model
# try:
#     model = tf.keras.models.load_model('feedback_meta/imdb_sentiment_model.h5')
# except:
#     print("Couldn't load TF-Model")
# else:
#     model.summary()

# # loading tokenizer
# try:
#     tokenizer = joblib.load('feedback_meta/tokenizer.pkl')
# except:
#     print("Couldn't load TF-Tokenizer")
# else:
#     print('Tokenizer')

# def sentiment_analyse(inp, threshold):
#     max_length = 200        
#     sequences = tokenizer.texts_to_sequences(inp)
#     padded = pad_sequences(sequences, padding='post', truncating='post', maxlen=max_length)
#     prediction = model.predict(padded)[0][0]
#     print(prediction)
#     return True if prediction > threshold else False

# def aptResponse(input):
#     resp = sentiment_analyse([input], para)
#     return 1 if resp else 0

# #print(aptResponse('the speaker did not have clarity, i couldnt keep up. it was a mess.'))
# --------------------------------------------------------------------------------------------------------------------------------