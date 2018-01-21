var app = {
    initialize: function () {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },
    onDeviceReady: function () {
        this.receivedEvent();
    },
    obtain: function (id) {
        return document.getElementById(id);
    },
    receivedEvent: function () {
        var cameraTakePicture = this.obtain('cameraTakePicture');
        var _this = this;
        cameraTakePicture.onclick = function () {
            // 照相
            navigator.camera.getPicture(onSuccess, onFail, {
                quality: 5,                                            // 相片质量是50
                sourceType: Camera.PictureSourceType.Camera,            // 设置从摄像头拍照获取
                destinationType: Camera.DestinationType.FILE_URI       // 以文件路径返回
            });

            function onSuccess(imageURI) {
                alert(imageURI);
                _this.obtain('myImage').src = imageURI;
                _this.obtain('text').innerHTML = imageURI.substr(imageURI.lastIndexOf('/') + 1);
                upload(imageURI);
            }

            function onFail(message) {
                alert('Failed because: ' + message);
            }
            //使用FileTransfer插件，上传文件
            function upload(fileURL) {
                var success = function (r) {
                    alert("上传成功! Code = " + r.responseCode);
                };
                var fail = function (error) {
                    alert("上传失败! Code = " + error.code);
                };

                var options = new FileUploadOptions();
                options.fileKey = "file1";
                options.fileName = fileURL.substr(fileURL.lastIndexOf('/') + 1);
                //options.mimeType = "text/plain";

                //上传参数
                var params = {};
                params.value1 = "test";
                params.value2 = "param";
                options.params = params;

                var ft = new FileTransfer();
                //上传地址
                var SERVER = "http://192.168.2.120:7087/app/upload";
                ft.upload(fileURL, encodeURI(SERVER), success, fail, options);
            }
        };

        var cameraGetPicture = this.obtain('cameraGetPicture');
        cameraGetPicture.onclick = function () {
            // 打开图片库
            navigator.camera.getPicture(onSuccess, onFail, {
                quality: 50,                                       // 相片质量是50
                sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM, // 设置从图片库获取
                destinationType: Camera.DestinationType.DATA_URL       // 以base64返回
            });

            function onSuccess(imageData) {
                console.log(imageData);
                _this.obtain('myImage').src = "data:image/jpeg;base64," + imageData;
            }

            function onFail(message) {
                alert('Failed because: ' + message);
            }
        }
    }
};

app.initialize();