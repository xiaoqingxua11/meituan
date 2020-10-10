(function () {
    var itemTmpl ='<a href="../menu/menu.html">'+
        '<div class="r-item-content">' +
        '<img class="item-img" src=$pic_url />' +
        '$brand' +
        '<div class="item-info-content">' +
        '<p class="item-title one-line">$name</p>' +
        '<div class="item-desc clearfix">' +
        '<div class="item-score">$wm_poi_score</div>' +
        '<div class="item-count">月售$monthNmu</div>' +
        '<div class="item-distance">&nbsp;$distance</div>' +
        '<div class="item-distance">$mt_delivery_time&nbsp|</div>' +
        '</div>' +
        '<div class="item-price">' +
        '</div>' +
        '<div class="item-pre-price">$min_price_tip</div>' +
        '<div class="item-others">' +
        '$others' +
        '</div>' +
        '</div>' +
        '</div>'+
        '</a>';
    var page = 0;
    var isLoading = false;
    function getList() {
        page++;
        isLoading = true;
        //获取商家列表数据内容
        $.getJSON('../json/homelist.json', function (data) {
            console.log(data);
            var list = data.data.poilist || [];
            initContentList(list);
            isLoading = false;
        })
    }
    //渲染品牌标签
    function getBrand(data) {
        if (data.brand_type) {
            return '<div class="brand brand-pin">品牌</div>';
        } else {
            return '<div class="brand brand-xin">新到</div>';
        }

    }
    //渲染月售标签
    function getMonthNmu(data) {
        var num = data.month_sale_num;
        if (num > 999) {
            return '999+';
        }
        return num;

    }
    //渲染商家活动标签
    function getOthers(data) {
        var array = data.discounts2;
        var str = ' ';
        array.forEach(function (item, index) {
            var _str = '<div class="other-info">' +
                '<img src=$icon_url class="other-tag"/>' +
                '<p class="other-content">$info</p>' +
                '</div>';
            _str = _str.replace('$icon_url', item.icon_url)
                .replace('$info', item.info);

            str = str + _str;
        })
        return str;
    }

    //渲染列表
    function initContentList(list) {
        list.forEach(function (item, index) {
            var str = itemTmpl
                .replace('$pic_url', item.pic_url)
                .replace('$name', item.name)
                .replace('$distance', item.distance)
                .replace('$min_price_tip', item.min_price_tip)
                .replace('$mt_delivery_time', item.mt_delivery_time)
                .replace('$brand', getBrand(item))
                .replace('$monthNmu', getMonthNmu(item))
                .replace('$others', getOthers(item))
                .replace('$wm_poi_score', new StarScore(item.wm_poi_score).getStars());

            $('.list-wrap').append($(str));
        })
    }

    function addEvent() {
        window.addEventListener('scroll', function () {
            var clientHeight = document.documentElement.clientHeight;
            var scrollHeight = document.body.scrollHeight;
            var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            var proDis = 30;
            if (scrollTop + clientHeight >= (scrollHeight - proDis)) {
                if (page < 4) {
                    if (isLoading) {
                        return;
                    }
                    getList();
                }else{
                    $('.loading').text('加载完成')
                  }
            }

        })
    }
    function init() {
        getList();
        addEvent();
    }
    init();
})();