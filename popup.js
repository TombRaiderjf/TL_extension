
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
            else{
                return "-1";
            }
        }
    };
}


function getImgBase64(path, callback) {
    var img = new Image();
    img.src = path;
    img.setAttribute("crossOrigin",'Anonymous');
    //图片加载完成后触发
    img.onload = function () {
        var canvas = document.createElement("canvas");
        //获取绘画上下文
        ctx = canvas.getContext("2d");

        // 获取图片宽高
        var imgWidth = img.width;
        var imgHeight = img.height;

        //设置画布宽高与图片宽高相同
        canvas.width = imgWidth;
        canvas.height = imgHeight;

        //绘制图片
        ctx.drawImage(img, 0, 0, imgWidth, imgHeight);
        //图片展示的 data URI
        var dataUrl = canvas.toDataURL('image/jpeg');
        callback ? callback(dataUrl) : '';
    };
}

function downloadIamge(link){
    //获取link连接下的图片jpg文件image


}

function autoClick(){
    document.getElementById("buySubmit").click();
    imgLink = document.getElementById("J_attackCode").src;
     
    getImgBase64(imgLink, function (dataUrl) {
        
        img = dataUrl.split(',')[1];
        console.log(img);
        code = getCode(img);
        if (code != "-1"){
            document.getElementById("J_attackCodeVal").value = code;
            document.getElementsByClassName("btn-normal ui-btn-normal ui-btn-large")[0].click();
        }
    });
    // img = downloadIamge(imgLink);
    
    clearInterval(interval);
}
 
// autoClick();
interval=setInterval(autoClick, 1000);
