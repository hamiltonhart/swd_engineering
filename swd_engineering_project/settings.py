"""
Django settings for swd_engineering_project project.

Generated by 'django-admin startproject' using Django 2.1.

For more information on this file, see
https://docs.djangoproject.com/en/2.1/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/2.1/ref/settings/
"""

import os
import dj_database_url
import environ

env = environ.Env()
environ.Env.read_env()

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
# BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
# BASE_DIR = os.path.dirname(os.path.dirname(
#     os.path.dirname(os.path.abspath(__file__))))

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/2.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
# SECRET_KEY = config["secret_key"]
SECRET_KEY = env.str('SECRET_KEY')

# SECURITY WARNING: don't run with debug turned on in production!
# DEBUG = False
DEBUG = env.bool('DEBUG', default=False)

# ALLOWED_HOSTS = ['0.0.0.0', 'localhost', '127.0.0.1', '45.56.94.96']
ALLOWED_HOSTS = ['0.0.0.0', 'localhost', '127.0.0.1', '192.168.1.10']

# Application definition

INSTALLED_APPS = [
    'corsheaders',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'whitenoise.runserver_nostatic',
    'django.contrib.staticfiles',

    # Third Party
    'graphene_django',


    # Local
    'users.apps.UsersConfig',
    'pages.apps.PagesConfig',
    'rental_projects.apps.RentalProjectsConfig',
    'contacts.apps.ContactsConfig',
    'harddrives.apps.HarddrivesConfig',
    'rooms.apps.RoomsConfig',
    'project_clients.apps.ProjectClientsConfig',
    'project_drives.apps.ProjectDrivesConfig',
    'project_rooms.apps.ProjectRoomsConfig',
]

GRAPHENE = {
    'SCHEMA': 'swd_engineering_project.schema.schema',
    'MIDDLEWARE': [
        'graphql_jwt.middleware.JSONWebTokenMiddleware',
    ],
}

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

# CORS_ORIGIN_ALLOW_ALL = True

CORS_ORIGIN_WHITELIST = (
    "http://localhost:3000",
)


AUTHENTICATION_BACKENDS = [
    'graphql_jwt.backends.JSONWebTokenBackend',
    'django.contrib.auth.backends.ModelBackend',
]

ROOT_URLCONF = 'swd_engineering_project.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'build')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'swd_engineering_project.wsgi.application'


# Database
# https://docs.djangoproject.com/en/2.1/ref/settings/#databases

db_from_env = dj_database_url.config()
DATABASES = {
    'default': {
        'ENGINE': env.str('DB_ENGINE', default='django.db.backends.sqlite3'),
        'NAME': env.str('DB_NAME', default='db.sqlite3'),
        'USER': env.str('DB_USER', default=None),
        'PASSWORD': env.str('DB_PASS', default=None),
        'HOST': env.str('DB_HOST', default='localhost'),
        'PORT': env.str('DB_PORT', default='5432'),
    }
}
DATABASES['default'].update(db_from_env)

# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.sqlite3',
#         'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
#     }
# }

# db_from_env = dj_database_url.config()
# DATABASES = {
#     'default': {
#     'ENGINE': 'django.db.backends.postgresql_psycopg2',
#     'NAME': config['db_name'],
#     'USER': config['db_user'],
#     'PASSWORD': config['db_pass'],
#     'HOST': 'localhost',
#     'PORT': '5432',
#         }
#     }
# DATABASES['default'].update(db_from_env)

# Password validation
# https://docs.djangoproject.com/en/2.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/2.1/topics/i18n/

LANGUAGE_CODE = 'en-us'

DATE_INPUT_FORMATS = ("%d-%m-%Y", "%Y-%m-%d")

TIME_ZONE = 'US/Pacific'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/2.1/howto/static-files/

STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

REACT_APP_DIR = os.path.join(BASE_DIR, 'frontend')

STATICFILES_DIRS = [
   os.path.join(REACT_APP_DIR, 'build', 'static'),
]

AUTH_USER_MODEL = 'users.CustomUser'

# LOGIN_URL = 'login'

# LOGIN_REDIRECT_URL = 'pages:home'
# LOGOUT_REDIRECT_URL = 'pages:home'

# STATICFILES_DIRS = [
#     os.path.join(BASE_DIR, 'static'),
# ]