from dotenv import load_dotenv

load_dotenv()

# make celery app available
from .celery import app as celery_app  # noqa
