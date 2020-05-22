from flask import Flask, request, render_template, jsonify
app = Flask(__name__, template_folder='public/')

from flask_cors import CORS
CORS(app, support_credentials=True)



import qScript
import fScript
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

@app.route('/botservice/feedback', methods=['POST'])
def retResponseToFeedback():
    req = json.loads(request.data)
    f = req['data']['feedback']['value']
    res = json.dumps({'reply': fScript.aptResponse(f)})
    return res

if __name__ == '__main__':
    app.run()