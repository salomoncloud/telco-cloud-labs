# MUST be first
import eventlet
eventlet.monkey_patch()

from flask import Flask, render_template
from flask_socketio import SocketIO
import os

app = Flask(__name__)
socketio = SocketIO(app, async_mode='eventlet')

@app.route('/')
def index():
    return render_template('index.html')

@socketio.on('connect')
def handle_connect():
    from log_tail import tail_log_file  # Import here to delay
    log_path = os.path.join("sample_logs", "telecom_service.log")
    print(f"[APP] Client connected. Starting log stream from: {log_path}")
    socketio.start_background_task(tail_log_file, log_path, socketio)

if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=5000)

