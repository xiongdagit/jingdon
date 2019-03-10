// 初始化页面功能
window.onload = function () {
    // 搜索
    search();
    // 轮播图
    banner();
    // 倒计时
    downTime();
};

// 1.页面初始化的时候，距离顶部是0的距离的时候 透明度是0；
// 2.当页面滚动的时候，随着页面距离变大 透明度变大；
// 3.当滚动的距离超过了轮播图的距离的时候，保持不变；
var search = function () {
    // 获取dom元素
    var search = document.getElementById('jd-search-box');
    var banner = document.getElementById('jd-banner');
    // 监听滚动事件
    window.onscroll = function () {
        // 当前页面滚动的距离
        // IE
        // var top = documentElement.scrolTop;
        // 谷歌
        var top = document.body.scrollTop;
        // 距离范围
        var height = banner.offsetHeight;
        if (top > height) {
            // 当滚动的距离超过了轮播图的距离的时候，保持不变；
            opacity = 0.85;
        } else {
            // 当页面滚动的时候，随着页面距离变大 透明度变大；
            opacity = 0.85 * (height / top);
        };
        search.style.background = 'rgba(228,49,48,' + opacity + ')';
    };

};

// 1.无缝滚动 && 无缝滑动
// 2.点盒子对应改变
// 3.可以滑动
// 4.滑动距离不够时，吸附回去
// 5.滑动距离够时，上一张 下一张
var banner = function () {
    // 获取dom元素
    // 大容器
    var banner = document.getElementById('jd-banner');
    //轮播图宽度
    var width = banner.offsetWidth;
    // 图片容器
    var imageBox = banner.querySelector('ul:first-child');
    // 点容器
    var pointBox = banner.querySelector('ul:last-child');
    // 所有的点
    var points = pointBox.querySelectorAll('li');

    // 提共用方法

    // 加过渡
    var addTransition = function () {
        // 过渡
        imageBox.style.transition = 'all 0.2s';
        // 兼容
        imageBox.style.webkitTransition = 'all 0.2s';
    };

    // 清过渡
    var removeTransition = function () {
        // 过渡
        imageBox.style.transition = 'none';
        // 兼容
        imageBox.style.webkitTransition = 'none';
    };

    // 设置位移
    var setTranslateX = function (translateX) {
        // 位移
        imageBox.style.transform = 'translateX(' + translateX + 'px)';
        // 兼容
        imageBox.style.webkitTransform = 'translateX(' + translateX + 'px)';
    }

    // 滚动(定时器 过渡 位移)
    // 默认索引
    var index = 1;
    var time = setInterval(function () {
        index++;
        // 过渡
        addTransition();
        // 位移
        setTranslateX(-index * width);
    }, 2000);


    // 监听过渡结束时间点
    imageBox.addEventListener('transitionend', function () {
        // 无缝滚动
        if (index >= 9) {
            // 位移到第一张
            index = 1;
            // 清除过渡
            removeTransition();
            // 定位
            setTranslateX(-index * width);
        }
        // 无缝滑动
        else if (index <= 0) {
            index = 8;
            // 清除过渡
            removeTransition();
            // 定位
            setTranslateX(-index * width);
        };
        // 点对应盒子改变 index 取值 1-8 对应 点 0-7
        setPoint();

    });

    var setPoint = function () {
        // 去除now的样式
        for (var i = 0; i < points.length; i++) {
            points[i].classList.remove('now');
        };
        // 对应点加样式
        points[index - 1].classList.add('now');
    };


    // 滑动  touch 事件

    // 记录开始的x坐标
    var startX = 0;
    // 记录坐标的改变
    var distanceX = 0;
    // 严谨判断
    var isMove = false;

    imageBox.addEventListener('touchstart', function (e) {
        // 清除定时器
        clearInterval(time);
        // 获取开始坐标
        startX = e.touches[0].clientX;
    });

    imageBox.addEventListener('touchmove', function (e) {
        var moveX = e.touches[0].clientX;
        // distanceX 大于0 向右滑动 ， 小于0 向左滑动
        distanceX = moveX - startX;
        // 滑动 基于当前位置
        var translateX = - index * width + distanceX;
        // 清除过渡
        removeTransition();
        // 做定位
        setTranslateX(translateX);
        isMove = true;
    });

    imageBox.addEventListener('touchend', function (e) {
        // 滑动事件结束之后判断滑动的距离  大于三分之一切换图片 反之定位回去
        if (isMove && Math.abs(distanceX) < width / 3) {
            // 距离不够时
            addTransition();
            setTranslateX(-index * width);
        } else {
            // 距离够时
            if (distanceX > 0) {
                // 右滑 上一张
                index--;
            } else {
                // 左滑 下一张
                index++;
            }
            addTransition();
            setTranslateX(-index * width);
        }
    });


clearInterval(time);
time = setInterval(function () {
    index++;
    // 过渡
    addTransition();
    // 位移
    setTranslateX(-index * width);
}, 2000);
// 重置参数
startX = 0;
distanceX = 0;
isMove = false;

};




var downTime = function () {

    var time = 60*60*10;
    var skTime = document.getElementById('sk-time');
    var spans = skTime.querySelectorAll('span');
    var timer = setInterval(function(){
        time --;
        // 格式化时间
        var h = Math.floor(time/3600);
        var m = Math.floor(time%3600/60);
        var s = time%60;
        // 设置时间
        spans[0].innerHTML = Math.floor(h/10);
        spans[1].innerHTML = h%10;

        spans[3].innerHTML = Math.floor(m/10);
        spans[4].innerHTML = m%10;
 
        spans[6].innerHTML = Math.floor(s/10);
        spans[7].innerHTML = s%10;

        if  (time <=0){
            clearInterval(time);
        }

    },1000);
};