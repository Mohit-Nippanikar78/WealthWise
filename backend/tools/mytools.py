import datetime
from langchain.agents import tool
from dotenv import load_dotenv
import os

load_dotenv()

# ======================================== BASIC TOOLS ========================================

@tool
def check_system_time(format: str = "%Y-%m-%d %H:%M:%S"):
    """Returns the current indian date and time in the specified format"""

    # get the current date and time
    current_time = datetime.datetime.now()
    
    # format the time as a string in the format "YYYY-MM-DD HH:MM:SS"
    formatted_time = current_time.strftime(format)
    
    # return the formatted time
    return formatted_time

@tool
def add(a: int, b: int) -> int:
    """Adds two numbers together"""
    return a + b

@tool
def subtract(a: int, b: int) -> int:
    """Subtracts the second number from the first number"""
    return a - b

@tool
def multiply(a: int, b: int) -> int:
    """Multiplies two numbers together"""
    return a * b

@tool
def divide(a: int, b: int) -> float:
    """Divides the first number by the second number"""
    return a / b

@tool
def power(a: int, b: int) -> int:
    """Raises the first number to the power of the second number"""
    return a ** b


# ======================================== USEFUL TOOLS ========================================
from langchain_core.tools import Tool
from langchain_experimental.utilities import PythonREPL
from langchain_community.tools import DuckDuckGoSearchRun

search = DuckDuckGoSearchRun()

python_repl = PythonREPL()
repl_tool = Tool(
    name="python_repl",
    description="A Python shell. Use this to execute python commands. Input should be a valid python command. If you want to see the output of a value, you should print it out with `print(...)`.",
    func=python_repl.run,
)

# ======================================== FINANCE TOOLS ========================================
import yfinance as yf
from typing import List, Dict
import requests
import json
from pathlib import Path

def get_ticker_from_company(company_name: str) -> str:
    """
    Get the stock ticker symbol for a given company name.

    Args:
        company_name (str): The name of the company.

    Returns:
        str: The stock ticker symbol.
    """
    base_url = f"https://query1.finance.yahoo.com/v1/finance/search?q={company_name}&lang=en-US&region=US&quotesCount=5&newsCount=3&listsCount=2&enableFuzzyQuery=false&quotesQueryId=tss_match_phrase_query&multiQuoteQueryId=multi_quote_single_token_query&newsQueryId=news_cie_vespa&enableCb=true&enableNavLinks=true&enableEnhancedTrivialQuery=true&enableResearchReports=true&enableCulturalAssets=true&enableLogoUrl=true&enableLists=false&recommendCount=5"
    
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'application/json, text/plain, */*',
        'Accept-Language': 'en-US,en;q=0.9',
        'Referer': 'https://finance.yahoo.com/',
        'Origin': 'https://finance.yahoo.com'
    }
    
    response = requests.get(base_url, headers=headers)
    data = response.json()
    try:
        symbol = data['quotes'][0]['symbol']
    except:
        return Exception("Company name not found, try again by providing a valid company name.")
    return symbol

# 1. Fetch Historical Data
@tool
def get_historical_price(inputs: str) -> str:
    """
    Fetch historical stock prices for a given company over a specified date range.

    Args:
        inputs (str): A string containing the company name(The name of the company), start date(Start date in the format 'YYYY-MM-DD'), and duration(number of days to fetch the data for) max 30 days.

    Returns:
        str: A string representation of the historical stock prices.
    """
    try:
        company_name, start_date, duration = inputs.split(",")
        company_name = company_name.strip()
        start_date = start_date.strip()
        duration = duration.strip()
        end_date = datetime.datetime.strptime(start_date, "%Y-%m-%d") + datetime.timedelta(days=int(duration))
        ticker = get_ticker_from_company(company_name)
        stock = yf.Ticker(ticker)
        data = stock.history(start=start_date, end=end_date.strftime("%Y-%m-%d").split(" ")[0])

        values = {}
        for key, value in data["Close"].items():
            # Extract the date portion from the key
            date = str(key).split(" ")[0]
            values[date] = f'{value:.2f}'

        print("\nStock Prices (RPOWER.NS):")
        print("-" * 30)
        print("Date          | Price (INR)")
        print("-" * 30)
        for date, price in values.items():
            print(f"{date} | {price:>8}")
        print("-" * 30)

        return str(values)
    except Exception as e:
        return str(e)

# 2. Get Current Price
@tool
def get_current_price(company_name: str) -> str:
    """
    Get the current price of a stock.

    Args:
        company_name (str): The name of the company.

    Returns:
        str: The current price of the stock.
    """
    try:
        symbol = get_ticker_from_company(company_name)
        stock = yf.Ticker(symbol)
        hist = stock.history(period='1d')
        if not hist.empty:
            return f"{hist['Close'].iloc[-1]:.2f}"
        return 'No data available'
    except Exception as e:
        return str(e)

# 3. Fetch Company Info
@tool
def get_company_info(company_name: str) -> str:
    """
    Retrieve company information for a given ticker.

    Args:
        company_name (str): The name of the company.

    Returns:
        str: A string representation of the company information.
    """
    try:
        ticker = get_ticker_from_company(company_name)
        stock = yf.Ticker(ticker)
        return str(stock.info)
    except Exception as e:
        return str(e)

# 4. Calculate Returns
@tool
def evaluate_returns(inputs:str) -> str:
    """
    Calculate the percentage change in stock price over a duration from current date.

    Args:
        inputs (str): A string containing the company name and duration (comma separated).
        The duration can be like '1M', '1W', '1D'. Max 1 month data can be fetched.

    Returns:
        str: A string representation of the percentage change in stock price.
    """
    try:
        company_name, duration = inputs.split(",")
        company_name = company_name.strip()
        duration = duration.strip()

        ticker = get_ticker_from_company(company_name)
        stock = yf.Ticker(ticker)
        data = stock.history(period=duration)
        
        if data.empty:
            return "No data available"
            
        first_close = data['Close'].iloc[0]
        last_close = data['Close'].iloc[-1]
        percentage_change = ((last_close - first_close) / first_close * 100)
        
        return f"The stock price of {company_name} has changed by {percentage_change:.2f}% in the last {duration}"
    except Exception as e:
        return str(e)

# ======================================== CONNECTION TOOLS ========================================


if __name__ == "__main__":
    # print(get_historical_price("Reliance Industries, 2021-01-01, 30"))
    # print(get_current_price("Reliance Industries"))
    # print(get_company_info("Reliance Industries"))
    # print(evaluate_returns("Reliance Industries, 1Y"))
    # send_whatsapp_message("Hello, this is a test message from the tool.")
    # schedule_task("Test Task, This is a test task, 14:40")
    pass