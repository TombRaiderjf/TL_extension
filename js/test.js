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
}

function run() {
    var date1=new Date();  //开始时间
    let itv_popup_box = setInterval(() => {
        let imgLink = image_url + "&t=" + (new Date).getTime();
        getImgBase64(imgLink, function (dataUrl) {           
            // console.log(dataUrl);
            recognizeCaptcha(dataUrl,
                function(data) {
                    console.log(data.data.captcha);
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
                                var date2=new Date();    //结束时间
                                var date3=date2.getTime()-date1.getTime()  //时间差的毫秒数
                                console.log("time=");
                                console.log(date3);
                                clearInterval(itv_popup_box);
                            }
                        }
                    });
                },
                function (data) {
                    alert(`错误:\n${data.data}`);
                });
        });
    }, 200);

    return true;
}


var date1=new Date();  //开始时间


let start = false;
let executing = false;




let itv_run = setInterval(() => {
    if (!executing && run()) {
        executing = true;       
    }
}, 10);



// function formatterDateTime() {
//     var date=new Date()
//     var month=date.getMonth() + 1
//           var datetime = date.getFullYear()
//                   + ""// "年"
//                   + (month >= 10 ? month : "0"+ month)
//                   + ""// "月"
//                   + (date.getDate() < 10 ? "0" + date.getDate() : date
//                           .getDate())
//                   + ""
//                   + (date.getHours() < 10 ? "0" + date.getHours() : date
//                           .getHours())
//                   + ""
//                   + (date.getMinutes() < 10 ? "0" + date.getMinutes() : date
//                           .getMinutes())
//                   + ""
//                   + (date.getSeconds() < 10 ? "0" + date.getSeconds() : date
//                           .getSeconds());
//           return datetime;
//       }
  
// var date1 = new Date();
// $.ajax({
//     type: 'post',
//     url: 'http://route.showapi.com/184-5',
//     dataType: 'json',
//     data: {
//         "showapi_timestamp": formatterDateTime(),
//         "showapi_appid": '99277', //这里需要改成自己的appid
//         "showapi_sign": '107bcec39adc4ef9ae02eb16ab789565',  //这里需要改成自己的应用的密钥secret
//         "img_base64":"/9j/4AAQSkZJRgABAgAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAeAFsDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD3xjUTGpGNcj4s+IXh3wbIkGq3Ugu5E8yO2hiLyOuSMjsOQRyRTRSOkdgASTgDqarxXENzGJIJVkQ/xKcivJ9W+MN9/Zl0ZfBeuWVvOpS2unjOGB7nIABx2BP1p3gb4l+ELXRPstxqD2l3vJeK6jKkn2PK/rnjpXTGnF0+a+t7JHVClF0ee/vXsl37s9VY1GOTWbp2tx6rpz31vBL5GCY2I/1oHdfWpNI1iz1i2E1tJyDho24ZT6EVMouD5XuN0akU21tv5GmoqVRWRqmu2OkREzSq0xHyQKcux+nb61yuja5f3F1Y6pLfSeVeXM0ctsR+7WNB1UdRg4571DMGehrLH5vleYnmAZ2Z5x9PwqworiNRuUknYNb4uZ4mm88HD24yqRAH3OT9RXZSXUVpbLNcuEHAPBPPoAOTUMhlodKTNRW93Bdxl4JVcA4OO1PzSJK98txJZTpZzJDcshEUkib1RscErkZGe2RWHo/hTT9IdryRft2rSfNNqNyoaaQ+x/hX0VcACuhY1ExpopI85ujN4q8WSJPDIlhp4YmNhgkj/E4/Cqvg7QdJ1mxvotW0y1vGjm6zxBsZHQZ6dK9IaKMO7BAGcYYgcmuNPhu4srrULWyvmiF9G0iPjlGBHX2+avX+tqph50krKysvTf7z34YyNehLDr3FaNvk/efzvcyNV0zwV4bZYLWS806cdtMvJUK/7yhtv5g1w+pyXa6qk3hnVtUnmlb5muoEJyenKBcnPr+ddh4O02H+2Lm11G0gu5Q3M7sWOcZ6EV6PaafZ2YP2a2iiz12IBXlrXUeJWHy9ulT5nO297Jp+S1t6s8U1H/hOtBNrJd+G9Png4aWZbjDXJx0dmbI57DAPPWo7bxV4ktL7TorvwRc3JtImfybe5Dea0hDB/lVvToK9q8QIX8OaiFClvszlQ3TIUkZrG8BvFfx3WorEFRvKijDcsuxMH9SfwpM8GV3qcT/wlPi6cTXcfgO4LStGsjz3iRqCh3bSCPUqMcdMda19F1vx1ea5Bc6r4eghtIWDXDvdh3VSCAEUcbifbNegxaPFa5kEssiRlpUikI2hzzk8ZOOg9KrWMJN7Z20hBYR/bJ2HR3JwB9Bz+Q9TUkM17K3Nvb/vNpnkO+Vh0LHrj29KmzTmNRk0IEf/2Q==",
//         "typeId":"34",
//         "convert_to_jpg":"0",
//         "needMorePrecise":"0"
//     },

//     error: function(XmlHttpRequest, textStatus, errorThrown) {
//         alert("操作失败!");
//     },
//     success: function(result) {
//         console.log(result); //console变量在ie低版本下不能用
//         alert(result.showapi_res_body.Result);
//     }
// });

// var date2=new Date();    //结束时间
// var date3=date2.getTime()-date1.getTime();
// console.log(date3);