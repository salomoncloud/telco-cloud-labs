This CLI tool reads, parses, filters, and exports network log files. Built with Python, Rich, and Typer.
---
**Setup Instructions**
---

Create virtual environment
python3 -m venv venv

Activate virtual environment
source venv/bin/activate

Install dependencies
pip install rich typer

Run the script
python log-parser.py

**Example usage for this tool**

# Show all logs
python log-parser.py

# Filter logs by level
python log-parser.py --level ERROR

# Use a different log file
python log-parser.py --file path/to/other-log.txt

# Export filtered logs to JSON
python log-parser.py --level WARN --export warn-logs.json
