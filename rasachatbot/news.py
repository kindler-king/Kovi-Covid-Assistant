import requests

def news():
    url = "https://newscatcher.p.rapidapi.com/v1/search"

    querystring = {"media":"True","sort_by":"relevancy","lang":"en","country":"in","page":"1","q":"Coronavirus"}

    headers = {
        'x-rapidapi-host': "newscatcher.p.rapidapi.com",
        'x-rapidapi-key': "237d3ddb5cmshf8270554cb06ec0p187d86jsnc404893cd6c2"
        }

    response = requests.request("GET", url, headers=headers, params=querystring)

    print(response.text)