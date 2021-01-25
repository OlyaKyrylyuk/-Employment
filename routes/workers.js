var express = require("express");
var router = express.Router();

var monk = require("monk");
var db = monk("localhost:27017/vizdy");

router.get("/", function (req, res) {
  var collection = db.get("workers");
  collection.find({}, function (err, workers) {
    if (err) throw err;
    res.json(workers);
  });
});
router.get("/", function (req, res) {
  var collection = db.get("workers");
  collection.find({ work: req.body.work }, function (err, worker) {
    if (err) throw err;
    res.json(worker);
  });
});
router.post("/", function (req, res) {
  var collection = db.get("workers");
  collection.insert(
    {
      surname: req.body.surname,
      name: req.body.name,
      fathersname: req.body.fathersname,
      age: req.body.age,
      work: req.body.work,
    },
    function (err, worker) {
      if (err) throw err;
      res.json(worker);
    }
  );
});
router.delete("/:id", function (req, res) {
  var collection = db.get("workers");
  collection.remove({ _id: req.params.id }, function (err, worker) {
    if (err) throw err;
    res.json(worker);
  });
});

router.get("/:id", function (req, res) {
  var collection = db.get("workers");
  collection.findOne({ _id: req.params.id }, function (err, worker) {
    if (err) throw err;
    res.json(worker);
  });
});
router.put("/:id", function (req, res) {
  var collection = db.get("workers");
  collection.update(
    {
      _id: req.params.id,
    },
    {
      surname: req.body.surname,
      name: req.body.name,
      fathersname: req.body.fathersname,
      age: req.body.age,
      work: req.body.work,
    },
    function (err, worker) {
      if (err) throw err;
      res.json(worker);
    }
  );
});

module.exports = router;
