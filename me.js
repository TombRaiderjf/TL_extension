window.onload=function () {  
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
    url = 'http://tl.cyg.changyou.com/transaction/captcha-image?goods_serial_num=201906171422049162&t=1561991084460';
     
    
    getImgBase64(url, function (dataUrl) {
        console.log(dataUrl);
    });
    
   
    }