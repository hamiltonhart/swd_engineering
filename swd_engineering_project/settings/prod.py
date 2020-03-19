from .base import *

sensitive_info = "/etc/django-config.json"

with open(sensitive_info) as config_file:
    config = json.load(config_file)

SECRET_KEY = config["secret_key"]
DEBUG = False
ALLOWED_HOSTS = ['0.0.0.0', 'localhost',
                 '127.0.0.1', '45.56.94.96', '192.168.1.10']

db_from_env = dj_database_url.config()
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': config['db_name'],
        'USER': config['db_user'],
        'PASSWORD': config['db_pass'],
        'HOST': 'localhost',
        'PORT': '5432',
    }
}
DATABASES['default'].update(db_from_env)
