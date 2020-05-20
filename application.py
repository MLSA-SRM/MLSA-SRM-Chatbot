from flask import Flask, request, render_template
# from flask_cors import CORS
app = Flask(__name__)
# CORS(app, support_credentials=True)

# import qScript
# import fScript
# import json

@app.route('/')
def bot():
    return "Finally Works.."

# @app.route('/input/feed', methods=['POST'])
# def retResponse():
#     req = json.loads(request.data)
#     f = req['feedback']['value']
#     res = json.dumps({'reply': fScript.aptResponse(f)})
#     return res

if __name__ == '__main__':
    app.run()