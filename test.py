#!/usr/bin/env python
# coding:utf-8
import base64
import time
import datetime
import requests
import cv2

from selenium import webdriver

header = {
    'user-agent': "User-Agent:Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; en-us) AppleWebKit/534.50 (KHTML, like Gecko) Version/5.1 Safari/534.50",
    'Connection': 'keep-alive'
}
    

# 获取登录二维码并显示
def getQRcode():
    qr_code = requests.get("https://mark.changyou.com/UQRCodeImage?from=web_auth&action=login&imgType=&imgWidth=128&imgHeight=128&random=0.4145753824385646", timeout=2, headers=header)
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
    # qrStr = "6207268ed449c72aa746048e7ae86b8452a654988521c7c69461e933bb54c8c5ecac76b27df6e1faf1607102f9d35b0cf0c60ebec976ef4e1d9e2f48810f7183"
    # loginUrl = "https://cygsso.changyou.com/QRCodeLogin"
    # getQRcode()
    # 账号密码登录
    username = "hc7783a@game.sohu.com"
    password = "37468"
    loginUrl2 = "https://cygsso.changyou.com/loginpage?s=http://tl.cyg.changyou.com/ticketValidation"

    session = requests.Session()
    # res = requests.post(loginUrl2, headers=header)
    res = session.get(loginUrl2, headers=header)
    print(res.status_code)
    print(res.cookies)
    getQRcode()
    code = "82fc624c7aa4a44c8c13b356f1693c234b1a0682cf54711a7c7eef6aa4caf785d420b7e48b558259d0293cc2ddc0c9cdf0c60ebec976ef4e1d9e2f48810f7183"
    r = session.get(cookies=res.cookies, url=(loginUrl2+"?code="+code), headers=header)
    print(r.status_code)
    print(r.cookies)
    t=session.get("http://tl.cyg.changyou.com/transaction/index", headers=header)
    print(t.status_code)
    print(t.content)


login()









