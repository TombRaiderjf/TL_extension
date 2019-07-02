
url = 'http://api.3023data.com/ocr/captcha';
method = 'POST';
appcode = '563ccc798055f2b707b3817425e38afe';

function getCode(image) {
    var httpRequest = new XMLHttpRequest();//第一步：创建需要的对象
    httpRequest.open('POST', url, true); //第二步：打开连接
    httpRequest.setRequestHeader("key", appcode);//设置请求头
    httpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");//设置请求头
    var obj = {'image': image, 'length': '4', 'type': '1001'};
    httpRequest.send(`image=${obj.image}&length=${obj.length}&type=${obj.type}`);//发送请求 将json写入send中
    /**
     * 获取数据后的处理程序
     */
    httpRequest.onreadystatechange = function () {//请求后的回调接口，可将请求成功后要执行的程序写在其中
        if (httpRequest.readyState == 4 && httpRequest.status == 200) {//验证请求是否发送成功
            var response = httpRequest.responseText;//获取到服务端返回的数据
            console.log(response);
            var json=JSON.parse(response);  
            if (json.code == 0) //成功获取验证码数字
            {
                res = json.data.captcha;
                console.log(res);
                //模拟输入验证码以及下单
                document.getElementById("J_attackCodeVal").value = res;
                var x = document.cookie;
                document.getElementsByClassName("btn-normal ui-btn-normal ui-btn-large")[0].click();
            } else {
                console.log("获取验证码错误！")             
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


function autoClick(){
    if (document.getElementById("buySubmit")){
        document.getElementById("buySubmit").click();
        var imgLink = document.getElementById("J_attackCode").src;      
        getImgBase64(imgLink, function (dataUrl) {           
            console.log(dataUrl);
            code = getCode(dataUrl);
        });
        
        clearInterval(interval);
    }
    else{
        window.location.reload();
    }
}
 
// autoClick();
interval=setInterval(autoClick, 1);


//cookie = "NOTE_CACHE=%5B%7B%22id%22%3A200%2C%22title%22%3A%22%E6%B5%8B%E6%9C%8D%E9%BE%99%E9%97%A8NPC%E7%BB%B4%E6%8A%A4%22%2C%22content%22%3A%22%22%2C%22addTime%22%3A1432711191000%2C%22context%22%3A%22'TL'%22%2C%22publishUser%22%3A%22%22%2C%22stick%22%3A0%2C%22stickTime%22%3Anull%2C%22deleteFlag%22%3A0%7D%2C%7B%22id%22%3A198%2C%22title%22%3A%22%E5%AE%A0%E7%88%B1%E4%B8%80%E7%94%9F%E6%9C%8D%E5%8A%A1%E5%99%A8%E7%BB%B4%E6%8A%A4%E5%AE%8C%E6%88%90%22%2C%22content%22%3A%22%22%2C%22addTime%22%3A1431314942000%2C%22context%22%3A%22'TL'%22%2C%22publishUser%22%3A%22%22%2C%22stick%22%3A0%2C%22stickTime%22%3Anull%2C%22deleteFlag%22%3A0%7D%2C%7B%22id%22%3A197%2C%22title%22%3A%22%E5%AE%A0%E7%88%B1%E4%B8%80%E7%94%9F%E6%9C%8D%E5%8A%A1%E5%99%A8%E7%BB%B4%E6%8A%A4%22%2C%22content%22%3A%22%22%2C%22addTime%22%3A1431312451000%2C%22context%22%3A%22'TL'%22%2C%22publishUser%22%3A%22%22%2C%22stick%22%3A0%2C%22stickTime%22%3Anull%2C%22deleteFlag%22%3A0%7D%2C%7B%22id%22%3A196%2C%22title%22%3A%22%E3%80%904%E6%9C%8817%E6%97%A5%E7%BB%B4%E6%8A%A4%E3%80%91%E7%95%85%E6%98%93%E9%98%81.%E9%81%93%E5%85%B7%E5%9D%8A%E7%BB%B4%E6%8A%A4%E5%85%AC%E5%91%8A%22%2C%22content%22%3A%22%22%2C%22addTime%22%3A1429156000000%2C%22context%22%3A%22'TL'%22%2C%22publishUser%22%3A%22%22%2C%22stick%22%3A0%2C%22stickTime%22%3Anull%2C%22deleteFlag%22%3A0%7D%2C%7B%22id%22%3A192%2C%22title%22%3A%22%E3%80%90%E6%96%B0%E5%A4%A9%E9%BE%99%E5%85%AB%E9%83%A8%E3%80%91%E4%BB%A4%E7%89%8C%E5%B1%95%E7%A4%BA%E5%8A%9F%E8%83%BD%E4%B8%8A%E7%BA%BF%E5%95%A6%EF%BC%81%22%2C%22content%22%3A%22%22%2C%22addTime%22%3A1427165782000%2C%22context%22%3A%22'TL''ZJ'%22%2C%22publishUser%22%3A%22%22%2C%22stick%22%3A0%2C%22stickTime%22%3Anull%2C%22deleteFlag%22%3A0%7D%5D; NOTE_UPDATE_TIME=1562045313242; UM_distinctid=16b89c97e9f8ae-0f01bfb6cc869c-e343166-1fa400-16b89c97ea065e; bdshare_firstime=1561384812574; macid=C880F89CAEC000015EA91EC0B1201FD7; _ga=GA1.2.1523393933.1561872251; sid=ce534ff5-c4f7-4907-ac64-7acef28aedbd; CNZZDATA5453193=cnzz_eid%3D1801583662-1561383459-%26ntime%3D1562042278; IMGCODE=ImageCode-43328-31a3c8e4-6c97-4577-b772-1c0a3c49543b-6DJSey; qrcodeid=3923ba435c4a9b337a4370dd7ea00330db6934602b18037acf3c40c812b23a1672b2c3cc694eba6d2685e6650c810b86; CNZZDATA5373220=cnzz_eid%3D1456201688-1561617757-http%253A%252F%252F47.102.140.114%252F%26ntime%3D1562041880; COOKIE_GOODS_SCANED=%25E3%2580%259E%25E9%259B%25A8%25E6%25B5%25A3%253D201906251320178775%253D333.0%253D1%2527%25E4%25B8%2580%25E6%25A2%25A6%25E7%25A8%259A%25E7%25B5%2582%25EF%25BC%258E%253D201906251319288760%253D33900.0%253D8%2527%25E3%2581%2583%25E5%2590%259B%25E4%25B8%25B4%25E3%2583%25BD%25E5%258F%25AF%25E7%2588%25B1%253D201906142316128699%253D577777.0%253D11%2527%25E4%25B8%2580%25E9%25A6%2596%25E7%25A6%25BB%25E4%25BA%25BA%25E9%2586%2589%253D201906171422049162%253D420900.0%253D7%2527yy2310623352%253D201906202140313604%253D499990.0%253D12%2527"