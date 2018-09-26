window.addEventListener('load', function () {
    var jdCategory = new JdCategory(); //new一个对象
    jdCategory.initLeftSlide(); //调分类左侧滑动
    jdCategory.initRightSlide(); //调分类右侧滑动
    jdCategory.leftCeiling(); //点击左侧吸顶效果
})

var JdCategory = function () { //构造函数

};
JdCategory.prototype = { //构造函数原型里的方法
    // 初始化分类左侧滑动
    initLeftSlide: function () {
        // 左侧滑动初始化
        var swiper = new Swiper('.category-left .swiper-container', {
            direction: 'vertical',
            slidesPerView: 'auto',
            freeMode: true,
            scrollbar: {
                el: '.swiper-scrollbar',
            },
            mousewheel: true,
        });
    },

    //左侧点击吸顶效果(用原生js写的注意语法!!!)
    leftCeiling: function () {
        // 步骤:每一个li都需要加同样的点击事件,浪费性能,利用捕获,给li的父元素ul加点击事件
        var ul = document.querySelector('.category-left ul'); //找到ul
        var lis = ul.children; //找到所有li

        //2.给每一个li添加索引
        for (var i = 0; i < lis.length; i++) {
            lis[i].index = i;
        }

        //1.给ul加点击事件
        ul.addEventListener('click', function (e) {
            // 真正触发事件的是子元素,a在最里面,打印e得出事件源为a,而我们要找的是被点击的li,所以找a的父元素
            // console.log(e);

            //3.拿到当前点击的li(原本没有索引,给每个li加索引)
            var li = e.target.parentNode;
            // console.log(li.index);

            //4.获取当前点击li的索引
            var index = li.index;

            //5.获取当前点击的li的高度
            var liHeight = li.offsetHeight;

            //6.计算位移距离
            var distanceY = -index * liHeight;
            // console.log(distanceY);

            //7.判断当前位移的值(是负数)是否大于最大距离,如果大于则用计算的位移距离,如果小于则用最大位移距离
            var maxDistanceY = document.querySelector('.category-left').offsetHeight - ul.offsetHeight;
            // console.log(maxDistanceY);
            if (distanceY > maxDistanceY) {
                //8.给swiper-wrapper所有滚动图片元素设置位移
                ul.parentNode.parentNode.style.transform = 'translate3d(0px,' + distanceY + 'px,0px)';//切记style!!!!
            } else {
                //9.如果小于则用最大位移距离
                ul.parentNode.parentNode.style.transform = 'translate3d(0px,' + maxDistanceY + 'px,0px)';//切记带px!!!!
            }

            //10.给当前位移的元素加过渡效果transition-duration: 300ms;
            ul.parentNode.parentNode.style.transitionDuration = '300ms';

            //11.删除所有li的active,给当前点击的li加上active
            for(var i=0;i<lis.length;i++){
                lis[i].classList.remove('active');
            }
            li.classList.add('active');

        })
    },

    //初始化分类右侧滑动
    initRightSlide: function () {
        // 右侧滑动初始化
        var swiper = new Swiper('.category-right .swiper-container', {
            direction: 'vertical',
            slidesPerView: 'auto',
            freeMode: true,
            scrollbar: {
                el: '.swiper-scrollbar',
            },
            mousewheel: true,
        });
    }
}