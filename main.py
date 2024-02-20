#Importing modules from FastAPI
from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
import google.oauth2.id_token
from google.auth.transport import requests

# create an instance for fastApi
app = FastAPI()

# request object to talk to firebase for verifyinh user login
firebase_request_adapter = requests.Request()

# mount static directory to serve static files 
app.mount('/static', StaticFiles(directory = 'static'), name='static')

#Initialize Jinja2Templates for handling HTML templates 
templates = Jinja2Templates(directory = "templates")

# Define a route for the root URL ('/') that returns HTMLResponse
@app.get("/", response_class= HTMLResponse)

#Root function to be returned 
async def root(request: Request):

    id_token = request.cookies.get("token")
    error_message = "No error here"
    user_token = None

    if id_token:
        try: 
            user_token = google.oauth2.id_token.verify_firebase_token(id_token, firebase_request_adapter)
        except ValueError as err:
            print(str(err))

    return templates.TemplateResponse('main.html', {'request': request, 'user_token': user_token, 'error_message': error_message})

