import ultralytics as ul
import supervision as sv
import sys
from pathlib import Path
import base64
import os

#set up default img
defaultBase64 = None
with open("./test-img/test.jpg", "rb") as image2string: 
    defaultBase64 = base64.b64encode(image2string.read()) 


imgData = sys.argv[0]
if imgData is None: imgData = defaultBase64
decodedData  = base64.b64decode((imgData))
imgFile = open("./test-img/detectImg.jpg",'wb')
imgFile.write(decodedData)
imgFile.close()

filename = "detectImg.jpg"
error = False
if Path('./test-img/'+filename).exists():
    pass
else :
    error = True
    print("No image detected")
    filename = "test.jpg"

model = ul.YOLO("yolov8n.pt")
result = model.predict(source='./test-img/'+filename)[0]
detections = sv.Detections.from_ultralytics(result)

if error == False:
    os.remove('./test-img/'+filename)

print(len(detections[detections.class_id == 0]))