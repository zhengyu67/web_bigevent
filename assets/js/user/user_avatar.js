$(function() {
    var layer = layui.layer


    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
        // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)



    $('#btnChooseImage').on('click', function() {
        $('#file').click();
    })


    $('#file').on('change', function(e) {
        // console.log(e);

        var filelist = e.target.files
            // console.log(filelist);
        if (filelist.length === 0) {
            return layer.msg('请选择照片');
        }

        // 1. 拿到用户选择的文件

        var file = e.target.files[0]
            // 2. 根据选择的文件， 创建一个对应的 URL 地址：
        var imgURL = URL.createObjectURL(file)
            // 3. 先`销毁`旧的裁剪区域，再`重新设置图片路径`，之后再`创建新的裁剪区域`：
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', imgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域

    })

    $('#btnUpload').on('click', function() {
        // 3. 将裁剪后的图片， 输出为 base64 格式的字符串
        var dataURL = $image
            .cropper('getCroppedCanvas', {
                height: 100
            })
            .toDataURL('image/png')

        $.ajax({
            method: 'POST',
            url: '/my/update/avatar',
            data: {
                avatar: dataURL
            },
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('更换图像失败！');
                }

                layer.msg(res.message)


                window.parent.getUserInfo();
            }

        })
    })
})