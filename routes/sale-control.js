var express = require('express');
var erpApi = require('../erp/erp-api');
var _ = require('undersocre');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    erpApi.getBldsByProjGuid().then(function(areas) {
    	var blds=_.pluck(areas,"Building");
    	blds=_.reduceRight(bldss, function(a, b) { return a.concat(b); }, []);
        res.render('sale-control',{blds:blds});
    });
});

module.exports = router;