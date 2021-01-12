def world():
    import requests
    url = "https://covid-19-data.p.rapidapi.com/totals"
    querystring = {"format":"json"}

    headers = {
        'x-rapidapi-host': "covid-19-data.p.rapidapi.com",
        'x-rapidapi-key': "237d3ddb5cmshf8270554cb06ec0p187d86jsnc404893cd6c2"
        }

    response = requests.request("GET", url, headers=headers, params=querystring)

    return response.text
