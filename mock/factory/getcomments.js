/*
 * @Author: dyr
 * @Description: 评论列表接口
 * @Date: 2019-06-15 10:02:05
 * @LastEditors: dyr
 * @LastEditTime: 2019-06-15 12:24:02
 */

const Mock = require('mockjs');
const Random = Mock.Random;

function createData() {
  var data = {
    code: 'success',
    data: [],
  };

  var images = [1, 2, 3].map(x => Random.image('200x100', Random.color(), Random.word(2, 6)));
  const description = Random.cparagraph(0, 10);
  var child = [];
  for (var i = 0; i < 0; i++) {
    child.push({
      id: i,
      author_name: Random.cword(8, 15),
      author_url: images.slice(0, Random.integer(1, 2))[0],
      date: '2019-06-06',
      content: description.substr(0, 40),
      formId: null,
      userid: '0',
    });
  }
  for (var i = 0; i < 1; i++) {
    data.data.push({
      id: i,
      author_name: Random.cword(8, 15),
      author_url: images.slice(0, Random.integer(1, 2))[0],
      date: '2019-06-06',
      content: description.substr(0, 40),
      formId: null,
      userid: '0',
      child,
    });
  }

  return data;
}

module.exports = {
  commentList: () => createData(),
};
