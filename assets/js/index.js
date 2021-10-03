$(function() {
    getUserInfo();



    $('#btnLogout').on('click', function() {
        layer.confirm('确认要退出?', { icon: 3, title: '提示' }, function(index) {
            //do something
            // console.log('ok');

            localStorage.removeItem('token');
            location.href = '/login.html'
            layer.close(index);
        });

    })
})


function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function(res) {
            // console.log(res);
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败');
            }

            // 调用rendAvatar渲染用户头像

            rendAvatar(res.data);
        },
        // complete: function(res) {
        // console.log('执行了complete回调');
        // console.log(res);
        // responseJSON: { status: 1, message: '身份认证失败！' }
        // if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //     localStorage.removeItem('token');
        //     location.href = '/login.html'
        // }
        // }
    })
}



function rendAvatar(user) {
    //获取用户的名称
    var name = user.nickname || user.username

    $('#wecome').html('欢迎你，' + name)


    // 按需渲染用户的头像
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show();
        $('.text-avator').hide();
    } else {

        $('.layui-nav-img').hide();
        var first = name[0].toUpperCase();
        $('.text-avator').html(first).show();
    }

}