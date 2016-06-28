var multer = require('multer');
var storage = multer.diskStorage({
	destination: function(req, file, callback) {
		callback(null, './dist/uploads');
	},
	filename: function(req, file, callback) {
		console.log("File name")
		console.log(file);
		var name = file.originalname;
		name = name.split(".");
		var ext = name[name.length-1];
		callback(null, file.fieldname + '-' + Date.now() + '.' + ext);
	}
});
var upload = multer({storage : storage}).single('file');

module.exports = upload;
