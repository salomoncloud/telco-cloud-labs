import time
import os

KEYWORDS = ["ERROR", "WARNING", "CRITICAL", "ALERT", "INVITE"]

def tail_log_file(filepath, socketio):
    if not os.path.exists(filepath):
        print(f"[ERROR] Log file not found: {filepath}")
        return

    print(f"[TAILER] Watching file: {filepath}")

    try:
        with open(filepath, 'r') as f:
            # Emit old lines
            for line in f:
                line = line.strip()
                if any(keyword in line for keyword in KEYWORDS):
                    print(f"[EMIT:OLD] -> {line}")
                    socketio.emit('log_line', {'data': line})
                    time.sleep(0.1)  # slight delay to not overwhelm

            # Now tail new lines
            f.seek(0, os.SEEK_END)
            while True:
                line = f.readline()
                if not line:
                    time.sleep(0.5)
                    continue
                line = line.strip()
                print(f"[TAILER] Read line: {line}")
                if any(keyword in line for keyword in KEYWORDS):
                    print(f"[EMIT:NEW] -> {line}")
                    socketio.emit('log_line', {'data': line})
    except Exception as e:
        print(f"[EXCEPTION] Error in tail_log_file: {e}")

