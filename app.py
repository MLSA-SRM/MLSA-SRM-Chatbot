from flask import Flask, request, render_template, jsonify
app = Flask(__name__, template_folder='public/', static_folder='public/')

from flask_cors import CORS
CORS(app, support_credentials=True)

import qScript
import fScript
import convo_logs
import json

@app.route('/')
def botHome():
    return "Finally Works.."

@app.route('/mspcbot')
def mspcBot():
    return render_template('index.html')

@app.route('/botservice/question', methods=['POST'])
def retResponseToQuestion():
    req = json.loads(request.data)
    res = jsonify({'reply': qScript.ping_kb(
        req['data']['question'],
        req['data']['host'],
        req['data']['POSTkey'],
        req['data']['key']
    )})
    print(res)
    return res

# -----------------------potential feedback service--------------------------------------------------------------
# @app.route('/botservice/feedback', methods=['POST'])
# def retResponseToFeedback():
#     req = json.loads(request.data)
#     f = req['data']['feedback']['value']
#     res = json.dumps({'reply': fScript.aptResponse(f)})
#     return res
    
# logging for potential feedback service
# @app.route('/botadmin/logs/feedback', methods=['POST'])
# def saveFeedback():
#     return 'feedback logged' if convo_logs.storeNewFeedbackLog(request.data) else 'feedback not logged'
# ---------------------------------------------------------------------------------------------------------------

@app.route('/botadmin/logs/chat', methods=['POST'])
def saveChatLogs():
    return 'chat logged' if convo_logs.storeNewChat(request.data) else 'chat not logged'

if __name__ == '__main__':
    app.run()