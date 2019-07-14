url = 'http://api.3023data.com/ocr/captcha';
method = 'POST';
appcode = '563ccc798055f2b707b3817425e38afe';


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
    // let api_url = 'http://api.3023data.com/ocr/captcha';
    // let method = 'POST';
    // let appcode = '563ccc798055f2b707b3817425e38afe';

    // $.ajax({
    //     type: method,
    //     url: api_url,
    //     beforeSend: function (request) {
    //         request.setRequestHeader("key", appcode);
    //     },
    //     data: {
    //         image: image,
    //         length: 4,
    //         type: 1001
    //     },
    //     success: succ_callback,
    //     error: error_callback
    // });


    header = {
        'Connection': 'Keep-Alive',
        'User-Agent': 'Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 5.1; Trident/4.0)',
    }
    $.ajax({
        type: method,
        url: "http://upload.chaojiying.net/Upload/Processing.php",
        headers: header,
        data: {
            'codetype': 1902,
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


function run() {
    
    var date1=new Date();  //开始时间
    let time = $("span.less-than-day").text();
    if (restTime < 0){    
    // if (true){  //交易区下单 
        // clearInterval(itv_run); 
        running = true;
        date1 = new Date();
        console.log("start!");
        let imgLink = image_url + "&t=" + (new Date).getTime();
        getImgBase64(imgLink, function (dataUrl) {   
            if (dataUrl == ''){
                console.log("获取验证码失败");
                running=false;
                return;
            }        
            let t1 = new Date();     
            recognizeCaptcha(dataUrl.split(',')[1],
                function(data) {
                    // console.log(data.data.captcha);
                    console.log(data);
                    if (data.pic_str == "0" && data.err_str != "OK"){
                        console.log("验证码识别失败");
                        running = false;
                        return;
                    }
                    else{
                        let t2 = new Date();
                        console.log("识别验证码时间="+(t2.getTime()-t1.getTime()).toString());
                        $.ajax({
                            url: "http://tl.cyg.changyou.com/transaction/buy",
                            type: "post",
                            async: !1,
                            data: {
                                goods_serial_num: id,
                                // captcha_code: data.data.captcha
                                captcha_code: data.pic_str
                            },
                            success: function(t) {
                                console.log(t);
                                var date2 = new Date();
                                console.log(date2.getTime() - date1.getTime());
                                running = false;
                                if (t != "captcha_error" && t != "captcha_cannot_null"){
                                    clearInterval(itv_run); 
                                    alert("success! time=" + (date2.getTime() - date1.getTime()).toString() + "ms");                                                           
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

}


var restTime = parseInt($(".less-than-day").attr("data-second"));
console.log(restTime);
var running = false;

let itv_run = setInterval(() => {
    if (!running){
        run();
        console.log((new Date()).getTime());
        restTime = restTime - 1;
    }

}, 5000);




