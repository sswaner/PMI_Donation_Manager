import requests
import json
import random
import asyncio
import re

from pprint import pprint

import generate_test_data
import prompts

import generator

# Base URL of your API
BASE_URL = "http://localhost:3000"

# Function to call /accounts/overview/{id}
def get_all_accounts():
    url = f"{BASE_URL}/accounts"
    
    try:
        response = requests.get(url)
        
        # Check if the response is successful
        if response.status_code == 200:
            print("GET /accounts: Success")
            accounts = response.json()
            # Prettify and print the JSON response
            pretty_json = json.dumps(accounts, indent=4)
            #print(pretty_json)
            return accounts  # Return the list of accounts
        else:
            print(f"GET /accounts: Failed with status code {response.status_code}")
            return None
    
    except requests.exceptions.RequestException as e:
        print(f"An error occurred: {e}")
        return None

def get_account_overview(account_id):
    url = f"{BASE_URL}/accounts/overview/{account_id}"
    
    try:
        response = requests.get(url)
        
        # Check if the response is successful
        if response.status_code == 200:
            print(f"GET /accounts/overview/{account_id}: Success")
            # Prettify and print the JSON response
            pretty_json = json.dumps(response.json(), indent=4)
            #print(pretty_json)
            return (True, "response.json()")
        elif response.status_code == 404:
            print(f"GET /accounts/overview/{account_id}: Account not found.")
            return (False, "Account not found.")
        else:
            print(f"GET /accounts/overview/{account_id}: Failed with status code {response.status_code}")
            return (False, f"Failed with status code {response.status_code}")
        
    except requests.exceptions.RequestException as e:
        print(f"An error occurred: {e}")
        return (False, f"An error occurred: {e}")
    
# Function to call /accounts/{id}
def get_account_by_id(account_id):
    url = f"{BASE_URL}/accounts/{account_id}"
    
    try:
        response = requests.get(url)
        
        # Check if the response is successful
        if response.status_code == 200:
            print(f"GET /accounts/{account_id}: Success")
            # Prettify and print the JSON response
            pretty_json = json.dumps(response.json(), indent=4)
            print(pretty_json)
            return (True, "response.json()")
        elif response.status_code == 404:
            print(f"GET /accounts/{account_id}: Account not found.")
            return (False, "Account not found.")
        else:
            print(f"GET /accounts/{account_id}: Failed with status code {response.status_code}")
            return (False, f"Failed with status code {response.status_code}")
        
    except requests.exceptions.RequestException as e:
        print(f"An error occurred: {e}")
        return (False, f"An error occurred: {e}")


def clean_and_validate_json(data_string):
    # Step 1: Remove surrounding parentheses and single quotes
    cleaned_string = data_string.strip("()'")
    
    # Step 2: Replace newline and carriage return characters
    cleaned_string = cleaned_string.replace('\n', ' ').replace('\r', '')
    
    # Step 3: Fix the issue where single quotes are within the JSON by replacing them with double quotes
    # Use a regular expression to replace single quotes around JSON keys/values with double quotes
    cleaned_string = re.sub(r"'", '"', cleaned_string)

    # Step 4: Validate if the cleaned string is valid JSON
    try:
        json_obj = json.loads(cleaned_string)
        print("Valid JSON!")
        return json_obj  # Return the valid JSON object
    except json.JSONDecodeError as e:
        print("Invalid JSON! JSNDecodeError")
        print(f"Invalid JSON: {e}")
        print('-' * 20)
        print(cleaned_string)
        print(''-' * 50')
        return None
    
async def add_account(account_data):
    url = f"{BASE_URL}/accounts"
    
    cleaned_str = clean_and_validate_json(account_data)
        

    response = requests.post(url, json=cleaned_str)
    
    # Print the raw response content from the API
    print('API Response:', '-'*50)
    print(response.text)  # Print the raw response text
    print('-'*50)
    
    try:


        
        # Check if the response is successful
        if response.status_code == 201:
            print("POST /accounts: Account created successfully")
            # Prettify and print the JSON response
            pretty_json = json.dumps(response.json(), indent=4)
            print("ADD ACCOUNT", '-'*50)
            #print(pretty_json)
            return (True, response.json())  # Return the actual JSON data
        elif response.status_code == 400:
            print("POST /accounts: Bad request - missing required fields.")
            print("account_data ", '-'*50)
            print(account_data)
            return (False, "Bad request - missing required fields.")
        else:
            print(f"POST /accounts: Failed with status code {response.status_code}")
            return (False, f"Failed with status code {response.status_code}")
    
    except requests.exceptions.RequestException as e:
        print(f"An error occurred: {e}")
        return (False, f"An error occurred: {e}")

# Main function to run the flow
async def run_test():
    test_results = {}
    # Step 1: Get all accounts
    accounts = get_all_accounts()
    test_results["accounts"] = (True, "accounts")

        
    if accounts and len(accounts) > 0:
        # Step 2: Pick a random account from the list
        random_account = random.choice(accounts)
        account_id = random_account.get('AccountID')
        
        if account_id:
            print(f"\nPicked random account with ID: {account_id}")
            
            # Step 3: Get the account overview for the selected account
            test_results["GET /accounts/overview/%ID"] = get_account_overview(account_id)
            test_results["GET /accounts/%ID"] = get_account_by_id(account_id)
        else:
            print("No valid AccountID found in the account data.")
    else:
        print("No accounts found or failed to fetch accounts.")

    new_account_data = generator.generate_account()

    success, response = await add_account(new_account_data)

    # Handling the result
    if success:
        print("Account created successfully!")
        test_results["add_account"] = (True, response)
    else:
        print(f"Failed to create account: {response}")
        test_results["add_account"] = (False, response)
        
    return test_results


# Run the test
if __name__ == "__main__":
    results = asyncio.run(run_test())

    for result in results:
        print(result, results[result][0])