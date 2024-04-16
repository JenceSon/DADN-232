import ultralytics as ul
import supervision as sv
import sys
from pathlib import Path
import base64
import os

#set up default img
defaultBase64 = None
with open("./test-img/test.png", "rb") as image2string: 
    defaultBase64 = base64.b64encode(image2string.read())
    #print(defaultBase64)

try:
    with open(sys.argv[1], "rb") as image2string2: 
        imgData =  base64.b64encode(image2string2.read())
except:
    imgData = defaultBase64
    
    #print(defaultBase64)


#print(len(imgData))
decodedData  = base64.b64decode(imgData)
imgFile = open("./test-img/detectImg.png",'wb')
imgFile.write(decodedData)
imgFile.close()

filename = "detectImg.png"
error = False
if Path('./test-img/'+filename).exists():
    pass
else :
    error = True
    print("No image detected")
    filename = "test.png"

model = ul.YOLO("yolov8n.pt")
result = model.predict(source='./test-img/'+filename)[0]
detections = sv.Detections.from_ultralytics(result)

if error == False:
    os.remove('./test-img/'+filename)

print(len(detections[detections.class_id == 0]))