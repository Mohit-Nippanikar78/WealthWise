from dotenv import load_dotenv
from langchain_openai import ChatOpenAI
from langchain.agents import AgentExecutor, create_react_agent
from react_template import get_react_prompt_template
from langchain_groq import ChatGroq
from langchain_ollama import ChatOllama
from langchain_google_genai import ChatGoogleGenerativeAI
from tools.mytools import *
# no warnings
import warnings
warnings.filterwarnings("ignore")


# print(get_all_tool_names())
# exit()

# load environment variables
load_dotenv()

# Choose the LLM to use
# llm = ChatOpenAI(model="gpt-4")
# llm = ChatGroq(model="llama-3.3-70b-versatile")
# llm = ChatOllama(model="deepseek-r1:14b", temperature=0.5)
llm = ChatGoogleGenerativeAI(model="gemini-2.0-flash-exp")

# set my message
query = """ Should I invest in Cipla pharmaceuticals? """

# set the tools
tools = [check_system_time, add, subtract, multiply, divide, power, search, repl_tool, get_historical_price, get_current_price, get_company_info, evaluate_returns]
# print(tools)
# Get the react prompt template
prompt_template = get_react_prompt_template()

# Construct the ReAct agent
agent = create_react_agent(llm, tools, prompt_template)

# Create an agent executor by passing in the agent and tools
agent_executor = AgentExecutor(agent=agent, tools=tools, verbose=True)

# # Get the current time
# x = agent_executor.invoke({"input": query})

# # print the result
# print(x)
# print('\n\n\n\n\n')

while True:
    # Get the user input
    user_input = input("You: ")

    # Invoke the agent
    response = None
    while response is None:
        try:
            response = agent_executor.invoke({"input": user_input})
        except Exception as e:
            
            print("================= RETRY =================\n\n\n\n\n")
            

    # Print the response
    print("Bot:", response["output"])