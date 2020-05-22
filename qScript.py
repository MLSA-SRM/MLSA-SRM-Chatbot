import http.client
import mimetypes
import json


def ping_kb(question, host, POSTkey, key):
    # print(question, host, POSTkey, key)
    conn = http.client.HTTPSConnection(host)
    payload = "{\n\t'question': " + question + "\t\n}"
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
    return str(_answer['answers'][0]['answer'])

# MSPC BOT Credentials
# host = "mspcbot-faq.azurewebsites.net"
# POSTkey = '946b8385-23cd-4333-a5f4-8e4bb7075770'
# key = 'EndpointKey d984024e-ca78-4394-8b1c-d96907585545'
# question = "'Who is your lead'"
# print(ping_kb(question, host, POSTkey, key))