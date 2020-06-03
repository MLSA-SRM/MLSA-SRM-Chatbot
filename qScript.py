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
        "top": 4
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
    possible_answers = [str(_answer['answers'][0]['answer']), str(_answer['answers'][1]['answer']), str(_answer['answers'][2]['answer']), str(_answer['answers'][3]['answer'])]
    return random.choice(possible_answers)

# MSPC BOT Credentials
# host = "mspcbot-faq.azurewebsites.net"
# POSTkey = '7a99f334-2fc0-4a6d-8a43-871b7562a34f'
# key = 'EndpointKey d984024e-ca78-4394-8b1c-d96907585545'

# question = "mspc lead"
# print(ping_kb(question, host, POSTkey, key))
