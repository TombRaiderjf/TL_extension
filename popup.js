
url = 'http://api.3023data.com/ocr/captcha';
method = 'POST';
appcode = '563ccc798055f2b707b3817425e38afe';

function getCode(image){
    var httpRequest = new XMLHttpRequest();//第一步：创建需要的对象
    httpRequest.open('POST', url, true); //第二步：打开连接
    httpRequest.setRequestHeader("key", appcode);//设置请求头 
    obj = {'image': Image, 'length': 4, 'type': '1001'};
    httpRequest.send(JSON.stringify(obj));//发送请求 将json写入send中
    /**
     * 获取数据后的处理程序
     */
    httpRequest.onreadystatechange = function () {//请求后的回调接口，可将请求成功后要执行的程序写在其中
        if (httpRequest.readyState == 4 && httpRequest.status == 200) {//验证请求是否发送成功
            var response = httpRequest.responseText;//获取到服务端返回的数据
            console.log(response);
            if (response['code'] == 0) //成功获取验证码数字
            {
                 return response['data']['captcha'];
            }
        }
    };
}


function autoClick(){
    document.getElementById("buySubmit").click();
    imgLink = document.getElementById("J_attackCode").src;
    getCode(img);
    
    // document.getElementsByClassName("ui-button-text")[0].click();
}
 
// autoClick();
var interval=setInterval(autoClick, 1000);
