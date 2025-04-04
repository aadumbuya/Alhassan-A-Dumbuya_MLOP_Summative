"""
Django settings for python_flaw_detector project.

Generated by 'django-admin startproject' using Django 3.2.1.
"""

from pathlib import Path
import os

# Build paths inside the project
BASE_DIR = Path(__file__).resolve().parent.parent

# Security settings
SECRET_KEY = 'django-insecure-=wgo9*rwf(nh7dkg(^n2&qdg$6sqv7^n#1x2t9g3nd4qzj!-c-'

# Debug mode for local development
DEBUG = True

# Allow local access
ALLOWED_HOSTS = ['127.0.0.1', 'localhost']

# Application definition
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    
    # Third-Party Apps (Optional)
    'rest_framework',
    'corsheaders',

    # Local Apps (If any app requires a database, comment it out)
    # 'python_flaw_detector_core.apps.PythonFlawDetectorCoreConfig'
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'ml_core.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
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

WSGI_APPLICATION = 'ml_core.wsgi.application'

# ==========================================
# DISABLING DATABASE CONNECTION FOR LOCAL USE
# ==========================================
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.dummy'  # Use a dummy backend to disable DB
    }
}

# Disable authentication-related database validation
AUTHENTICATION_BACKENDS = []

# Password validation (Commented out because they require a database)
AUTH_PASSWORD_VALIDATORS = []

# REST Framework settings (Disable authentication if not needed)
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [],
}

# Static files (CSS, JavaScript, Images)
STATIC_URL = '/static/'
STATICFILES_DIRS = [BASE_DIR / "static"]

# Default primary key field type
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# CORS Settings for Localhost
CORS_ALLOW_ALL_ORIGINS = True
CORS_ALLOW_CREDENTIALS = True

# Disable Email Configurations if Not Needed
EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'
