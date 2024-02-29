import sys
import random
import time
from Adafruit_IO import MQTTClient

AIO_FEED_ID = "bbc-led"
AIO_USERNAME = "phongcute"
AIO_KEY = "aio_vrOL88GE3okZkexRlAnRvZefUMMB"

def connected(client):
    print("Ket noi thanh cong ...")
    client.subscribe(AIO_FEED_ID)

def subscribe(client , userdata , mid , granted_qos):
    print("Subscribe thanh cong ...")

def disconnected(client):
    print("Ngat ket noi ...")
    sys.exit (1)

def message(client , feed_id , payload):
    print("Nhan du lieu: " + payload)

# def processData(data):
#     data = data.replace("!", "")
#     data = data.replace("#", "")
#     splitData = data.split(":")
#     print(splitData)
#     if splitData[1] == "TEMP":
#         client.publish(AIO_FEED_ID, splitData[2])

client = MQTTClient(AIO_USERNAME , AIO_KEY)
client.on_connect = connected
client.on_disconnect = disconnected
client.on_message = message
client.on_subscribe = subscribe
client.connect()
client.loop_background()

while True:
    value = random.randint(0,100)
    print("Cap nhat: ", value)
    client.publish(AIO_FEED_ID,value)
    time.sleep(5)
