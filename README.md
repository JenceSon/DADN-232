# SMART-CLASS mobile app

## Introduction

SMART-CLASS is a mobile app that provides teachers and students with the remote controlling IoT devices service in classrooms. This also helps adming to keep track the information of each IoT devices and create/delete/update devices

## Features

### Manage information of class

- **Keep track the information of degree, light** : get the information about degree and light of a class room via IoT devices
- **Following the attendances in class** : integrate the YOLOv8 model to detect a number of students in class

### Manage IoT

- **As admin**: can add/delete/adjust all the IoT devices
- **As student/teacher**: can only adjust the IoT devices (turn on/off) in classrooms which they registerd

### Control IoT devices via microphone (student/teacher only)

- Control IoT devices remotely via microphone and convert speech to text technology

### Register class and turn on/off automatically 

- Student or teacher can register classrooms which haven't been registerd yet
- The room which was registerd will be automatically turned on/off its IoT devices when the schedule starts or expires

### Profile

- View and update the information of user themselves 

## Security

- Hashcode password of each user

## Bắt đầu sử dụng
If you want to host server locally yourself, make sure that your local system help :
- **Nodejs** : you can download nodejs from the official [website](https://nodejs.org/en)
- **Python** : you can download python from the offical [website](https://www.python.org/)
- **Pip python** : after download Python, download [pip environment](https://docs.python.org/3/installing/index.html)
- **Utralytics and Supervision** : use pip install ultralytics/supervision as commandline

