var express = require('express');
var bodyParser = require('body-parser')
var promoRouter = express.Router();
var Promotions = require('../models/promotions');

var Verify = require('./verify');

promoRouter.use(bodyParser.json());

promoRouter.route('/')
.get(Verify.verifyOrdinaryUser, function(req,res,next){
  Promotions.find({}, function (err, leaders) {
      if (err) throw err;
      res.json(leaders);
  });
})

.post(Verify.verifyOrdinaryUser,Verify.verifyAdmin, function(req, res, next){
  Promotions.create(req.body, function (err, dish) {
      if (err) throw err;
      console.log('Promotions created!');
      var id = dish._id;

      res.writeHead(200, {
          'Content-Type': 'text/plain'
      });
      res.end('Added the promotions with id: ' + id);
  });
})

.delete(Verify.verifyOrdinaryUser,Verify.verifyAdmin, function(req, res, next){
  Promotions.remove({}, function (err, resp) {
    if (err) throw err;
    res.json(resp);
  });
});

promoRouter.route('/:promoId')
.get(Verify.verifyOrdinaryUser, function(req,res,next){
    Promotions.findById(req.params.promoId, function (err, dish) {
      if (err) throw err;
      res.json(dish);
  });

})

.put(Verify.verifyOrdinaryUser,Verify.verifyAdmin, function(req, res, next){
    Promotions.findByIdAndUpdate(req.params.promoId, {
        $set: req.body
    }, {
        new: true
    }, function (err, dish) {
        if (err) throw err;
        res.json(dish);
    });
})

.delete(Verify.verifyOrdinaryUser,Verify.verifyAdmin, function(req, res, next){
  Promotions.findByIdAndRemove(req.params.promoId, function (err, resp) {        if (err) throw err;
      res.json(resp);

  });
});


module.exports = promoRouter;
