import pika
import requests
import os
from dotenv import load_dotenv

load_dotenv()

headers = {'Content-Type': 'application/json'}

connection_params = pika.ConnectionParameters(
    host=os.getenv('RABBITMQ_HOST'),
    port=os.getenv('RABBITMQ_PORT'),
    virtual_host=os.getenv('RABBITMQ_VHOST'),
    credentials=pika.PlainCredentials(
        username=os.getenv('RABBITMQ_USERNAME'),
        password=os.getenv('RABBITMQ_PASSWORD'),
    )
)


# Функция получения сообщения
def callback(ch, method, properties, body):
    print(f"Received: '{body}'")


with open('data.json', 'r') as file:
    data = file.read()

response = requests.post(os.getenv('SERVER_URL'), data=data, headers=headers)

if response.status_code == 200:
    queue_name = response.json().get('queueName')

    connection = pika.BlockingConnection(connection_params)
    channel = connection.channel()

    # Подписка на очередь и установка обработчика сообщений
    channel.basic_consume(
        queue=queue_name,
        on_message_callback=callback,
        auto_ack=True
    )

    print('Waiting for messages...')
    channel.start_consuming()
