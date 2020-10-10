//末班字符串
(function () {
    var itemTmpl = '<div class="category-item">' +
        '<img class="item-icon" src=$url />' +
        '<p class="item-name">$name</p>' +
        '</div>';
    function initCategory() {
        //获取categeory内容
        $.getJSON('../json/head.json', function (data) {
            var list=data.data.primary_filter.splice(0,8);
            list.forEach(function(item,index){
                var str=itemTmpl
                .replace('$url',item.url)
                .replace('$name',item.name);
                $('.category-content').append($(str));
            })
        })
    }
    function init(){
        initCategory();
    }
    init();

})();

