import os
from os.path import join, dirname
from dotenv import load_dotenv

try:
    dotenv_path = join(dirname(__file__), '.env')
    load_dotenv(dotenv_path)
    SQL_USER = str(os.environ.get("SQL_USER"))
    SQL_PWD = str(os.environ.get("SQL_PWD"))
    SQL_HOST = str(os.environ.get("SQL_HOST"))
    SQL_PORT = int(os.environ.get("SQL_PORT"))
    SQL_DB = str(os.environ.get("SQL_DB"))
except:
    SQL_USER = str(os.environ.get("SQL_USER"))
    SQL_PWD = str(os.environ.get("SQL_PWD"))
    SQL_HOST = str(os.environ.get("SQL_HOST"))
    SQL_PORT = int(os.environ.get("SQL_PORT"))
    SQL_DB = str(os.environ.get("SQL_DB"))
