url = 'http://api.3023data.com/ocr/captcha';
method = 'POST';
appcode = '563ccc798055f2b707b3817425e38afe';

/**
 * 获取图像的 Base64 编码
 * @param {Image} image
 */
function getImageBase64(image) {

    var canvas = document.createElement("canvas");

    //获取绘画上下文
    ctx = canvas.getContext("2d");

    // 获取图片宽高
    var imgWidth = image.width;
    var imgHeight = image.height;

    //设置画布宽高与图片宽高相同
    canvas.width = imgWidth;
    canvas.height = imgHeight;

    //绘制图片
    ctx.drawImage(image, 0, 0, imgWidth, imgHeight);

    //图片展示的 data URI
    var result = canvas.toDataURL('image/jpeg');

    return result;
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
            image: getImageBase64(image),
            length: 4,
            type: 1001
        },
        success: succ_callback,
        error: error_callback
    });
}

function run() {

    let btn_buy = $("#buySubmit")[0];
    if (!btn_buy) {
        return false;
    }

    // 模拟点击 [立刻购买] 按钮
    btn_buy.click();

    let itv_popup_box = setInterval(() => {
        if (!$("#J_attackCode")[0]) {
            return;
        }

        clearInterval(itv_popup_box);
        itv_popup_box = null;

        let ipt_captcha = $("#J_attackCodeVal");
        let img_captcha = $("#J_attackCode")[0];
        img_captcha.onload = function () {
            recognizeCaptcha(
                img_captcha,
                function(data) {
                    console.log(data.data.captcha);
                    ipt_captcha.val(data.data.captcha);
                    $(".btn-normal.ui-btn-normal.ui-btn-large").get(0).click();
                },
                function (data) {
                    alert(`错误:\n${data.data}`);
                }
            );
        };
    }, 10);

    return true;
}

let executing = false;

let itv_rerun = setInterval(() => {

    if ($(".dialog-main:contains('验证码错误，请重新输入。')").length > 0) {
        $(".btn-normal.ui-btn-normal").get(0).click();
        $(".ui-xbox").get(0).remove();
        console.log($(".ui-xbox").last().css("display"))
        executing = false;
    }
}, 10);

let itv_run = setInterval(() => {
    if (!executing && run()) {
        executing = true;
    }
}, 10);

// autoClick();
// interval=setInterval(autoClick, 1);


//懒猫版