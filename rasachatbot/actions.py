# This files contains your custom actions which can be used to run
# custom Python code.
#
# See this guide on how to implement these action:
# https://rasa.com/docs/rasa/core/actions/#custom-actions/


# This is a simple example for a custom action which utters "Hello World!"

from typing import Any, Text, Dict, List

from rasa_sdk import Action, Tracker
from rasa_sdk.executor import CollectingDispatcher
from countrystats import Countrystats
from globalstats import world 

class ActionCountryStats(Action):

    def name(self) -> Text:
        return "action_country_stats"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        
        country = tracker.latest_message['text']
        country = Weather(city)['confirmed','recovered','deaths']
        dispatcher.utter_template("utter_country_stats",tracker,country=country)

        return []


class ActionGolbalStats(Action):

    def name(self) -> Text:
        return "action_world_stats"

    def run(self,dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

        worldstats = world()['confirmed','recovered','deaths']
        dispatcher.utter_template("utter_world_stats",tracker,worldstats)

        return []


#class ActionShowNewsIndia(Action):

    def name(self) -> Text:
        return "action_show_news_india"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

        newsapi = NewsApiClient(api_key='50f272bcae1f4491b90864cad6f20628')
        top_headlines = newsapi.get_top_headlines(q='COVID-19 India',language='en',)
        #for article in top_headlines['articles']:
            #dispatcher.utter_message(str(article['title']))
            #print("Title : ", article['title'])
            #dispatcher.utter_message(str(article['description']))
            #print("Description : ",article['description'])
        #hyperlink_format = '<a href = "{link}" target="_blank">{text}</a>'
 
        list1 = []
        for article in top_headlines['articles']:
            description = str(article['description'])
            hyperlink_format = '<a href = "{link}" target="_blank">{text}</a>'
            hyperlink_format = hyperlink_format.format(link = article['url'],text = 'here')
            hyperlink_message = ". Click " + hyperlink_format + " to read enitre article"
            description = description + hyperlink_message
            #print(description)
            x = {"title":article['title'],"description":description}
            list1.append(x)
        dispatcher.utter_custom_json({"payload":"collapsible","data":list1})

        return []

#class ActionShowTestingCentre(Action):

    def name(self) -> Text:
        return "action_show_testing_centre"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

        myloc = geocoder.ip('me')
        print(myloc.latlng)
        lat = str(myloc.latlng[0])
        longi = str(myloc.latlng[1])
        url = "https://www.google.co.in/maps/search/covid+19+Testing+center/@{},{}".format(lat,longi)
        r = requests.get(url)
        string_1 = re.findall(r"null,\\(.*?)Owner",r.text)
        covid_list_name = []
        for i in string_1:
            string_2 = i.rsplit("\\",1)
            string_3 = string_2[1]
            string_3 = string_3[1:]
            string_3 = string_3[:-1]
            string_3 = string_3.strip()
            covid_list_name.append(string_3)
        covid_list_directions = []
        for name in covid_list_name:
            replaced = name.replace(" ","+")
            url_directions = "https://www.google.co.in/maps/dir//{}".format(replaced)
            covid_list_directions.append(url_directions)
        
        final_hospital_address = []
        for i1 in string_1:
            string_2_dir = i1.rsplit("\\n,null,\\",1)
            #print("OK")
            string_3_dir = string_2_dir[1]
            string_4_dir = string_3_dir.split("\\")[0]
            string_4_dir = string_4_dir[1:]
            final_hospital_address.append(string_4_dir)
                
 
        final_list_hospitals = []
        for k in range(0,len(covid_list_name)):
            hyperlink_format = '<a href = "{link}" target="_blank">{text}</a>'
            hyperlink_format = hyperlink_format.format(link = covid_list_directions[k],text = 'here')
            hyperlink_message = ". Click " + hyperlink_format + " for directions"
            desc = final_hospital_address[k] + hyperlink_message
            desc = "<b> Address : </b>" +desc
            x = {"title":covid_list_name[k],"description":desc}
            final_list_hospitals.append(x)
        dispatcher.utter_custom_json({"payload":"collapsible","data":final_list_hospitals})

        return []