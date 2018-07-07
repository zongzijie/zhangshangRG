(function($,yzs) {
	$(document).ready(function(){
		var jiaoyibtn=$("#jiaoyi");
		jiaoyibtn.click(function(){
			yzs.pay({
				money:8888,
				success:function(res){
                   alert(JSON.stringify(res));
				},
				error:function(res){
                   alert(JSON.stringify(res));
				}
			});
		});
	});
    // document.ready(function() {
    //     var jiaoyibtn = document.getElementById("jiaoyi");
    //     jiaoyibtn.addEventListener('click', function() {
    //         alert('123');
    //     }, false);
    // });

})(jQuery,yzs)