import numpy as np
import cv2 as cv
from matplotlib import pyplot as plt

# for m in range(10):
# img = cv.imread("img/" + str(m+1) + ".jpg")
img = cv.imread("img/5.jpg")
rows, cols, channels = img.shape
gray = cv.cvtColor(img, cv.COLOR_BGR2GRAY)
ret, background = cv.threshold(gray, 210, 255, type=cv.THRESH_BINARY)
ret, blackLine = cv.threshold(gray, 50, 255, type=cv.THRESH_BINARY_INV)

for i in range(rows):
    for j in range(cols):
        if background[i, j] == 255 or blackLine[i, j] == 255:
            img[i, j] = (255, 255, 255)  # 此处替换颜色，为BGR通道
    # contours, _ = cv.findContours(gray, cv.RETR_CCOMP , cv.CHAIN_APPROX_SIMPLE)  # 轮廓
    #
    # image_new = cv.drawContours(img, contours, -1,(125,15,125),2)
    #
    # cv.imshow('img', image_new)
    # cv.waitKey()
    # cv.destroyAllWindows()

    # kernel = cv.getStructuringElement(cv.MORPH_RECT, (3, 3))
    # eroded = cv.erode(img, kernel)        #腐蚀图像
    # dilated = cv.dilate(eroded, kernel)      #膨胀图像
    # cv.imwrite("erode.jpg", eroded)
    # cv.imwrite("dilate.jpg", dilated)
cv.imwrite("masked.png", img)
cv.imshow("dst", img)
cv.waitKey()
cv.destroyAllWindows()

    # histr = cv.calcHist([gray], [0], None, [256], [0, 256])
    # plt.plot(histr)
    # plt.xlim([0, 256])
    # plt.show()


# 通道
# B, G, R = cv.split(img)
# cv.imwrite("b.jpg", B)
# cv.imwrite("g.jpg", G)
# cv.imwrite("r.jpg", R)


# 底片
# res = 255 - img
# cv.imwrite("dipian.jpg", res)

# 膨胀腐蚀
# kernel = cv.getStructuringElement(cv.MORPH_RECT, (3, 3))
# eroded = cv.erode(G, kernel)        #腐蚀图像
# dilated = cv.dilate(eroded, kernel)      #膨胀图像
# cv.imwrite("erode.jpg", eroded)
# cv.imwrite("dilate.jpg", dilated)


# 边缘检测
# cv.imwrite("canny.jpg", cv.Canny(img, 200, 300))
# cv.imshow("canny", cv.imread("canny.jpg"))
# cv.waitKey()
# cv.destroyAllWindows()

# 去噪
# dst = cv.fastNlMeansDenoisingColored(img, None, 10, 10, 7, 21)
# plt.subplot(121), plt.imshow(img)
# plt.subplot(122), plt.imshow(dst)
# plt.show()

# cv.imwrite("captcha-image-after.jpg", dst)

# 直方图
# color = ('b', 'g', 'r')
# for i, col in enumerate(color):
#     histr = cv.calcHist([img], [i], None, [256], [0, 256])
#     plt.plot(histr, color=col)
#     plt.xlim([0, 256])
# plt.show()