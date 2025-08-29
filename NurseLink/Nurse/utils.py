import subprocess
import json

def query_granite(prompt):
    """Send a prompt to Granite LLM via Ollama CLI and get the response."""
    cmd = [
        "ollama",
        "run",
        "granite3.2-vision:2b",
        "--prompt",
        prompt,
        "--json"  # returns JSON output
    ]
    result = subprocess.run(cmd, capture_output=True, text=True)
    if result.returncode != 0:
        raise Exception(f"Granite LLM error: {result.stderr}")
    
    response = json.loads(result.stdout)
    return response.get("output", "")
