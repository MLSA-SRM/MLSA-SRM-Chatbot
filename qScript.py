#---Default Case Response------------------------
def_case = "My responses are limited. | I can answer questions related to MSPC only. | Umm, don't really have much to say on that. | I am equipped to handle questions related to MSPC only. | That seems irrelevant to my purpose. | Don't have much to comment on that. | Okay, sure, cool. Next question? | My knowledge base is limited to MSPC only."
#------------------------------------------------

import http.client
import mimetypes
import json
import random

def ping_kb(question, host, POSTkey, key):
    # print(question, host, POSTkey, key)
    conn = http.client.HTTPSConnection(host)
    # payload = "{\n\t\"question\": \"" + question + "\",\n\t\"top\": 4\n}"
    payload = json.dumps({
        "question": question,
    })
    headers = {
    'Authorization': key,
    'Content-Type': 'application/json',
    'Cookie': 'ARRAffinity=09e4dbcfb7d151ae26749cddf13422c292961bb7c3da19ef05434b6587763168'
    }
    conn.request("POST", "/qnamaker/knowledgebases/" + POSTkey + "/generateAnswer", payload, headers)
    res = conn.getresponse()
    data = res.read()
    _answer = json.loads(data.decode("utf-8"))
    # print(_answer)
    reply = _answer['answers'][0]['answer']
    if reply == "No good match found in KB.":
        possible_answers = def_case.split(' | ')
    else:
        possible_answers = reply.split(' | ')
    return random.choice(possible_answers)

# # MSPC BOT Credentials
# host = "mspcbot-faq.azurewebsites.net"
# POSTkey = '2be5dde2-29b4-4b60-820a-04a6acf34292'
# key = 'EndpointKey d984024e-ca78-4394-8b1c-d96907585545'

# question = "mspc lead"
# print(ping_kb(question, host, POSTkey, key))
