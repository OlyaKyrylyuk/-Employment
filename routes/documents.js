var express = require("express");
var router = express.Router();

var monk = require("monk");
var db = monk("localhost:27017/vizdy");

router.get("/", function (req, res) {
  var collection = db.get("documents");
  collection.find({}, function (err, documents) {
    if (err) throw err;
    res.json(documents);
  });
});
router.post("/", function (req, res) {
  var collection = db.get("documents");
  collection.insert(
    {
      employer: req.body.employer,
      work: req.body.work,
    },
    function (err, documentt) {
      if (err) throw err;
      res.json(documentt);
    }
  );
});
router.delete("/:id", function (req, res) {
  var collection = db.get("documents");
  collection.remove({ _id: req.params.id }, function (err, documentt) {
    if (err) throw err;
    res.json(documentt);
  });
});

router.get("/:id", function (req, res) {
  var collection = db.get("documents");
  collection.findOne({ _id: req.params.id }, function (err, documentt) {
    if (err) throw err;
    res.json(documentt);
  });
});
router.put("/:id", function (req, res) {
  var collection = db.get("documents");
  collection.update(
    {
      _id: req.params.id,
    },
    {
      employer: req.body.employer,
      work: req.body.work,
    },
    function (err, documentt) {
      if (err) throw err;
      res.json(documentt);
    }
  );
});

module.exports = router;
