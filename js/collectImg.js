// 采集验证码以及正确标签
method = 'POST';
id = window.location.href.split("=")[1];
image_url = "http://tl.cyg.changyou.com/transaction/captcha-image?goods_serial_num=" + id;

/**
 * 获取图像的 Base64 编码
 */
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

// 识别二维码
/**
 * 识别二维码
 * @param {Image} image
 * @param {function (data)} succ_callback 
 * @param {function} error_callback 
 */
function recognizeCaptcha(image_binary, succ_callback, error_callback) {
    header = {
        'Connection': 'Keep-Alive',
        'User-Agent': 'Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 5.1; Trident/4.0)',
    }
    $.ajax({
        type: method,
        url: "http://upload.chaojiying.net/Upload/Processing.php",
        headers: header,
        data: {
            'codetype': 1004,
            'user': '13920303750',
            'pass2': '268639dc8052f60dc7fe58f2b7a6bd37',
            'softid': '900454',
            file_base64: image_binary,
        },   
        async: !1,   
        success: succ_callback,
        error: error_callback
    });
}

var count = 13001;

function run() {    
    var date1=new Date();  //开始时间
    console.log("!!start-------" + count.toString());
    let imgLink = image_url + "&t=" + (new Date).getTime();
    let postData = {'image': 0, 'number': 0, 'id': count};
    getImgBase64(imgLink, function (dataUrl) {   
        if (dataUrl == ''){
            console.log("获取验证码失败");
            return;
        }    
        postData['image'] = dataUrl.split(',')[1];                
        recognizeCaptcha(dataUrl.split(',')[1],
            function(data) {
                // console.log(data.data.captcha);
                console.log(data);
                if (data.pic_str == "0" && data.err_str != "OK"){
                    console.log("验证码识别失败");
                    return;
                }
                else{
                    postData['number'] = data.pic_str;
                    $.ajax({
                        url: "http://tl.cyg.changyou.com/transaction/buy",
                        type: "post",
                        async: !1,
                        data: {
                            goods_serial_num: id,
                            captcha_code: data.pic_str
                        },
                        success: function(t) {
                            console.log(t);
                            var date2 = new Date();
                            console.log(date2.getTime() - date1.getTime());
                            if (t != "captcha_error" && t != "captcha_cannot_null"){
                                console.log("!!success---------" + count.toString());
                                $.ajax({
                                    url: 'http://47.102.140.114/TL_changyige/storeImage.php',
                                    data: postData,
                                    type: method,
                                    dataType: 'json',
                                    success: function(response){
                                        console.log(response);
                                    },
                                    error: function(response){
                                        console.log(response);
                                    }

                                })
                            }
                            if (t == "captcha_error"){
                                $.ajax({
                                    url: 'http://upload.chaojiying.net/Upload/ReportError.php',
                                    data: {
                                        'user': '13920303750',
                                        'pass2': '268639dc8052f60dc7fe58f2b7a6bd37',
                                        'softid': '900454',
                                        'id': data.pic_id
                                    },
                                    type: method,
                                    dataType: 'text',
                                    success: function(response){
                                        console.log(response);
                                    },
                                    error: function(response){
                                        console.log(response);
                                    }
                                })
                            }
                        }
                    });
                }
            },
            function (data) {
                alert(`错误:\n${data}`);
            });
    });
}

let itv_run = setInterval(() => {
    // clearInterval(itv_run);
    run();
    count += 1;
    if (count == 13200){
        clearInterval(itv_run);
    }
}, 10000);