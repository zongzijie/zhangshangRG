(function($) {
    var index = {
        /**
         * 注册项目的模态窗口对象
         * @type {modal}
         */
        registerModal: null,
        /**
         * 页面准备
         * @return {[type]} [description]
         */
        pageReady: function() {
            var me = this;
            me.pullSaleControlHtml("667561c6-a381-e811-82b2-001c429ebbde").then(function(html){
            	$("#sale-control-container").html(html);
            	$(".wrap-ld-content").hide()
            });

        },
        /**
         * 获取销空图HTML
         * @param  {Object} data 页面数据
         * @return {Promise}      承诺对象
         */
        pullSaleControlHtml: function(bldGuid) {
            return $.post('erp/get-sale-control', {bldGUID:bldGuid});
        }
    };
    window.sale = index;
})(window.$);
window.$(window.document).ready(function() {
    window.sale.pageReady();
});