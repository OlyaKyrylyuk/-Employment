var express = require("express");
var router = express.Router();

var monk = require("monk");
var db = monk("localhost:27017/vizdy");

router.get("/", function (req, res) {
  var collection = db.get("employers");
  collection.find({}, function (err, employers) {
    if (err) throw err;
    console.log(employers);
    res.json(employers);
  });
});
router.post("/", function (req, res) {
  var collection = db.get("employers");
  collection.insert(
    {
      surname: req.body.surname,
      name_of_company: req.body.name_of_company,
      adress: req.body.adress,
      phone_number: req.body.phone_number,
    },
    function (err, employer) {
      if (err) throw err;
      res.json(employer);
    }
  );
});
router.delete("/:id", function (req, res) {
  var collection = db.get("employers");
  collection.remove({ _id: req.params.id }, function (err, employer) {
    if (err) throw err;
    res.json(employer);
  });
});

router.get("/:id", function (req, res) {
  var collection = db.get("employers");
  collection.findOne({ _id: req.params.id }, function (err, employer) {
    if (err) throw err;
    res.json(employer);
  });
});
router.put("/:id", function (req, res) {
  console.log(req.body.surname);
  console.log(req.body.name_of_company);
  console.log(req.body.adress);
  console.log(req.body.phone_number);
  var collection = db.get("employers");
  collection.update(
    {
      _id: req.params.id,
    },
    {
      surname: req.body.surname,
      name_of_company: req.body.name_of_company,
      adress: req.body.adress,
      phone_number: req.body.phone_number,
    },
    function (err, employer) {
      if (err) throw err;
      res.json(employer);
    }
  );
});

module.exports = router;
