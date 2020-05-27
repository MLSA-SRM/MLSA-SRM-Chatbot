# MySQL Database Variables-----
database = 'chatbotdb'
# feedback_table = 'feedback_logs'
convo_table = 'convo_logs'
debug_mode = False
#------------------------------
import mysql.connector
import json
from settings import SQL_DB, SQL_HOST, SQL_PORT, SQL_PWD, SQL_USER

#----potential feedback system logs----------------------------------------------------------------------------
# def storeNewFeedbackLog(_log):
#     mydb = mysql.connector.connect(
#         user=SQL_USER, 
#         password=SQL_PWD, 
#         host=SQL_HOST, 
#         port=SQL_PORT, 
#         database=SQL_DB
#     )

#     mycursor = mydb.cursor(buffered=True)
#     log = json.loads(_log)
#     log = json.loads(log)
#     timestamp = str(log['timestamp'])
#     feedback = log['feedback']
#     pred_senti = log['pred_senti']

#     query_insert = 'INSERT INTO {db}.{table}'.format(db=database, table=feedback_table)
#     query_insert = query_insert + ' VALUE ("{time}", "{fdbk}", {pred});'.format(time=timestamp, fdbk=feedback, pred=pred_senti)

#     try:
#         mycursor.execute(query_insert)
#         mycursor.execute('SELECT * FROM {db}.{table};'.format(db=database, table=feedback_table))
#         if debug_mode:
#             print('Ran SQL')
#         for x in mycursor:
#             print(x)
#         mydb.commit()
#         mydb.close()
#         return True
#     except:
#         return False

def storeNewChat(_log):
    mydb = mysql.connector.connect(
        user=SQL_USER, 
        password=SQL_PWD, 
        host=SQL_HOST, 
        port=SQL_PORT, 
        database=SQL_DB
    )

    mycursor = mydb.cursor(buffered=True)
    log = json.loads(_log)
    log = json.loads(log)
    timestamp = int(log['timestamp'])
    dialogue = (json.dumps(log['dialogue'])).replace('"', '')

    query_insert = 'INSERT INTO {db}.{table} (time_stamp, convo)'.format(db=database, table=convo_table)
    query_insert = query_insert + ' VALUE (from_unixtime({time}), "{dia}");'.format(time=timestamp, dia=dialogue)

    try:
        mycursor.execute(query_insert)
        mycursor.execute('SELECT * FROM {db}.{table};'.format(db=database, table=convo_table))
        if debug_mode:
            print('Ran SQL')
        for x in mycursor:
            print(x)
        mydb.commit()
        mydb.close()
        return True
    except:
        return False
