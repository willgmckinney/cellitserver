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
    cb(null, file.originalname)
  }
});

const fileFilter = (req, file, cb) => {
  // limits uploads to only jpegs and png's
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
  cb(null, true);
  } else {
  cb(null, false);
  }
}

const upload = multer({
  storage: storage, 
  limits: {
  // limiting filesize for uploaded images
  fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
})

// will parse 1 file (specified by image)
router.post('/create', upload.single('image'), function(req, res) {
  console.log()
  console.log("REQ", req)
  console.log("REQ.FILE", req.file);
  console.log("TYPEOF FILE", typeof req.file.path)
  console.log("REQ.FILE.PATH", req.file.path);
  Inventoryitem.create({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    quantity: req.body.quantity,
    weight: req.body.weight,
    catagory: req.body.catagory,
    onsale: req.body.onsale,
    sold: req.body.sold,
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

router.get('/allitems', function(req, res) {
  Inventoryitem.findAll({
    where: { poster: req.user.id },
    include: 'cart'
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
    where: { id: req.params.id, poster: req.user.id }
  }).then(
    function deleteSuccessLog() {
      res.send('you removed a log');
    },
    function deleteLogError(err) {
      res.send(500, err.message);
    }
  );
});

router.put('/update/:id', function(req, res) {
  Inventoryitem.update(
    {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      quantity: req.body.quantity,
      weight: req.body.weight,
      catagory: req.body.catagory,
      onsale: req.body.onsale,
      sold: req.body.sold
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
