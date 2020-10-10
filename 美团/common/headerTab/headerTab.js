(function () {
    var itemTmpl = 
    '<a class="$key tab-item" href="../$key/$key.html">' +
        '$text' +
    '</a>';

    function init() {
        var items = [{
            key: 'menu',
            text: '菜单'
        }, {
            key: 'comment',
            text: '评价'
        }, {
            key: 'resturant',
            text: '商家'
        }];

        var str = '';
        items.forEach(item => {
            str += itemTmpl.replace(/\$key/g,item.key)
                           .replace('$text',item.text)
        });
        $('.tab-bar').append($(str));
     //判断当前页面
     var arr=window.location.pathname.split('/');
     var page=arr[arr.length-1].replace('.html','');
       //给当前页面增加active通过key
       $('a.'+page).addClass('active');
    }
    init();
})();