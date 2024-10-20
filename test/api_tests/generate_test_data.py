import os
import openai
import requests
import json
import random
import asyncio

from openai import AsyncOpenAI
from dotenv import load_dotenv

load_dotenv()

# Set your OpenAI API key
openai.api_key = os.getenv("OPENAI_API_KEY")

# Set your API base URL for local development
BASE_URL = "http://localhost:3000"

# Function to generate mock data using the ChatGPT API
async def generate_mock_data(prompt):
    client = AsyncOpenAI()
    completion = await client.chat.completions.create(
        model="gpt-3.5-turbo", 
        messages=[{"role": "user", "content": prompt}]
    )
    response = completion.choices[0].message.content
    print('Mock Data Output ', '-'*50)
    print(response)
    print('-'*50)
    return completion.choices[0].message.content
# Function to test the POST request for the contacts API
def test_post_contacts(mock_contact_data):
    response = requests.post(f"{BASE_URL}/contacts", json=mock_contact_data)

    if response.status_code == 201:
        print(f"POST /contacts: Contact added successfully - {response.json()}")
    else:
        print(f"POST /contacts: Failed with status code {response.status_code}, response: {response.text}")

# Function to test the GET request for the contacts API
def test_get_contacts():
    response = requests.get(f"{BASE_URL}/contacts")
    if response.status_code == 200:
        print(f"GET /contacts: Success - {response.json()}")
    else:
        print(f"GET /contacts: Failed with status code {response.status_code}, response: {response.text}")

# Function to test the POST request for accounts API
def test_post_accounts(mock_account_data):
    response = requests.post(f"{BASE_URL}/accounts", json=mock_account_data)

    if response.status_code == 201:
        print(f"POST /accounts: Account created successfully - {response.json()}")
    else:
        print(f"POST /accounts: Failed with status code {response.status_code}, response: {response.text}")




# Main async function to run tests
async def run_tests():
    # Generate mock data for contacts
    mock_contact_data = {
        "FirstName": await generate_mock_data("Generate a first name."),
        "LastName": await generate_mock_data("Generate a last name."),
        "OfficialEmailAddress": await generate_mock_data("Generate a random email address."),
        "Role": random.choice(["Manager", "Director", "Volunteer"]),
        "IsActive": True
    }

    print("Testing POST /contacts...")
    test_post_contacts(mock_contact_data)

    print("Testing GET /contacts...")
    test_get_contacts()

    # Generate mock data for accounts
    mock_account_data = {
        "OrganizationName": await generate_mock_data("Generate a company name."),
        "AccountType": random.choice(['Corporation', 'Grant Foundation']),
        "AccountSize": random.choice(['Small', 'Medium', 'Large']),
        "GivingPotential": round(random.uniform(1000, 50000), 2),
        "AccountLocation": await generate_mock_data("Generate a random location."),
        "AccountChannel": random.choice(['Energy', 'Retail']),
        "Segment": random.choice(['Retail', 'Energy']),
        "PriorDonations": round(random.uniform(500, 20000), 2),
        "AccountManagerID": 1  # Assuming a test account manager ID
    }

    print("Testing POST /accounts...")
    test_post_accounts(mock_account_data)

# Run the async function
if __name__ == "__main__":
    asyncio.run(run_tests())
