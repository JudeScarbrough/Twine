from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route('/', methods=['POST'])
def receive_data():
    data = request.get_json()
    print(data)
    return "Data received"


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)
