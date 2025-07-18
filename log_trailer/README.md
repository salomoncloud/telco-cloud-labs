# Project 2 – Log Tailer & Live Stats Dashboard

This project simulates a real-time telecom log tailing and monitoring tool used by core and access network support engineers (e.g., Ericsson/Nokia/Ciena transport engineers). It reads a telecom log file, streams key alerts to a web dashboard, and filters them by severity or event type.

---

## Features

- Real-time log tailing (like `tail -f`)
- Detection of key events: `ERROR`, `WARNING`, `CRITICAL`, `ALERT`, `INVITE`
- Live updates to web dashboard via WebSocket
- Highlights both historical and new log entries
- Simulates tools like Splunk/Graylog but built from scratch

---

## Tech Stack

- Python 3
- Flask
- Flask-SocketIO
- Eventlet
- HTML/CSS + JS for the dashboard

---

## Project Structure
log-trailer/
├── app.py # Flask app with WebSocket server
├── log_tail.py # Core logic for tailing and emitting log lines
├── requirements.txt # Dependencies
├── sample_logs/
│     telecom_service.log # Sample input log file
├── templates/
│     index.html # Dashboard UI


---
After creation and activation of venv, as well as installing requirements, create a log file to simulate events
mkdir -p sample_logs
nano sample_logs/telecom_service.log
then run app.py
python app.py
and visit http://localhost:5000/

Lots of room to improve this, I went the easy route of using static logs but will eventually look into adding dashboards and collecting from a live source.
