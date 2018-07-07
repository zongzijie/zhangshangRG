var http = require('http');
var erphost = "wjj_pc"
var port = "2222"
var Q = require('q');


module.exports = {
    post: function(url, data) {
        var dfd = Q.defer();
        //发送 http Post 请求
        var postData = JSON.stringify(data);
        console.log(postData);
        var options = {
            hostname: erphost,
            port: port,
            path: url,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Accept': 'application/json, text/javascript, */*; q=0.01',
                'X-Requested-With': 'XMLHttpRequest',
                'Content-Length': Buffer.byteLength(postData),
                'AppId': 'zengzhishuixitong',
                'Appkey': 'e58a593817e01373',
            }
        }
        var req = http.request(options, function(res) {
            console.log('Status:', res.statusCode);
            console.log('headers:', JSON.stringify(res.headers));
            res.setEncoding('utf-8');
            var json = '';
            res.on('data', function(chun) {
                console.log('body分隔线---------------------------------\r\n');
                console.info(chun);
                json += chun;
            });
            res.on('end', function() {
                console.log('No more data in response.********');
                dfd.resolve(json);
            });
        });
        req.on('error', function(err) {
            console.error(err);
        });
        req.write(postData);
        req.end();
        return dfd.promise;
    },
    get: function(url) {
        var dfd = Q.defer();
        //get 请求外网
        http.get(erphost , function(req, res) {
            var json = '';
            req.on('data', function(data) {
                json += data;
            });
            req.on('end', function() {
                console.log(json);
                dfd.resolve(json);
            });
        });
        return dfd.promise;

    }
};