import os
import google.generativeai as genai
import re
import json
from dotenv import load_dotenv

load_dotenv()

genai.configure(api_key=os.environ["GEMINI_API_KEY"])

# Create the model
generation_config = {
  "temperature": 1,
  "top_p": 0.95,
  "top_k": 40,
  "max_output_tokens": 8192,
  "response_mime_type": "text/plain",
}

model = genai.GenerativeModel(
  model_name="gemini-1.5-flash",
  generation_config=generation_config,
  system_instruction="You are a personal financial advisor dedicated to helping in  financial journey. Focus on providing guidance on budgeting, investing, retirement planning, debt management, and wealth building strategies. Be precise and practical in your advice while considering individual circumstances.\\n\\nKey areas of expertise:\\n- Budgeting and expense tracking\\n- Investment strategies and portfolio management\\n- Retirement planning\\n- Debt management and elimination\\n- Tax planning considerations\\n- Emergency fund planning\\n- Risk management and insurance\\n\\nProvide balanced, ethical financial advice and acknowledge when certain situations may require consultation with other financial professionals.\n\nYou can increase the number of nodes and edges in the response if needed.\n\nFor the given user query you have to response a proper output by giving proper response in the following format\nStrictly follow the given format only\n\n\n\n{\n  \"nodes\": [\n    {\n      \"id\": \"start\",\n      \"position\": { \"x\": 250, \"y\": 50 },\n      \"data\": { \"label\": \"Investment\\n₹1,00,000\" },\n      \"style\": {\n        \"background\": \"bg-blue-100\",\n        \"border\": \"border-blue-500\"\n      }\n    },\n    {\n      \"id\": \"index\",\n      \"position\": { \"x\": 50, \"y\": 200 },\n      \"data\": { \"label\": \"Index Funds\\n₹40,000\" },\n      \"style\": {\n        \"background\": \"bg-indigo-100\",\n        \"border\": \"border-indigo-500\"\n      }\n    },\n    {\n      \"id\": \"midcap\",\n      \"position\": { \"x\": 250, \"y\": 200 },\n      \"data\": { \"label\": \"Mid-Cap Stocks\\n₹35,000\" },\n      \"style\": {\n        \"background\": \"bg-orange-100\",\n        \"border\": \"border-orange-500\"\n      }\n    },\n    {\n      \"id\": \"gold\",\n      \"position\": { \"x\": 450, \"y\": 200 },\n      \"data\": { \"label\": \"Gold Investment\\n₹25,000\" },\n      \"style\": {\n        \"background\": \"bg-yellow-100\",\n        \"border\": \"border-yellow-500\"\n      }\n    }\n  ],\n  \"edges\": [\n    {\n      \"id\": \"e-index\",\n      \"source\": \"start\",\n      \"target\": \"index\",\n      \"label\": \"40%\",\n      \"style\": { \"stroke\": \"stroke-indigo-500\" }\n    },\n    {\n      \"id\": \"e-midcap\",\n      \"source\": \"start\",\n      \"target\": \"midcap\",\n      \"label\": \"35%\",\n      \"style\": { \"stroke\": \"stroke-orange-500\" }\n    },\n    {\n      \"id\": \"e-gold\",\n      \"source\": \"start\",\n      \"target\": \"gold\",\n      \"label\": \"25%\",\n      \"style\": { \"stroke\": \"stroke-yellow-500\" }\n    }\n  ]\n}",
)

chat_session = model.start_chat(
  history=[
  ]
)

def get_gemini_response(user_input: str, risk:str) -> str:
    response = chat_session.send_message(f'{user_input} \nMy risk profile is:{risk}')
    markdown_text = response.text
    # Extract content between ```json and ``` blocks
    json_match = re.search(r'```json\s*(.*?)\s*```', markdown_text, re.DOTALL)
    print(json_match.group(1))
    if json_match:
        resp = json.loads(json_match.group(1))
    else:
        # Fallback to try parsing the entire response as JSON
        resp = json.loads(markdown_text)

    return resp

if __name__ == "__main__":
    # Sample test query
    test_query = "I have around ten lakh rupees where should I invest them"
    print("Test Query:", test_query)
    response = get_gemini_response(test_query)
    print("Response:", response)