import os
from enum import Enum
from pprint import pprint

from pydantic import BaseModel
from openai import OpenAI
import asyncio
from typing import Optional
import openai
from openai import AsyncOpenAI
from dotenv import load_dotenv

from models import NewAccount, AccountSizeEnum, AccountTypeEnum, SegmentEnum   
import prompts
load_dotenv()

# Set your OpenAI API key
openai.api_key = os.getenv("OPENAI_API_KEY")
client = OpenAI()

def generate_account():
    completion = client.beta.chat.completions.parse(
        model="gpt-4o-2024-08-06",
        messages=[
            {"role": "system", "content": "Create realistic data that relevant to the Indonesian Red Cross."},
            {"role": "user", "content": prompts.POST_Accounts},
        ],
        response_format=NewAccount,
    )
    

    return completion.choices[0].message.parsed.json()


    
async def run_tests():
    print('Running tests')
    print('Mock Data Output ', '-'*50)
    pprint(generate_account())
    print('-'*50)


if __name__ == "__main__":
    asyncio.run(run_tests())    