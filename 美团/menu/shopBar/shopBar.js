(function () {
    // 购物车顶部末班字符串
    var itemTopTmpl =
        '<div class="choose-content hide">' +
        '<div class="content-top">' +
        '<div class="clear-car">清空购物车</div>' +
        '</div>' +
        '</div>';
    // 购物车底部末班字符串
    var itemBottomTmpl =
        '<div class="bottom-content ">' +
        '<div class="shop-icon">' +
        '<div class="dot-num hide">1</div>' +
        '</div>' +
        '<div class="price-content">' +
        '<p class="total-price">¥<span class="total-price-span">0</spsan></p>' +
        '<p class="other-price">另需配送费&nbsp;¥<span class="shopping-fee">0</span></p>' +
        '</div>' +
        '<div class="submmit-btn">去结算</div>' +
        '</div>';

    //转化为jq对象
    var $strBottom = $(itemBottomTmpl);
    var $strTop = $(itemTopTmpl);
    function changeShoppingPrice(str) {
        $strBottom.find('.shopping-fee').text(str);
    }
    function changeTotalPrice(str) {
        changeDot();
        $strBottom.find('.total-price').text(str);
    }
    //计算红点
    function changeDot(){
        var $counts=$strTop.find('.count');
        var total=0;
        for(var i=0;i<$counts.length;i++){
            total+=parseInt($($counts[i]).text())
        }
        if(total>0){
            $('.dot-num').show().text(total);
        }else{
            $('.dot-num').hide();
        }
    }
    //加减号添加事件
    function addClick() {
        $('.shop-bar').on('click','.shop-icon',function(){
                $('.mask').toggle();
                $strTop.toggle();
        })
        $strTop.on('click', '.plus', function (e) {

            var $count = $(e.currentTarget).parent().find('.count');
            $count.text(parseInt($count.text() || '0') + 1);
            var $item = $(e.currentTarget).parents('.choose-item').first();
            var itemData = $item.data('itemData');
            console.log(itemData)
            itemData.chooseCount = itemData.chooseCount + 1;
            renderItems();
            // 找到当前的右侧数据详情 进行绑定
            $('.left-item.active').click();
        });
        $strTop.on('click', '.minus', function (e) {
            var $count = $(e.currentTarget).parent().find('.count');
            if ($count.text() == 0) {
                return;
            }
            $count.text(parseInt($count.text() || '0') - 1);

            var $item = $(e.currentTarget).parents('.choose-item').first();
            var itemData = $item.data('itemData');
            console.log(itemData)
            itemData.chooseCount = itemData.chooseCount -1;
            renderItems();
            // 找到当前的右侧数据详情 进行绑定
            $('.left-item.active').click();
        });
    }
    function renderItems() {
        $strTop.find('.choose-item').remove();
        var list = window.food_spu_tags || [];
        var tmpl = '<div class="choose-item">' +
            '<div class="item-name">$name</div>' +
            '<div class="price">¥<span class="total">$price</div>' +
            '<div class="select-content">' +
            '<div class="minus"></div>' +
            '<div class="count">$chooseCount</div>' +
            '<div class="plus"></div>' +
            '</div>' +
            '</div>';
        var totalPrice = 0;
        list.forEach(function (item) {
            item.spus.forEach(function (_item) {
                // 如果彩屏数量大于0 开始渲染
                if (_item.chooseCount > 0) {
                    var price = _item.min_price * _item.chooseCount;
                    var row = tmpl.replace('$name', _item.name)
                        .replace('$price', price)
                        .replace('$chooseCount', _item.chooseCount);
                    totalPrice += price;
                    var $row = $(row);
                    $row.data('itemData', _item);
                    $strTop.append($row);
                }
            })
            changeTotalPrice(totalPrice);
        })
    }
    function init(data) {
        $('.shop-bar').append($strTop);
        $('.shop-bar').append($strBottom);
        addClick();
        
    }
    init();
    window.ShopBar = {
        renderItems: renderItems,
        changeShoppingPrice: changeShoppingPrice
    }
})();