from .base import *

sensitive_info = os.path.join(BASE_DIR, "django-config.json")

with open(sensitive_info) as config_file:
    config = json.load(config_file)

SECRET_KEY = config["secret_key"]
DEBUG = True
ALLOWED_HOSTS = ['0.0.0.0', 'localhost', '127.0.0.1']

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}
