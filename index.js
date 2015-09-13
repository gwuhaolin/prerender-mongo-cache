/**
 * Created by wuhaolin on 9/13/15.
 */
var mongoose = require('mongoose');

var PageSchema = new mongoose.Schema({
    url: {type: String, index: true, unique: true},//主键当前页面的url
    document: {type: String},//html文档内容
    updatedAt: {type: Date, default: Date.now}//文档最后更新时间
});

var Page = mongoose.model('Page', PageSchema);

module.exports = {
    init: function () {
        mongoose.connect('mongodb://localhost/prerender');
    },

    beforePhantomRequest: function (req, res, next) {
        if (req.method === 'GET') {
            var url = req.url;
            Page.findOne({url: url}).then(function (page) {
                if (page) {
                    res.send(200, page.document);
                } else {
                    next();
                }
            }, function () {
                next();
            });
        } else {//如果不是GET请求 那么就不使用缓存机制 强制重新去抓取更新到缓存
            next();
        }
    },

    afterPhantomRequest: function (req, res, next) {
        var page = {
            url: req.url,
            document: req.prerender.documentHTML,
            updatedAt: Date.now()
        };
        Page.findOneAndUpdate({url: page.url}, page, {upsert: true}).then(function (page) {
        }, function (err) {
            console.error(err);
        });
        next();
    }
};