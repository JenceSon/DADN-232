import json
import requests

def get_payload_and_url(text):
    if len(text)<1:
        print("ERROR: 'text' should not be empty")
        return {}
    if isinstance(text, str):
        return ({
                    "content": text
                }, API_URL)
    if isinstance(text, list):
        return ([{
                    "content": content
        } for content in text], API_URL + '/bulk')

def call_receptiviti_api(text):
    payload, url = get_payload_and_url(text)
    results = []
    if len(payload)>0:
        response = requests.post(url, data=json.dumps(payload), auth=(API_KEY, API_SECRET), headers = {'Content-Type': 'application/json'})
        if response.status_code==200:
            results = response.json()
    return results