# houwu-theme
一个订制的Ghost主题，仅供学习参考.

# 问题

需要在Ghost源码中添加如下Helper.

_[GHOST_DIR]/core/server/helpers/asset_by.js_

~~~~
var hbs             = require('express-hbs'),
    config          = require('../config'),
    utils           = require('./utils'),
    asset           = require('./asset'),
    asset_by;

asset_by = function (context, options) {
    if (options && options.hash) {
        context = context.replace("%s", options.hash.value);
    }
    return asset(context, options);
};

module.exports = asset_by;
~~~~

再需要在同目录下的index.js中注册该Helper.

# Lisence

The MIT License (MIT)
