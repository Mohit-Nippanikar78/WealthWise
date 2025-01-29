import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

genai.configure(api_key=os.environ["GEMINI_API_KEY"])

def upload_to_gemini(path, mime_type=None):
  """Uploads the given file to Gemini.

  See https://ai.google.dev/gemini-api/docs/prompting_with_media
  """
  file = genai.upload_file(path, mime_type=mime_type)
  print(f"Uploaded file '{file.display_name}' as: {file.uri}")
  return file

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
  system_instruction="""You are a personal financial advisor dedicated to helping in  financial journey. Focus on providing guidance on budgeting, investing, retirement planning, debt management, and wealth building strategies. Be precise and practical in your advice while considering individual circumstances.\n\nKey areas of expertise:\n- Budgeting and expense tracking\n- Investment strategies and portfolio management\n- Retirement planning\n- Debt management and elimination\n- Tax planning considerations\n- Emergency fund planning\n- Risk management and insurance\n\nProvide balanced, ethical financial advice and acknowledge when certain situations may require consultation with other financial professionals.
  
  """,
)

chat_session = model.start_chat(
  history=[
  ]
)

def chat_with_gemini(message, media_file_path=None):
  global chat_session
  files = []
  if media_file_path:
    for media_file in media_file_path:
      files.append(upload_to_gemini(media_file, mime_type="audio/mpeg"))
  
    response = chat_session.send_message(message, media_files=files)
    return response
  else:
    response = chat_session.send_message(message)
    return response.text
  
if __name__ == "__main__":
  # Sample test query
  test_query = "Research that should i invest in IT-companies now?"
  print("Test Query:", test_query)
  response = chat_with_gemini(test_query)
  print("Response:", response)