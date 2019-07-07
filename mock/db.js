const AppGroup = require('./factory/appGroup');
const Magslist = require('./factory/magslist');
const CommentList = require('./factory/getcomments');
/**
 * json-server不支持嵌套访问，如'books/new'
 * 需要在routes.js中设置rewriter
 *
 * 服务启动后db中的数据将不会改变
 */

module.exports = {
  'h5-act-appGroup': AppGroup.appGroup(),
  'wp-json-qiyi-wp-api-v1-post-magslist': Magslist.magsList(),
  'wp-json-qiyi-wp-api-v1-comment-getcomments': CommentList.commentList(),
};
