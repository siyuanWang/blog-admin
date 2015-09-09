'use strict';
var express = require('express');

var router = express.Router();
/**
 * 获得标签集合
 */
router.get('/', function(req, res) {


});
/**
 * 获得标签集合下的文章列表
 */
router.get('/:id', function(req, res) {

});
/**
 * 同步标签：迭代所有的文章，把标签提取出来，放入对应的label表中
 */
router.post('/', function(req, res) {

});
module.exports = router;
