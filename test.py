#!/usr/bin/env python
# coding:utf-8
from ShowapiRequest import ShowapiRequest
import base64
import time
import datetime
import requests
import cv2

header = {'user-agent': "User-Agent:Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; en-us) AppleWebKit/534.50 (KHTML, like Gecko) Version/5.1 Safari/534.50"}
# img = requests.get("http://tl.cyg.changyou.com/transaction/captcha-image?goods_serial_num=201907011905108460&t=1562939659679", timeout=2, headers=header)
# if img.status_code == 200:
#     base64_data = base64.b64encode(img.content)
    
#     file_name = "_" + res.text["showapi_res_body"]["Result"] + "_.jpg"
#     fb = open(file_name, "wb")
#     fb.write(img.content)
#     fb.close()

# else:
#     print('error')
    

# 获取登录二维码并显示
def getQRcode():
    qr_code= requests.get("https://mark.changyou.com/UQRCodeImage?from=web_auth&action=login&imgType=&imgWidth=128&imgHeight=128&random=0.4145753824385646", timeout=2, headers=header)
    if qr_code.status_code == 200:
        fb = open("qr.jpg", "wb")
        fb.write(qr_code.content)
        fb.close()
        qr_img = cv2.imread("qr.jpg")
        cv2.imshow("二维码", qr_img)
        cv2.waitKey()
        cv2.destroyAllWindows()
    else:
        getQRcode()

# 扫码登录
def login():
    qrStr = "6207268ed449c72aa746048e7ae86b8452a654988521c7c69461e933bb54c8c5ecac76b27df6e1faf1607102f9d35b0cf0c60ebec976ef4e1d9e2f48810f7183"
    loginUrl = "https://cygsso.changyou.com/QRCodeLogin"
    getQRcode()

