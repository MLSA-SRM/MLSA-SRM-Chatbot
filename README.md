# MLSA-SRM's Chatbot Service
This is a service built for answering Frequently Answered Questions for a closed domain using Azure's Cognitive Search (read more about it [here](https://azure.microsoft.com/en-in/services/search/?&ef_id=CjwKCAjwj975BRBUEiwA4whRB-5jOGCgZSinSTmb25zyYjWvE0OQY9vfyHfQQaS-SWMx-ltkJoGWvhoC81gQAvD_BwE:G:s&OCID=AID2100054_SEM_CjwKCAjwj975BRBUEiwA4whRB-5jOGCgZSinSTmb25zyYjWvE0OQY9vfyHfQQaS-SWMx-ltkJoGWvhoC81gQAvD_BwE:G:s&dclid=CjgKEAjwj975BRDai_erl_Px9kESJAC8MkHjSIZwhFYXqqzV6B4imhENJxESkS3wmNvRgiIzaOT2A_D_BwE)) to find answers in generally formatted documents (e.g. Product Manuals or Club Manifests). A default instance is currently deployed at [our website](https://msclubsrm.in). This service can be instantiated and customised as per need.

## Built With
| Software | Version |
|----------|---------|
| Adobe XD | 24.0.22 |
| Zeplin   | 4.0.2 |
| Python 3 | 3.7.1 |
| QnAMaker | June 2020 |

<i> Deployed using Microsoft Azure's App Service </i>

## Pre-requisites
| Software | Tested With |
|----------|---------|
| Python 3 | 3.7.1 |
| QnAMaker | June 2020 |

## Getting Started

* Clone the repository.
```
git clone https://github.com/MLSA-SRM/bot-gateway-rest-api
```
* Now install all required libraries through requirements.txt
```
pip install requirements.txt
```
* The project contains a tested live feedback service, with an option to have the feedback sent to an E-mail, or uploaded to a SQL Database (defaulted to E-mail). Code marked as `Potential Feedback Service` can be uncommented to test the SQL-based Feedback
* Now create a file with the name `.env`. Add all API Keys (mentioned in following example) inside the `.env` file as text. Click [here](https://pypi.org/project/python-dotenv/) to know more about hidden API Keys as Environment Variables.
```
SQL_USER=examplekeyvalue123
SQL_PWD=examplepassword#123
SQL_HOST=examplehost123
SQL_DB=exampledbconn#123
MAIL_USER_ID=exampleemailid
MAIL_USER_PWD=exampleemailpwd
```
* You can find all required keys in the `settings.py`, as imported environment variables.
* Lastly, update the URLs fetching the QnAMaker's API at `Line: 256` in `bot.js` (you can find it [here](https://github.com/MLSA-SRM/bot-gateway-rest-api/blob/master/public/bot.js#L256)) as per the API credentials provided by your hosted QnAMaker Service.
* Now run the Flask app `app.py`
```
python app.py
```
* In your browser open http://localhost:5000 (or `:{port-number}` as specified by the Flask's development server)

## More Info
For more info, or having a chatbot of your own - contact us: [Microsoft Learn Student Ambassadors SRM](https://msclubsrm.in)
