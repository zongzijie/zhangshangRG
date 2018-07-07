var http=require('http');



module.exports = {
    start: start,
    history: history,
    reports: reports,
    errors: errors
};
//get 请求外网
http.get('http://www.gongjuji.net',function(req,res){
	var html='';
	req.on('data',function(data){
		html+=data;
	});
	req.on('end',function(){
		console.info(html);
	});
});
