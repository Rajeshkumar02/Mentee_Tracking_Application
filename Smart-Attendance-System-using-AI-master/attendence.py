import cv2
import numpy as np
import face_recognition
import os
from datetime import datetime

import firebase_admin 
from firebase_admin import credentials
from firebase_admin import firestore

from datetime import date
import datetime
today = date.today()

# Use a service account
cred = credentials.Certificate('C:/Users/DELL/Desktop/Smart-Attendance-System-using-AI-master/serviceAccount.json')
firebase_admin.initialize_app(cred)

db = firestore.client()

path='C:\\Users\\DELL\\Desktop\\Smart-Attendance-System-using-AI-master\\images'
images=[]
classNames=[]
mylist=os.listdir(path)
print(mylist)
for cls in mylist:
    curimg=cv2.imread(f'{path}/{cls}')
    images.append(curimg)
    classNames.append(os.path.splitext(cls)[0])
print(classNames)

def findencod(images):
    encodelist=[]
    for img in images:
        img = cv2.cvtColor(img,cv2.COLOR_BGR2RGB)
        encode=face_recognition.face_encodings(img)[0]
        encodelist.append(encode)
    return encodelist

def markatten(name):
    print(name)
    x = datetime.datetime.now()
    time = x.strftime("%H")
    y = str(int(today.strftime("%d")))+"-"+str(int(today.strftime("%m")))+"-"+str(int(today.strftime("%Y")))+"-"+x.strftime("%A")
    current = str(int(today.strftime("%d")))+"-"+str(int(today.strftime("%m")))+"-"+str(int(today.strftime("%Y")))
    doc_ref = db.collection(name+'-Attendance').document(y)
    doc_ref_today = db.collection('Attendance').document(current)
    data_today={
        u'Name': current
    }
    doc_ref_today.set(data_today)
    doc_ref_today.set({
    name: True
    }, merge=True)
    data = {
    u'Name': y,
    u'1': False,
    u'2': False,
    u'3': False,
    u'4': False,
    u'5': False,
    u'6': False,
    u'7': False,
    u'8': False
    }
    doc_ref.set(data)
    if(int(time)<=9):
        doc_ref.update({u'1': True})
    elif(int(time)<=10):
        doc_ref.update({u'2': True})
    elif(int(time)<=11):
        doc_ref.update({u'3': True})
    elif(int(time)<=12):
        doc_ref.update({u'4': True})
    elif(int(time)<=13):
        doc_ref.update({u'5': True})
    elif(int(time)<=14):
        doc_ref.update({u'6': True})
    elif(int(time)<=15):
        doc_ref.update({u'7': True})
    elif(int(time)<=16):
        doc_ref.update({u'8': True})
    else:
        doc_ref.update({u'Spl': True})


encodelistknown=findencod(images)
print("encoding completed")

cam=cv2.VideoCapture(0)

while True:
    _,img=cam.read()
    imgS = cv2.resize(img,(0,0),None,0.25,0.25)
    imgS = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    facescurframe=face_recognition.face_locations(imgS)
    encodecurframe= face_recognition.face_encodings(imgS,facescurframe)

    for encode,faceloc in zip(encodecurframe,facescurframe):
        matches=face_recognition.compare_faces(encodelistknown,encode)
        facedis=face_recognition.face_distance(encodelistknown,encode)
        #print(facedis)
        matchIndex = np.argmin(facedis)

        if matches[matchIndex]:
            name=classNames[matchIndex]
            #print(name)
            y1,x2,y2,x1=faceloc
            y1, x2, y2, x1 = y1*4,x2*4,y2*4,x1*4
            cv2.rectangle(img,(x1,y1),(x2,y2),(0,255,0),2)
            cv2.rectangle(img,(x1,y2-35),(x2,y2),(0,255,0),cv2.FILLED)
            cv2.putText(img,name,(x1+6,y2-6),cv2.FONT_HERSHEY_SCRIPT_COMPLEX,1,(255,255,255),2)
            markatten(name)



    cv2.imshow('webcam',img)
    key=cv2.waitKey(1) & 0xff

    if key==ord('q'):
        break

cam.release()
cv2.destroyAllWindows()