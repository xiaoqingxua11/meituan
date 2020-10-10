(function () {
    // 左侧类目末班字符串
    var itemTmpl = 
    '<div class="left-item">' +
        '<div class="item-text">$getItemContent' +
        '</div>'+
    '</div>';
    //获取类目数据
    function getList(){
        $.getJSON('../json/food.json',function(data){
         window.food_spu_tags=data.data.food_spu_tags||[];
          initContentList(window.food_spu_tags);
          window.ShopBar.changeShoppingPrice(data.data.poi_info.shipping_fee||0);
        });
    }
    //渲染item内容
   function getItemContent(data){
       if(data.icon){
           return '<img class="item-icon"src='+data.icon+'>'+data.name;
       }else{
           return data.name;
       }
   }
   //渲染列表
   function initContentList(list){
       list.forEach(function(item,index){
           var str=itemTmpl
                           .replace('$getItemContent',getItemContent(item));
        //    将item数据挂在left-item上
            var $target=$(str);
            $target.data('itemData',item);
            $('.left-bar-inner').append($target);
       });
       $('.left-item').first().click();
   }
   function addClick(){
       $('.menu-inner').on('click','.left-item',function(e){
          var $target=$(e.currentTarget);
          $target.addClass('active');
          //去除同级的active属性
          $target.siblings().removeClass('active');
        //   将数据传入到右侧的列表里
          window.Right.refresh($target.data('itemData'));
       })
   }
    function init(){
        getList();
        addClick();
    }
    init();

})();