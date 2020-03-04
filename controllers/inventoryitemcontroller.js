let router = require('express').Router();
let sequelize = require('../db');
let Inventoryitem = sequelize.import('../models/inventoryitem');
const multer = require('multer');
// uploads will hold all the image files

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads');
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

// if we choose to filter file types
// const fileFilter = (req, file, cb) => {
//   // limits uploads to only jpegs and png's
//   if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
//   cb(null, true);
//   } else {
//   cb(null, false);
//   }
// }

const upload = multer({
  storage: storage,
  limits: {
  // limiting filesize for uploaded images
  fileSize: 1024 * 1024 * 5
  }
})

// will parse 1 file (specified by image)
router.post('/create', upload.single('image'), function(req, res) {
  console.log()
  console.log("REQ", req)
  console.log("REQ.BODY", req.body)
  let newPhoto = JSON.parse(req.body.Photo)
  console.log("typeof", newPhoto instanceof Array)
  console.log("newPhoto", newPhoto)
  console.log("REQ.FILE", req.file);
  Inventoryitem.create({
      name: newPhoto.Photo[0].name,
      description: newPhoto.Photo[0].description,
      price: newPhoto.Photo[0].price,
      quantity: newPhoto.Photo[0].quantity,
      weight: newPhoto.Photo[0].weight,
      catagory: newPhoto.Photo[0].catagory,
      onsale: newPhoto.Photo[0].onsale,
      sold: newPhoto.Photo[0].sold,
      image: req.file.path
  }).then(
    function createSuccess(postedinfo) {
      res.json({
        postedinfo: postedinfo
      });
    },
    function createError(err) {
      res.send(500, err.message);
    }
  );
});

router.get('/inventory', function(req, res) {
  Inventoryitem.findAll().then(
    function findAllSuccess(data) {
      res.json(data);
    },
    function findAllError(err) {
      res.send(500, err.message);
    }
  );
});

router.get('/allitems/:catagroy', function(req, res) {
  Inventoryitem.findAll({
    where: { catagory: req.params.catagory }
  }).then(
    function findAllSuccess(data) {
      res.json(data);
    },
    function findAllError(err) {
      res.send(500, err.message);
    }
  );
});

router.delete('/delete/:id', function(req, res) {
  Inventoryitem.destroy({
    where: { id: req.params.id }
  }).then(
    function deleteSuccessLog() {
      res.json({ response: 'you removed an item' });
    },
    function deleteLogError(err) {
      res.send(500, err.message);
    }
  );
});

router.put('/update/:id', function(req, res) {
  Inventoryitem.update(
    {
      name: name,
      description: description,
      price: price,
      quantity: quantity,
      weight: weight,
      catagory: catagory,
      onsale: onsale,
      sold: sold
    },
    { where: { id: req.params.id } }
  )
    .then(function updateValid(updatedpost) {
      res.json({ updatedpost: updatedpost });
    })
    .catch(function updateInvalid(err) {
      res.send(err);
    });
});

module.exports = router;
