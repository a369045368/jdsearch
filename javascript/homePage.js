$(document).ready(function(){
    var sat = true;
    var li = "<li></li>";
    var liTwo = "<li class='wu'>无搜索记录</li>";
    var liNum = 8;  //决定搜索记录数量

    $("#search").focus(function(){
       if(sat==true){
           $(".left-box").css("display","none");
           $(".input-box").css("width",86+"%");
           $(".history-box").css("display","block");
           sat = false;
           console.log(sat);
           appLi();
       };
    });
    $(".btn-cancel").click(function(){
        $(".left-box").css("display","block");
        $(".input-box").css("width",72+"%");
        $(".history-box").css("display","none");
        sat = true;
        console.log(sat);
    });

    //localStorage 取值 (无记录取值为[] 有记录转化为数组)
    function cacheArr(){
        var cache=localStorage.history;
        if(cache==undefined){//判断localStorage里有无搜索记录
            var cacheArr= [];
        }else{
            var cacheArr = cache.split(",");//   逗号进行分解为数组。
        };
        return cacheArr;
    };

    //添加记录
    function appLi(){
        var appCache = cacheArr();
        var cacheNum = appCache.length;
        $(".history li").remove();
        if(cacheNum == 0){
            $(".history").append(liTwo);
            $(".wu").css("color","#9f9f9f");
        };
        for(var i =0;i<cacheNum;i++){
            $(".history").append(li);
            var textArr = appCache[i];
            $(".history li:eq("+i+")").text(textArr);
            console.log(textArr);
        };
    };

    //判断单个字符串在数组是否有相同的 有的话 true 无 false
    function arrEqually(oneArr,allArr){
        var arrNum = allArr.length;
        var op = false;
        for(var i =0 ;i<arrNum;i++){
            var newArr = allArr[i].toString();
            var arrNstr = oneArr.toString();
            if(arrNstr == newArr){
                var op =true;
                break;
            };
        };
        return op;
    };

    $(".btn-search").click(function(){
        var cache = cacheArr();
        console.log(cache);
        var inputText=$("#search").val();
        if(inputText!==""){              //输入内容不能为空
           var cacheNumber = cache.length;
            console.log("arrNum"+cacheNumber);
            if(cacheNumber == 0){  //如果 localStorage 无数据
                cache.unshift(inputText);
            }else{                 //有数据
                var status = arrEqually(inputText,cache);
                console.log("状态"+status);
                if(status == false){
                    cache.unshift(inputText);  //如果没有相同的字符串 那么添加到cache数组中
                };
            };
            if(cacheNumber > (liNum-1) ){ //数组的数量不超过liNum值   如果超过则删除最后一个
                cache.pop();
            };
            local(cache);    //写入到LOCAL STORAGE中
            appLi();
        };
    });

    //清除搜索记录
    $(".btn-box").click(function(){
       localStorage.removeItem("history");//清除c的值
        appLi();
    });

    //写入到LOCAL STORAGE中
    function local(text){
        var search = text;
        localStorage.setItem("history",search);//设置history的值
        console.log(localStorage.history)  //取缓存值
    }

});
