from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Global variable to simulate server status
server_status = "UP"

@app.route('/', methods=['GET'])
def home():
    return "API Health Monitoring System Running"

@app.route('/health', methods=['GET'])
def health_check():
    global server_status
    if server_status == "UP":
        return jsonify({
            "status": "UP",
            "message": "API is healthy"
        }), 200
    else:
        return jsonify({
            "status": "DOWN",
            "message": "API is currently down for maintenance"
        }), 503

@app.route('/toggle-status', methods=['POST'])
def toggle_status():
    global server_status

    server_status = "DOWN" if server_status == "UP" else "UP"

    return jsonify({
        "status": server_status,
        "message": f"Server status toggled to {server_status}"
    })

@app.route('/echo', methods=['POST'])
def echo_message():
    global server_status

    if server_status == "DOWN":
        return jsonify({
            "error": "Cannot process message. Server is down."
        }), 503

    data = request.get_json()
    message = data.get('message', 'No message provided')

    return jsonify({
        "reply": f"Backend received: '{message}'. Hello from Flask!"
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)