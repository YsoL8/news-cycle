var filesService = {};

filesService['monitor'] = function()  {
  var fs = require('fs');
  var path = require('path');

  return fs.watch(path.join(__dirname, '../public/example.txt'), function() {

    return 'the file changed';
  });
};

module.exports = filesService;
