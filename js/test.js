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
function recognizeCaptcha(image, succ_callback, error_callback) {
    let api_url = 'http://api.3023data.com/ocr/captcha';
    let method = 'POST';
    let appcode = '563ccc798055f2b707b3817425e38afe';

    $.ajax({
        type: method,
        url: api_url,
        beforeSend: function (request) {
            request.setRequestHeader("key", appcode);
        },
        data: {
            image: image,
            length: 4,
            type: 1001
        },
        success: succ_callback,
        error: error_callback
    });

    // $.ajax({
    //     type: 'post',
    //     url: 'http://route.showapi.com/184-5',
    //     dataType: 'json',
    //     data: {
    //         "showapi_timestamp": '',
    //         "showapi_appid": '99277', //这里需要改成自己的appid
    //         "showapi_sign": '107bcec39adc4ef9ae02eb16ab789565',  //这里需要改成自己的应用的密钥secret
    //         "img_base64": image,
    //         "typeId":"34",
    //         "convert_to_jpg":"0",
    //         "needMorePrecise":"0"
    //     },
    //     success: succ_callback,
    //     error: error_callback
    // });
 
}

function run() {
    // clearInterval(itv_run);
    let time = $("span.less-than-day").text();
    if (time == "公示完成"){    
    // if (true){  //交易区下单
        
        var date1=new Date();  //开始时间
        console.log(date1);
        let imgLink = image_url + "&t=" + (new Date).getTime();
        getImgBase64(imgLink, function (dataUrl) {   
            if (dataUrl == ''){
                console.log("获取验证码失败");
                return;
            }        
            // console.log(dataUrl);
            var date_img = new Date();
            console.log(date_img.getTime()-date1.getTime());
            recognizeCaptcha(dataUrl,
                function(data) {
                    console.log(data.data.captcha);
                    var date_post = new Date();
                    console.log(date_post.getTime() - date_img.getTime());
                    $.ajax({
                        url: "http://tl.cyg.changyou.com/transaction/buy",
                        type: "post",
                        async: !1,
                        data: {
                            goods_serial_num: id,
                            captcha_code: data.data.captcha
                        },
                        success: function(t) {
                            console.log(t);
                            if (t != "captcha_error"){
                                clearInterval(itv_run);
                                // var date2=new Date();    //结束时间
                                // var date3=date2.getTime()-t1.getTime()  //时间差的毫秒数
                                // console.log(date2);
                                // console.log("time=");
                                // console.log(date3);
                            }
                        }
                    });
                },
                function (data) {
                    alert(`错误:\n${data}`);
                });
        });
    }
    return true;
}

var t1 = new Date()

let itv_run = setInterval(() => {
    // clearInterval(itv_run);
    // for(var y = 0;y<5;y++){
    //     run();
    //     var sum = 0;
    //     for(var x=0;i<100000;x++)
    //     {
    //         sum += x;
    //     }
    // }
    run();
}, 1000);




