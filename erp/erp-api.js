/**
 * erp接口代理类
 * @type {[type]}
 */

var httpHelper = require('../common/httpHelper');

var api = {
    RenderSaleTableControlHtml: "/pub/Mysoft.Slxt.Common.AppServices.SaleControlTableAppService/RenderSaleTableControlHtml.aspx",
    GetAreaBuilding: "Mysoft.Slxt.Common.AppServices.SaleControlTableAppService/GetAreaBuilding.aspx"
}
module.exports = {
    /**
     * 获取销空图的HTML
     * @param  {Guid} bldGuid 楼栋GUID
     * @return {[type]}         [description]
     */
    getSaleControlHTML: function(bldGuid) {
        return httpHelper.post(RenderSaleTableControlHtml, {
            "BuildingIds": [bldGuid],
            "InfoSettings": [],
            "AllowMultiSelect": false,
            "BuildingColumnCount": 1,
            "AllowStatistical": false,
            "AllowEmptyRoom": false,
            "SaleControlType": 0
        });
    },
    /**
     * 获取项目
     * @return {[type]} [description]
     */
    getBldsByProjGuid: function(projGuid) {
        return httpHelper.post(GetAreaBuilding, {
            "projGuid": projGuid,
            "isShowAllPinControlRoomBld": false
        });
    }
};