# requirements
import typer
import json
import re
from datetime import datetime
from rich import print

app = typer.Typer()
# regex stuff - refer to link in notes
log_pattern = re.compile(
    r"(?P<timestamp>\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2})\s+"
    r"(?P<level>\w+)\s+"
    r"\[(?P<module>[^\]]+)\]\s+"
    r"(?P<message>.*)"
)

@app.command()
def parse_logs(
    level: str = typer.Option(None, help="Filter by log level (e.g., INFO, ERROR, DEBUG)"),
    file: str = typer.Option("sample-log.txt", help="Path to the log file"),
    export: str = typer.Option(None, help="Export parsed logs to a JSON file")
):
    parsed_logs = []
# read from sample logs
    with open(file, "r", encoding="utf-8") as f:
        for line in f:
            match = log_pattern.match(line.strip())
            if match:
                log_data = match.groupdict()
                log_data["timestamp"] = datetime.strptime(log_data["timestamp"], "%Y-%m-%d %H:%M:%S")

                if level is None or log_data["level"].upper() == level.upper():
                    parsed_logs.append({
                        "timestamp": log_data["timestamp"].isoformat(),
                        "level": log_data["level"],
                        "module": log_data["module"],
                        "message": log_data["message"]
                    })

                    print(f"[{log_data['level']}] from [cyan]{log_data['module']}[/cyan] at {log_data['timestamp']}:")
                    print(f"    {log_data['message']}\n")

    if export:
        with open(export, "w", encoding="utf-8") as out_file:
            json.dump(parsed_logs, out_file, indent=4)
        print(f"[green]Logs exported to {export}[/green]")

if __name__ == "__main__":
    app()
