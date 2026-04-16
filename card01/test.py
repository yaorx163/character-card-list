import requests
import json



headers = {
    "Content-Type": "application/json",
    "Authorization": "sk-txvloopusplus-TbDi7wnndhz5lmdg93k"   # 请替换为真实 API Key
}

payload = {
    "model": "claude-sonnet-4-6-thinking",
    "messages": [
        {
            "role": "user",
            "content": "Hello, how are you?"
        }
    ],
    "max_tokens": 150,
    "temperature": 0.7
}

urls = {"https://okapi.pockgo.com/v1","https://okapi-good.pockgo.com/v1","https://okapi.aicohere.org/v1","https://okapi-good.aicohere.org/v1"}

for url in urls:
    try:
        response = requests.post(url, headers=headers, json=payload)
        response.raise_for_status()
        print(json.dumps(response.json(), indent=2, ensure_ascii=False))
    except requests.exceptions.RequestException as e:
        print(f"{e}")

