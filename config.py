import os
basedir = os.path.abspath(os.path.dirname(__file__))


class Config(object):
    DEBUG = False
    TESTING = False
    CSRF_ENABLED = True
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'gfrfr43r734gu34bhr' 
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL')


class ProductionConfig(Config):
    DEBUG = False


class StagingConfig(Config):
    DEBUG = True
    DEVELOPMENT = True

class DevelopmentConfig(Config):
    DEBUG = True
    DEVELOPMENT =True

class TestingConfig(Config):
    TESTING = True
