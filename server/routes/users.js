var express = require('express');
var router = express.Router();
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send({abc:'something'});
});


router.post('/',upload.single('avatar'), function(req,res,next){
  res.send(req.file.fieldname +' '+req.file.originalname);
});
module.exports = router;
