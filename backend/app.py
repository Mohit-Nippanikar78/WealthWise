from flask import Flask, request, jsonify
from onboard import *
from flask_cors import CORS
import subprocess
import re
from jgaad_ai_agent_backup import jgaad_chat_with_gemini
import gemini_fin_path

# start scheudler.py in asyn mode
subprocess.Popen(['python', 'scheudler.py'], stdout=subprocess.PIPE, stderr=subprocess.PIPE, universal_newlines=True)

app = Flask(__name__)
CORS(app)

@app.route('/', methods=['GET'])
def home():
    return jsonify("HI")

# =================== DYNAMIC APIS ===================
@app.route('/agent', methods=['POST'])
def agent():
    inp = request.form.get('input')
    # response = get_agent_response(inp)
    if inp:
        # run in terminal
        print(inp)
        process = subprocess.Popen(['python', 'agent.py', inp], 
                     stdout=subprocess.PIPE, 
                     stderr=subprocess.PIPE,
                     universal_newlines=True)
        
        output = []
        # Stream output in real-time
        while True:
            line = process.stdout.readline()
            if not line and process.poll() is not None:
                break
            if line:
                print(line.strip())  # Print to terminal in real-time
                output.append(line)
        
        output_str = ''.join(output)
        process.wait()

        # Use regex to extract the response between <Response> tags
        final_answer = re.search(r'<Response>(.*?)</Response>', output_str, re.DOTALL)
        if final_answer:
            final_answer = final_answer.group(1).strip()
        else:
            final_answer = jgaad_chat_with_gemini(inp, output_str)
        # response = get_agent_response(inp)
        return jsonify({'output': final_answer, 'thought': output_str})
    return "no input"

@app.route('/ai-financial-path', methods=['POST'])
def ai_financial_path():
    if 'input' not in request.form:
        print(request.form['input'])
        return jsonify({'error': 'No input provided'}), 400
        
    input_text = request.form.get('input','')
    risk = request.form.get('risk', 'conservative')
    print(input_text)
    try:
        response = gemini_fin_path.get_gemini_response(input_text, risk)
        return jsonify(response)
    except Exception as e:
        return jsonify({'error': 'Something went wrong'}), 500

# =================== STATIC APIS ===================
@app.route('/auto-bank-data', methods=['get'])
def AutoBankData():
    return bank_data

@app.route('/auto-mf-data', methods=['get'])
def AutoMFData():
    return mf_data


# =================== CONENCTION APIS ===================

# =================== BOTS ===================
# @

if __name__ == "__main__":
    app.run(debug=True)