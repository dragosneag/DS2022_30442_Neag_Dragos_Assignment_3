import pandas as pd
import time
import calendar
import pika
import json
import os

from datetime import datetime
from dotenv import load_dotenv

connection = pika.BlockingConnection(pika.ConnectionParameters(host="localhost"))
channel = connection.channel()

channel.queue_declare(queue="energy-queue")

load_dotenv()

data = pd.read_csv("sensor.csv")

for index, row in data.iterrows():

    current_time = time.gmtime()
    timestamp = calendar.timegm(current_time)

    body = {
        "timestamp": timestamp,
        "device_id": os.environ["device_id"],
        "measurement": row["0"],
        "client_id": os.environ["client_id"],
    }

    channel.basic_publish(
        exchange="", routing_key="energy-queue", body=json.dumps(body)
    )
    print("Sent: " + json.dumps(body))

    time.sleep(30)

connection.close()
