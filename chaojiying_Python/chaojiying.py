#!/usr/bin/env python
# coding:utf-8
import time
import datetime
import requests
from hashlib import md5

class Chaojiying_Client(object):

    def __init__(self, username, password, soft_id):
        self.username = username
        password =  password.encode('utf8')
        self.password = md5(password).hexdigest()
        print(self.password)
        self.soft_id = soft_id
        self.base_params = {
            'user': self.username,
            'pass2': self.password,
            'softid': self.soft_id,
        }
        self.headers = {
            'Connection': 'Keep-Alive',
            'User-Agent': 'Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 5.1; Trident/4.0)',
        }

    def PostPic(self, im, codetype):
        """
        im: 图片字节
        codetype: 题目类型 参考 http://www.chaojiying.com/price.html
        """
        base64 = "/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgICAgMCAgIDAwMDBAYEBAQEBAgGBgUGCQgKCgkICQkKDA8MCgsOCwkJDRENDg8QEBEQCgwSExIQEw8QEBD/2wBDAQMDAwQDBAgEBAgQCwkLEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBD/wAARCAAeAFsDASIAAhEBAxEB/8QAHAAAAgIDAQEAAAAAAAAAAAAABQcGCAMECQEC/8QANhAAAAQEAwQIBAcBAAAAAAAAAgMEBQAGBxIBCCITFBUyISMzQlJicoIRFiSiCTE0U3ORssL/xAAbAQEAAgIDAAAAAAAAAAAAAAAEAgUAAQMGB//EACcRAAEEAAQEBwAAAAAAAAAAAAIAAwQSAREiMiEzQmIFEyNScoLC/9oADAMBAAIRAxEAPwDpQ5KQJk5p5l9gAXjsBCseKo7ynK+XG5T9V2KhWmHr9BPOP7PZDOWDipdUq9STTypainLE3TFMk3tl70kQyoxidz0ZB/bJVJYBgxDfeMeoYO55ItQ9NA5iZK+pDjShAJxnxOvWcUOvTEgAC8nRrBffYD0Qy5VnNjqFJ6h1llUAYz0w+pv1kjs5Bxz8mjMnO8xgWmTdlbrOFjvPAndC2gxYM39u/DQSTYOzQWPxgiJS3nPpPLuJDmgf5rkSaEOOyVJ3BoFsFNnRyE34Fi8YLPhGXA+pWcWM0Y6iqad0tTW4ZeFgaqgRHK2gs5a0rysPzEMHc/wP2QxJXOnCtcqoa61uqqpk2TSjd9bWdnWbmTYAegaozv6wckLWh9ZaLZlZXqZSx3qBLiVTM4d8QkqztzHxAd/xGSA6wY8b9mPRELy/CbZpnxqy6ZiBl8IkTiHDW9WcMkByoY79evXZrs9cJOkgr4dK75FBiXDcdDmtbi3FXt7s+CsxW7MKYqlhnV0QmJA6DdFhiUZqfX3OTyDibUpqc3VOlJO6ljABaR1C8nwHRUmcpQpzQXM03qpMcSQS6eBK7KW4k7bARngGPR/3743pqA8LHl1qhIDG8M8pLVIALNidsdtrvHYCKR93GHKKmofb9USR4HEkwWwb021CRfLaX5V60YINowRGZJeEsyS+3viTbbJUSAfWgsHEuRghzp54Lz8Q8tyhogToKjAIfTjGc7QVA0Q+nGBgkElhWBhnyapKWy/TmdCZSeFowE8WGj3kaYi/rtiC/trL7BxA5WopJ9D5Tb8aes6xSrb1/EHVcK9S5vAx6FRxw+c44fP6wA7kOVSKPpGHCLWmhBwNQQmnS6YV6tx3FM1JFp233ddepH5+pvsBfz679ceNWXFrRVCSzlg6bZLsRgXpDUwLFZ3ossACGojDhBtMDRADKia08QbUnZ7yh5XZ9SmkTVQaSzjDtY1KRqJRqh4/zkWHffFap+/CspWsM3ylVTJwks8vsE5qjiiMnwWANsH/AGdF71gsYDrBYxuPxUm5D7R3YKqoBJGWrMxRF6JIDT6kdVmw87r3NWqUtzsAAPGMd4AewA4fQKhVzQINxcsoxyxIAH6dmm1sUg0eQ7Yw7TtYo2EYcIeQHvIlxPy33yyfKyQiCuuaFyIJ+WMkDqSVZoG8zs2ILPYC8f2Q66OPFY35nXKqwSAxykt3n6NI2PHEryLOcZlgNd8SpMGDJIbA9EVry2CwrBwLEPpxjdWCxgWIWPxxiTQcFEl//9k="
        
        params = {
            'codetype': codetype,
            'file_base64': base64,
        }
        params.update(self.base_params)
        # files = {'userfile': ('ccc.jpg', im)}
        # print(files)
        # r = requests.post('http://upload.chaojiying.net/Upload/Processing.php', data=params, files=files, headers=self.headers)
        r = requests.post('http://upload.chaojiying.net/Upload/Processing.php', data=params,  headers=self.headers)
        return r.json()

    def ReportError(self, im_id):
        """
        im_id:报错题目的图片ID
        """
        params = {
            'id': im_id,
        }
        params.update(self.base_params)
        r = requests.post('http://upload.chaojiying.net/Upload/ReportError.php', data=params, headers=self.headers)
        return r.json()


if __name__ == '__main__':
    t1 = datetime.datetime.now()
    t11 = time.time()
    chaojiying = Chaojiying_Client('13920303750', 'hc7783au', '900454')	#用户中心>>软件ID 生成一个替换 96001
    im = open('Q.jpg', 'rb').read()													#本地图片文件路径 来替换 a.jpg 有时WIN系统须要//
    print(chaojiying.PostPic(im, 1902))									#1902 验证码类型  官方网站>>价格体系 3.4+版 print 后要加()
    t2 = datetime.datetime.now()
    t22 = time.time()
    print((t2-t1).seconds)
    print(t22-t11)

