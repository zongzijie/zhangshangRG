var express = require('express');
var erpApi = require('../erp/erp-api');
var router = express.Router();

/* 获取销空图 */
router.post('/get-sale-control', function(req, res, next) {
    var params = req.body;
    erpApi.getSaleControlHTML(params.bldGUID).then(function(data) {
        // res.writeHead(200,{"Content-Type":"application/json; charset=utf-8"});
        res.set("Content-Type", "application/json; charset=utf-8")
        res.send(data);
        // res.render('test', { test: data });
    })
    //res.sendfile('index');
    //res.render('index', { title: 'Express' });
});
module.exports = router;